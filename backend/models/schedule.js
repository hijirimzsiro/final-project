const mongoose = require('mongoose');

// 定義行程的資料結構
const scheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true 
  },
  description: {
    type: String,
    required: true 
  },
  date: {
    type: Date,
    required: true 
  }
});

// 使用 'schedules' 作為集合名稱
const Schedule = mongoose.model('Schedule', scheduleSchema, 'schedules');

module.exports = Schedule;
