import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScheduleForm from './components/ScheduleForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css'; 

function App() {
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState('');

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/schedules');
      setSchedules(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setError('無法載入日程，請稍後再試');
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('確定要刪除這個日程嗎？')) {
      try {
        await axios.delete(`http://localhost:5000/api/schedules/${id}`);
        await fetchSchedules();
      } catch (error) {
        console.error('Error deleting schedule:', error);
        setError('刪除失敗，請稍後再試');
      }
    }
  };

  const handleEdit = async (schedule) => {
    const newTitle = prompt('修改標題:', schedule.title);
    const newDescription = prompt('修改描述:', schedule.description);
    const newDateTime = prompt('修改日期時間 (YYYY-MM-DD HH:mm):', 
      `${schedule.date.substring(0, 10)} ${schedule.date.substring(11, 16)}`);
    
    if (newTitle && newDateTime) {
      if (isNaN(new Date(newDateTime).getTime())) {
        alert('請輸入有效的日期格式');
        return;
      }
      try {
        await axios.put(`http://localhost:5000/api/schedules/${schedule._id}`, {
          title: newTitle,
          description: newDescription,
          date: new Date(newDateTime).toISOString()
        });
        await fetchSchedules();
      } catch (error) {
        console.error('Error updating schedule:', error);
        setError('更新失敗，請稍後再試');
      }
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="schedule-app">
      <h1 className="main-title">日程管理系統</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="schedule-form">
        <ScheduleForm fetchSchedules={fetchSchedules} />
      </div>
      
      <h2 className="section-title">我的日程</h2>
      {schedules.length > 0 ? (
        <ul className="schedule-list">
          {schedules.map((schedule) => (
            <li key={schedule._id} className="schedule-item">
              <div className="schedule-content">
                <div className="schedule-title">{schedule.title}</div>
                <div className="schedule-datetime">{formatDateTime(schedule.date)}</div>
                <div className="schedule-description">{schedule.description || "無描述"}</div>
              </div>
              <div className="schedule-actions">
                <button 
                  className="btn-edit"
                  onClick={() => handleEdit(schedule)}
                >
                  編輯日程
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDelete(schedule._id)}
                >
                  刪除日程
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-data">目前沒有日程</p>
      )}
    </div>
  );
}

export default App;
