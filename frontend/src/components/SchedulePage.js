import React, { useState, useEffect } from "react";
import ScheduleForm from "./ScheduleForm";
import { getSchedules, updateSchedule, deleteSchedule } from "../services/scheduleService";
import "../styles/styles.css";

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // 格式化日期和時間
  const formatDateTime = (date) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleDateString("zh-TW", options);
  };

  const fetchSchedules = async () => {
    try {
      const data = await getSchedules();
      setSchedules(data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      alert("獲取日程失敗");
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleEdit = async (schedule) => {
    if (editMode === schedule._id) {
      try {
        await updateSchedule(schedule._id, editData);
        setEditMode(null);
        fetchSchedules();
      } catch (error) {
        console.error("Error updating schedule:", error);
        alert("更新日程失敗");
      }
    } else {
      setEditMode(schedule._id);
      setEditData(schedule);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleDelete = async (id) => {
    if (window.confirm("確定要刪除這個日程嗎？")) {
      try {
        await deleteSchedule(id);
        fetchSchedules();
      } catch (error) {
        console.error("Error deleting schedule:", error);
        alert("刪除日程失敗");
      }
    }
  };

  const filteredSchedules = schedules.filter((schedule) =>
    schedule.title.includes(searchTerm) ||
    schedule.description?.includes(searchTerm) ||
    formatDateTime(schedule.date).includes(searchTerm)
  );

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">日程管理系統</h1>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="搜尋日程..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ScheduleForm fetchSchedules={fetchSchedules} />

      <div className="mt-4">
        <h2 className="mb-3">我的日程</h2>
        {filteredSchedules.length === 0 ? (
          <p className="text-center text-muted">目前沒有日程</p>
        ) : (
          <ul className="list-group">
            {filteredSchedules.map((schedule) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={schedule._id}
              >
                {editMode === schedule._id ? (
                  <div className="w-100">
                    <div className="mb-2">
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={editData.title}
                        onChange={handleEditInputChange}
                        placeholder="標題"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        name="description"
                        className="form-control"
                        value={editData.description || ""}
                        onChange={handleEditInputChange}
                        placeholder="描述"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="date"
                        name="date"
                        className="form-control"
                        value={editData.date?.substring(0, 10)}
                        onChange={handleEditInputChange}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <strong>{schedule.title}</strong>
                    <span className="text-muted ms-2">
                      {formatDateTime(schedule.date)}
                    </span>
                    <p className="mb-0 text-secondary">
                      {schedule.description || "無描述"}
                    </p>
                  </div>
                )}
                <div className="ms-3">
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(schedule)}
                  >
                    {editMode === schedule._id ? "保存" : "編輯"}
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(schedule._id)}
                  >
                    刪除
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;
