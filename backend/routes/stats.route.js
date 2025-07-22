import express from "express";
import { getUploadStats } from "../controllers/stats.controller.js";

const router = express.Router()

router.get('/upload-stats', getUploadStats)

export default router;