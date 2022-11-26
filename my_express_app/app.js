const exprees = require("express")
const colors = require("colors")
const dotenv = require("dotenv").config()
const {errorHandler} = require("./middlewares/errorMiddleware")
const connectDB = require("./config/db")

const port = process.env.PORT || 5000

const app = exprees()

connectDB()

app.use(exprees.json())
app.use(exprees.urlencoded({extended: false}))

app.use("/api/teams",require("./routes/teamRoutes"))
app.use("/api/users",require("./routes/userRoutes"))
app.use('/api/goals', require('./routes/goalRoutes'));

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server Connected Succesfuly...`.cyan)
})