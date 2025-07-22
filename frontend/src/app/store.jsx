import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import excelReducer from '../features/excel/excelSlice'
import aiInsightReducer from '../features/insight/insightSlice'
import statsReducer  from '../features/statas/statsSlice';
import historyReducer from '../features/history/historySlice'

export const store = configureStore({
    reducer : {
        auth: authReducer,
        excel: excelReducer,
        aiInsight: aiInsightReducer,
        cardstats: statsReducer,
        history: historyReducer,
    }
})