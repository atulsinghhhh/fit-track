import mongoose from "mongoose"

const foodSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    foodName: {
        type: String,
        required: true
    },
    mealType: {
        type: String,
        enum: ["breakfast", "lunch", "dinner", "snacks"],
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        default: 0
    },
    carbs: {
        type: Number,
        default: 0
    },
    fats: {
        type: Number,
        default: 0
    }
},{timestamps: true});

export const Food=mongoose.model("Food",foodSchema);