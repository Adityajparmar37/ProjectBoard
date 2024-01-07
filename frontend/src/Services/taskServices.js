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

export const getAllTask = async () => {
    try {
        const { data } = await axios.get('api/task/manageTask');
        return data;
    } catch (error) {
        return error.response.data;
    }
}