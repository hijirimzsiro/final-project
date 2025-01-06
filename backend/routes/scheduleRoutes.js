const express = require('express');
const router = express.Router();
const {
  createSchedule,
  getAllSchedules,
  getSchedule,
  updateSchedule,
  deleteSchedule
} = require('../controllers/scheduleController');

// 定義 CRUD 路由
router.post('/', createSchedule);  // 新增行程
router.get('/', getAllSchedules); // 取得所有行程
router.get('/:id', getSchedule);  // 取得單一行程
router.put('/:id', updateSchedule); // 更新行程
router.delete('/:id', deleteSchedule); // 刪除行程

module.exports = router;
