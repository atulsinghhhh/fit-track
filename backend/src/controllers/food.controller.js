import { Food } from "../models/foodlog.model.js";

export const createfood=async(req,res)=>{
    try {
        const userId=req.user._id
        const {foodName,mealType,protein,fats,carbs,calories}=req.body
        if(!foodName || !mealType || !protein || !fats || !calories || !carbs ){
            return res.status(400).json({
                message: "all fields are requireds"
            })
        }

        const foodDetails=await Food.create({
            ...req.body,
            userId
        });
        // console.log(foodDetails);

        res.status(201).json({
            message: "user successfully created their food",
            foodDetails
        })
    } catch (error) {
        res.status(500).json({
            message: "failed to create their food log",
            error
        })
    }
}

// TODO: MAKE A CONTROLLER FOR FINDBYID TO DELETE AND UPDATE FOOD LOG 

export const getFoodsByDate=async(req,res)=>{
    try {
        const userId=req.user._id;
        const {date}=req.query

        // console.log("userId: ",userId);
        // console.log("date: ",date);

        if(!date){
            return res.status(401).json({
                message: "Date is required field"
            })
        }

        const start = new Date(`${date}T00:00:00.000Z`);
        const end = new Date(`${date}T23:59:59.999Z`);


        const foods=await Food.find({
            userId,
            createdAt: {$gte: start,$lte: end},
        });

        res.status(200).json({
            message: `Food logs for ${date}`,
            foods
        })
    } catch (error) {
        res.status(500).json({
            message: "failed to fetch food logs by date"
        })
    }
}

export const deleteFood=async(req,res)=>{
    try {
        const userId=req.user._id;
        const { id } = req.params;

        const deletedFood=await Food.deleteOne({_id:id,userId});

        if(!deletedFood){
            return res.status(401).json({
                message: "food is not found"
            })
        }

        if (deletedFood.deletedCount === 0) {
            return res.status(404).json({
                message: "Food item not found or not authorized to delete",
            });
        }

        res.status(201).json({
            message: "successfully deleted their food item",
            deletedFood
        })
    } catch (error) {
        res.status(500).json({
            message: "failed to deleted their food item"
        })
    }
}

export const updateFood=async(req,res)=>{
    try {
        const userId=req.user._id
        const updatedFood=await Food.findByIdAndUpdate(
            {_id: req.user.id,userId},
            req.body,
            {new: true}
        );

        if(!updatedFood){
            return res.status(401).json({
                message: "food is not found"
            })
        }

        res.status(201).json({
            message: "successfully updated their food item",
            updatedFood
        })
    } catch (error) {
        res.status(500).json({
            message: "failed to updated their food item"
        })
    }
}

export const getMealsByDate=async(req,res)=>{
    try {
        const {date}=req.query
        const userId=req.user._id

        const startOfDay = new Date(`${date}T00:00:00.000Z`);
        const endOfDay = new Date(`${date}T23:59:59.999Z`);

        const meals=await Food.find({
            userId,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        })

        res.status(200).json({
            message: "successfully fetch today's meal",
            meals
        })

    } catch (error) {
        res.status(500).json({
            message: "failed to fetch the today meal"
        })
    }
}

export const getAllFood=async(req,res)=>{
    try {
        const userId=req.user._id;
        const foods=await Food.find({userId}).sort({createdAt: -1});

        res.status(200).json({
            message: "Successfully fetch all food items that user is created",
            foods
        })
    } catch (error) {
        res.status(500).json({
            message: "failed to fetch the all food items"
        })
    }
}