import { useEffect, useRef, useState } from "react";
import { useLoading } from "../../Hooks/useLoading";
import { fileUpload } from "../../Services/fileService";
import { getAllProject } from "../../Services/projectServices";
import { TiDropbox } from "react-icons/ti";
import toast from "react-hot-toast";

export default function UploadFile() {
    const { showLoading, hideLoading } = useLoading();
    const [project, setProject] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");
    const [files, setFiles] = useState([]);
    const inputRef = useRef(null)

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

    useEffect(() => {
        // Make sure inputRef is assigned before using it
        if (inputRef.current) {
            inputRef.current.addEventListener('change', handleFileChange);
        }
    }, [inputRef]);

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = e.dataTransfer.files;
        setFiles([...files, ...droppedFiles]);
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

            if (result.statusText === "OK") {
                toast.success("Uploaded Successfully!");
            }

            else if (result.success === false) {
                toast.error("Please try again to upload !");
            }
        } catch (error) {
            toast.error("Error uploading file");
            console.error('Error uploading file:', error);
        }
    };

    const containerClickHandler = () => {
        if (inputRef.current) {
            inputRef.current.click();
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
                            <div className="flex flex-row mt-3 w-80 gap-3 text-lg">
                                {project && project.length > 0 ? (
                                    <select
                                        name="taskProject"
                                        onChange={(e) => setSelectedProject(e.target.value)}
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
                <div
                    className="mt-14 bg-white h-[30rem] flex justify-center items-center shadow-xl"

                >
                    <div className="flex flex-col border-8 border-dotted w-[60%] h-[90%] justify-center items-center hover:cursor-pointer"

                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={containerClickHandler}>
                        <div className="mt-5 flex flex-col justify-center items-center">
                            <h1 className="text-slate-700 text-3xl">Drag & Drop or Click anywhere to upload</h1>

                            {files && files.length > 0 ? (
                                <div className="mt-10 font-bold text-gray-600 text-lg border-2 shadow-inner p-2 rounded-md bg-gray-100">
                                    <ul>
                                        {files.map((file, index) => (
                                            <li key={index}>📄 {file.name}</li>
                                        ))}
                                    </ul>
                                    <div className="flex justify-center items-center border-t-2 mt-2">
                                        <h1 className="font-extrabold">Total : {files.length}</h1>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <TiDropbox className="text-[8em] text-center mt-5" />
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        multiple
                                        ref={inputRef}
                                        style={{ display: 'none' }}
                                    />
                                </>
                            )}
                        </div>

                        {files && files.length > 0 ? (<>
                            <div className="w-[15%]">
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="bg-blue-500 text-white p-2 rounded-lg text-lg mt-10 w-full shadow-md hover:rounded-[2rem] hover:shadow-none"
                                >
                                    Upload
                                </button>
                            </div>
                        </>) : (<>
                            <div>
                                <h1 className="text-black font-semibold uppercase text-lg mt-5 border-b-2">Please select Project</h1>
                            </div>
                        </>)}

                    </div>
                </div>
            </div>
        </div>
    );
}