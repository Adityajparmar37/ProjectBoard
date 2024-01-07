import { useEffect, useState } from 'react';
import { useLoading } from '../../Hooks/useLoading';
import { getAllTask } from '../../Services/taskServices';
import TaskCard from '../TaskCard/TaskCard';



export default function ManageTask() {
    const [studentTasks, setStudentTasks] = useState();
    const { showLoading, hideLoading } = useLoading();

    useEffect(() => {
        const fetchData = async () => {
            try {
                showLoading();
                const allTask = await getAllTask();
                console.log("ALL Task ==> ", allTask);
                setStudentTasks(allTask);
                hideLoading();
            } catch (error) {
                hideLoading();
                console.error('Error fetching tasks:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="pt-20 relative overflow-x-auto sm:rounded-lg flex justify-center items-center h-screen">
                <table className="w-[90%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-lg font-bold text-zinc-400 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-40 border-b-4 border-white">
                        <tr >
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <label className="text-white lg:text-2xl font-bold">📒</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3 border-l-4 ">
                                Task Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Task Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Task Priority
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Due Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentTasks &&
                            studentTasks.map((task) => <TaskCard key={task.id} task={task} />)}
                    </tbody>
                </table>
            </div>
        </>
    );
}
