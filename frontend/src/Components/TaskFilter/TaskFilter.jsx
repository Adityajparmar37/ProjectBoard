

export default function TaskFilter() {
    return (

            <div className="flex flex-row">
                <div className="p-5 items-center">
                    <label className="font-semibold text-lg">Search Task</label>
                    <input
                        type="text" name="title" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[90%]" placeholder="Enter Word"></input>
                </div>

                <div className="p-5 items-center ml-12">
                    <label className="font-semibold text-lg">Task title</label>
                    <input
                        type="text" name="title" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[90%]" placeholder="Enter Task Title"></input>
                </div>
                <div className="p-5 items-center ml-12">
                    <label className="font-semibold text-lg">Task Type</label>
                    <div className="flex flex-row gap-3 text-xl mt-3">
                        <input
                            type="radio"
                            name="taskType"
                            value="Personal"
                        />
                        <label>
                            Personal
                        </label>

                        <input
                            type="radio"
                            name="taskType"
                            value="Personal"
                        />
                        <label>
                            Project
                        </label>
                    </div>
                </div>
                <div className="p-5 items-center ml-12">
                <label className="font-semibold text-md">Task Priority</label>
                    <select
                        name="status"
                        className="block rounded-md mt-2 border-2 w-[15rem] shadow-inner focus:shadow-none h-9">
                        <option value="">Select Priority</option>
                        <option value="In Progress">Low</option>
                        <option value="On Hold">Medium</option>
                        <option value="Completed">High</option>
                    </select>
                </div>
            </div>
    )
}
