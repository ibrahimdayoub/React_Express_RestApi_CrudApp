 const mongoose = require('mongoose') 

 const teamSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Enter name please"]
    },
    members_no:{
        type: Number,
        required: [true, "Enter members_no please"]
    }
 },
 {
    timestamps: true
 })

 module.exports = mongoose.model("Team",teamSchema)