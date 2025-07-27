import Router from "express"
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { getDailyNutritionSummary } from "../controllers/nutrition.controller.js";



const router=Router();

router.use(verifyjwt);

router.get("/daily",getDailyNutritionSummary)



export default router