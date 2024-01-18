/* eslint-disable react/prop-types */
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { useLoading } from "../../Hooks/useLoading";
import { getAllTask, getAllTheProject } from "../../Services/taskServices";


function Calendar() {
    const [allEvents, setAllEvents] = useState();
    const [Tasks, setTasks] = useState();
    const [Projects, setProjects] = useState();
    const { showLoading, hideLoading } = useLoading();
    useEffect(() => {
        const fetchData = async () => {
            try {
                showLoading();
                const allTask = await getAllTask();
                console.log("ALL Task ==> ", allTask);
                setTasks(allTask);
                hideLoading();
            } catch (error) {
                hideLoading();
                console.error('Error fetching tasks:', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                showLoading();
                const allProject = await getAllTheProject();
                console.log("ALL PROJECT ==> ", allProject);
                setProjects(allProject);
                hideLoading();
            } catch (error) {
                hideLoading();
                console.error('Error fetching projects:', error);
            }
        };

        fetchData();
    }, []);

    const createEvents = () => {
        if (Tasks && Array.isArray(Tasks) && Projects && Array.isArray(Projects)) {
            // console.log("hello", Tasks);
            let events = [];
    
            for (let item of Tasks) {
                if (!item.isCrossed) {
                    events.push({
                        type: "task",
                        title: item.taskTitle,
                        date: item.taskEndDate.substring(0, 10),
                        backgroundColor: 'green',
                        borderColor: 'green',
                    });
                }
            }
    
            for (let item of Projects) {
                console.log("heelo " , Projects);
                events.push({
                    type: "project",
                    title: item.projectTitle,
                    date: item.projectEndDate.substring(0, 10),
                    backgroundColor: 'orange',
                    borderColor: 'orange',
                });
            }
    
            console.log(events);
            setAllEvents(events);
        }
    };
    
    useEffect(() => {
        createEvents();
    }, [Tasks, Projects]);
    
    return (
        <>
            <div className="pt-20 bg-gray-100">
                <div className="bg-white mt-5 mx-5 p-8 shadow-xl">
                    <Fullcalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView={"dayGridMonth"}
                        headerToolbar={{
                            start: "today prev,next",
                            center: "title",
                            end: "dayGridMonth,dayGridWeek",
                        }}
                        events={allEvents}
                        eventContent={(arg) => {
                            return (
                                <div
                                    style={{
                                        backgroundColor: arg.event.backgroundColor,
                                        borderColor: arg.event.borderColor,
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        padding: '3px',
                                        borderRadius: '3px',
                                        transition: 'background-color 0.2s ease',
                                        display:'flex',
                                        justifyContent:'center',
                                        alignItems:'center'
                                        
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#FCF4A3';
                                        e.currentTarget.style.color = 'black';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = arg.event.backgroundColor;
                                        e.currentTarget.style.color = 'white';
                                    }}
                                >
                                    {arg.timeText}
                                    <br />
                                    {arg.event.title}

                                </div>
                            );
                        }}
                        height={"90vh"}
                    />
                </div>
            </div>
        </>
    );
}

export default Calendar;