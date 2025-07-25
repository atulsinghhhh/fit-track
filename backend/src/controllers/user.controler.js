import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"


export const userSignup=async(req,res)=>{
    try {
        const {fullName,email,password}=req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({
                message: "all fields are requireds !!"
            })
        }
        // console.log("name: ",fullName);
        // console.log("password: ",password);
        // console.log("email: ",email);

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                message: "user is already exist in database"
            })
        }
        // console.log("existing: ",existingUser)

        const userDetails=await User.create({
            fullName,
            email,
            password
        })

        const token = jwt.sign(
            { _id: userDetails._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // console.log(token)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            secure: true,
            sameSite: "strict"
        });

        res.status(201).json({
            message: "user successfully signup !!",
            userDetails
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "failed to signup user"
        })
    }
}

export const userLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(401).json({
                message: "all fields are required !"
            })
        }
        
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "user not found in database"
            })
        }

        // console.log(user);

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        // console.log("password: ",isMatch);

        // const token=jwt.sign(
        //     {_id:user._id},process.env.JWT_SECRET,{
        //     expiresIn: "7d"
        // });

        // console.log(token);

        // res.cookie("token",token,{
        //     httpOnly: true,
        //     maxAge: 60*60*1000*7*24,
        //     secure: true, //process.env.NODE_ENV==="production"
        //     sameSite: "strict"
        // })

        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // console.log(token)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        res.status(200).json({
            message: "user successfully login"
        })


    } catch (error) {
        res.status(500).json({
            message: "failed to login user"
        })
    }
}

export const userLogout=async(req,res)=>{
    try {
        res.clearCookie("token");

        res.status(200).json({
            message: "user successfully logout"
        })
    } catch (error) {
        res.status(500).json({
            message: "user failed to logout"
        })
    }
}

export const userOnboard = async (req, res) => {
    try {
        const { weight, height, age, dailyCalorieTarget, goal } = req.body;

        if (!weight || !height || !age || !dailyCalorieTarget || !goal) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Optional: Handle profile picture upload here if needed

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { weight, height, age, dailyCalorieTarget, goal },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User onboarded successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("Onboarding error:", error);
        res.status(500).json({
            message: "Failed to onboard the user"
        });
    }
};


export const getProfile=async(req,res)=>{
    try {
        const userId=req.user._id;

        const user=await User.findById(userId);
        if(!user){
            return res.status(401).json({
                message: "Invalid Credentails"
            })
        }

        res.status(201).json({
            message: "fetch user profile successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Issue"
        })
    }
}

export const updatedProfile=async(req,res)=>{ // TODO: complete after some time
    try {
        
    } catch (error) {
        
    }
}