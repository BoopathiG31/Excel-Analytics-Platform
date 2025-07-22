import mongoose from "mongoose";

const ChartHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    imagePath: String,
    title: String,
    chartType: String,
    relatedFile: String,
    chartData: Array,
    fileSize: Number,
    createdAt: {
        type: Date, default: Date.now
    }
})

export default mongoose.model( 'ChartHistory', ChartHistorySchema);