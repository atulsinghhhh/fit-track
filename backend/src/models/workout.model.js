import mongoose from "mongoose"

const workoutSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    CaloriesBurned: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    note: {
        type: String
    }
},{timestamps: true})

export const workout=mongoose.model("workout",workoutSchema)