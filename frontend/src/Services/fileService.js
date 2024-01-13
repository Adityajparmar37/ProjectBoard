import axios from 'axios';

export const fileUpload = async (formData) => {
    try {

        console.log("-->", formData);
        const data = await axios.post('api/file/uploadFile',
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        return data;

    } catch (error) {
        return error.response.data;
    }
}

export const fileList = async (projectName) => {
    try {

        console.log("-->", projectName);
        const data = await axios.get(`api/file/listFiles/${projectName}`)
        return data;

    } catch (error) {
        return error.response.data;
    }
}