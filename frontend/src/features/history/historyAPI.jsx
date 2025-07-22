import axios from "axios";

const API_URL = 'http://localhost:4000/api/history';

const saveChartAPI = async(chart) => {
    try {
        const res = await axios.post(`${API_URL}/history-chart`, chart,{
            withCredentials: true
        });
    return res.data
    } catch (error) {
        throw new
        Error(err.response?.data?.error || 'chart saved failed');
    }
} 

const fetchChartHistoryAPI = async() => {
    try {
        const res = await axios.get(`${API_URL}/chart-history`,{
            withCredentials: true
        });
        return res.data;

    } catch (error) {
        throw new
        Error(err.response?.data?.error || 'fetch chart failed');
    }
}

const deleteChartAPI = async (id, token) => {
    try {
        const res = await axios.delete(`${API_URL}/delete-history/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return id;
    } catch (error) {
        console.error('Delete API error:', error.response ?.data || error.message)
        throw new
        Error(error.response?.data?.error || 'Delete history failed');    
    }
}

const historyAPI = {saveChartAPI, fetchChartHistoryAPI, deleteChartAPI};
export default historyAPI;