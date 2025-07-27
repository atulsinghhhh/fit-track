import Router from "express"
import { verifyjwt } from "../middlewares/auth.middleware.js"
import { createfood, deleteFood, getFoodsByDate, updateFood } from "../controllers/food.controller.js";



const router=Router();

router.use(verifyjwt)

router.post("/",createfood);
router.get("/by-date",getFoodsByDate);
router.delete("/:id",deleteFood)
router.put("/:id",updateFood)


export default router