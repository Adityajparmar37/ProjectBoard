export default function Filters() {
    return (
        <div className="pt-20">
            <div className="flex flex-col mt-8">
                <h1 className="flex justify-center items-center font-bold lg:text-xl">Find Your Project</h1>
                <div className="w-[100%] bg-gray-600 h-1 mt-2"></div>
                <div className="flex flex-col p-5">
                    <label className="font-semibold text-md">Search</label>
                    <input
                        type="text" name="projectTitle" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[90%]" placeholder="Enter word"></input>
                </div>

                <div className="flex flex-col p-5">
                    <label className="font-semibold text-md">Project Name</label>
                    <input
                        type="text" name="projectTitle" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[90%]" placeholder="Enter Project Title"></input>
                </div>

                <div className="flex flex-col pb-2">
                    <h1 className="font-semibold ml-6 text-md pt-3">Project Status</h1>
                    <select
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
                        type="text" name="projectTitle" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[90%]" placeholder="Eg: College or School"></input>
                </div>


                <div className="flex flex-col pb-2">
                    <h1 className="font-semibold ml-6 text-md pt-2">Sort By</h1>
                    <select
                        className="rounded-md mt-1 ml-5 border-2 w-10/12 h-8 shadow-inner focus:shadow-none text-gray-500">
                        <option value="">Select</option>
                        <option value="new">Newest Project</option>
                        <option value="old">Oldest Project</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
