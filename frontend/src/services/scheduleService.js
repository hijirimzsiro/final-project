import axios from 'axios';

const API_URL = 'http://localhost:5000/api/schedules'; // 替換為你的後端 URL

// 取得所有行程
export const getSchedules = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// 新增行程
export const createSchedule = async (schedule) => {
    const response = await axios.post(API_URL, schedule);
    return response.data;
};

// 更新行程
export const updateSchedule = async (id, schedule) => {
    const response = await axios.put(`${API_URL}/${id}`, schedule);
    return response.data;
};

// 刪除行程
export const deleteSchedule = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
