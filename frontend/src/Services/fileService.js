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