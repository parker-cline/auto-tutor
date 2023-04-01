/* Drawing Canvas */
import React, { useRef, useEffect, useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

function CanvasEditor({ handleClearCanvas, handleChangeColor, handleUndoStroke }) {
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


    const [undoSteps, setUndoSteps] = useState({}); // this is a list of points (and the color of the points) that are on this canvas
    const [numSteps, setNumSteps] = useState(0); // this is the number of steps that have been taken

    const startDraw = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent; // x and y coordinates of the mouse
        ctxRef.current.beginPath();
        // move
        ctxRef.current.moveTo(offsetX, offsetY);
        const temp = {
            ...undoSteps,
            [numSteps + 1]: []
        };
        // store the current point in an array
        temp[numSteps + 1].push(ctxRef.current.strokeStyle, { offsetX, offsetY });
        setUndoSteps(temp);
        setNumSteps(numSteps + 1);
        setDrawing(true);
    };

    const stopDraw = () => {
        ctxRef.current.closePath();
        setDrawing(false);
        console.log(undoSteps);
    };

    const draw = ({ nativeEvent }) => {
        if (!drawing) return;
        const { offsetX, offsetY } = nativeEvent;
        // draw a tiny line from the last point to the current point over the mouse cursor
        ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.stroke();
        const temp = {
            ...undoSteps
        };
        // store the current point in an array
        temp[numSteps].push({ offsetX, offsetY });
        setUndoSteps(temp);
    };

    const handleUndoStroke = () => {
        //https://stackoverflow.com/questions/64611155/canvas-freehand-drawing-undo-and-redo-functionality-in-reactjs
        if (numSteps > 0) {
            const currentColor = ctxRef.current.strokeStyle;

            // clear canvas
            const canvas = canvasRef.current;
            ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);

            // redraw canvas for everything except the last stroke
            for (let i = 1; i < numSteps; i++) {
                const temp = undoSteps[i];
                ctxRef.current.strokeStyle = temp[0];
                ctxRef.current.beginPath();
                ctxRef.current.moveTo(temp[1].offsetX, temp[1].offsetY);
                temp.forEach((item, index) => {
                    if (index !== 1 && index !== 0) {
                        ctxRef.current.lineTo(item.offsetX, item.offsetY);
                        ctxRef.current.stroke();
                    }
                });
                ctxRef.current.closePath();
            }

            ctxRef.current.strokeStyle = currentColor;

            const temp = {
                ...undoSteps,
                [numSteps]: []
            };
            setNumSteps(numSteps - 1);
            setUndoSteps(temp);
        }
    };

    const handleClearCanvas = () => {
        const canvas = canvasRef.current;
        setUndoSteps({});
        setNumSteps(0);
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
