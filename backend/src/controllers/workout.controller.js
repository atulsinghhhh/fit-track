import { workout } from "../models/workout.model.js";

export const workoutlog=async(req,res)=>{
    try {
        const {name,duration,CaloriesBurned,note}=req.body;
        if(!name || !duration || !CaloriesBurned || !note){
            return res.status(401).json({
                message: "all fields are requireds"
            })
        }

        const log=new workout({
            userId: req.user._id,
            name,
            duration,
            CaloriesBurned,
            note
        });

        await log.save();

        res.status(200).json({
            message: "Workout logged successfully",
            log
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}