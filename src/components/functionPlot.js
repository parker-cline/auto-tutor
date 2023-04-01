/* Function Plotter */

import React, { useState, useEffect } from 'react';
import functionPlot from 'function-plot';

function FunctionPlot({ functionString, xBounds, yBounds, factor }) {
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    // update window size on resize
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    // plot function using function-plot library.
    // note the use of the factor variable to scale the plot to the window size
    // depending on the column configuration
    // also note the use of useEffect: this is the key to
    // why the function magically changes when the user modifies the coefficients without having to refresh the page. cool!
    useEffect(() => {
        try {
            functionPlot({
                target: '#plot',
                disableZoom: true, // the user can't drag 
                data: [{
                    fn: functionString,
                    skipTip: true  // the user can't hover over the function to see the value
                }],
                grid: true,
                width: windowSize[0] / factor,
                height: windowSize[1] / 1.25,
                xAxis: { domain: xBounds }, // 
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