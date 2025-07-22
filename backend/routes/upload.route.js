import express from "express"
import upload from "../middleware/uploadRouter.js";
import { downloadExcelFile, getMostRecentExcelUpload, getMyExcelRecord, handleExcelUpload } from "../controllers/upload.controller.js";
import protectRoute from "../middleware/protectRouter.js";

const router = express.Router();

router.post('/upload-excel', protectRoute ,upload.single('file'), handleExcelUpload);
router.get('/record/:username', protectRoute, getMyExcelRecord);
router.get('/recent', protectRoute, getMostRecentExcelUpload);
router.get('/download/:id', protectRoute, downloadExcelFile);

export default router;

