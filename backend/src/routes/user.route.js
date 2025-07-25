import Router from "express"
import { getProfile, updatedProfile, userLogin, userLogout, userOnboard, userSignup } from "../controllers/user.controler.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const router=Router();

router.post("/signup",userSignup)
router.post("/login",userLogin)
router.post("/logout",userLogout)

router.post("/onboard",verifyjwt,userOnboard)

router.get("/me",verifyjwt,getProfile)
router.put("/profile-update",verifyjwt,updatedProfile)

export default router