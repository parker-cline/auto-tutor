/* Function Plotter */

import React, { useState, useEffect } from 'react';
import functionPlot from 'function-plot';

function FunctionPlot({ functionString, xBounds, yBounds, factor }) {
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    useEffect(() => {
        try {
            functionPlot({
                target: '#plot',
                disableZoom: true,
                data: [{
                    fn: functionString,
                    skipTip: true
                }],
                grid: true,
                width: windowSize[0] / factor,
                height: windowSize[1] / 1.25,
                xAxis: { domain: xBounds },
                yAxis: { domain: yBounds },
            });
        } catch (e) {
            console.log("Error plotting function: ", e);
        }
    }, [functionString, xBounds, yBounds, windowSize, factor]);

    return (
        <div id="plot"></div>
    );
}

export default FunctionPlot;