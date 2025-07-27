import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"


import userRoutes from "./routes/user.route.js"
import workoutRoutes from "./routes/workout.route.js"
import foodRoutes from "./routes/food.route.js"
import nutritionRoutes from "./routes/nutrition.route.js"

const app=express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json({limit: "20kb"}));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))


app.use("/api/auth",userRoutes);
app.use("/api/workout",workoutRoutes)
app.use("/api/food",foodRoutes)
app.use("/api/nutrition",nutritionRoutes)



export {app}