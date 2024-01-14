/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Autosuggest from 'react-autosuggest';
import { useLoading } from '../../Hooks/useLoading';
import { MyFriend } from '../../Services/chatService';
import toast from 'react-hot-toast';
import { getAllTheProject, TaskCreate } from '../../Services/taskServices';
import { useNavigate } from 'react-router-dom';

export default function CreateTask() {
    const [formData, setFormData] = useState({
        taskType: '',
        taskProject: '',
        taskTitle: '',
        taskDescription: '',
        taskPriority: '',
        taskMembers: [''],
        startDate: '',
        endDate: '',

    });

    const navigate = useNavigate();
    const [studentProjects, setStudentProjects] = useState();
    const [tasktype, settasktype] = useState();
    const { showLoading, hideLoading } = useLoading();
    const [myFriends, setMyFriends] = useState([]);
    const [taskMember, setTaskMember] = useState(['']);
    const [suggestions, setSuggestions] = useState([]);

    const handleAddMember = () => {
        setTaskMember([...taskMember, '']);
    };

    const handleMember = (index, value) => {
        const newMember = [...taskMember];
        newMember[index] = value;
        setTaskMember(newMember);

        // Update
        handleInputChange('taskMembers', index, value);
    };

    const handleInputChange = (field, index, value) => {
        setFormData((prevData) => {
            const newData = { ...prevData };
            if (Array.isArray(newData[field])) {
                newData[field][index] = value;
            } else {
                newData[field] = value;
            }
            return newData;
        });
    };

    const handleInputData = (e) => {
        // console.log("Event:", e);

        if (e && e.target && e.target.name) {
            // Handle regular input changes
            setFormData((prevData) => ({
                ...prevData,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const handleQuillChange = (content) => {
        // console.log(content);
        setFormData((prevData) => ({
            ...prevData,
            taskDescription: content,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedMembers = taskMember.map((member) => ({ memberNam: member }));
        const formattedDescription = formData.taskDescription; // Access HTML content
        const FormData = {
            ...formData,
            taskMembers: formattedMembers,
            taskDescription: formattedDescription,
        };

        try {
            showLoading();
            const NewtaskCreate = await TaskCreate(FormData);
            console.log("Task Created ==> ", NewtaskCreate);

            if (NewtaskCreate.message === "Task created successfully") {
                hideLoading();
                toast.success(NewtaskCreate.message);
                navigate("/manageTask");
            }
        } catch (error) {
            hideLoading();
            toast.error("Task Not Created , Please try again");
            console.error("Error While Creating Task", error);
        }
    };
    // console.log("task details ==> ", formData);

    const getSuggestions = (inputValue) => {
        const inputValueLowerCase = inputValue.toLowerCase();
        return myFriends.filter(
            (friend) => friend.friendName.toLowerCase().includes(inputValueLowerCase)
        );
    };

    const getSuggestionValue = (suggestion) => suggestion.friendName;

    const renderSuggestion = (suggestion) => <span className='m-5 lg:text-xl font-semibold cursor-pointer text-red-600'> 👉🏼 {suggestion.friendName}</span>;

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const allMyFriends = await MyFriend();
                setMyFriends(allMyFriends);
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                showLoading();
                const allProject = await getAllTheProject();
                console.log("ALL PROJECT ==> ", allProject);
                setStudentProjects(allProject);
                hideLoading();
            } catch (error) {
                hideLoading();
                console.error('Error fetching projects:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="pt-20 bg-gray-100 h-screen overflow-x-hidden">
                <div className="flex justify-center items-center py-3 m-5">
                    <div className="bg-white shadow-lg w-[70rem] h-auto grid grid-cols-3">
                        <div className="p-10">
                            <h1 className="font-semibold lg:text-3xl">Task Details</h1>
                            <h1 className="font-semibold text-gray-500 lg:text-xl ml-1 mt-4">Please fill all the detials</h1>
                        </div>

                        <div className="grid grid-cols-2 py-10">
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col m-2 mt-5">
                                    <label className="font-semibold text-lg">Select Type</label>
                                    <div className="flex flex-row mt-2 w-96 gap-3 text-lg">
                                        <input
                                            onChange={(e) => {
                                                settasktype("Personal");
                                                handleInputData(e, null);
                                            }}
                                            type="radio"
                                            name="taskType"
                                            value="Personal"
                                        />
                                        <label>
                                            Personal
                                        </label>

                                        <input
                                            onChange={(e) => {
                                                settasktype("Project");
                                                handleInputData(e, null);
                                            }}
                                            type="radio"
                                            name="taskType"
                                            value="Project"

                                        />
                                        <label>Project</label>
                                    </div>
                                </div>
                                {tasktype === "Project" && (
                                    <div className="flex flex-col m-2 mt-5">
                                        <label className="font-semibold text-lg">Select Project</label>
                                        <div className="flex flex-row mt-2 w-96 gap-3 text-lg">
                                            {studentProjects && studentProjects.length > 0 ? (
                                                <select
                                                    name="taskProject"
                                                    onChange={handleInputData}
                                                    className="w-[95%] text-lg p-1 border-2 border-black focus:outline-none rounded-sm bg-gray-100 mb-4">
                                                    <option> -- Choose Project --</option>
                                                    {studentProjects.map((project) => (
                                                        <option
                                                            value={project.projectTitle}
                                                            key={project._id}
                                                            className="font-semibold bg-gray-100 border-none focus:border-none outline-none"
                                                        >
                                                            {project.projectTitle}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <h1 className="lg:text-xl text-gray-500">Sorry, No Project</h1>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div className="flex flex-col m-2">
                                    <label className="font-semibold text-lg">Task title </label>
                                    <input
                                        required
                                        onChange={handleInputData}
                                        type="text" name="taskTitle" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[35rem]"></input>
                                </div>

                                <div className="flex flex-col m-2 mt-5">
                                    <label className="font-semibold text-lg">Task Description</label>
                                    <ReactQuill
                                        required
                                        theme="snow"
                                        onChange={handleQuillChange}
                                        name="taskDescription"
                                        className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 shadow-inner focus:shadow-none w-[35rem]"
                                    ></ReactQuill>
                                </div>


                                <div className="flex flex-col m-2 mt-5">
                                    <label className="font-semibold text-lg">Task Priority</label>
                                    <div className="flex flex-row mt-2 w-96 gap-3 text-lg">
                                        <input
                                            onChange={handleInputData}
                                            type="radio"
                                            name="taskPriority"
                                            value="Low"

                                        />
                                        <label>
                                            Low
                                        </label>

                                        <input
                                            onChange={handleInputData}
                                            type="radio"
                                            name="taskPriority"
                                            value="Medium"

                                        />
                                        <label>Medium</label>

                                        <input
                                            onChange={handleInputData}
                                            type="radio"
                                            name="taskPriority"
                                            value="High"
                                        />
                                        <label>
                                            High
                                        </label>
                                    </div>
                                </div>

                                <div className="flex flex-col m-2">
                                    <label className="font-semibold text-lg">Task Members</label>
                                    {taskMember.map((member, index) => (
                                        <div key={index} className="flex flex-row mt-2 w-96 gap-3 text-lg">
                                            <Autosuggest
                                                suggestions={suggestions}
                                                onSuggestionsFetchRequested={({ value }) => onSuggestionsFetchRequested({ value })}
                                                onSuggestionsClearRequested={onSuggestionsClearRequested}
                                                getSuggestionValue={getSuggestionValue}
                                                renderSuggestion={renderSuggestion}
                                                inputProps={{
                                                    value: member,
                                                    onChange: (event, { newValue }) => handleMember(index, newValue),
                                                    placeholder: 'Type a friend name',
                                                    className: 'p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none'
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={handleAddMember}
                                        className="bg-blue-400 ml-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-3 text-sm"
                                    >
                                        Add Member
                                    </button>
                                </div>

                                <div className="flex flex-col m-2 mt-8">
                                    <div className="flex flex-row gap-5 w-[72rem] items-center">
                                        <label className="font-semibold text-lg">Start date </label>
                                        <input
                                            onChange={handleInputData}
                                            type="date" name="startDate" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[15rem]"></input>
                                        <label className="font-semibold text-lg">End date </label>
                                        <input
                                            onChange={handleInputData}
                                            type="date" name="endDate" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[15rem]"></input>
                                    </div>
                                </div>

                                <div className="flex flex-col mt-16">
                                    <button type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 hover:rounded-[3rem] text-white font-bold py-2 px-4 w-[12rem] rounded">
                                        Create Task
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
