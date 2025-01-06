import React, { useEffect, useState } from 'react';
import {
    getSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
} from '../services/scheduleService';

const SchedulePage = () => {
    const [schedules, setSchedules] = useState([]);
    const [newSchedule, setNewSchedule] = useState('');

    // 取得行程資料
    useEffect(() => {
        const fetchData = async () => {
            const data = await getSchedules();
            setSchedules(data);
        };
        fetchData();
    }, []);

    // 新增行程
    const handleAddSchedule = async () => {
        if (!newSchedule) return;
        const added = await createSchedule({ content: newSchedule });
        setSchedules([...schedules, added]);
        setNewSchedule('');
    };

    // 刪除行程
    const handleDeleteSchedule = async (id) => {
        await deleteSchedule(id);
        setSchedules(schedules.filter((schedule) => schedule._id !== id));
    };

    return (
        <div>
            <h1>每日行程管理</h1>
            <div>
                <input
                    type="text"
                    value={newSchedule}
                    onChange={(e) => setNewSchedule(e.target.value)}
                    placeholder="新增行程"
                />
                <button onClick={handleAddSchedule}>新增</button>
            </div>
            <ul>
                {schedules.map((schedule) => (
                    <li key={schedule._id}>
                        {schedule.content}{' '}
                        <button onClick={() => handleDeleteSchedule(schedule._id)}>刪除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SchedulePage;
