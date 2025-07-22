import mongoose from "mongoose";

const ExcelRecordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    data: {
        type: Array,
        required: true,
    },
    fileName: String,
    size: Number,
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    }
});

const ExcelRecord = mongoose.model("ExcelRecord", ExcelRecordSchema)
export default ExcelRecord;