const express=require('express')
const app=express()
const dotenv=require('dotenv').config()
const PORT=process.env.SERVER_PORT||3000
const connectDB=require('./config/connectionDB')
const cors=require('cors')
app.use(cors())
app.use(express.json())


app.use("/recipe",require("./routes/recipe"))
app.use("/user",require("./routes/UserRoutes"))
connectDB()




app.listen(PORT,(err)=>{
    console.log(`App is running in port ${PORT}`);
    
})