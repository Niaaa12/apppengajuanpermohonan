import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getPengajuan = async () => {
    const response = await axios.get(`${API_URL}/pengajuan`);
    return response.data;
};

export const addPengajuan = async (pengajuan) => {
    const response = await axios.post(`${API_URL}/pengajuan`, pengajuan);
    return response.data;
};
