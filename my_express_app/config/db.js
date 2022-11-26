const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected Succesfuly...`.cyan)
    }
    catch (error) {
        console.log(`${error}`.red.underline)
        process.exit(1)
    }
}

module.exports = connectDB