const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user_id: req.user.id })
  res.status(200).json(goals)
})

const setGoal = asyncHandler(async (req, res) => {
  const {text} = req.body

  if (!text) {
    res.status(400)
    throw new Error("Enter all fields please")
  }

  const goal = await Goal.create({
    text: text,
    user_id: req.user.id,
  })

  res.status(200).json(goal)
})

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  if (!req.user) {
    res.status(400)
    throw new Error('User not found')
  }

  if (goal.user_id.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json({goal:updatedGoal})
})

const removeGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  if (!req.user) {
    res.status(400)
    throw new Error('User not found')
  }

  if (goal.user_id.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  removeGoal,
}
