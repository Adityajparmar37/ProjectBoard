import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ProjectCreate } from "../../Services/projectServices";


export default function CreateProject() {

    const navigate = useNavigate();

    //Handling all project detials
    const [formData, setFormData] = useState({
        projectTitle: '',
        projectObjectives: '',
        projectDescription: '',
        projectStatus: '',
        projectMembers: [''],
        projectCategory: '',
        projectPhases: [''],
        startDate: '',
        endDate: ''
    })

    const [projectPhases, setProjectPhases] = useState(['']);
    const [projectMember, setProjectMember] = useState(['']);

    const handleAddMore = () => {
        setProjectPhases([...projectPhases, '']); // Add a new empty string to the array
    };

    const handleAddMemebr = () => {
        setProjectMember([...projectMember, '']); // Add a new object with an empty memberRef
    };

    const handleMember = (index, value) => {
        const newMember = [...projectMember];
        newMember[index] = value;
        setProjectMember(newMember);

        // Update
        handleInputChange('projectMembers', index, value);
    };

    const handlePhase = (index, value) => {
        const newPhases = [...projectPhases];
        newPhases[index] = value;
        setProjectPhases(newPhases);

        // Update
        handleInputChange('projectPhases', index, value);
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
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Convert projectMembers to the expected format
        const formattedMembers = projectMember.map((member) => ({ memberNam:member }));

        // Convert projectPhases to the expected format
        const formattedPhases = projectPhases.map((phase, index) => ({
            phaseTitle: phase,
            phaseNum: (index + 1).toString(), // Assuming you want to assign a number to each phase
        }));

        // Update formData with formatted members and phases
        const updatedFormData = {
            ...formData,
            projectMembers: formattedMembers,
            projectPhases: formattedPhases,
        };

        // console.log(updatedFormData);

        try {
            const projectCreate = await ProjectCreate(updatedFormData);
            console.log("Project Created ==> ", projectCreate);
            if (projectCreate.message === "Project created successfully") {
                toast.success(projectCreate.message);
                navigate("/ManageProject")
            }
        } catch (error) {
            toast.error("Project Not Created, Please try again");
            console.log("Error While Creating Project ", error);
        }
    };
    return (
        <div className="pt-20 bg-gray-100 h-max overflow-x-hidden">
            <div className="flex justify-center items-center py-3 m-5">
                <div className="bg-white shadow-lg w-[70rem] h-auto grid grid-cols-3">
                    <div className="p-10">
                        <h1 className="font-semibold lg:text-3xl">Project Details</h1>
                        <h1 className="font-semibold text-gray-500 lg:text-xl ml-1 mt-4">Please fill all the detials</h1>
                    </div>

                    <div className="grid grid-cols-2 py-10">
                        <form onSubmit={handleFormSubmit}>
                            <div className="flex flex-col m-2">
                                <label className="font-semibold text-lg">Project Name </label>
                                <input
                                    required
                                    onChange={handleInputData}
                                    type="text" name="projectTitle" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[35rem]"></input>
                            </div>

                            <div className="flex flex-col m-2 mt-5">
                                <label className="font-semibold text-lg">Project Objective </label>
                                <input
                                    required
                                    onChange={handleInputData}
                                    type="text" name="projectObjectives" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[35rem]"></input>
                            </div>

                            <div className="flex flex-col m-2 mt-5">
                                <label className="font-semibold text-lg">Project Description </label>
                                <textarea
                                    required
                                    onChange={handleInputData}
                                    type="text" name="projectDescription" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-24 shadow-inner focus:shadow-none w-[35rem]"></textarea>
                            </div>

                            <div className="flex flex-col m-2 mt-5">
                                <label className="font-semibold text-lg">Project Status</label>
                                <div className="flex flex-row mt-2 w-96 gap-3 text-lg">
                                    <input
                                        onChange={handleInputData}
                                        type="radio"
                                        name="projectStatus"
                                        value="In Progress"

                                    />
                                    <label htmlFor="statusInProgress">
                                        In Progress
                                    </label>

                                    <input
                                        onChange={handleInputData}
                                        type="radio"
                                        name="projectStatus"
                                        value="On Hold"

                                    />
                                    <label htmlFor="statusOnHold">On Hold</label>

                                    <input
                                        onChange={handleInputData}
                                        type="radio"
                                        name="projectStatus"
                                        value="Completed"
                                    />
                                    <label htmlFor="statusCompleted" >
                                        Completed
                                    </label>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div>
                                    {projectMember.map((member, index) => (
                                        <div key={index} className="flex flex-col m-2 mt-5">
                                            <label className="font-semibold text-lg">Project Member {index + 1}</label>
                                            <input
                                                type="text"
                                                className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[20rem]"
                                                value={member}
                                                name="projectMembers"
                                                onChange={(e) => handleMember(index, e.target.value)}
                                            />
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={handleAddMemebr}
                                        className="bg-blue-400 ml-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-3 text-sm"
                                    >
                                        Add Member
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col m-2 mt-5">
                                <label className="font-semibold text-lg">Project Category </label>
                                <input
                                    required
                                    onChange={handleInputData}
                                    type="text" name="projectCategory" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[20rem]"></input>
                            </div>

                            <div className="flex flex-col">
                                <div>
                                    {projectPhases.map((phase, index) => (
                                        <div key={index} className="flex flex-col m-2 mt-5">
                                            <label className="font-semibold text-lg">Project Phase {index + 1}</label>
                                            <input
                                                required
                                                type="text"
                                                className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[20rem]"
                                                value={phase}
                                                name="projectPhases"
                                                onChange={(e) => handlePhase(index, e.target.value)}
                                            />
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={handleAddMore}
                                        className="bg-blue-400 ml-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-3 text-sm"
                                    >
                                        Add More
                                    </button>
                                </div>
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
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
