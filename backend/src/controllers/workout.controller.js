import mongoose from "mongoose";
import { workout } from "../models/workout.model.js";

export const workoutlog=async(req,res)=>{
    try {
        const {name,duration,CaloriesBurned,note,type}=req.body;
        if(!name || !duration || !CaloriesBurned || !note){
            return res.status(401).json({
                message: "all fields are requireds"
            })
        }

        // console.log(req.body);

        const log=new workout({
            userId: req.user._id,
            name,
            duration,
            CaloriesBurned,
            note,
            type,
        });

        // console.log(log);

        await log.save();

        res.status(200).json({
            message: "Workout logged successfully",
            log
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
}

export const getAllWorkout=async(req,res)=>{
    try {
        const userId=req.user._id;
        const workouts=await workout.find({userId}).sort({createdAt: -1});

        res.status(200).json({
            message: "Successfully fetch the user workout",
            workouts
        })
    } catch (error) {
        res.status(500).json({
            message: "failed to fetch the user workouts"
        })
    }
}

export const getWorkoutById=async(req,res)=>{
    try {
        const userId=req.user._id;
        const Workout=await workout.findOne({_id: req.params.id,userId});


        // console.log(userId);
        // console.log(req.params.id);

        if(!Workout){
            return res.status(401).json({
                message: "user workouts is missing"
            })
        }

        res.status(200).json({
            message: "fetch user workout log",
            Workout
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server issue occurs"
        })
    }
}

export const deleteWorkout=async(req,res)=>{
    try {
        const userId=req.user._id;
        const workoutdeleted=await workout.findByIdAndDelete({_id: req.params.id,userId},
            req.body,{new: true}
        );

        if(!workoutdeleted){
            return res.status(401).json({
                message: "workout is not found"
            })
        }

        res.status(200).json({
            message: "workout successfully deleted !!"
        })
    } catch (error) {
        res.status(500).json({
            message: "failed to deleted user workout"
        })
    }
}

export const updatedWorkout=async(req,res)=>{
    try {
        const userId=req.user._id;
        // const updatedworkout=await workout.findByIdAndUpdate({_id: req.params.id,userId},
        //     req.body,{new: true}
        // );

        const updatedWorkout = await workout.findOneAndUpdate(
            { _id: req.params.id, userId },
            req.body,
            { new: true }
        );


        if(!updatedWorkout){
            return res.status(401).json({
                message: "workout not found"
            })
        }

        res.status(201).json({
            message: "user updated their workout log successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "failed updated their workout log"
        })
    }
}

export const getWeeklyWorkoutSummary = async (req, res) => {
    try {
        const { start } = req.query;
        const userId = req.user._id;

        const startDate = new Date(start + "T00:00:00.000Z");
        const endDate = new Date(new Date(startDate).setDate(startDate.getDate() + 6));

        const data = await workout.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    createdAt: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    CaloriesBurned: { $sum: "$CaloriesBurned" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        res.status(200).json({
            message: "Successfully fetched weekly workout summary",
            data
        });
    } catch (error) {
        console.error("Workout summary error:", error);
        res.status(500).json({
            message: "Failed to fetch weekly workout summary"
        });
    }
}

export const getTodaysWorkout=async(req,res)=>{
    try {
        const { date } = req.query;
        const userId=req.user._id

        const start = new Date(`${date}T00:00:00.000Z`);
        const end = new Date(`${date}T23:59:59.999Z`);


        const workouts=await workout.find({userId,
            createdAt: {
                $gte: start,
                $lte: end
            }
        });
        res.status(200).json({
            message: "successfully fetch the today workout",
            workouts
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Today's workout fetch failed"
        })
    }
}
