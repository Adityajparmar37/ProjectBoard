import axios from "axios";


export const findMember = async (filters) => {
    filters = filters || {};

    const params = new URLSearchParams({
        ...filters,
    });
    try {
        const { data } = await axios.get(`api/chat/find?${params.toString()}`);
        console.log("Search filter member", data);
        return data;
    } catch (error) {
        return error.response.data
    }
}


export const sendRequest = async (id) => {
    try {
        const { data } = await axios.get(`api/chat/request/${id}`);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const AllRequest = async () => {
    try {
        const { data } = await axios.get(`api/chat/request/Allrequest`);
        return data;
    } catch (error) {
        return error.response.data;
    }
}