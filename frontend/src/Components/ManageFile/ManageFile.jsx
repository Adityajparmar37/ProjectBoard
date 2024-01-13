import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "../../Hooks/useLoading";
import { fileDelete, fileList } from "../../Services/fileService";
import { getAllProject } from "../../Services/projectServices";

export default function ManageFile() {
    const [project, setProject] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");
    const [listFiles, setListFiles] = useState([]);
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    useEffect(() => {
        const fetchData = async () => {
            try {
                showLoading();
                const allProject = await getAllProject();
                setProject(allProject);
                hideLoading();
            } catch (error) {
                hideLoading();
                console.error('Error fetching projects:', error);
            }
        };

        fetchData();
    }, []);


    const listAllFiles = async (selectedProject) => {

        setListFiles(null);
        setSelectedProject(selectedProject);
        try {
            const responseData = await fileList(selectedProject);
            console.log(responseData.data.filedata.projectInfo.files);
            setListFiles(responseData.data.filedata.projectInfo.files);
        } catch (error) {
            console.log("Project file listing error ! ", error);
        }

    }

    const handleDelete = async (fileName) => {
        try {
            const fileToDelete = await fileDelete(selectedProject, fileName);
            console.log(fileToDelete.data);
            // setListFiles(fileToDelete.data.filedata.projectInfo.files);

            if (fileToDelete.data.success === true) {
                toast.success("File Deleted successfully !");
                navigate("/file")
            } else {
                toast.error("Some error occured , Please try again !");
            }
        } catch (error) {
            toast.error("Some error occured please try agian !");
            console.log("File deleteing error");
        }
    }

    // console.log(selectedProject);
    return (
        <div className="pt-20 bg-gray-100 h-screen">
            <div className="flex flex-col">
                <div className="bg-white w-full h-56 px-3 py-5 shadow-xl">
                    <div className="ml-16">
                        <h1 className="lg:text-3xl font-semibold">File Details:</h1>
                        <div className="bg-gray-300 w-[12rem] h-1 mt-2"></div>

                        <div className="flex flex-col mt-5">
                            <label className="font-bold text-lg text-gray-700 ml-1">Select Project</label>
                            <div className="flex flex-row mt-3 w-80 gap-3 text-lg">
                                {project && project.length > 0 ? (
                                    <select
                                        name="taskProject"
                                        onChange={(e) => listAllFiles(e.target.value)}
                                        className="w-[95%] text-lg p-1 border-2 border-black focus:outline-none rounded-md bg-gray-100 mb-4 hover:shadow-inner shadow-md"
                                    >
                                        <option> -- Choose Project --</option>
                                        {project.map((project) => (
                                            <option
                                                value={project._id}
                                                key={project._id}
                                                className="font-semibold bg-gray-100 border-none focus:border-none outline-none"
                                            >
                                                {project.projectTitle}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <h1 className="lg:text-xl text-gray-500">Sorry, No Project</h1>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {listFiles && listFiles.length > 0 ? (
                <>
                    <div className="mt-14 bg-white h-auto flex px-8 py-1 shadow-xl w-full">
                        <div className="flex flex-col justify-between w-full py-5">
                            {listFiles.map((file) => (
                                <>

                                    <ul className=" border-b-4 p-3 text-xl font-bold rounded-lg hover:shadow-inner hover:border-2" key={file._id}>
                                        <li className="flex justify-between items-center    ">
                                            {file.fileName}
                                            <div className="flex flex-row">
                                                <Link to={file.fileUrl}>
                                                    <button className="mr-5 text-white bg-blue-700 hover:bg-blue-800 hover:rounded-xl  focus:outline-none font-medium rounded-lg text-lg text-center p-2 shadow-md">Download</button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(file.fileName)}
                                                    className="mr-5 text-white bg-orange-600 hover:bg-orange-800 hover:rounded-xl  focus:outline-none font-medium rounded-lg text-lg text-center p-2 shadow-md">Delete</button>
                                            </div>
                                        </li>
                                    </ul>

                                </>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="w-full flex justify-center items-center">
                        <h1 className="text-black font-semibold uppercase text-lg p-2 rounded-lg shadow-inner h-10 border-b-4 border-zinc-500 mt-10">No File Found or Please Select Project !</h1>
                    </div>
                </>
            )}

        </div>
    )
}
