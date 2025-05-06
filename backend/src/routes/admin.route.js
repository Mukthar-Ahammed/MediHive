import express from "express";
import { getAllUsers, deleteUser, loginAdmin } from "../controllers/admin.controller.js";
import { verifyAdmin } from "../../middleware/auth.middleware.js";


const router = express.Router();

// Admin login route
router.post("/login", loginAdmin);

router.get('/users', verifyAdmin, getAllUsers);
router.delete('/users/:id', verifyAdmin, deleteUser);


export default router;
