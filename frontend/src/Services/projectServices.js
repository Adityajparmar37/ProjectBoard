import axios from "axios";


export const getAllProject = async (filters) => {
    try {

        filters = filters || {};

        const params = new URLSearchParams({
            ...filters
        })
        const { data } = await axios.get(`api/project/manageProject?${params.toString()}`);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const ProjectCreate = async (NewProjectData) => {
    try {

        console.log("-->", NewProjectData)
        const { data } = await axios.post("api/project/createProject", NewProjectData);
        console.log("Project created Frontend API Hit ==> ", data);
        return data;
    } catch (error) {
        return error.response.data;
    }
}