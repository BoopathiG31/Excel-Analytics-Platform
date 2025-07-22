import express from 'express'
import protectRoute from '../middleware/protectRouter.js';
import { deleteChart, downloadChart, getChartHistory, saveChart } from '../controllers/history.controller.js';

const router = express.Router();

router.post('/history-chart', protectRoute, saveChart);
router.get('/chart-history', protectRoute, getChartHistory);
router.delete('/delete-history/:id', protectRoute, deleteChart);
//router.get('/chart-history/:id/download', protectRoute, downloadChart);
router.get('/download-history/:id', protectRoute, downloadChart);

export default router; 