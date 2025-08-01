import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import uploadOnCloudinary from "../utilis/cloudinary.js";
import { calculateCalories } from "../utilis/calculateCalories.js";


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
            { id: userDetails._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        console.log(token)

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
        console.log("REQ BODY:", req.body);
        const {email,password}=req.body;

        if(!email || !password){
            return res.status(401).json({
                message: "all fields are required !"
            })
        }
        console.log(req.body);
        
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "user not found in database"
            })
        }

        // console.log(user);

        console.log("User from DB:", user);
        console.log("Stored hashed password:", user.password);
        console.log("Entered password:", password);


        // const isMatch=await bcrypt.compare(password,user.password);
        // if(!isMatch){
        //     return res.status(400).json({
        //         message: "Invalid Credentials"
        //     })
        // }

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
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        console.log(token)

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
        const { weight, height, age, goal, gender } = req.body;

        if (!weight || !height || !age || !goal || !gender) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findById(req.user._id);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (existingUser.weight || existingUser.height || existingUser.age || existingUser.dailyCalorieTarget || existingUser.goal) {
            return res.status(400).json({
                message: "User has already onboarded. Updates are not allowed."
            });
        }

        const avatar = req.files?.profilePic?.[0];
        let profilePicUrl = "";

        if (avatar) {
            const image = await uploadOnCloudinary(avatar.path);
            if (!image?.secure_url) {
                return res.status(401).json({ message: "Failed to upload avatar" });
            }
            profilePicUrl = image.secure_url;
        }

        const dailyCalorietarget = calculateCalories({
            weight: Number(weight),
            height: Number(height),
            age: Number(age),
            goal,
            gender
        });

        existingUser.weight = weight;
        existingUser.height = height;
        existingUser.age = age;
        existingUser.dailyCalorieTarget = dailyCalorietarget;
        existingUser.goal = goal;
        existingUser.gender = gender;
        if (profilePicUrl) existingUser.profilePic = profilePicUrl;

        await existingUser.save();

        res.status(200).json({
            message: "User onboarded successfully",
            user: existingUser
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

export const updatedProfile = async (req, res) => {
    try {
        const userId = req.user._id; 

        const { fullName, weight, height, goal, dailyCalorieTarget } = req.body; 

        const avatar = req.files?.profilePic?.[0];
        let imageUrl = "";

        if (avatar) {
            const image = await uploadOnCloudinary(avatar.path);
            if (!image || !image.url) {
                return res.status(401).json({
                    message: "Failed to upload to Cloudinary"
                });
            }
            imageUrl = image.secure_url;
        }

        const updated = {
            fullName,
            weight,
            height,
            dailyCalorieTarget,
            goal,
            ...(imageUrl && { profilePic: imageUrl }) 
        };

        const updatedDetails = await User.findByIdAndUpdate(
            userId,
            updated,
            { new: true }
        );

        if (!updatedDetails) {
            return res.status(404).json({
                message: "User not found for update"
            });
        }

        res.status(200).json({
            message: "User successfully updated their profile",
            user: updatedDetails
        });

    } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({
            message: "Failed to update profile"
        });
    }
};
