import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProject, getbyId, updateProject } from "../../Services/projectServices";

export default function ProjectView() {

    // eslint-disable-next-line no-unused-vars
    const [project, setProject] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const projectData = await getbyId(id);
                setProject(projectData);
                console.log(projectData);
                setFormData({
                    projectTitle: projectData.projectTitle || "",
                    projectObjectives: projectData.projectObjectives || "",
                    projectDescription: projectData.projectDescription || "",
                    projectStatus: projectData.projectStatus || "",
                    projectMembers: projectData.projectMembers || [],
                    projectCategory: projectData.projectCategory || "",
                    projectPhases: projectData.projectPhases || [],
                    projectStartDate: projectData.projectStartDate ? projectData.projectStartDate.slice(0, 10) : "",
                    projectEndDate: projectData.projectEndDate ? projectData.projectEndDate.slice(0, 10) : "",
                });
            } catch (error) {
                console.error("ERROR fetching the project through id ", error);
            }
        }

        fetch();
    }, [id])




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
    // console.log("Formdata ==> ", formData)

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            // console.log("Form Data Submitted:", formData);
            const updatedProject = await updateProject(id, formData)
            console.log("New updated project", updatedProject);
            toast.success("Update successful");
        } catch (error) {
            console.error("Error updating project:", error);
            toast.error("Error updating project");
        }
    };
    const handleDelete = async () => {
        try {
            // console.log("Before delete operation");
            await deleteProject(id);
            // console.log("After delete operation");
            toast.success("Delete successfully");
            navigate("/manageProject");
        } catch (error) {
            console.log("Error in deleting ", error);
        }
    }

    const handleAddMember = () => {
        setFormData({
            ...formData,
            projectMembers: [...formData.projectMembers, { memberName: "" }],
        });
    };

    const handleMemberChange = (index, value) => {
        const updatedMembers = [...formData.projectMembers];
        updatedMembers[index].memberNam = value;

        setFormData({
            ...formData,
            projectMembers: updatedMembers,
        });
    };

    const handlePhaseChange = (index, value) => {
        const updatedPhases = [...formData.projectPhases];
        updatedPhases[index].phaseTitle = value;

        setFormData({
            ...formData,
            projectPhases: updatedPhases,
        });
    };

    const handleAddMore = () => {
        setFormData({
            ...formData,
            projectPhases: [...formData.projectPhases, { phaseTitle: "" }],
        });
    };
    return (
        <div className="pt-20 bg-gray-100 h-max overflow-x-hidden">
            <div className="flex justify-center items-center py-3 m-5">
                <div className="bg-white shadow-lg w-[70rem] h-auto grid grid-cols-3 border-b-4 border-r-4 border-gray-500">
                    <div className="p-10">
                        <h1 className="font-semibold lg:text-3xl">Project Details</h1>
                        <h1 className="font-semibold text-gray-500 lg:text-xl ml-1 mt-4">Can update project detials or can delete project</h1>
                    </div>

                    <div className="grid grid-cols-2 py-10">
                        <form onSubmit={handleFormSubmit}>
                            <div className="flex flex-col m-2">
                                <label className="font-semibold text-lg">Project Name </label>
                                <input
                                    value={formData.projectTitle}
                                    onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                                    type="text"
                                    name="projectTitle"
                                    className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[35rem]"
                                />
                            </div>

                            <div className="flex flex-col m-2 mt-5">
                                <label className="font-semibold text-lg">Project Objective </label>
                                <input
                                    value={formData.projectObjectives}
                                    onChange={(e) => setFormData({ ...formData, projectObjectives: e.target.value })}
                                    type="text" name="projectObjectives" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[35rem]"></input>
                            </div>

                            <div className="flex flex-col m-2 mt-5">
                                <label className="font-semibold text-lg">Project Description </label>
                                <textarea
                                    value={formData.projectDescription}
                                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                                    type="text" name="projectDescription" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-24 shadow-inner focus:shadow-none w-[35rem]"></textarea>
                            </div>

                            <div className="flex flex-col m-2 mt-5">
                                <label className="font-semibold text-lg">Project Status</label>
                                <div className="flex flex-row mt-2 w-96 gap-3 text-lg">
                                    <input
                                        onChange={(e) => setFormData({ ...formData, projectStatus: e.target.value })}
                                        type="radio"
                                        name="projectStatus"
                                        value="In Progress"
                                        checked={formData.projectStatus === "In Progress"}

                                    />
                                    <label htmlFor="statusInProgress">
                                        In Progress
                                    </label>

                                    <input
                                        onChange={(e) => setFormData({ ...formData, projectStatus: e.target.value })}
                                        type="radio"
                                        name="projectStatus"
                                        value="On Hold"
                                        checked={formData.projectStatus === "On Hold"}

                                    />
                                    <label htmlFor="statusOnHold">On Hold</label>

                                    <input
                                        onChange={(e) => setFormData({ ...formData, projectStatus: e.target.value })}
                                        type="radio"
                                        name="projectStatus"
                                        value="Completed"
                                        checked={formData.projectStatus === "Completed"}
                                    />
                                    <label htmlFor="statusCompleted" >
                                        Completed
                                    </label>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div>
                                    {formData.projectMembers && formData.projectMembers.map((member, index) => (
                                        <div key={index} className="flex flex-col m-2 mt-5">
                                            <label className="font-semibold text-lg">Project Member {index + 1}</label>
                                            <input
                                                type="text"
                                                className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[20rem]"
                                                value={member.memberName}
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
                            </div>

                            <div className="flex flex-col m-2 mt-5">
                                <label className="font-semibold text-lg">Project Category </label>
                                <input
                                    onChange={(e) => setFormData({ ...formData, projectCategory: e.target.value })}
                                    value={formData.projectCategory}
                                    type="text" name="projectCategory" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[20rem]">
                                </input>
                            </div>

                            <div className="flex flex-col">
                                <div>
                                    {formData.projectPhases && formData.projectPhases.map((phase, index) => (
                                        <div key={index} className="flex flex-col m-2 mt-5">
                                            <label className="font-semibold text-lg">Project Phase {index + 1}</label>
                                            <input
                                                required
                                                type="text"
                                                className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[20rem]"
                                                value={phase.phaseTitle}
                                                onChange={(e) => handlePhaseChange(index, e.target.value)}
                                                name="projectPhases"
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
                                        onChange={(e) => setFormData({ ...formData, projectStartDate: e.target.value })}
                                        value={formData.projectStartDate ? formData.projectStartDate.slice(0, 10) : ""}
                                        type="date"
                                        name="startDate"
                                        className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[15rem]"
                                    />
                                    <label className="font-semibold text-lg">End date </label>
                                    <input
                                        onChange={(e) => setFormData({ ...formData, projectEndDate: e.target.value })}
                                        value={formData.projectEndDate ? formData.projectEndDate.slice(0, 10) : ""}
                                        type="date"
                                        name="endDate"
                                        className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[15rem]"
                                    />
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

    );
}
