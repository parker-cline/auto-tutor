import React, { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import YarnBound from "yarn-bound";
import { dialogue as dialogue1 } from "./lessons/lesson_1.js";
//import reactStringReplace from "react-string-replace";

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

import {
    createBrowserRouter,
    RouterProvider,
    useNavigate,
    useLocation,
    Link,
} from "react-router-dom";
import { addStyles, EditableMathField, StaticMathField } from 'react18-mathquill';
import functionPlot from 'function-plot';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fontsource/work-sans";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import "./index.css";

addStyles()

/* NavBar */
function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success bg-gradient">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">AutoTutor</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/setup">Lesson</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

/* Drawing Canvas */

function DrawingCanvas() {
    const [drawing, setDrawing] = useState(false);
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [undoSteps, setUndoSteps] = useState({});
    const [undo, setUndo] = useState(0);

    // keep track of stroke locations

    const startDraw = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY);
        const temp = {
            ...undoSteps,
            [undo + 1]: []
        };
        temp[undo + 1].push(ctxRef.current.strokeStyle, { offsetX, offsetY });
        setUndoSteps(temp);
        setUndo(undo + 1);
        setDrawing(true);
    };

    const stopDraw = () => {
        ctxRef.current.closePath();
        setDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!drawing) return;
        const { offsetX, offsetY } = nativeEvent;
        ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.stroke();
        const temp = {
            ...undoSteps
        };
        temp[undo].push({ offsetX, offsetY });
        setUndoSteps(temp);
    };

    const handleUndoStroke = () => {
        //https://stackoverflow.com/questions/64611155/canvas-freehand-drawing-undo-and-redo-functionality-in-reactjs
        if (undo > 0) {
            const currentColor = ctxRef.current.strokeStyle;

            // clear canvas
            const canvas = canvasRef.current;
            ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
            // redraw canvas
            for (let i = 1; i < undo; i++) {
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
                [undo]: []
            };
            setUndo(undo - 1);
            setUndoSteps(temp);
        }
    };

    const handleClearCanvas = () => {
        const canvas = canvasRef.current;
        setUndoSteps({});
        setUndo(0);
        ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    }

    const handleChangeColor = (colorName) => {
        ctxRef.current.strokeStyle = colorName;
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        // For supporting computers with higher screen densities, we double the screen density
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

function CanvasEditor({ handleClearCanvas, handleChangeColor, handleUndoStroke }) {
    return (
        <>
            <button type="button" className="btn btn-success col-sm-3" onClick={handleClearCanvas}><i className="bi bi-trash"></i> Clear</button>
            <button type="button" className="btn btn-danger col-sm-3" onClick={() => handleChangeColor('red')}>Change to Red</button>
            <button type="button" className="btn btn-primary col-sm-3" onClick={() => handleChangeColor('blue')}>Change to Blue</button>
            <button type="button" className="btn btn-secondary col-sm-3" onClick={handleUndoStroke}><i className="bi-arrow-counterclockwise"></i> Undo</button>
        </>
    );
}

/* Customize Page */

function ChecklistItem({ func, itemDescription}) {
    return (
        <li className="list-group-item" style={func() ? { 'color': 'black' } : { 'color': 'red' }}>
            {itemDescription} {func() && <span className="badge bg-success">✓</span>}
        </li>
    );

}
function Customize() {
    const [a, setA] = useState('-1');
    const [b, setB] = useState('1');
    const [c, setC] = useState('1');
    const [functionType, setFunctionType] = useState('quadratic');
    const [xBounds, setXBounds] = useState([-5, 5])
    const [yBounds, setYBounds] = useState([-5, 5])
    const [studentName, setStudentName] = useState('TestName');

    const getQuadraticXIntercepts = () => {
        const firstRoot = (-1 * b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)
        const secondRoot = (-1 * b - Math.sqrt(b * b - 4 * a * c)) / (2 * a)
        return [Math.round(firstRoot, 2), Math.round(secondRoot, 2)];
    }

    const getLinearXIntercepts = () => {
        const xIntercept = -1 * b / a;
        return [Math.round(xIntercept, 2)];
    }


    const xInterceptBoundsCheck = () => {
        if (functionType === 'linear') {
            const xIntercepts = getLinearXIntercepts();
            return (xIntercepts[0] >= xBounds[0] && xIntercepts[0] <= xBounds[1]);
        } else {
            const xIntercepts = getQuadraticXIntercepts();
            return (xIntercepts[0] >= xBounds[0] && xIntercepts[0] <= xBounds[1] && xIntercepts[1] >= xBounds[0] && xIntercepts[1] <= xBounds[1]);
        }
    }

    const yInterceptBoundsCheck = () => {
        const constantTerm = (functionType === 'quadratic' ? c : b);
        return (constantTerm >= yBounds[0] && constantTerm <= yBounds[1]);
    }

    const xInterceptPositiveCheck = () => {
        if (functionType === 'linear') {
            return getLinearXIntercepts()[0] > 0;
        } else {
            return getQuadraticXIntercepts()[0] > 0 || getQuadraticXIntercepts()[1] > 0;
        }
    }


    const heightCheck = () => {
        return (functionType === 'linear' ? b > 0 : c > 0);
    }

    const allFieldsFilledCheck = () => {
        if (functionType === 'quadratic' && c === '') {
            return false;
        }
        return (a !== '' && b !== '' && studentName !== '' && xBounds[0] !== '' && xBounds[1] !== '' && yBounds[0] !== '' && yBounds[1] !== '');
    }

    const isValidSetup = () => {
        return (xInterceptPositiveCheck() && xInterceptBoundsCheck() && heightCheck() && allFieldsFilledCheck());
    }

    const navigate = useNavigate();
    const handleStartLesson = () => {
        const functionString = functionType === 'quadratic' ? `${a}x^2 + ${b}x + ${c}` : `${a}x + ${b}`;
        const xIntercepts = functionType === 'quadratic' ? getQuadraticXIntercepts() : getLinearXIntercepts();
        navigate('/lesson', { state: { functionType: functionType, studentName: studentName, functionString: functionString, xBounds: xBounds, yBounds: yBounds, xIntercepts: xIntercepts } });
    }

    return (
        <>
            <NavBar />
            <div className="function-selector-screen container p-3">
                <div className="row">
                    <div className="col-sm-4">

                        <h1>Choose the type of equation</h1>
                        <input className="btn-check" type="radio" id="quadratic" name="functionType" value="quadratic" checked={functionType === 'quadratic'} onChange={(e) => setFunctionType(e.target.value)} />
                        <label htmlFor="quadratic" className="btn btn-success">Quadratic</label>
                        <input className="btn-check" type="radio" id="linear" name="functionType" value="linear" checked={functionType === 'linear'} onChange={(e) => setFunctionType(e.target.value)} />
                        <label htmlFor="linear" className="btn btn-success">Linear</label>
                        <h1>Enter the equation you want to plot</h1>
                        <StaticMathField>{'f(x) ='}</StaticMathField>
                        <EditableMathField
                            latex={a}
                            onChange={(mathField) => {
                                setA(mathField.latex())
                            }}
                        />
                        <StaticMathField>{functionType === 'quadratic' ? 'x^2 +' : 'x +'}</StaticMathField>
                        <EditableMathField
                            latex={b}
                            onChange={(mathField) => {
                                setB(mathField.latex())
                            }}
                        />
                        {functionType === 'quadratic' &&
                            <>
                                <StaticMathField>{'x +'}</StaticMathField>
                                <EditableMathField
                                    latex={c}
                                    onChange={(mathField) => {
                                        setC(mathField.latex())
                                    }}
                                />
                            </>}
                        <h1>Enter the <StaticMathField>{'x'}</StaticMathField>-bounds</h1>
                        <EditableMathField

                            latex={xBounds[0]}
                            onChange={(mathField) => {
                                setXBounds([mathField.latex(), xBounds[1]])
                            }}
                        />
                        <StaticMathField>{'\u2264 x \u2264'}</StaticMathField>
                        <EditableMathField

                            latex={xBounds[1]}
                            onChange={(mathField) => {
                                setXBounds([xBounds[0], mathField.latex()])
                            }}
                        />
                        <h1>Enter the <StaticMathField>{'y'}</StaticMathField>-bounds</h1>
                        <EditableMathField
                            latex={yBounds[0]}
                            onChange={(mathField) => {
                                setYBounds([mathField.latex(), yBounds[1]])
                            }}
                        />
                        <StaticMathField>{'\u2264 y \u2264'}</StaticMathField>
                        <EditableMathField
                            latex={yBounds[1]}
                            onChange={(mathField) => {
                                setYBounds([yBounds[0], mathField.latex()])
                            }}
                        />
                        <h1>Enter the student's name</h1>
                        <input type="text" className="form-control" placeholder="Enter name" onChange={e => setStudentName(e.target.value)} />
                    </div>
                    <div className="col-sm-4">
                        <FunctionPlot functionString={functionType === 'quadratic' ? `${a}x^2 + ${b}x + ${c}` : `${a}x + ${b}`} xBounds={xBounds} yBounds={yBounds} factor={3.5} />
                    </div>
                    <div className="col-sm-4">
                        <h3>Checklist</h3>
                        <ul className="list-group">
                            <ChecklistItem itemDescription={<StaticMathField>f(0) > 0</StaticMathField>} func={heightCheck} />
                            <ChecklistItem itemDescription='There is some x-intercept with an x-value greater than 0' func={xInterceptPositiveCheck} />
                            <ChecklistItem itemDescription='The x-intercept(s) are visible within the selected x-bounds' func={xInterceptBoundsCheck} />
                            <ChecklistItem itemDescription='The y-intercept is visible within the selected y-bounds' func={yInterceptBoundsCheck} />
                            <ChecklistItem itemDescription='All fields are filled' func={allFieldsFilledCheck} />
                        </ul>
                        <button className="btn btn-primary" onClick={handleStartLesson} disabled={!isValidSetup()}>Start Lesson</button>
                    </div>
                </div>
            </div>
        </>
    )
}

/* Function Plotter */

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
        }
    }, [functionString, xBounds, yBounds, windowSize, factor]);

    return (
        <div id="plot"></div>
    );

}

