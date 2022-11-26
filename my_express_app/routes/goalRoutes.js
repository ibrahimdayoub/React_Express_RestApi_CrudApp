const express = require('express')
const router = express.Router()
const {
  getGoals,
  setGoal,
  updateGoal,
  removeGoal,
} = require('../controllers/goalController')
const { 
  protect 
} = require('../middlewares/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').delete(protect, removeGoal).put(protect, updateGoal)

module.exports = router
