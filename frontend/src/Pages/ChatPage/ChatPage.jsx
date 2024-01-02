import MiniCard from "../../Components/MiniCard/MiniCard";
import { FaSearch } from "react-icons/fa";


export default function ProjectPage() {
    return (
        <div className="bg-gray-100 h-screen">
            <div className="grid grid-cols-3 gap-5 pt-20">
                <MiniCard
                    to="/chat/find"
                    bgColor="bg-green-400"
                    icon={<FaSearch className="text-[2.5rem] text-green-400" />}
                    title="Search Member"
                    content={["Search Member and add"]}
                />

                {/* <MiniCard
                    to="/manageProject"
                    bgColor="bg-orange-600"
                    icon={<GrDocumentUpdate className="text-[2.5rem] text-orange-600" />}
                    title="Project Dashboard"
                    content={["Manage Ongoing Project", "Update existing Project"]}
                /> */}
            </div>
        </div>
    )
}
