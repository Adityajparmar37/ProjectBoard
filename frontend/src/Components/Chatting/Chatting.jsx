import { useEffect, useMemo, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { getAllProject } from "../../Services/projectServices";
import io from 'socket.io-client';
import config from "../../configSocket/configSocket";
import { useAuth } from "../../Hooks/useAuth";
import { IoSend } from "react-icons/io5";

export default function Chatting() {
    const socket = useMemo(() => {
        return io(config.serverUrl, {
            withCredentials: true,
        });
    }, [])

    const { student } = useAuth();
    const [Project, setProject] = useState([]);
    const [ProjectSelect, setProjectSelect] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState([]);
    const [room, setRoom] = useState();

    console.log("==>", messageReceived)

    console.log("Project selected ==> ", ProjectSelect.projectTitle, " message ==>", newMessage);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected", socket.id);
        });

        socket.on("old-messages", (oldMessages) => {
            console.log(oldMessages);
            setMessageReceived(oldMessages.map(oldmss => oldmss.content));
        });

        socket.on("received-message", (data) => {
            setMessageReceived(prevMessages => {
                if (Array.isArray(prevMessages)) {
                    return [...prevMessages, data];
                } else {
                    return [data];
                }
            });
            console.log("Data received ==> ", data);
        })

        socket.on("room-created", (data) => {
            console.log("user join in room ", data);
            if (data) {
                setRoom(data);
            }
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

    const handleProjectBtn = (project) => {
        setProjectSelect(project);
        setMessageReceived([]);
        socket.emit("CreateRoom", project);
    };

    const handleSend = () => {
        console.log("Sending new message to room:", room);
        socket.emit("newMessage", room, newMessage, student._id);
        setNewMessage("");
    }

    return (
        <div className="bg-gray-100 h-screen pt-20">
            <div className="flex justify-center items-center w-full h-full">
                <div className="bg-white h-[98%] w-[90%] rounded-2xl shadow-xl flex flex-row">
                    <div className="w-1/4 border-r border-gray-500">
                        <div className="bg-gray-700/95 border-b border-gray-500 h-16 flex flex-row items-center rounded-tl-2xl ">
                            <FaUserFriends className="ml-5 text-3xl text-gray-300" />
                            <h1 className="ml-5 font-light text-xl text-white"> Your Project Group</h1>
                        </div>
                        <div className="flex p-5">
                            <div className="w-full">
                                {Project && Project.length > 0 ? (
                                    <ul className="text-xl font-bold">
                                        {Project.map((project) => (
                                            <button className="border-b-4 p-3 text-xl font-bold rounded-lg hover:shadow-inner hover:bg-gray-50 hover:border-2 mb-2 hover:text-purple-600 w-full" key={project._id}
                                                onClick={() => handleProjectBtn(project)}>
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
                            {ProjectSelect ?
                                (<h1 className="ml-3 font-bold text-xl text-white">{ProjectSelect.projectTitle}</h1>)
                                : (<h1 className="ml-3 font-light text-xl text-white">Chat</h1>)}
                        </div>
                        <div className="w-full absolute bottom-0">
                            <div className="messages-container">
                                {messageReceived?.map((mss, index) => (
                                    <div key={index} className="message received">
                                        <p className="message-content">{mss}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full bg-gray-700/95 py-2 px-3 flex items-center">
                                <input
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    value={newMessage}
                                    type="text"
                                    name="message"
                                    className="border-2 border-gray-200 focus:outline-none bg-gray-100 p-4 focus:shadow-inner w-full font-semibold rounded-l-xl" />
                                <button
                                    onClick={handleSend}
                                    className="bg-blue-600 p-4 text-white text-[1.5rem] font-semibold w-auto ml-3 rounded-r-xl hover:bg-blue-900 text-center"><IoSend/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
