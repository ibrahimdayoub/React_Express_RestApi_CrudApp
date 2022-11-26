const asyncHandler = require("express-async-handler")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Goal = require("../models/goalModel")
const User = require("../models/userModel")
const Team = require("../models/teamModel")

const signUp = asyncHandler(async(req,res) => {
    const {name, email, password, team_id} = req.body

    if(!name || !email || !password || !team_id)
    {
        res.status(400)
        throw new Error("Enter all fields please")
    }

    const userExists = await User.findOne({email})

    if(userExists)
    {
        res.status(400)
        throw new Error("User already exists")
    }

    const team = await Team.findById(team_id) 

    if(!team) {
        res.status(400)
        throw new Error("Team not found")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        team_id
    })

    if(user)
    {
        await Team.findByIdAndUpdate(team_id,{
            members_no: team.members_no+1
        },
        {
            new: true
        })

        res.status(201).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.name,
                team_id: user.team_id,
                token: generateToken(user.id)
            }
        })
    }
    else
    {
        res.status(400)
        throw new Error("Something went wrong")
    }
})

const signIn = asyncHandler(async(req,res) => {
    const {email, password} = req.body

    if(!email || !password)
    {
        res.status(400)
        throw new Error("Enter all fields please")
    }

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password)))
    {
        res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.name,
                team_id: user.team_id,
                token: generateToken(user.id)
            }
        })
    }
    else
    {
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

const getMe = asyncHandler(async(req,res) => { 
    const user = req.user

    const team = await Team.findById(user.team_id) 
    if(!team) {
        res.status(400)
        throw new Error("Team not found")
    }

    const goals = await Goal.find({ user_id: req.user.id },{text:1,createdAt:1})

    res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.name,
        team: {
            name: team.name,
            members_no: team.members_no
        },
        goals
    })
})

const generateToken = (id) => {
    return jwt.sign(
        {
            id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    )
}

module.exports = {
    signUp,
    signIn,
    getMe
}