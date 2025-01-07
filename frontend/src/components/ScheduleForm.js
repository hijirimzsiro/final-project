import axios from 'axios';
import React, { useState } from "react";

const ScheduleForm = ({ fetchSchedules }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) {
      alert("請填寫標題和日期");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/schedules", formData);
      fetchSchedules(); // 提交後重新載入日程
      setFormData({ title: "", description: "", date: "" });
    } catch (error) {
      console.error("Error creating schedule:", error);
      alert("新增日程失敗，請稍後再試");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          標題:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          描述:
        </label>
        <input
          type="text"
          id="description"
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          日期:
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="form-control"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        新增日程
      </button>
    </form>
  );
};

export default ScheduleForm;
