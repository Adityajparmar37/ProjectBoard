/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import Autosuggest from 'react-autosuggest';
import { useLoading } from '../../Hooks/useLoading';
import { getAllProject } from '../../Services/projectServices';
import toast from 'react-hot-toast';
import { deleteTask, getTheTask, TaskCreate } from '../../Services/taskServices';
import { useNavigate, useParams } from 'react-router-dom';

export default function TaskView() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getTask = await getTheTask(id);
                setFormData({
                    taskType: getTask.taskType || "",
                    taskProject: getTask.taskProject || "",
                    taskTitle: getTask.taskTitle || "",
                    taskDescription: getTask.taskDescription || "",
                    taskPriority: getTask.taskPriority || "",
                    taskMembers: getTask.taskMembers || [],
                    startDate: getTask.taskStartDate ? getTask.taskStartDate.slice(0, 10) : "",
                    endDate: getTask.taskEndDate ? getTask.taskEndDate.slice(0, 10) : "",

                })
            } catch (error) {
                console.log("Error in fetching a task ==> ", error);
            }
        }
        fetchData();
    }, [id])

    const [formData, setFormData] = useState({
        taskType: '',
        taskProject: '',
        taskTitle: '',
        taskDescription: '',
        taskPriority: '',
        taskMembers: [{ memberNam: '' }],
        startDate: '',
        endDate: '',

    });


    const [studentProjects, setStudentProjects] = useState();
    const [, settasktype] = useState();
    const { showLoading, hideLoading } = useLoading();

    const handleAddMember = () => {
        setFormData({
            ...formData,
            taskMembers: [...formData.taskMembers, { memberNam: '' }],
        });
    };

    const handleMemberChange = (index, value) => {
        const updatedMembers = [...formData.taskMembers];
        updatedMembers[index].memberNam = value;

        setFormData({
            ...formData,
            taskMembers: updatedMembers,
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
        try {
            showLoading();
            const NewtaskCreate = await TaskCreate(FormData);
            console.log("Task Created ==> ", NewtaskCreate);

            if (NewtaskCreate.message === "Task created successfully") {
                hideLoading();
                toast.success(NewtaskCreate.message);
                // navigator
            }
        } catch (error) {
            hideLoading();
            toast.error("Task Not Created , Please try again");
            console.error("Error While Creating Task", error);
        }
    };

    const handleDelete = async () => {
        try {
            // console.log("Before delete operation");
            await deleteTask(id);
            // console.log("After delete operation");
            toast.success("Delete successfully");
            navigate("/manageTask");
        } catch (error) {
            console.log("Error in deleting ", error);
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                showLoading();
                const allProject = await getAllProject();
                // console.log("ALL PROJECT ==> ", allProject);
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
                                            checked={formData.taskType === "Personal"}
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
                                            checked={formData.taskType === "Project"}
                                        />
                                        <label>Project</label>
                                    </div>
                                </div>
                                {formData && formData.taskType === "Project" && (
                                    <div className="flex flex-col m-2 mt-5">
                                        <label className="font-semibold text-lg">Select Project</label>
                                        <div className="flex flex-row mt-2 w-96 gap-3 text-lg">
                                            {studentProjects && studentProjects.length > 0 ? (
                                                <select
                                                    name="taskProject"
                                                    value={formData.taskProject}
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
                                        value={formData.taskTitle}
                                        onChange={handleInputData}
                                        type="text" name="taskTitle" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[35rem]"></input>
                                </div>

                                <div className="flex flex-col m-2 mt-5">
                                    <label className="font-semibold text-lg">Task Description</label>
                                    <ReactQuill
                                        value={formData.taskDescription}
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
                                            checked={formData.taskPriority === "Low"}

                                        />
                                        <label>
                                            Low
                                        </label>

                                        <input
                                            onChange={handleInputData}
                                            type="radio"
                                            name="taskPriority"
                                            value="Medium"
                                            checked={formData.taskPriority === "Medium"}

                                        />
                                        <label>Medium</label>

                                        <input
                                            onChange={handleInputData}
                                            type="radio"
                                            name="taskPriority"
                                            value="High"
                                            checked={formData.taskPriority === "High"}
                                        />
                                        <label>
                                            High
                                        </label>
                                    </div>
                                </div>

                                <div className="flex flex-col m-2">
                                    {formData && formData.taskMembers.map((member, index) => (
                                        <div key={index} className="flex flex-col m-2 ml-0 mt-5">
                                            <label className="font-semibold text-lg">Task Member {index + 1}</label>
                                            <input
                                                type="text"
                                                className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[20rem]"
                                                value={member.memberNam}
                                                onChange={(e) => handleMemberChange(index, e.target.value)}
                                                name="projectMembers"
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
                                            value={formData.startDate}
                                            onChange={handleInputData}
                                            type="date" name="startDate" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[15rem]"></input>
                                        <label className="font-semibold text-lg">End date </label>
                                        <input
                                            value={formData.endDate}
                                            onChange={handleInputData}
                                            type="date" name="endDate" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[15rem]"></input>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5 w-max">
                                    <div className="flex mt-16 justify-start items-start">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 hover:rounded-[3rem] text-white font-bold py-2 px-4 w-[12rem] rounded"
                                        >
                                            Update
                                        </button>
                                    </div>

                                    <div className="flex mt-16 justify-end items-end">
                                        <button
                                            type="button"
                                            onClick={handleDelete}
                                            className="bg-orange-700 hover:bg-orange-800 hover:rounded-[3rem] text-white font-bold py-2 px-4 w-[12rem] rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
