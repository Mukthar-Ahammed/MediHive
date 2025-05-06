import express from 'express';
import { predictDisease } from "../controllers/disease.controller.js";

const router = express.Router();

router.post('/predict-disease', predictDisease);

export default router;