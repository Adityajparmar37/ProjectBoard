import { useEffect, useState } from "react";
import { useLoading } from "../../Hooks/useLoading";
import { fileUpload } from "../../Services/fileService";
import { getAllProject } from "../../Services/projectServices";

export default function UploadFile() {
    const { showLoading, hideLoading } = useLoading();
    const [project, setProject] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");
    const [files, setFiles] = useState([]);

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

    const handleFileChange = (e) => {
        // Use spread operator to create a new array with the selected files
        setFiles([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("projectName", selectedProject);
        for (const file of files) {
            formData.append("files", file);
        }

        try {
            const result = await fileUpload(formData);
            console.log("result-->", result);

            if (result.data.status === "ok") {
                alert("Uploaded Successfully!");
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="pt-20 bg-gray-100 h-screen">
            <div className="flex flex-col">
                <div className="bg-white w-full h-56 px-3 py-5 shadow-xl">
                    <div className="ml-16">
                        <h1 className="lg:text-3xl font-semibold">File Details:</h1>
                        <div className="bg-gray-300 w-[12rem] h-1 mt-2"></div>

                        <div className="flex flex-col mt-5">
                            <label className="font-bold text-lg text-gray-700 ml-1">Select Project</label>
                            <div className="flex flex-row mt-3 w-96 gap-3 text-lg">
                                {project && project.length > 0 ? (
                                    <select
                                        name="taskProject"
                                        onChange={(e) => setSelectedProject(e.target.value)}
                                        className="w-[95%] text-lg p-1 border-2 border-black focus:outline-none rounded-md bg-gray-100 mb-4 hover:shadow-inner shadow-xl"
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
                <div className="mt-20 bg-white h-[10rem]">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            multiple
                        />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
