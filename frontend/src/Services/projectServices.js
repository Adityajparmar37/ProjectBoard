import axios from "axios";


export const getAllProject = async (filters, Page, pageSize) => {
    try {
        // console.log("Page==>", Page)
        filters = filters || {};
        Page = filters.Page || 1;
        pageSize = pageSize || 6;

        const params = new URLSearchParams({
            ...filters,
            Page,
            pageSize,
        });

        // console.log(params);
        const { data } = await axios.get(`api/project/manageProject?${params.toString()}`);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const ProjectCreate = async (NewProjectData) => {
    try {

        // console.log("-->", NewProjectData)
        const { data } = await axios.post("api/project/createProject", NewProjectData);
        console.log("Project created Frontend API Hit ==> ", data);
        return data;
    } catch (error) {
        return error.response.data;
    }
}


export const getbyId = async (id) => {
    try {
        const { data } = await axios.get(`api/project/manageProject/${id}`);
        return data;
    } catch (error) {
        return error.response.data;
    }
}


export const updateProject = async (id, updateFormData) => {
    try {
        const { data } = await axios.put(`api/project/manageProject/update/${id}`, updateFormData);
        console.log("update frontend api ", data);
        return data;
    } catch (error) {
        return error.response.data;
    }
}


export const deleteProject = async (id) => {
    try {
        const { data } = await axios.delete(`api/project/manageProject/delete/${id}`);
        console.log("delete frontend api ", data)
        return data;
    } catch (error) {
        return error.response.data;
    }
}