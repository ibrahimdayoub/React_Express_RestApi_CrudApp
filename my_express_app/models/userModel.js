 const mongoose = require('mongoose') 

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

 const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Enter name please"],
    },
    password:{
        type: String,
        required: [true, "Enter password please"],
    },
    email:{
        type: String,
        lowercase: true,
        required: [true, "Enter email please"],
        unique: true,
        validate: [validateEmail, 'Enter valid email please'],
    },
    team_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Enter team_id please"],
        ref: 'Team'
    }
 },
 {
    timestamps: true
 })

 module.exports = mongoose.model("User",userSchema)

 /*
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    validate: [validateEmail, 'Enter valid email please']
    ;
    const validateEmail = (email) => {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email)
    }
 */