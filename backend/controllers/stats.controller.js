import ExcelRecord from "../models/excelRecord.model.js";

export const getUploadStats = async(req, res) => {
    try {
        const totalUsers = await ExcelRecord.distinct( 'user');

        //Calculate last months date
        const today = new Date();
        const lastMonth = new Date();

        lastMonth.setMonth(today.getMonth() -1);

        //get distinct users who uploaded last month
        const lastMonthUsers = await ExcelRecord.distinct('user', {
            uploadedAt: { $gte: lastMonth, $lte: today }
        });

        //cal percentage
        const percentage = totalUsers.length === 0 ? 0 : ((lastMonthUsers.length / totalUsers.length) * 100).toFixed(2);

        res.status(200).json({ 
            message: "Successfully Getting Stats",
            totalUsers: totalUsers.length,
            lastMonthUsers: lastMonthUsers.length,
            percentageLastMonth: `${percentage}%`
        });

    } catch (error) {
        console.error(`Error in stats controller: ${error} `);
        res.status(500).json({ error: 'Internal server error'})
    }
    
} 