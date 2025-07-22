import axios from "axios";

const API_URL = 'http://localhost:4000/api/excel';

const getAIInsight = async(excelData) => {
    try {
        const res = await axios.post( `${API_URL}/ai-insight`, {
            data: excelData,
        });
        return res.data
    } catch (err) {
        throw new
        Error(err.response?.data?.error || 'Getting Insight Failed')   
    }
}

const insightAPI = { getAIInsight };
export default insightAPI;