import express from "express"
import { AddFriends, checkAuth, signup, updateProfile } from "../controllers/auth.controllers.js";
import { login } from "../controllers/auth.controllers.js";
import { logout } from "../controllers/auth.controllers.js";
import { protectRoute } from "../../middleware/auth.middleware.js";
import {SearchUser} from "../controllers/auth.controllers.js"

const router= express.Router();

router.post("/Signup",signup)

router.post("/Login",login)

router.post("/Logout",logout)

router.put('/update-profile',protectRoute,updateProfile)

router.get("/check" ,protectRoute,checkAuth)

router.post("/Search-user" ,SearchUser)

router.post("/Add-Friend" ,AddFriends)

export default router