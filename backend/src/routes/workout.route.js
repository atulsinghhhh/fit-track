import Router from "express"
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { workoutlog } from "../controllers/workout.controller.js";

const router=Router();

router.get("/",verifyjwt,workoutlog)


export default router