import express from 'express'
import getAIInsight from '../controllers/aiInsight.Controller.js';

const router = express.Router();

router.post("/ai-insight", getAIInsight)

export default router;
