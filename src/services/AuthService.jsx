import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const register = async(auth_details)=>{
    const response = await axios.post(`${API_URL}/register`,auth_details);
    return response.data;
}
export const login = async(auth_details)=>{
    const response = await axios.post(`${API_URL}/login`,auth_details);
    return response.data;
}