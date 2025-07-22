import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const getAIInsight = async( req, res ) => { 
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data) || data.length === 0) {
            return res.status(400).json({ error: "No data provided." });
        }

        const prompt = `You are a data analyst. Provide insights 
         for the following Excel data: ${JSON.stringify(data.slice(0, 20), null, 2)}`;

        const model = genAI.getGenerativeModel({ model:'models/gemini-pro' }); 

         const result = await model.generateContent(prompt);
         const response = await result.response;
         const text = await response.text();

         res.status(200).json({ insight: text });

    } catch (error) {
        console.error(`Error in Gemini AI Insight Controller : ${error}`);
        res.status(500).json({ error: "Internal server error" })
    }
   
}

export default getAIInsight;
