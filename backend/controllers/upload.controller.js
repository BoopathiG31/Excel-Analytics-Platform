import XLSX from 'xlsx';
import fs from 'fs';
import ExcelRecord from '../models/excelRecord.model.js';
import path from 'path';

export const handleExcelUpload = async(req, res) => {
    try {
        const filePath = req.file.path;

        if(!req.file){
            return res.status(400).json({ error: 'No file uploaded'})
        }

        //Read Excel file
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: ''});

        //Check if data is valid
        if (!Array.isArray(jsonData) || jsonData.length === 0) {
            fs.unlinkSync(filePath);
            return res.status(400).json(({ error: 'Excel sheet is empty or has no valid rows'}))
        }

        //Save to MongoDB
        const newRecord = new ExcelRecord ({
            user: req.user._id,
            fileName: req.file.originalname,
            size: req.file.size,
            data: jsonData,
        });
        await newRecord.save();

        //delete file after reading
        fs.unlinkSync(filePath);

        res.status(200).json({
            message: 'Excel file uploaded successfully',
            file: {
                name: newRecord.fileName,
                userId: newRecord.user.toString(),
                size: (newRecord.size / 1024).toFixed(2) + ' KB',
                date: new Date(newRecord.uploadedAt).toLocaleString(),
                recordId: newRecord._id, 
                dataCount: jsonData.length, 
            },  
        });
    } catch (error) {
        console.log(`Error in upload controller: ${error}`)
        res.status(500).json({error: "Internal server error"})
        
    }
}

export const getMyExcelRecord = async(req, res) => {
    try {
        const records = await ExcelRecord.find({ user:req.user._id }).sort({ uploadedAt: -1 });

        if(!records) {
            return res.status(400).json({
                error: 'No records found'
            })
        }

        res.status(200).json({
            message: 'Record fetch successfully', 
            data: records,
        });
    } catch (error) {
        console.error(`Error in getExcelRecord controller ${error}`);
        res.status(500).json({error: 'Internal server error'});
    }
};

export const getMostRecentExcelUpload = async(req, res) => {
    try {
        const latestRecord = await ExcelRecord.find({ user:req.user._id }).sort({ uploadedAt: -1 }).limit(1);

        if (!latestRecord || latestRecord.length === 0){
            return res.status(404).json({ error: 'No uploads found' });
        }

        res.status(200).json({ 
            message: 'Most recent file fetched successfully',
            data: latestRecord,
        });
    } catch (error) {
        console.error('Error in getMostRecentExcelUpload:', error);
        res.status(500).json({ error:'Internal server error' })
    }
};

export const downloadExcelFile = async (req, res) => {
    try {
        //find the record
        const record = await ExcelRecord.findOne({ _id: req.params.id, user: req.user._id });

        if (!record)
            return res.status(404).json({ error: 'File not found' });

        //missing or empty data
        if(!Array.isArray(record.data) || record.data.length === 0) {
            return res.status(400).json({ error: 'No data found in this file' })
        }

        //Convert JSON to Excel
        const ws = XLSX.utils.json_to_sheet(record.data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const tempFilePath = path.join('uploads', `download_${record._id}.xlsx`);
        XLSX.writeFile(wb, tempFilePath);

        //Download and cleanup
        res.download(tempFilePath, record.fileName, (err) => {
            if (err) {
                console.error('Download error:', err);
            }
            fs.unlink(tempFilePath, () => {}); //cleanup after download
        });
    } catch (error) {
        console.error( 'Error in downloadExcelFile:', error);
        res.status(500).json({ error: 'Internal server error'});
    }
};