import ChartHistory from '../models/history.model.js'
//import XLSX from 'xlsx'

//save new chart
export const saveChart = async (req, res) => {
    try {
        const { title, chartType, fileSize, chartData, relatedFile } = req.body;

        const newChart = new ChartHistory({
            user: req.user._id,
            title,
            relatedFile,
            chartType,
            fileSize,
            chartData
        });

        await newChart.save();
        res.status(201).json({ message: 'Chart saved', id: newChart._id })
    } catch (error) {
        console.error(`Error in Save chart controller: ${error} `);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//Fetch all charts for user
export const getChartHistory = async(req, res) => {
    try {
        const charts = await ChartHistory.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(charts);
    } catch (error) {
        console.error(`Error in get Chart History Controller: ${error}`)
        res.status(500).json({ error: 'Internal server error' })
    }
}

//Delete chart by ID
export const deleteChart = async(req, res) => {
    try {
        await ChartHistory.deleteOne({ _id: req.params.id, user: req.user._id });
        res.json({ message: 'Chart deleted' })
    } catch (error) {
        console.error( `Error in Delete Chart Controller: ${error}`)
        res.status(500).json({ error: 'Internal server error' })
    }
}

//Download chart as Excel
{/* export const downloadChart = async(req, res) => {
    try {
        const chart = await ChartHistory.findById(req.params.id);
 
        if (!chart) 
            return res.status(404).json({ error: 'Chart not found' });

        const worksheet = XLSX.utils.json_to_sheet(chart.chartData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "ChartData");
        const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        res.setHeader('Content-Disposition', 'attachment; filename="chart_data.xlsx"');
        res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);

    } catch (error) {
        console.error(`Error in Download Chart Controller: ${error}`)
        res.status(500).json({ error: 'Internal Server Error'})
    }
} */}

export const downloadChart = async(req, res) => {
    try {
        const chart = await ChartHistory.findOne({_id: req.params.id, user: req.user._id});
 
        if (!chart || !chart.imagePath ) {
            return res.status(404).json({ error: 'Chart image not found' });
        }

        const filePath = path.join(__dirname, '..', chart.imagePath);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File does not exist on server' })
        }

        return res.download(filePath, `${chart.fileName || 'chart'}.png`);

    } catch (error) {
        console.error(`Error in Download Chart Controller: ${error}`)
        res.status(500).json({ error: 'Internal Server Error'})
    }
} 

