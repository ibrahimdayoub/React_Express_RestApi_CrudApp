const asyncHandler = require("express-async-handler")
const jwt = require('jsonwebtoken')
const User = require("../models/userModel")

const protect = asyncHandler(async(req,res,next) => {
   let token = null

   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
   {
        try
        {
            //get token from header
            token =  req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //get user from token
            req.user = await User.findById(decoded.id).select('-password')

           if(!req.user)
            {
                throw new Error("User not found")
            }

            //go to controller 
            next()
        }
        catch (error)
        {
            if (error.message == "User not found") 
            {
                throw new Error(error.message)
            }
            else
            {
                throw new Error("Unauthorized")
            }
        }
   }

   if(!token)
   {
        res.status(401)
        throw new Error("Unauthorized, no token")
   }
})

module.exports = {
    protect
}