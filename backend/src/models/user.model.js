import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema=new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
    },
    height: {
        type: Number,
    },
    age: {
        type: Number,
    },
    profilePic: {
        type: String
    },
    goal: {
        type: String,
        enum: ["gain", "lose", "maintain"]
    },
    dailyCalorieTarget: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male','female','others'],
        default: 'male'
    }
},{timestamps: true});

userSchema.pre("save",async function hashedPassword(next){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);

    next();
});

export const User=mongoose.model("User",userSchema);