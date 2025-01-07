import axios from 'axios';

const API_URL = 'http://localhost:5000/api/schedules';

// 創建日程
export const createSchedule = async (schedule) => {
  const response = await axios.post(API_URL, schedule);
  return response.data;
};

// 取得所有日程
export const getSchedules = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// 更新日程
export const updateSchedule = async (id, schedule) => {
  const response = await axios.put(`${API_URL}/${id}`, schedule);
  return response.data;
};

// 刪除日程
export const deleteSchedule = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
