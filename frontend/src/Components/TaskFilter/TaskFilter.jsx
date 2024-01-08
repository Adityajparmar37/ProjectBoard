import { useEffect, useState } from "react"
import { useLoading } from "../../Hooks/useLoading";
import { getAllTask } from "../../Services/taskServices";


// eslint-disable-next-line react/prop-types
export default function TaskFilter({ setStudentTasks }) {
    const { showLoading, hideLoading } = useLoading();
    const [filterTask, setFilterTask] = useState({
        keywordSearch: "",
        taskType: "",
        taskPriority: "",
        sort: ""
    });
    const HandleChange = (e) => {
        setFilterTask({
            ...filterTask,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                showLoading();
                const allTask = await getAllTask();
                console.log("ALL TASK ==> ", allTask);
                setStudentTasks(allTask);
                hideLoading();
            } catch (error) {
                hideLoading();
                console.error('Error fetching projects:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchFilteredData = async () => {
            try {
                showLoading();
                const filteredTask = await getAllTask(filterTask);
                setStudentTasks(filteredTask)
                hideLoading();
            } catch (error) {
                hideLoading();
                console.error('Error in filtering task ', error);
            }
        };

        if (filterTask) {
            fetchFilteredData();
        }
    }, [filterTask])

    // console.log(filterTask)
    return (

        <div className="flex flex-row">
            <div className="p-5 items-center">
                <label className="font-semibold text-lg">Search Task</label>
                <input
                    onChange={HandleChange}
                    type="text" name="keywordSearch" className="p-1 border-2 border-gray-200 focus:outline-none rounded-sm bg-gray-100 mt-2 h-10 shadow-inner focus:shadow-none w-[90%]" placeholder="Enter Word"></input>
            </div>
            <div className="p-5 items-center ml-12">
                <label className="font-semibold text-md">Task Priority</label>
                <select
                    onChange={HandleChange}
                    name="taskPriority"
                    className="block rounded-md mt-2 border-2 w-[15rem] shadow-inner focus:shadow-none h-[2.5rem]">
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <div className="p-5 items-center ml-12">
                <label className="font-semibold text-lg">Task Type</label>
                <div className="flex flex-row gap-3 text-xl mt-3">
                    <input
                        onChange={HandleChange}
                        type="radio"
                        name="taskType"
                        value="Personal"
                    />
                    <label>
                        Personal
                    </label>

                    <input
                        onChange={HandleChange}
                        type="radio"
                        name="taskType"
                        value="Project"
                    />
                    <label>
                        Project
                    </label>
                </div>
            </div>
            <div className="p-5 items-center ml-12">
                <label className="font-semibold text-md">Sort by</label>
                <select
                    onChange={HandleChange}
                    name="sort"
                    className="block rounded-md mt-2 border-2 w-[15rem] shadow-inner focus:shadow-none h-[2.5rem]">
                    <option value="">Select</option>
                    <option value="new">Newest</option>
                    <option value="old">Oldest</option>
                </select>
            </div>
        </div>
    )
}
