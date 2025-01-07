import React, { useState } from "react";
import "./styles.css";

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    description: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule({ ...newSchedule, [name]: value });
  };

  const handleAdd = () => {
    if (!newSchedule.title || !newSchedule.date) {
      alert("請填寫標題和日期");
      return;
    }

    setSchedules([
      ...schedules,
      { ...newSchedule, id: Date.now().toString() },
    ]);
    setNewSchedule({ title: "", description: "", date: "" });
  };

  const handleEdit = (schedule) => {
    const updatedTitle = prompt("修改標題:", schedule.title);
    if (updatedTitle) {
      setSchedules(
        schedules.map((item) =>
          item.id === schedule.id ? { ...item, title: updatedTitle } : item
        )
      );
    }
  };

  const handleDelete = (id) => {
    setSchedules(schedules.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">日程管理系統</h1>

      <form className="mb-4">
        <div className="mb-3">
          <label htmlFor="title">標題:</label>
          <input
            className="form-control"
            type="text"
            id="title"
            name="title"
            value={newSchedule.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description">描述:</label>
          <input
            className="form-control"
            type="text"
            id="description"
            name="description"
            value={newSchedule.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date">日期:</label>
          <input
            className="form-control"
            type="date"
            id="date"
            name="date"
            value={newSchedule.date}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAdd}
        >
          新增日程
        </button>
      </form>

      <h2>我的日程</h2>
      <ul className="list-group">
        {schedules.map((schedule) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={schedule.id}
          >
            <div>
              <strong>{schedule.title}</strong> -{" "}
              {new Date(schedule.date).toLocaleDateString()} {/* 顯示格式化後的日期 */}
              <p>{schedule.description || "無描述"}</p> {/* 顯示描述，若無描述則顯示 '無描述' */}
            </div>
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => handleEdit(schedule)}
              >
                編輯日程
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(schedule.id)}
              >
                刪除日程
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchedulePage;
