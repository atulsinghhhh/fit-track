import Router from "express"
import { verifyjwt } from "../middlewares/auth.middleware.js"
import { createfood, deleteFood, getAllFood, getFoodsByDate, getMealsByDate, updateFood } from "../controllers/food.controller.js";


const router=Router();

router.use(verifyjwt)

router.post("/",createfood);
router.get("/",getAllFood);
router.get("/by-date",getFoodsByDate);
router.get("/meals",getMealsByDate)
router.delete("/:id",deleteFood)
router.put("/:id",updateFood)


export default router