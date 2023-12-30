import { HiFolder } from "react-icons/hi2";
import { FaTasks } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { ImFolderUpload } from "react-icons/im";
import Card from "../../Components/Card/Card";


export default function HomePage() {
    return (
        <>
            <div className="bg-gray-100 h-screen">
                <div className="grid grid-cols-3 gap-5 pt-20">
                    <Card
                        to="/project"
                        bgColor="bg-orange-600"
                        icon={<HiFolder className="text-[2.5rem] text-orange-600" />}
                        title="Project Management"
                        content={[
                            "Create new Project",
                            "Overview of Project",
                            "Manage Ongoing Project"
                        ]}
                    />

                    <Card
                        to="/task"
                        bgColor="bg-yellow-400"
                        icon={<FaTasks className="text-[2.5rem] text-yellow-400" />}
                        title="Task Management"
                        content={[
                            "Task for Project",
                            "Task Status",
                            "Task Priority"
                        ]}
                    />

                    <Card
                        to="/Chat"
                        bgColor="bg-green-400"
                        icon={<IoMdChatbubbles className="text-[2.5rem] text-green-400" />}
                        title="Chat"
                        content={[
                            "Chat with Member",
                            "Discuss about Project",
                            "Group or Individual Chat"
                        ]}
                    />

                    <Card
                        to="/file"
                        bgColor="bg-purple-400"
                        icon={<ImFolderUpload className="text-[2.5rem] text-purple-400" />}
                        title="File Upload"
                        content={[
                            "Upload Project Files",
                            "Manage Project Files",
                            "Share Project Files"
                        ]}
                    />
                </div>
            </div>
        </>
    );
}
