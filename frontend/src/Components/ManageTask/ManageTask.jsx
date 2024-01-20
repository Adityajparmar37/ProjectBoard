import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoading } from '../../Hooks/useLoading';
import { getAllTask } from '../../Services/taskServices';
import TaskCard from '../TaskCard/TaskCard';
import TaskFilter from '../TaskFilter/TaskFilter';
import { FcCalendar } from "react-icons/fc";


export default function ManageTask() {
    const [studentTasks, setStudentTasks] = useState();
    const { showLoading, hideLoading } = useLoading();

    useEffect(() => {
        const fetchData = async () => {
            try {
                showLoading();
                const allTask = await getAllTask();
                // console.log("ALL Task ==> ", allTask);
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
            <div className='pt-20  h-screen bg-gray-100'>
                {studentTasks && studentTasks.length > 0 ? (
                    <>
                        <div className='bg-white w-fulltext-[1rem] mb-10 shadow-lg mt-3'>
                            <div className='flex justify-center items-center  p-2'>
                                <TaskFilter setStudentTasks={setStudentTasks}/>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <table className="w-[90%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-[1rem] font-bold text-zinc-400 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-40 border-b-4 border-white">
                                    <tr>
                                        <th scope="col" className="p-4">
                                            <div className="flex items-center">
                                                <label className="text-white font-bold text-1xl">📋</label>
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
                                        studentTasks.map((task) => <TaskCard key={task._id} task={task} />)}
                                </tbody>
                            </table>
                        </div>
                        <div className="fixed bottom-10 right-24">
                            <Link to="/manageTask/calendar">
                                <FcCalendar 
                                    className="cursor-pointer bg-white p-3 h-[5rem] w-[5rem] rounded-[3rem] border-4 border-gray-500"
                                />
                            </Link>
                        </div>
                    </>
                ) : (<div className='flex items-center justify-center w-screen h-screen'>
                    <Link to="/task">
                        <h1 className=' bg-gray-600 text-white text-lg rounded-md p-2'>No Task Found! Click to go back</h1>
                    </Link>
                </div>)}

            </div>
        </>
    );
}
