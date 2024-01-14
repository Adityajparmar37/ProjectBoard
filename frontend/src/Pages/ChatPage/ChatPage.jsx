import MiniCard from "../../Components/MiniCard/MiniCard";
import { IoSearchOutline } from "react-icons/io5";
import { PiChatsCircleFill } from "react-icons/pi";


export default function ProjectPage() {
    return (
        <div className="bg-gray-100 h-screen">
            <div className="grid grid-cols-3 gap-5 pt-20">
                <MiniCard
                    to="/chat/find"
                    bgColor="bg-green-400"
                    icon={<IoSearchOutline className="text-[2.5rem] text-green-400" />}
                    title="Search Member"
                    content={["Search Member and add"]}
                />

                <MiniCard
                    to="/chat/chatting"
                    bgColor="bg-green-400"
                    icon={<PiChatsCircleFill className="text-[2.5rem] text-green-400" />}
                    title="Chat"
                    content={["Chat and discuss", "Group chat with member about project"]}
                />
            </div>
        </div>
    )
}
