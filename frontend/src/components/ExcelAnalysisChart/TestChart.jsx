import React from 'react'
import Plot from 'react-plotly.js';

const TestChart = () => {

    const file  = [
        {x: 10, y:20, z:30},
        {x: 15, y:25, z:35},
        {x: 20, y:30, z:25},
        {x: 25, y:35, z:15},
        {x: 30, y:40, z:5},
    ]

    const x = file.map((d) => d.x);
    const y = file.map((d) => d.y);
    const z = file.map((d) => d.z);
  return (
    <div>
        <div>
            <Plot 
                data={[
                    {
                        x: [1, 2, 3, 4],
                        y: [10, 15, 13, 17],
                        type: 'bar',
                        mode: 'lines+markers',
                        marker: { color: 'blue' },
                    }
                ]}
                layout = {{
                    title: 'Simple plotly test',
                }}
                useResizeHandler
                style={{ width: '100%', height: '100%'}}
            />
        </div>
        <div>
            <Plot
                data = {[
                    {
                        x: x, y: y, z: z,
                        type: 'surface',
                        mode: 'markers',
                        marker: {
                            size: 8,
                            color: z,
                            colorscale: 'Jet',
                            opacity: 0.9,
                        },
                    },
                ]}
                layout={{
                    title: '3D sactter chart',
                    scene: {
                        xaxis: { title: 'X Axis'},
                        yaxis: { title: 'Y Axis'},
                        zaxis: { title: 'Z Axis'},
                    },
                    autosize: true,
                }}
                useResizeHandler
                style={{ width: '100%', height: '100%' }}
            />
        </div>
      
    </div>
  )
}

export default TestChart
