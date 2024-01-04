/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLoading } from '../../Hooks/useLoading';
import { getAllProject } from '../../Services/projectServices';

export default function CreateTask() {
    const [studentProjects, setStudentProjects] = useState();
    const { showLoading, hideLoading } = useLoading();

    useEffect(() => {
        const fetchData = async () => {
            try {
                showLoading();
                const allProject = await getAllProject();
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
                            <form>
                                <div className="flex flex-col m-2 mt-5">
                                    <label className="font-semibold text-lg">Select Project</label>
                                    <div className="flex flex-row mt-2 w-96 gap-3 text-lg">
                                        {studentProjects && studentProjects.length > 0 ? (
                                            <select className="w-[95%] text-lg p-1 border-2 border-black focus:outline-none rounded-sm bg-gray-100 mb-4">
                                                <option> -- Choose Project --</option>
                                                {studentProjects.map((project) => (
                                                    <option value={project.projectTitle} key={project._id} className="font-semibold bg-gray-100 border-none focus:border-none outline-none">
                                                        {project.projectTitle}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <h1 className='lg:text-xl text-gray-500'>Sorry, No Project</h1>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col m-2">
                                    <label className="font-semibold text-lg">Task title </label>
                                    <input
                                        required
                                        // onChange={handleInputData}
                                        type="text" name="projectTitle" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[35rem]"></input>
                                </div>

                                <div className="flex flex-col m-2 mt-5">
                                    <label className="font-semibold text-lg">Task Description</label>
                                    <ReactQuill
                                        required
                                        theme="snow"
                                        // onChange={handleInputData}
                                        name="projectDescription"
                                        className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 shadow-inner focus:shadow-none w-[35rem]"
                                    ></ReactQuill>
                                </div>


                                <div className="flex flex-col m-2 mt-5">
                                    <label className="font-semibold text-lg">Task Priority</label>
                                    <div className="flex flex-row mt-2 w-96 gap-3 text-lg">
                                        <input
                                            // onChange={handleInputData}
                                            type="radio"
                                            name="projectStatus"
                                            value="Low"

                                        />
                                        <label htmlFor="statusInProgress">
                                            Low
                                        </label>

                                        <input
                                            // onChange={handleInputData}
                                            type="radio"
                                            name="projectStatus"
                                            value="Medium"

                                        />
                                        <label htmlFor="statusOnHold">Medium</label>

                                        <input
                                            // onChange={handleInputData}
                                            type="radio"
                                            name="projectStatus"
                                            value="High"
                                        />
                                        <label htmlFor="statusCompleted" >
                                            High
                                        </label>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                <div>
                                {/* {console.log(studentProjects)} */}
                                    {/* {studentProjects.projectMembers && studentProjects.projectMembers.map((member, index) => (
                                        <div key={index} className="flex flex-col m-2 mt-5">
                                            <label className="font-semibold text-lg">Project Member {index + 1}</label>
                                            <input
                                                type="text"
                                                className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[20rem]"
                                                value={member.memberNam}
                                                // onChange={(e) => handleMemberChange(index, e.target.value)}
                                                name="projectMembers"
                                            />
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        // onClick={handleAddMember}
                                        className="bg-blue-400 ml-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-3 text-sm"
                                    >
                                        Add Member
                                    </button> */}
                                </div>
                                </div>



                                {/* <div className="flex flex-col">
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
                                                // onChange={(e) => handlePhase(index, e.target.value)}
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
                                </div> */}

                                <div className="flex flex-col m-2 mt-8">
                                    <div className="flex flex-row gap-5 w-[72rem] items-center">
                                        <label className="font-semibold text-lg">Start date </label>
                                        <input
                                            // onChange={handleInputData}
                                            type="date" name="startDate" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[15rem]"></input>
                                        <label className="font-semibold text-lg">End date </label>
                                        <input
                                            // onChange={handleInputData}
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
