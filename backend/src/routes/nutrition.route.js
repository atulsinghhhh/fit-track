import Router from "express"
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { getDailyInsights, getDailyNutritionSummary, getWeeklyNutrition } from "../controllers/nutrition.controller.js";



const router=Router();

router.use(verifyjwt);

router.get("/daily",getDailyNutritionSummary)
router.get("/weekly",getWeeklyNutrition);
router.get("/insights",getDailyInsights);



export default router