import axios from "axios";

const API_URL = 'http://localhost:4000/api/excelrecord';

const uploadExcelFile = async(file, token) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post(`${API_URL}/upload-excel`, formData,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
    });
    console.log('response excel from backend:', res.data)
    return res.data.file;
};

const getExcelUploads = async(token) => {
    const res = await axios.get(`${API_URL}/record/:username`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
    });
    return res.data.data;
};

const getRecentExcel = async(token) => {
    const res = await axios.get(`${API_URL}/recent`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
    });
    return res.data.data;
};

const excelAPI = { uploadExcelFile,  getExcelUploads, getRecentExcel};
export default excelAPI;