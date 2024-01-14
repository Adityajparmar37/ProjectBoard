import axios from "axios";


export const TaskCreate = async (NewTaskData) => {
    try {
        console.log("-->", NewTaskData)
        const { data } = await axios.post('api/task/createTask', NewTaskData);
        console.log("Task created frontend API HIT ==> ", data);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const getAllTask = async (filterTask) => {
    try {
        filterTask = filterTask || {};

        const params = new URLSearchParams({
            ...filterTask
        });

        const { data } = await axios.get(`api/task/manageTask?${params.toString()}`);
        return data;
    } catch (error) {
        return error.response.data;
    }
}


export const getTheTask = async (id) => {
    try {
        const { data } = await axios.get(`api/task/manageTask/${id}`);
        // console.log(data)
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const getAllTheProject = async () => {
    try {
        const { data } = await axios.get(`api/task/taskALLProject`);
        // console.log(data)
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const taskDone = async (id) => {
    try {
        const { data } = await axios.get(`api/task/manageTask/taskdone/${id}`);
        console.log(data)
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const taskUndo = async (id) => {
    try {
        const { data } = await axios.get(`api/task/manageTask/taskUndo/${id}`);
        console.log(data)
        return data;
    } catch (error) {
        return error.response.data;
    }
}


export const updateTask = async (id, updatedFormData) => {
    try {
        const { data } = await axios.put(`api/task/manageTask/update/${id}`, updatedFormData);
        console.log("Update task Frontend api ", data);
        return data;
    } catch (error) {
        return error.response.data;
    }
}



export const deleteTask = async (id) => {
    try {
        const { data } = await axios.delete(`api/task/manageTask/delete/${id}`);
        console.log("delete frontend api ", data)
        return data;
    } catch (error) {
        return error.response.data;
    }
}