/* Chatting and dialogue  */
function ChatBox({ chatMessages }) {
    return (
        <div id="chat-box" className="lesson-column border overflow-y-auto">{chatMessages}</div>
    );
}

function ImageDisplayer({ imgString }) {
    if (!imgString) {
        return null;
    }
    return <img src={require('./assets/images/' + imgString)} className="img-fluid" alt={imgString} />
}

function Dialogue({ dialogueItem, lessonInfo }) {

    const fastForward = (runner) => {
        while (!runner.currentResult.options) {
            if (runner.currentResult.text === "End of example.") {
                return;
            }
            runner.advance();
        }
    }

    const getImageName = (currPage) => {
        if (!currPage.text) {
            return null;
        }
        if (currPage.markup.length > 1) {
            const tagDetails = currPage.markup[1];
            if (tagDetails.name.startsWith("img", 0)) {
                return tagDetails.name;
            }
        }
        return null;
    };

    const generateDialogueText = (currPage, index) => {
        return (
            <div key={index} className="chat-message p-2">
                <ImageDisplayer imgString={getImageName(currPage)} />
                <h6>{currPage.text}</h6>
            </div>
        );
    };

    const generateDialogueOptions = (currPage, index) => {
        const listItems = currPage.options.map((dialogueChoice, index) => (
            <li key={index} className="link-button" onClick={() => selectChoice(index)}>
                {dialogueChoice.text}
            </li>
        ));
        return (
            <div key={index} className="p-3 chat-message right">
                <h2>Choose an option.</h2>
                <ul>
                    {listItems}
                </ul>
            </div>
        );
    }

    const generateDialogueOptionSelected = (currPage, index) => {
        return (
            <div key={index} className="p-3 chat-message right">
                <h2>{currPage.options[currPage.selected].text}</h2>
            </div>
        );
    }

    const generateDialogueElements = (historyItems) => {
        const listItems = historyItems.map((historyItem, index) => (
            historyItem.options ? generateDialogueOptionSelected(historyItem, index) : generateDialogueText(historyItem, index)
        ));
        if (runner.currentResult.text !== "End of example.") {
            listItems.push(generateDialogueOptions(runner.currentResult));
        } else {
            listItems.push(generateDialogueText(runner.currentResult))
        }
        return listItems;
    }

    const selectChoice = (idx) => {
        runner.advance(idx);
        fastForward(runner);
        setRunnerHistory(generateDialogueElements(runner.history));
    }

    const initializeHistory = (runner) => {

        const x1Coords = "(" + lessonInfo.xIntercepts[0].toString() + ", 0)"
        const x2Coords = lessonInfo.functionType === 'linear' ? "none" : "(" + lessonInfo.xIntercepts[1].toString() + ", 0)"
        const answerCoords = lessonInfo.functionType === 'linear' ? x1Coords : x2Coords
        const x1Num = lessonInfo.xIntercepts[0].toString();
        const x2Num = lessonInfo.functionType === 'linear' ? "none" : lessonInfo.xIntercepts[1].toString();
        const answerNum = lessonInfo.functionType === 'linear' ? x1Num : x2Num
        const linearity = lessonInfo.functionType === 'linear' ? "true" : "false"

        runner.runner.variables.set("linearity", linearity);
        runner.runner.variables.set("studentName", lessonInfo.studentName);
        runner.runner.variables.set("x1", x1Coords);
        runner.runner.variables.set("x2", x2Coords)
        runner.runner.variables.set("x1Num", x1Num);
        runner.runner.variables.set("x2Num", x2Num);
        runner.runner.variables.set("answerNum", answerNum)
        runner.runner.variables.set("answerCoords", answerCoords);
        runner.runner.variables.set("functionString", lessonInfo.functionString);

        fastForward(runner);
        return generateDialogueElements(runner.history);
    }

    const runner = new YarnBound({ dialogue: dialogueItem });
    const [runnerHistory, setRunnerHistory] = useState(initializeHistory(runner));
    return (
        <>
            <div className="col-sm-6">
                <FunctionPlot functionString={lessonInfo.functionString} xBounds={lessonInfo.xBounds} yBounds={lessonInfo.yBounds} factor={2.5} />
            </div>
            <div className="col-sm-6">
                <ChatBox chatMessages={runnerHistory} />
            </div>
        </>
    );
}

