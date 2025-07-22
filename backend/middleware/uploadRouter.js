import multer from "multer";
import path from 'path';
import { fileURLToPath } from "url";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if(ext !== '.xlsx' && ext !== '.xls'){
        return cb(new Error('Only Excel files are allowed'), false);
    }
    cb(null, true);
};


const upload = multer({storage, fileFilter});

export default upload;


