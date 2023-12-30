import { useState } from "react";


export default function CreateProject() {

    const [projectPhases, setProjectPhases] = useState(['']);
    const [projectMember, setProjectMember] = useState(['']);

    const handleAddMore = () => {
        setProjectPhases([...projectPhases, '']); // Add a new empty string to the array
    };

    const handleAddMemebr = () => {
        setProjectMember([...projectMember, '']); // Add a new empty string to the array
    };

    const handleMember = (index, value) => {
        const newMember = [...projectMember];
        newMember[index] = value;
        setProjectMember(newMember);
    };

    const handleChange = (index, value) => {
        const newPhases = [...projectPhases];
        newPhases[index] = value;
        setProjectPhases(newPhases);
    };
    return (
        <div className="pt-20 bg-gray-100 h-max overflow-x-hidden">
            <div className="flex justify-center items-center py-1">
                <div className="bg-white shadow-lg w-[80rem] h-auto grid grid-cols-3">
                    <div className="p-10">
                        <h1 className="font-semibold lg:text-3xl">Project Details</h1>
                        <h1 className="font-semibold text-gray-500 lg:text-xl ml-1">Please fill all the detials</h1>
                    </div>

                    <div className="grid grid-cols-2 py-10">
                        <form>
                            <div className="flex flex-col m-2">
                                <label className="font-semibold text-lg">Project Name </label>
                                <input type="text" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[35rem]"></input>
                            </div>

                            <div className="flex flex-col m-2 mt-5">
                                <label className="font-semibold text-lg">Project Objective </label>
                                <input type="text" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[35rem]"></input>
                            </div>

                            <div className="flex flex-col m-2 mt-5">
                                <label className="font-semibold text-lg">Project Description </label>
                                <textarea type="text" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-24 shadow-inner focus:shadow-none w-[35rem]"></textarea>
                            </div>

                            <div className="flex flex-col m-2 mt-5">
                                <label className="font-semibold text-lg">Project Status</label>
                                <div className="flex flex-row mt-2 w-96 gap-3 text-lg">
                                    <input
                                        type="radio"
                                        name="projectStatus"
                                        value="inProgress"

                                    />
                                    <label htmlFor="statusInProgress">
                                        In Progress
                                    </label>

                                    <input
                                        type="radio"
                                        name="projectStatus"
                                        value="onHold"

                                    />
                                    <label htmlFor="statusOnHold">On Hold</label>

                                    <input
                                        type="radio"
                                        name="projectStatus"
                                        value="completed"
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
                                <input type="text" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[20rem]"></input>
                            </div>

                            <div className="flex flex-col">
                                <div>
                                    {projectPhases.map((phase, index) => (
                                        <div key={index} className="flex flex-col m-2 mt-5">
                                            <label className="font-semibold text-lg">Project Phase {index + 1}</label>
                                            <input
                                                type="text"
                                                className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[20rem]"
                                                value={phase}
                                                onChange={(e) => handleChange(index, e.target.value)}
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
                                    <input type="date" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[15rem]"></input>
                                    <label className="font-semibold text-lg">End date </label>
                                    <input type="date" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[15rem]"></input>
                                </div>
                            </div>

                            <div className="flex flex-col mt-16">
                                <button className="bg-blue-500 hover:bg-blue-700 hover:rounded-[3rem] text-white font-bold py-2 px-4 w-[12rem] rounded">
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
