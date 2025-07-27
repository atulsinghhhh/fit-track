import { Food } from "../models/foodlog.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose"

export const getDailyNutritionSummary=async(req,res)=>{
    try {
        const {date}=req.query;

        // get food log for the day
        const userId=req.user._id

        // console.log("Date: ",date)

        const start=new Date(date + "T00:00:00.000Z");
        const end=new Date(date + "T23:59:59.999Z")

        const foods=await Food.find({userId,createdAt: {
            $gte: start,
            $lte: end
        }});

        // calculate total macros
        const totals=foods.reduce((acc,food)=>{
            acc.calories+=food.calories,
            acc.protein+=food.protein,
            acc.carbs+=food.carbs,
            acc.fats+=food.fats

            return acc;
        }, {calories: 0,protein: 0,carbs: 0,fats: 0});

        // get user daily goal

        const user=await User.findById(userId);
        const calorieTarget=parseInt(user.dailyCalorieTarget) || 2000

        const goal = {
            calories: calorieTarget,
            protein: Math.round((calorieTarget * 0.3) / 4), 
            carbs: Math.round((calorieTarget * 0.4) / 4),   
            fats: Math.round((calorieTarget * 0.3) / 9),    
        };

        // Calculate difference from goal
        const diff = {
            calories: totals.calories - goal.calories,
            protein: totals.protein - goal.protein,
            carbs: totals.carbs - goal.carbs,
            fats: totals.fats - goal.fats,
        };

        res.status(200).json({
            foods,
            totals,
            goal,
            diff
        })

    } catch (error) {
        res.status(500).json({
            message: "failed to get daily summary"
        })
    }
}


export const getWeeklyNutrition=async(req,res)=>{
    try {
        const {start}=req.query
        const userId=req.user.id;

        const startDate=new Date(start+ "T00:00:00.000Z");
        const endDate=new Date(new Date(startDate).setDate(startDate.getDate()+6))

        const data=await Food.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    createdAt: {$gte: startDate , $lte: endDate}
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }},
                    calories: { $sum: "$calories" },
                    protein: { $sum: "$protein" },
                    carbs: { $sum: "$carbs" },
                    fats: { $sum: "$fats" }
                }
            },
            {
                $sort: {_id:1}
            }
        ])

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "failed to fetch the previous 7 data"
        })
    }
}


export const getDailyInsights=async(req,res)=>{
    try {
        const {date}=req.query;
        const userId=req.user._id

        const start=new Date(date + "T00:00:00.000Z");
        const end=new Date(date + "T23:59:59.999Z")

        const foods = await Food.find({ userId, createdAt: {
            $gte: start,
            $lte: end
        }});

        const totals = foods.reduce((acc, food) => {
            acc.calories += food.calories;
            acc.protein += food.protein;
            acc.carbs += food.carbs;
            acc.fats += food.fats;
            return acc;
        }, { calories: 0, protein: 0, carbs: 0, fats: 0 });

        const user = await User.findById(userId);
        const calorieTarget = parseInt(user.dailyCalorieTarget) || 2000;

        const insights=[];

        if(totals.calories>calorieTarget){
            insights.push("you are over your calories goal by "+ (totals.calories-calorieTarget));
        } else if(totals.calories <calorieTarget -200){
            insights.push("You're under-eating. Consider a healthy snack.");
        }

        const totalMacros = totals.protein + totals.carbs + totals.fats;

         if (totals.carbs > totalMacros * 0.6) {
            insights.push("Your carb intake is too high today.");
        }

        if (totals.protein < totalMacros * 0.15) {
            insights.push("You need more protein for muscle maintenance.");
        }

        res.status(200).json({
            date,
            totals,
            insights
        });
    } catch (error) {
        res.status(500).json({
            message: "failed to fetch these data"
        })
    }
}