/* eslint-disable react/prop-types */
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { useLoading } from "../../Hooks/useLoading";
import { getAllTask } from "../../Services/taskServices";
import { getAllProject } from "../../Services/projectServices";

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
                // console.log("ALL Task ==> ", allTask);
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
                const allProject = await getAllProject();
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
        if (Tasks) {
            let events = [];

            for (let item of Tasks) {
                events.push({
                    type: "task",
                    title: item.taskTitle,
                    date: item.taskEndDate.substring(0, 10),
                    backgroundColor: 'green',
                    borderColor: 'green',
                });
            }

            for (let item of Projects) {
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
    }, [Tasks, Projects])

    return (
        <>  
            <div className="pt-20 bg-gray-100 h-screen">
                <div className="bg-white m-5 p-8 shadow-xl mt-20">
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
                                        transition: 'background-color 0.3s ease',
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