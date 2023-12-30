import { useEffect, useState } from 'react';
import { getAllProject } from '../../Services/projectServices';
import ProjectCard from '../ProjectCard/ProjectCard';

export default function ManageProject() {
    const [studentProjects, setStudentProjects] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allProject = await getAllProject();
                console.log("ALL PROJECT ==> ", allProject);
                setStudentProjects(allProject);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-gray-100 h-screen flex overflow-x-hidden">
            <div className="pt-20 bg-gray-100 flex-1 overflow-x-hidden">
                <div className='grid grid-cols-2 flex-1 overflow-x-hidden'>
                    {studentProjects && studentProjects.length > 0 ? (
                        studentProjects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                projectTitle={project.projectTitle}
                                status={project.projectStatus}
                                endDate="12/12/2023"
                            />
                        ))
                    ) : (
                        <h1 className='flex items-center justify-center bg-gray-600 text-white text-lg rounded-md p-2'>No Project Found</h1>
                    )}
                </div>
            </div>

            {studentProjects && studentProjects.length > 0 ? (<div className='w-1/4 bg-white shadow-lg  right-0 top-0 h-screen'>
                hello
            </div>) : (<></>)}

        </div>
    );
}
