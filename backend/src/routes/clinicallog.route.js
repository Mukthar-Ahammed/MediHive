import express from 'express';
import { protectRoute } from "../../middleware/auth.middleware.js";
import { clinicallog,LogView,LogDelete } from '../controllers/log.controllers.js';

const router = express.Router();

router.post("/clinicallogs",protectRoute, clinicallog);

router.get("/clinicallogsview",protectRoute, LogView);

router.delete("/clinicallogsdelete/:id",protectRoute,LogDelete);



export default router;
