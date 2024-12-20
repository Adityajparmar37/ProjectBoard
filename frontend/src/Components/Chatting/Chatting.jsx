import { useEffect, useMemo, useState, useCallback } from "react";
import { FaUserFriends } from "react-icons/fa";
import { getAllProject } from "../../Services/projectServices";
import io from "socket.io-client";
import config from "../../configSocket/configSocket";
import { useAuth } from "../../Hooks/useAuth";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import throttle from "../../utils/throttleFn";
import { useRef } from "react";

export default function Chatting() {
  const socket = useMemo(() => {
    return io(config.serverUrl, {
      withCredentials: true,
    });
  }, []);

  const { student } = useAuth();
  const [Project, setProject] = useState([]);
  const [openEmoji, setEmoji] = useState(false);
  const [ProjectSelect, setProjectSelect] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [room, setRoom] = useState();

  // console.log("==>", messageReceived);

  // console.log(
  //   "Project selected ==> ",
  //   ProjectSelect.projectTitle,
  //   " message ==>",
  //   newMessage
  // );

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
    socket.on("old-messages", (oldMessages) => {
      // console.log("----", oldMessages);
      setMessageReceived(
        oldMessages.map((oldmss) => ({
          content: oldmss.content,
          senderId: oldmss.senderId,
          senderName: oldmss.senderName,
        }))
      );
    });

    socket.on(
      "received-message",
      ({ decryptedMessage, senderId, senderName }) => {
        // console.log("****", decryptedMessage);
        setMessageReceived((prevMessages) => {
          if (Array.isArray(prevMessages)) {
            return [
              ...prevMessages,
              { content: decryptedMessage, senderId, senderName },
            ];
          } else {
            return [{ content: decryptedMessage, senderId, senderName }];
          }
        });
      }
    );

    socket.on("room-created", (data) => {
      console.log("user join in room ", data);
      if (data) {
        setRoom(data);
      }
    });

    return () => {
      // socket.off("connect");
      // socket.off("old-messages");
      // socket.off("received-message");
      // socket.off("room-created");
      // console.log("Disconnecting socket");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const allMyFriends = await getAllProject();
        setProject(allMyFriends);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const chatContainer = document.getElementById("chatContainer");
    if (chatContainer) {
      chatContainer.scrollTo({
        behavior: "smooth",
        top: chatContainer.scrollHeight,
      });
    }
  }, [messageReceived, ProjectSelect]);

  const handleProjectBtn = (project) => {
    setProjectSelect(project);
    setMessageReceived([]);
    socket.emit("CreateRoom", project);
  };

  // const handleSend = useCallback(() => {
  //   // console.log("Sending new message to room:", room);
  //   // console.log("This is new message", newMessage);
  //   throttledSendBtn.current(room, newMessage, student._id, student.name);

  //   // setMessageReceived(prevMessages => [
  //   //     ...prevMessages,
  //   //     { content: newMessage, senderId: student._id, senderName: student.name }
  //   // ]);

  //   // setNewMessage("");
  // }, [room, newMessage, student._id, student.name]);

  const throttledSendBtn = useRef(
    throttle((data) => {
      const [room, message, senderId, senderName] = data;
      socket.emit("newMessage", room, message, senderId, senderName);
      setNewMessage("");
    }, 10000)
  );

  // useEffect(() => {
  //   throttledSendBtn.current(room, newMessage, student._id, student.name);
  // }, [room, newMessage, student._id, student.name]);

  // const handleEnterKey = (e) => {
  //   if (e.key === "Enter") {
  //     throttledSendBtn.current();
  //   }
  // };

  const OpenEmoji = () => {
    setEmoji(!openEmoji);
  };

  return (
    <div className="bg-gray-100 h-screen pt-20">
      <div className="flex justify-center items-center w-full h-full">
        <div className="bg-white h-[98%] w-[90%] rounded-2xl shadow-xl flex flex-row">
          <div className="w-1/4 border-r border-gray-500">
            <div className="bg-gray-700/95 border-b border-gray-500 h-16 flex flex-row items-center rounded-tl-2xl ">
              <FaUserFriends className="ml-5 text-3xl text-gray-300" />
              <h1 className="ml-5 font-light text-xl text-white">
                {" "}
                Your Project Group
              </h1>
            </div>
            <div className="flex p-5">
              <div className="w-full">
                {Project && Project.length > 0 ? (
                  <ul className="text-xl font-bold">
                    {Project.map((project) => (
                      <button
                        className={`border-b-4 p-3 text-xl font-bold rounded-lg mb-2  w-full ${
                          project === ProjectSelect
                            ? " shadow-inner bg-gray-50 border-2 text-purple-700"
                            : "hover:shadow-inner hover:bg-gray-50 hover:border-2 hover:text-purple-600"
                        }`}
                        key={project._id}
                        onClick={() => handleProjectBtn(project)}>
                        {project.projectTitle}
                      </button>
                    ))}
                  </ul>
                ) : (
                  <p>No Project Group available</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full relative">
            <div className="bg-gray-700/95 border-b border-gray-500 h-16 flex flex-row items-center rounded-tr-2xl w-full">
              {ProjectSelect ? (
                <h1 className="ml-3 font-bold text-xl text-white">
                  🔸{ProjectSelect.projectTitle}
                </h1>
              ) : (
                <h1 className="ml-3 font-light text-xl text-white">Chat</h1>
              )}
            </div>
            <div className="absolute bottom-0 w-full flex flex-col">
              <div
                id="chatContainer"
                className="overflow-y-auto max-h-[80vh] pb-24">
                <div className="p-5 leading-8">
                  {messageReceived && messageReceived.length > 0 ? (
                    messageReceived.map((message, index) => (
                      <div
                        key={index}
                        ref={(m) =>
                          m &&
                          index === messageReceived.length - 1 &&
                          m.parentElement.scrollTo({
                            behavior: "smooth",
                            top: m.parentElement.scrollHeight,
                          })
                        }>
                        {/* {console.log("Message", message)}
                         */}
                        <div
                          className={
                            message.senderId === student._id
                              ? "flex justify-end"
                              : "flex justify-start"
                          }>
                          {message.senderId === student._id ? (
                            <>
                              <h1 className="text-right bg-blue-100 px-8 py-1 mb-3 leading-9 rounded-xl font-bold text-lg ">
                                {message.content}
                              </h1>
                              <span className="bg-gray-100 px-3 py-1 mb-3 leading-9 rounded-full font-bold text-md ml-2">
                                {message.senderName}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="bg-gray-100 px-3 py-1 mb-3 leading-9 rounded-full font-bold text-md mr-2">
                                {message.senderName}
                              </span>
                              <h1 className="text-left bg-purple-100 px-8 py-1 mb-3 leading-9 rounded-xl font-bold text-lg">
                                {message.content}
                              </h1>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex justify-center items-center">
                        <h1 className="bg-gray-200 shadow-inner rounded-lg p-2 font-bold">
                          Please Select Group or No chat
                        </h1>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full absolute bottom-0">
              <div className="w-full bg-gray-700/95 py-2 px-3 flex items-center">
                <button
                  onClick={OpenEmoji}
                  className="bg-blue-600 p-3 text-white text-[1.5rem] font-semibold w-auto mr-3 rounded-full hover:bg-blue-900 text-center">
                  🙂
                </button>

                <input
                  onChange={(e) => setNewMessage(e.target.value)}
                  // onKeyDown={() =>
                  //   throttledSendBtn.current(
                  //     room,
                  //     newMessage,
                  //     student._id,
                  //     student.name
                  //   )
                  // }
                  value={newMessage}
                  type="text"
                  name="message"
                  className="border-2 border-gray-200 focus:outline-none bg-gray-100 p-4 focus:shadow-inner w-full font-semibold rounded-xl"
                />

                <button
                  onClick={() =>
                    throttledSendBtn.current(
                      room,
                      newMessage,
                      student._id,
                      student.name
                    )
                  }
                  className="bg-blue-600 py-4 px-8 text-white text-[1.5rem] font-semibold w-auto ml-3 rounded-r-xl hover:bg-blue-900 text-center">
                  <IoSend />
                </button>
                {openEmoji && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "60px",
                      left: "10px",
                      zIndex: "1000",
                    }}>
                    <EmojiPicker
                      onEmojiClick={(emojiObject) =>
                        setNewMessage(
                          (prevMessage) => prevMessage + emojiObject.emoji
                        )
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
