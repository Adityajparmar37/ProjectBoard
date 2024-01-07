/* eslint-disable react/prop-types */

import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { taskDone, taskUndo } from "../../Services/taskServices";

const TaskCard = ({ task }) => {
    const { taskPriority, taskEndDate, isCrossed } = task;

    const [isChecked, setIsChecked] = useState(isCrossed);
    const [, setIsCross] = useState(isCrossed);

    const TaskDone = async () => {
        try {
            const data = await taskDone(task._id);
            if (data) {
                toast.success("Task done successfully");
                setIsChecked(true);
                setIsCross(true);
            }
           
        } catch (error) {
            console.log("Some error occurred in fetching data ", error);
            toast.error("Some error occurred!");
        }
    };

    const PriorityColors = {
        Low: "bg-green-500",
        Medium: "bg-purple-400",
        High: "bg-red-600",
    };

    const formattedEndDate = new Date(taskEndDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    const ColoredPriority = PriorityColors[taskPriority] || "bg-yellow-600";

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        TaskDone();
    };

    const UndoTheTask = async () => {
        try {
            const data = await taskUndo(task._id);
            if (data) {
                toast.success("Task done Undo");
                setIsChecked(false);
                setIsCross(false);
            }
           
        } catch (error) {
            console.log("Some error occurred in fetching data ", error);
            toast.error("Some error occurred!");
        }
    }

    return (
        <tr
            className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-white dark:hover:bg-zinc-100 dark:hover:text-black ${isChecked ? "line-through" : ""
                }`}
        >
            <td className={`w-4 p-4 ${isChecked ? "  bg-zinc-500" : ""}`}>
                <div className="flex items-center">
                    <input
                        id={`checkbox-table-${task._id}`}
                        type="checkbox"
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${isChecked ? "disabled:" : ""
                            }`}
                        onChange={handleCheckboxChange}
                        checked={isChecked}
                    />
                    <label className="sr-only">checkbox</label>
                </div>
            </td>
            <th
                scope="row"
                className={`px-6 py-4 font-bold whitespace-nowrap text-lg text-yellow-400 ${isChecked ? "line-through text-zinc-400 bg-zinc-500" : ""
                    }`}
            >
                {task.taskTitle}
            </th>
            <td
                className={`px-6 py-4 text-lg ${isChecked ? "line-through text-zinc-400 font-light bg-zinc-500" : ""
                    }`}
            >
                {task.taskType}
            </td>
            <td
                className={`px-6 py-4 text-lg ${isChecked ? "line-through text-zinc-400 font-light bg-zinc-500" : ""
                    }`}
            >
                <h1
                    className={`font-semibold text-white text-lg rounded-lg p-1 ${ColoredPriority} ${isChecked ? "bg-zinc-500 text-zinc-400" : ""
                        }`}
                >
                    {taskPriority}
                </h1>
            </td>
            <td
                className={`px-6 py-4 text-lg ${isChecked ? "line-through text-zinc-400 font-light bg-zinc-500" : ""
                    }`}
            >
                {formattedEndDate}
            </td>
            <td
                className={`px-6 py-4 ${isChecked ? " text-zinc-400 font-light bg-zinc-500" : ""
                    }`}
            >
                <Link to={`/manageTask/${task._id}`}>
                    <button
                        className={`font-semibold text-xl dark:text-blue-500 hover:underline ${isChecked
                            ? "line-through dark:text-zinc-400 hover:no-underline"
                            : ""
                            }`}
                    >
                        Show
                    </button>
                </Link>

                {isChecked ? (<button
                    onClick={UndoTheTask}
                    className={` ml-3 font-semibold text-xl dark:text-blue-500 hover:underline ${isChecked
                        ? " dark:text-green-500 hover:no-underline"
                        : ""
                        }`}
                >
                    Undo
                </button>) : ("")}


            </td>
        </tr>
    );
};

export default TaskCard;
