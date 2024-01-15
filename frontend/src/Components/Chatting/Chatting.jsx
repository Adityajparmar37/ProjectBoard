import { useEffect, useMemo, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { getAllProject } from "../../Services/projectServices";
import io from 'socket.io-client';
import config from "../../configSocket/configSocket";


export default function Chatting() {
    const socket = useMemo(() => {
        return io(config.serverUrl, {
            withCredentials: true,
        });
    }, [])

    const [Project, setProject] = useState([]);
    const [ProjectSelect, setProjectSelect] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState([]);

    console.log("==>", messageReceived)

    console.log("Project selected ==> ", ProjectSelect.projectTitle, " message ==>", newMessage);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected", socket.id);
        });

        socket.on("received-message", (data) => {
            setMessageReceived(prevMessages => [...prevMessages, data]);
            console.log("Data received ==> ", data);
        })
    }, [])

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


    const handleSend = () => {
        // console.log("Sending new message:", newMessage);
        socket.emit("newMessage", newMessage);
        setNewMessage("");
    }


    return (
        <div className="bg-gray-100 h-screen pt-20">
            <div className="flex justify-center items-center w-full h-full">
                <div className="bg-white h-[98%] w-[90%] rounded-2xl shadow-xl flex flex-row">
                    <div className="w-1/4 border-r border-gray-500">
                        <div className="bg-gray-700/95 border-b border-gray-500 h-16 flex flex-row items-center rounded-tl-2xl ">
                            <FaUserFriends className="ml-5 text-3xl text-gray-100" />
                            <h1 className="ml-3 font-light text-xl text-white">Your Friends</h1>
                        </div>
                        <div className="flex p-5">
                            <div className="w-full">
                                {Project && Project.length > 0 ? (
                                    <ul className="text-xl font-bold">
                                        {Project.map((project) => (
                                            <button className="border-b-2 mb-3 p-3 hover:shadow-inner hover:bg-gray-50 rounded-lg cursor-pointer w-full" key={project._id}
                                                onClick={() => setProjectSelect(project)}>
                                                {project.projectTitle}
                                            </button>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No friends available</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full relative">
                        <div className="bg-gray-700/95 border-b border-gray-500 h-16 flex flex-row items-center rounded-tr-2xl w-full">
                            <h1 className="ml-3 font-light text-xl text-white">Chat</h1>
                        </div>
                        <div className="w-full absolute bottom-0">
                            <h1 className="font-bold">{ProjectSelect.projectTitle}</h1>
                            {messageReceived.map((mss) => (
                                <>
                                    <h1 className="text-red">
                                        {mss}
                                    </h1>
                                </>
                            ))}
                            <input
                                onChange={(e) => setNewMessage(e.target.value)}
                                value={newMessage}
                                type="text"
                                name="message"
                                className="border-2 border-gray-200 focus:outline-none bg-gray-100 p-4 hover:shadow-inner focus:shadow-none w-11/12 font-semibold"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-blue-600 p-4 text-white text-lg font-semibold w-1/12 rounded-br-xl hover:bg-blue-900">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
