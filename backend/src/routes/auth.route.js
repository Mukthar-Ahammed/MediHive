import express from "express"
import { checkAuth, signup, updateProfile } from "../controllers/auth.controllers.js";
import { login } from "../controllers/auth.controllers.js";
import { logout } from "../controllers/auth.controllers.js";
import { protectRoute } from "../../middleware/auth.middleware.js";

const router= express.Router();

router.post("/Signup",signup)

router.post("/Login",login)

router.post("/Logout",logout)

router.put('/update-profile',protectRoute,updateProfile)

router.get("/check" ,protectRoute,checkAuth)

export default router