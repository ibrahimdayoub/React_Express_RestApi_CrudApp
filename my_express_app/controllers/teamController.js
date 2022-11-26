const asyncHandler = require("express-async-handler")
const Team = require("../models/teamModel")
const User = require("../models/userModel")

const getTeams = asyncHandler(async(req,res) => {
    const teams = await Team.find()
    res.status(200).json({teams})
})

const setTeam = asyncHandler(async(req,res) => { 
    const {name} = req.body

   if(!name)
    {
        res.status(400)
        throw new Error("Enter all fields please")
    }

    const team = await Team.create({
        name,
        members_no: 0
    })

    res.status(201).json({team})
})

const getTeam = asyncHandler(async(req,res) => {
    const team = await Team.findById(req.params.id)
    if(!team) {
        res.status(400)
        throw new Error("Team not found")
    }

    const users  = await User.find({team_id: req.params.id },{name:1,email:1})

    res.status(200).json({
        team:{
            ...team._doc,
            users
        }
    })
})

const updateTeam = asyncHandler(async(req,res) => {
    const team = await Team.findById(req.params.id) 

    if(!team) {
        res.status(400)
        throw new Error("Team not found")
    }

    const updatedTeam = await Team.findByIdAndUpdate(req.params.id,req.body,{
        new: true
    })

    res.status(200).json({team:updatedTeam})
})

const removeTeam = asyncHandler(async(req,res) => {
    const team = await Team.findById(req.params.id) 

    if(!team) {
        res.status(400)
        throw new Error("Team not found")
    }

    await team.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getTeams,
    setTeam,
    getTeam,
    updateTeam,
    removeTeam
}