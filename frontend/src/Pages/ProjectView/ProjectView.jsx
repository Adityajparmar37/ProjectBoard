import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProject, getbyId } from "../../Services/projectServices";

export default function ProjectView() {

    const [project, setProject] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const projectData = await getbyId(id);
                setProject(projectData);
            } catch (error) {
                console.error("ERROR fetching the project through id ", error);
            }
        }

        fetch();
    }, [id])


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
    return (
        <div className="pt-20 bg-gray-100 h-max overflow-x-hidden">
            <div className="flex justify-center items-center py-3 m-5">
                <div className="bg-white shadow-lg w-[70rem] h-auto grid grid-cols-3">
                    <div className="p-10">
                        <h1 className="font-semibold lg:text-3xl">Project Details</h1>
                        <h1 className="font-semibold text-gray-500 lg:text-xl ml-1 mt-4">Can update project detials or can delete project</h1>
                    </div>

                    <div className="grid grid-cols-2 py-10">
                        <form>
                            <div className="flex flex-col m-2">
                                <label className="font-semibold text-lg">Project Name </label>
                                <input
                                    // onChange={handleInputData}
                                    value={project.projectTitle}
                                    type="text" name="projectTitle" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[35rem]"></input>
                            </div>

                            <div className="flex flex-col m-2 mt-5">
                                <label className="font-semibold text-lg">Project Objective </label>
                                <input
                                    value={project.projectObjectives}
                                    // onChange={handleInputData}
                                    type="text" name="projectObjectives" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[35rem]"></input>
                            </div>

                            <div className="flex flex-col m-2 mt-5">
                                <label className="font-semibold text-lg">Project Description </label>
                                <textarea
                                    value={project.projectDescription}
                                    // onChange={handleInputData}
                                    type="text" name="projectDescription" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-24 shadow-inner focus:shadow-none w-[35rem]"></textarea>
                            </div>

                            <div className="flex flex-col m-2 mt-5">
                                <label className="font-semibold text-lg">Project Status</label>
                                <div className="flex flex-row mt-2 w-96 gap-3 text-lg">
                                    <input
                                        // onChange={handleInputData}
                                        type="radio"
                                        name="projectStatus"
                                        value="In Progress"
                                        checked={project.projectStatus === "In Progress"}

                                    />
                                    <label htmlFor="statusInProgress">
                                        In Progress
                                    </label>

                                    <input
                                        // onChange={handleInputData}
                                        type="radio"
                                        name="projectStatus"
                                        value="On Hold"
                                        checked={project.projectStatus === "On Hold"}

                                    />
                                    <label htmlFor="statusOnHold">On Hold</label>

                                    <input
                                        // onChange={handleInputData}
                                        type="radio"
                                        name="projectStatus"
                                        value="Completed"
                                        checked={project.projectStatus === "Completed"}
                                    />
                                    <label htmlFor="statusCompleted" >
                                        Completed
                                    </label>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div>
                                    {project.projectMembers && project.projectMembers.map((member, index) => (
                                        <div key={index} className="flex flex-col m-2 mt-5">
                                            <label className="font-semibold text-lg">Project Member {index + 1}</label>
                                            <input
                                                type="text"
                                                className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[20rem]"
                                                value={member.memberNam}
                                                name="projectMembers"
                                            />
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        // onClick={handleAddMemebr}
                                        className="bg-blue-400 ml-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-3 text-sm"
                                    >
                                        Add Member
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col m-2 mt-5">
                                <label className="font-semibold text-lg">Project Category </label>
                                <input
                                    value={project.projectCategory}
                                    type="text" name="projectCategory" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[20rem]">
                                </input>
                            </div>

                            <div className="flex flex-col">
                                <div>
                                    {project.projectPhases && project.projectPhases.map((phase, index) => (
                                        <div key={index} className="flex flex-col m-2 mt-5">
                                            <label className="font-semibold text-lg">Project Phase {index + 1}</label>
                                            <input
                                                required
                                                type="text"
                                                className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[20rem]"
                                                value={phase.phaseTitle}
                                                name="projectPhases"
                                            />
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        // onClick={handleAddMore}
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
                                        value={project.projectStartDate ? project.projectStartDate.slice(0, 10) : ""}
                                        type="date"
                                        name="startDate"
                                        className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[15rem]"
                                    />
                                    <label className="font-semibold text-lg">End date </label>
                                    <input
                                        value={project.projectEndDate ? project.projectEndDate.slice(0, 10) : ""}
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
