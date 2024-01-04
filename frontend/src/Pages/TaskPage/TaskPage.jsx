import MiniCard from "../../Components/MiniCard/MiniCard";
import { IoCreateSharp } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";

export default function TaskPage() {
    return (
        <div className="bg-gray-100 h-screen">
            <div className="grid grid-cols-3 gap-5 pt-20">
                <MiniCard
                    to="/createTask"
                    bgColor="bg-yellow-400"
                    icon={<IoCreateSharp className="text-[2.5rem] text-yellow-400" />}
                    title="Create Task"
                    content={["Create your Task List"]}
                />

                <MiniCard
                    to="/manageTask"
                    bgColor="bg-yellow-400"
                    icon={<CiViewList className="text-[2.5rem] text-yellow-400" />}
                    title="Project Dashboard"
                    content={["Manage your daily Task", "Lookover your assign task"]}
                />
            </div>
        </div>
    )
}
