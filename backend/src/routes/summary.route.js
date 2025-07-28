import Router from "express"
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { getDailySummary } from "../controllers/summary.controller.js";


const router=Router();

router.use(verifyjwt);

router.get("/daily",getDailySummary);




export default router