/* The Lesson Page */

function Lesson() {
    const lessonInfo = useLocation().state;
    return (
        <>
            <NavBar />
            <div className="container p-3">
                <h2>Antoine stands on a balcony and throws a ball to his dog, who is at ground level.</h2>
                <h3>The ball's height (in meters above the ground) <InlineMath>x</InlineMath> seconds after Antoine threw it, is modeled by:</h3>
                <div className="equation">
                    <BlockMath math={lessonInfo.functionString} />
                </div>
                <h2>At what time does the ball reach the ground?</h2>

                <br></br>
                <div className="row">
                    <Dialogue dialogueItem={dialogue1} lessonInfo={lessonInfo} />
                    <DrawingCanvas />
                </div>
            </div>
        </>
    );
}


/* homepage */
function Homepage() {
    return (
        <>
            <NavBar />
            <div className="container p-3">
                <h1>AutoTutor</h1>
                <p>This homepage will briefly describe what the website is and how to use it. Creating this homepage will be done next week or the week after that, and it should not take but a couple of days because it is predominantly front-end work. For now:</p>
                <Link to={'/setup'}>Setup Lesson</Link>
            </div>
        </>
    );
}

/* Routing */

const router = createBrowserRouter([
    {
        path: "/lesson",
        element: <Lesson />,
    },
    {
        path: "/setup",
        element: <Customize />,
    },
    {
        path: '/',
        element: <Homepage />
    }
]);


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);