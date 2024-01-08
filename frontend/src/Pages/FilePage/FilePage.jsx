import MiniCard from "../../Components/MiniCard/MiniCard";
import { LiaFileUploadSolid } from "react-icons/lia"
import { PiFilesFill } from "react-icons/pi";

export default function FilePage() {
    return (
        <div className="bg-gray-100 h-screen">
            <div className="grid grid-cols-3 gap-5 pt-20">
                <MiniCard
                    to="/uploadFile"
                    bgColor="bg-purple-400"
                    icon={<LiaFileUploadSolid className="text-[2.5rem] text-purple-400" />}
                    title="Upload File"
                    content={["Drag or upload the files", "Every Project files"]}
                />

                <MiniCard
                    to="/viewFile"
                    bgColor="bg-purple-400"
                    icon={<PiFilesFill className="text-[2.5rem] text-purple-400" />}
                    title="View Files"
                    content={["Manage your Files", "Delete or update project files"]}
                />
            </div>
        </div>
    )
}
