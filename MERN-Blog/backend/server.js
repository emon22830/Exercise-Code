import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js"

dotenv.config();
const app = express();


//default middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const PORT= process.env.PORT || 5000;

//Router
app.use("/api/v1/user", userRoute);

app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server is running at PORT ${PORT}`);
})