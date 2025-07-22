import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth';

const login = async(formData) => {
    try {
        const res = await axios.post(`${API_URL}/login`, formData,{
            withCredentials: true
        }); 
        console.log("response login from backend:", res.data)
        return res.data;
        
    } catch (err) {
        throw new
        Error(err.response?.data?.error || 'Login failed');
    }
    
};

const register = async(formData) => {
    try {
        const res = await axios.post(`${API_URL}/signup`, formData,{
            withCredentials: true
        });
        console.log("response register from backend:", res.data) 
        return res.data;
        
    } catch (err) {
        throw new
        Error(err.response?.data?.error || 'Register failed')
        
    }
    
};

const getMe = async() => {
    try {
        const res = await axios.get(`${API_URL}/me`, {
        withCredentials: true, //important for cookie-based auth 
        });
        console.log("response from getMe backend:", res.data) 
        return res.data;
        
    } catch (error) {
        console.error("getMe error:", error.response?.data || error.message);
        throw error;
    }
    
};

const logout = async() => {
    const res = await axios.post(`${API_URL}/logout`, {},{
        withCredentials: true
    });
    console.log("response logout from backend:", res.data) 
    return res.data;
}

const authAPI = {login, register, logout, getMe};
export default authAPI;