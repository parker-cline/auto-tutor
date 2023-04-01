/* Drawing Canvas */
import React, { useRef, useEffect, useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

function CanvasEditor({ handleClearCanvas, handleChangeColor, handleUndoStroke }) {
    // the buttons the user can click to chnage the color, clear the canvas, and undo the last stroke
    return (
        <>
            <button type="button" className="btn btn-success col-sm-2" onClick={handleClearCanvas}><i className="bi bi-trash"></i> Clear</button>
            <button type="button" className="btn btn-dark col-sm-2" onClick={() => handleChangeColor('black')}><i className="bi bi-paint-bucket"></i> Change to Black</button>
            <button type="button" className="btn btn-danger col-sm-2" onClick={() => handleChangeColor('red')}><i className="bi bi-paint-bucket"></i> Change to Red</button>
            <button type="button" className="btn btn-primary col-sm-2" onClick={() => handleChangeColor('blue')}><i className="bi bi-paint-bucket"></i> Change to Blue</button>
            <button type="button" className="btn btn-secondary col-sm-2" onClick={handleUndoStroke}><i className="bi-arrow-counterclockwise"></i> Undo</button>
        </>
    );
}

function DrawingCanvas() {
    const [drawing, setDrawing] = useState(false);

    // these are references to the canvas and details about the canvas
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    
    // array (think of it as a stack) where each element contains information about one stroke.This information is represented as its own array within undoSteps.
    // note each point (x, y) is an object that represents a point on the canvas where the user drew
    const [undoSteps, setUndoSteps] = useState([]); 

    const [currStrokeIndex, setCurrStrokeIndex] = useState(-1); // the index in undoSteps that contains the last stroke the user made

    const startDraw = ({ nativeEvent }) => {
        try {
            const { offsetX, offsetY } = nativeEvent; // x and y coordinates of the mouse
            ctxRef.current.beginPath();
            // start drawing at cursor position
            ctxRef.current.moveTo(offsetX, offsetY);
            // add a new key-value pair to temp, pushing it on top of the stack
            const temp = [...undoSteps, [ctxRef.current.strokeStyle, { offsetX, offsetY }]];

            // set state variables
            setUndoSteps(temp);
            setCurrStrokeIndex(currStrokeIndex + 1);
            setDrawing(true);
        } catch (err) {
            console.error('Cannot draw on canvas (likely cannot find cursor position.)');
        }
    };

    const stopDraw = () => {
        ctxRef.current.closePath();
        setDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!drawing) return;
        try {
            const { offsetX, offsetY } = nativeEvent;
            // draw a tiny line from the last point to the current point where the mouse cursor is (offsetX, offsetY)
            ctxRef.current.lineTo(offsetX, offsetY);
            ctxRef.current.stroke();
            const temp = [...undoSteps];
            // store the current point in the current stroke
            temp[currStrokeIndex].push({ offsetX, offsetY });
            setUndoSteps(temp);
        } catch (err) {
            console.error('Cannot draw on canvas (likely cannot find cursor position.)');
        }

    };

    const handleUndoStroke = () => {
        // note functionality is adapted from
        // https://stackoverflow.com/questions/64611155/canvas-freehand-drawing-undo-and-redo-functionality-in-reactjs
        if (currStrokeIndex > -1) {
            const currentColor = ctxRef.current.strokeStyle;

            // clear canvas
            const canvas = canvasRef.current;
            ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);

            // redraw canvas for everything except the last stroke, drawing each stroke in order
            for (let i = 0; i < currStrokeIndex; i++) {
                // get the ith step
                const currStroke = undoSteps[i];
                // set the color
                ctxRef.current.strokeStyle = currStroke[0];
                // start drawing the stroke
                ctxRef.current.beginPath();
                ctxRef.current.moveTo(currStroke[1].offsetX, currStroke[1].offsetY);
                // move through the remaining points in the stroke, and draw a line to each point
                currStroke.forEach((item, index) => {
                    if (index !== 1 && index !== 0) {
                        ctxRef.current.lineTo(item.offsetX, item.offsetY);
                        ctxRef.current.stroke();
                    }
                });
                ctxRef.current.closePath();
            }

            // set the color back to what it was
            ctxRef.current.strokeStyle = currentColor;

            // remove the last step from the stack (popping it off)
            const temp = [...undoSteps];
            temp.pop();

            // set state variables back
            setCurrStrokeIndex(currStrokeIndex - 1);
            setUndoSteps(temp);
        }
    };

    const handleClearCanvas = () => {
        const canvas = canvasRef.current;
        // clear state variables
        setUndoSteps([]);
        setCurrStrokeIndex(-1);
        // clear canvas
        ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    }

    const handleChangeColor = (colorName) => {
        ctxRef.current.strokeStyle = colorName;
    }

    useEffect(() => {
        // set width and height of canvas to match the window size
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight / 1.5;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight / 1.5}px`;

        // Setting the context to enable us draw
        const ctx = canvas.getContext('2d');
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 5;
        ctxRef.current = ctx;
    }, []);

    return (
        <>
            <div className="col-sm-12">
                <canvas id="drawing-canvas"
                    onMouseDown={startDraw}
                    onMouseUp={stopDraw}
                    onMouseMove={draw}
                    ref={canvasRef}
                    height="140"
                />
            </div>
            <CanvasEditor handleClearCanvas={handleClearCanvas} handleChangeColor={handleChangeColor} handleUndoStroke={handleUndoStroke} />
        </>
    );
}

export default DrawingCanvas;
