import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScheduleForm from './components/ScheduleForm';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState('');  // 錯誤處理狀態

  // 取得所有日程
  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/schedules');
      setSchedules(response.data);
      setError('');  // 清除錯誤訊息
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setError('無法載入日程，請稍後再試');
    }
  };

  // 在組件掛載時取得日程
  useEffect(() => {
    fetchSchedules();
  }, []);

  // 刪除日程
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/schedules/${id}`);
      fetchSchedules();  // 刪除後重新載入日程
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  // 編輯日程
  const handleEdit = (schedule) => {
    console.log('Edit schedule:', schedule);
  };

  return (
    <div>
      <h1>日程管理系統</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* 顯示錯誤訊息 */}
      <ScheduleForm fetchSchedules={fetchSchedules} />
      <h2>我的日程</h2>
      <ul>
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <li key={schedule._id}>
              {schedule.title} - {schedule.date}
              <button onClick={() => handleEdit(schedule)}>編輯</button>
              <button onClick={() => handleDelete(schedule._id)}>刪除</button>
            </li>
          ))
        ) : (
          <p>目前沒有日程</p>
        )}
      </ul>
    </div>
  );
}

export default App;
