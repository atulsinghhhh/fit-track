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