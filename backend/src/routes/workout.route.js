import Router from "express"
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { deleteWorkout, getAllWorkout, getWorkoutById, updatedWorkout, workoutlog } from "../controllers/workout.controller.js";

const router=Router();

router.use(verifyjwt)

router.post("/",workoutlog);
router.get("/",getAllWorkout);
router.get("/:id",getWorkoutById)
router.put("/:id",updatedWorkout)
router.delete("/:id",deleteWorkout)


export default router