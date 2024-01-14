import { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { getAllProject } from "../../Services/projectServices";

export default function Chatting() {
    const [Project, setProject] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            try {
                const allMyFriends = await getAllProject();
                setProject(allMyFriends);
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
    }, [])
    console.log(Project);
    return (
        <div className="bg-gray-100 h-screen pt-20">
            <div className="flex justify-center items-center w-full h-full">
                <div className="bg-white h-[98%] w-[90%] rounded-2xl shadow-xl flex flex-row">
                    <div className="w-1/3 border-r border-gray-500">
                        <div className="bg-gray-700/95 border-b border-gray-500 h-16 flex flex-row items-center rounded-tl-2xl ">
                            <FaUserFriends className="ml-5 text-3xl text-gray-100" />
                            <h1 className="ml-3 font-light text-xl text-white">Your Friends</h1>
                        </div>
                        <div className="flex p-5">
                            <div className="w-full">
                                {Project && Project.length > 0 ? (
                                    Project.map((Project) => (
                                        <ul key={Project._id} className="text-xl font-bold border-b-2 mb-3 p-3 hover:shadow-inner hover:bg-gray-50 rounded-lg cursor-pointer">
                                            <li className="flex justify-between items-center">
                                                {Project.projectTitle}
                                            </li>
                                        </ul>
                                    ))
                                ) : (
                                    <p>No friends available</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="bg-gray-700/95 border-b border-gray-500 h-16 flex flex-row items-center  rounded-tr-2xl">
                            <h1 className="ml-3 font-light text-xl text-white">Chat</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
