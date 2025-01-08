import React, { useState } from "react";
import axios from "axios";

const ScheduleForm = ({ fetchSchedules }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time) {
      alert("請填寫標題、日期和時間");
      return;
    }

    // 合併日期和時間
    const dateTime = new Date(`${formData.date}T${formData.time}`);

    try {
      await axios.post("http://localhost:5000/api/schedules", {
        title: formData.title,
        description: formData.description,
        date: dateTime.toISOString(),
      });
      fetchSchedules();
      setFormData({ title: "", description: "", date: "", time: "" });
    } catch (error) {
      console.error("Error creating schedule:", error);
      alert("新增日程失敗，請稍後再試");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded bg-light">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">標題:</label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">描述:</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="date" className="form-label">日期:</label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="time" className="form-label">時間:</label>
          <input
            type="time"
            id="time"
            name="time"
            className="form-control"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        新增日程
      </button>
    </form>
  );
};

export default ScheduleForm;
