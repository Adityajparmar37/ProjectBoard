import MiniCard from "../../Components/MiniCard/MiniCard";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";

export default function ProjectPage() {


  // //testing error boundary
  // if (1) {
  //   throw new Error("Testing ErrorBoundary");
  // }
  return (
    <div className="bg-gray-100 h-screen">
      <div className="grid grid-cols-3 gap-5 pt-20">
        <MiniCard
          to="/createProject"
          bgColor="bg-orange-600"
          icon={
            <MdOutlineCreateNewFolder className="text-[2.5rem] text-orange-600" />
          }
          title="Create Project"
          content={["Create a fresh new Project"]}
        />

        <MiniCard
          to="/manageProject"
          bgColor="bg-orange-600"
          icon={
            <GrDocumentUpdate className="text-[2.5rem] text-orange-600" />
          }
          title="Project Dashboard"
          content={[
            "Manage Ongoing Project",
            "Update existing Project",
          ]}
        />
      </div>
    </div>
  );
}
