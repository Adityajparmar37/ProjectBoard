import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const { student, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        await logout();
        navigate("/");
    }


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="bg-white dark:bg-gray-800 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-end justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Project Board 📜</span>
                    </Link>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {student ? (
                            <button
                                type="button"
                                onClick={handleLogOut}
                                className="text-white bg-blue-700 hover:bg-blue-800 hover:rounded-[5rem] focus:ring-2 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-white">
                                Log Out
                            </button>
                        ) : (<Link to="/login">
                            <button
                                type="button"
                                onClick={toggleMenu}
                                className="text-white bg-blue-700 hover:bg-blue-800 hover:rounded-[5rem] focus:ring-2 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-white">
                                Log In
                            </button>
                        </Link>)}

                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="inline-flex items-center p-2 w-7 h-8 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-sticky"
                            aria-expanded={isMenuOpen ? 'true' : 'false'}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className={`items-center w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
                        {student ? (<ul className="mt-5 flex flex-col md:flex-row md:space-x-8 ">
                            <li>
                                <Link to="/home" className="block py-2 px-3 text-white rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white hover:text-blue-700" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link to="/project" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Project</Link>
                            </li>
                            <li>
                                <Link to="/task" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Task</Link>
                            </li>
                            <li>
                                <Link to="/file" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">File</Link>
                            </li>
                        </ul>) : (<><h1 className='text-white py-2 px-3'>Let &apos;s enter...</h1></>)}

                    </div>
                </div>


            </nav>
        </>
    );
}
