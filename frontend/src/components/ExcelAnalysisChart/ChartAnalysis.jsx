import React, { useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Plot from 'react-plotly.js';
import { fetchExcelFile } from '../../features/excel/excelSlice';
import { saveHistory } from '../../features/history/historySlice';

const ChartAnalysis = ({username, token}) => {

    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [z, setZ] = useState('');
    const [chartType, setChartType] = useState('scatter');
    
    const dispatch = useDispatch();
    const { files, loading, error } = useSelector((state) => state.excel);

    useEffect(() => {
        if(username && token) {
            dispatch(fetchExcelFile({ username, token }));
        }
    }, [username, token, dispatch]);

    if (!files || files.length === 0)
       return <p>No data available for charts.</p>;

    const fileData = files[0]?.data || [];

    const columns = fileData.length > 0 ? Object.keys(fileData[0]) : [];

    const rawX = fileData.map((d) => Number(d?.[x])).filter((n) => !isNaN(n));
    const rawY = fileData.map((d) => Number(d?.[y])).filter((n) => !isNaN(n));
    const rawZ = fileData.map((d) => Number(d?.[z])).filter((n) => !isNaN(n));

    const minLength = Math.min(rawX.length, rawY.length, rawZ.length || Infinity);
    const xField = rawX.slice(0, minLength);
    const yField = rawY.slice(0, minLength);
    const zField = rawZ.slice(0, minLength);

    const hasSavedRef = useRef(false);

    useEffect(() => {
        if (!x || !y || !chartType)
            return;

        const title = `${chartType.toUpperCase()} Chart: ${x} vs ${y}${z ? ` vs ${z}` : ''}`
        const relatedFile = files[0]?.fileName || 'unknow.xlsx';

        dispatch(saveHistory({ title, chartType, relatedFile}))

        hasSavedRef.current = true;
    }, [x,y,z,chartType, files, xField, yField, zField, dispatch])



  return (
    <div className="bg-gradient-to-r from-start to-yellow-400">
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-2'>
            <select 
                className='p-2 border rounded text-white bg-gray-950' 
                value={x}
                onChange={(e) => setX(e.target.value)}
            >
                <option>Select X Axis</option>
                {columns.map((col) => ( <option key={col} value={col}>{col}</option> ))}
            </select>

            <select 
                className='p-2 border rounded text-white bg-gray-950'
                value={y}
                onChange={(e) => setY(e.target.value)}
            >
                <option value="">Select Y Axis</option>
                {columns.map((col) => ( <option key={col} value={col}>{col}</option> ))}
            </select>

            <select 
                className='p-2 border rounded text-white bg-gray-950' 
                value={z}
                onChange={(e) => setZ(e.target.value)}
            >
                <option value="">Select Z Axis (optinal for 3D)</option>
                {columns.map((col) => ( <option key={col} value={col}>{col}</option> ))}
            </select>


            <select value={chartType} onChange={(e) => setChartType(e.target.value)} className='p-2 border rounded text-white bg-gray-950'>
                <option value="scatter">2D Scatter</option>
                <option value="bar">2D Bar</option>
                <option value="line">2D Line</option>
                <option value="pie">Pie</option>
                <option value="donut">Donut Chart</option>
                <option value="3d">3D Scatter</option>
                <option value="3dsurface">3D Surface</option>
            </select>
        </div>

        {/*2D Chart*/}
        <div className="flex justify-center">
            { x && y && chartType === 'scatter' && (
                <Plot
                    data={[
                        { 
                            x: xField, 
                            y: yField, 
                            type: 'scatter',
                            mode: 'markers',
                            marker: { color: '#facc15'},
                        },
                    ]}
                    layout={{ 
                            title: `Scatter Chart: ${x} vs ${y}`,
                            xaxis: { title: x },
                            yaxis: { title: y },
                            autosize: true,
                            paper_bgcolor: '#e8e9e3',
                    }}
                    useResizeHandler
                    style = {{ width: '90%', height: '90%' }}
                />
            )}

            { x && y && chartType === 'line' && (
                <Plot
                    data={[
                        { 
                            x: xField, 
                            y: yField, 
                            type: 'scatter',
                            mode: 'lines+markers', 
                            marker: { color: '#facc15'},
                        },
                    ]}
                    layout={{ 
                            title: `Line Chart: ${x} vs ${y}`,
                            xaxis: { title: x },
                            yaxis: { title: y },
                            paper_bgcolor: '#e8e9e3',
                            autosize: true,
                    }}
                    useResizeHandler
                    style = {{ width: '100%', height: '100%' }}
                />
            )}

            { x && y && chartType === 'bar' && (
                <Plot
                    data={[
                        { 
                            x: xField, 
                            y: yField, 
                            type: 'bar', 
                            marker: { color: '#facc15'},
                        },
                    ]}
                    layout={{ 
                        title: `Bar Chart: ${x} vs ${y}`,
                        xaxis: { title: x },
                        yaxis: { title: y },
                        paper_bgcolor: '#e8e9e3',
                        autosize: true,
                    }}
                    useResizeHandler
                    style = {{ width: '100%', height: '100%' }}
                />
            )}

            { x && y && chartType === 'pie' && (
                <Plot
                    data={[
                        { 
                            type: 'pie',
                            labels: fileData.map((d) => d[x]),
                            values: fileData.map((d) => Number(d?.[y])),
                        },
                    ]}
                    layout={{ 
                            title: `Pie Chart: ${x}`,
                            paper_bgcolor: '#e8e9e3',
                    }}
                    useResizeHandler
                    style = {{ width: '100%', height: '100%' }}
                />
            )}

            { x && y && chartType === 'donut' && (
                <Plot
                    data={[
                        { 
                        type: 'pie',
                            hole: 0.4,
                            labels: fileData.map((d) => Number(d?.[x])),
                            values: fileData.map((d) => Number(d?.[y])),
                        },
                    ]}
                    layout={{ 
                        title: `Donut Chart: ${x}`,
                        paper_bgcolor: '#e8e9e3',
                    }}
                    useResizeHandler
                    style = {{ width: '100%', height: '100%' }}
                />
            )}


        {/* 3D Charts*/}

            { x && y && z && chartType === '3d' && (<Plot
                data={[ 
                    {
                        type: 'scatter3d', 
                        mode: 'markers', 
                        x: xField, y: yField, z: zField,
                        marker: { size: 5, color: zField, colorscale: 'Viridis', opacity: 0.8, },

                    }
                ]}
                layout={{ 
                    title: `3D Scatter Chart: ${x} vs ${y} vs ${z}`,
                    scene: {
                        xaxis: { title: x },
                        yaxis: { title: y },
                        zaxis: { title: z },
                    },
                    autosize: true,
                    paper_bgcolor: '#e8e9e3',
                }}
                    useResizeHandler
                    style = {{ width: '100%', height: '100%' }}
            />)}

            { chartType === '3dsurface' && (
                <Plot
                    data={[
                        { 
                            type: 'surface',
                            z: fileData.map(row => Object.values(row).map(Number)),
                            colorscale: 'YlGnBu'
                        },
                    ]}
                    layout={{ 
                            title: `3D Surface Plot`,
                            paper_bgcolor: '#e8e9e3',
                            autosize: true,
                    }}
                    useResizeHandler
                    style = {{ width: '100%', height: '100%' }}
                />
            )}


        </div>
        
    </div>
  )
}

export default ChartAnalysis

