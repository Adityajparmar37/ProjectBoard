import { useEffect, useState } from "react"
import { useLoading } from "../../Hooks/useLoading";
import { getAllProject } from "../../Services/projectServices";

// eslint-disable-next-line react/prop-types
export default function Filters({ setStudentProjects }) {
    const { showLoading, hideLoading } = useLoading();
    const [filters, setFilters] = useState({
        keywordSearch: "",
        title: "",
        category: "",
        status: "",
        sort: ""
    });

    const HandleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                showLoading();
                const allProject = await getAllProject();
                console.log("ALL PROJECT ==> ", allProject);
                setStudentProjects(allProject);
                hideLoading();
            } catch (error) {
                hideLoading();
                console.error('Error fetching projects:', error);
            }
        };

        fetchData();
    }, []); // Remove the dependency array to fetch data only on initial mount

    // Add another useEffect to fetch data when filters change
    useEffect(() => {
        const fetchFilteredData = async () => {
            try {
                showLoading();
                const filteredProject = await getAllProject(filters);
                console.log("FILTERED PROJECT ==> ", filteredProject);
                setStudentProjects(filteredProject);
                hideLoading();
            } catch (error) {
                hideLoading();
                console.error('Error fetching filtered projects:', error);
            }
        };

        if (filters) {
            fetchFilteredData();
        }
    }, [filters]);


    console.log("Filters ==> ", filters)
    return (
        <div className="pt-20">
            <div className="flex flex-col mt-8">
                <h1 className="flex justify-center items-center font-bold lg:text-xl">Find Your Project</h1>
                <div className="w-[100%] bg-gray-600 h-0.5 mt-2"></div>
                <div className="flex flex-col p-5">
                    <label className="font-semibold text-md">Search</label>
                    <input
                        onChange={HandleChange}
                        type="text" name="keywordSearch" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[90%]" placeholder="Enter word"></input>
                </div>

                <div className="flex flex-col p-5">
                    <label className="font-semibold text-md">Project Name</label>
                    <input
                        onChange={HandleChange}
                        type="text" name="title" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[90%]" placeholder="Enter Project Title"></input>
                </div>

                <div className="flex flex-col pb-2">
                    <h1 className="font-semibold ml-6 text-md pt-3">Project Status</h1>
                    <select
                        name="status"
                        onChange={HandleChange}
                        className="rounded-md mt-1 ml-5 border-2 w-10/12 h-8 shadow-inner focus:shadow-none text-gray-500">
                        <option value="">Select Status of Project</option>
                        <option value="In Progress">In Progress</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>


                <div className="flex flex-col p-5">
                    <label className="font-semibold text-md">Project Category</label>
                    <input
                        onChange={HandleChange}
                        type="text" name="category" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[90%]" placeholder="Eg: College or School"></input>
                </div>


                <div className="flex flex-col pb-2">
                    <h1 className="font-semibold ml-6 text-md pt-2">Sort By</h1>
                    <select
                        name="sort"
                        onChange={HandleChange}
                        className="rounded-md mt-1 ml-5 border-2 w-10/12 h-8 shadow-inner focus:shadow-none text-gray-500">
                        <option value="">Select</option>
                        <option value="new">Newest Project</option>
                        <option value="old">Oldest Project</option>
                    </select>
                </div>
                <button
                    onClick={() => {
                        setFilters({
                            keywordSearch: "",
                            title: "",
                            category: "",
                            status: "",
                            sort: ""
                        });
                    }}
                    type="button"
                    className="bg-blue-500 text-white rounded-md px-4 py-2 mt-8 hover:bg-blue-700 hover:rounded-[1rem] focus:outline-none focus:ring focus:border-gray-300 w-[25%] mx-auto"
                >
                    Clear
                </button>
            </div>
        </div>
    )
}
