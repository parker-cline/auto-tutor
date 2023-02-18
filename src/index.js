import React, { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import YarnBound from "yarn-bound";
import { dialogue as dialogue1 } from "./lessons/lesson_1.js";
import reactStringReplace from "react-string-replace";

import {
    createBrowserRouter,
    RouterProvider,
    useNavigate,
    useLocation
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

function DrawingCanvas() {
    const [drawing, setDrawing] = useState(false);
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const startDraw = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY);
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
    };

    const handleClearCanvas = () => {
        const canvas = canvasRef.current;
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
            <CanvasEditor handleClearCanvas={handleClearCanvas} handleChangeColor={handleChangeColor} />
        </>
    );
}

function ImageCard({ imgSrc, captionName }) {
    return (
        <div className="col-sm-6">
            <div className="card lesson-column">
                <img className="card-img-top" src={imgSrc} alt="Placeholder" />
                <div className="card-body">
                    <p className="card-text">{captionName}</p>
                </div>
            </div>
        </div>
    );
}

function FunctionPlot({ functionString, xBounds, yBounds }) {
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
        functionPlot({
            target: '#plot',
            data: [{
                fn: functionString
            }],
            grid: true,
            width: windowSize[0] / 2.5,
            height: windowSize[1],
            xAxis: { domain: xBounds },
            yAxis: { domain: yBounds },
        });
    }, [functionString, xBounds, yBounds, windowSize]);

    return (
        <div className="col-sm-6">
            <div id="plot"></div>
        </div>
    );

}

function CanvasEditor({ handleClearCanvas, handleChangeColor }) {
    return (
        <>
            <button type="button" className="btn btn-success col-sm-3" onClick={handleClearCanvas}><i className="bi bi-trash"></i> Clear</button>
            <button type="button" className="btn btn-danger col-sm-3" onClick={() => handleChangeColor('red')}>Change to Red</button>
            <button type="button" className="btn btn-primary col-sm-3" onClick={() => handleChangeColor('blue')}>Change to Blue</button>
        </>
    );
}

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success bg-gradient">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Lesson</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/lesson">Lesson</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/bookmarks">Bookmarks</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

function ChatBox({ chatMessages }) {
    return (
        <div className="col-sm-6">
            <div id="chat-box" className="lesson-column border overflow-y-auto">{chatMessages}</div>
        </div>
    );
}

function ImageDisplayer({ img_string }) {
    if (!img_string) {
        return null;
    }
    return <img src={require('./assets/images/' + img_string)} className="img-fluid" alt={img_string} />
}


function Dialogue({ dialogueItem, functionString, xBounds, yBounds }) {

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
                <i className="bi bi-bookmark-plus bookmark-icon"></i>
                <ImageDisplayer img_string={getImageName(currPage)} />
                <h6>{currPage.text}</h6>
            </div>
        );
    };

    const generateDialogueOptions = (currPage, index) => {
        const listItems = currPage.options.map((dialogueChoice, index) => (
            <li key={index} onClick={() => selectChoice(index)}>
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
        fastForward(runner);
        return generateDialogueElements(runner.history);
    }

    const runner = new YarnBound({ dialogue: dialogueItem });
    const [runnerHistory, setRunnerHistory] = useState(initializeHistory(runner));
    //const imgSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/440px-Image_created_with_a_mobile_phone.png";
    //<ImageCard imgSrc={imgSrc} captionName="test" />
    return (
        <>
            <FunctionPlot functionString={functionString} xBounds={xBounds} yBounds={yBounds} />
            <ChatBox chatMessages={runnerHistory} />
        </>
    );
}

function Lesson() {
    const lessonInfo = useLocation().state;
    console.log(lessonInfo);
    return (
        <>
            <NavBar />
            <div className="container p-3">
                <div className="row">
                    <Dialogue dialogueItem={dialogue1} functionString={lessonInfo.functionString} xBounds={lessonInfo.xBounds} yBounds={lessonInfo.yBounds} />
                    <DrawingCanvas />
                </div>
            </div>
        </>
    );
}

function Customize() {
    const [a, setA] = useState('1');
    const [b, setB] = useState('1');
    const [c, setC] = useState('1');
    const [functionType, setFunctionType] = useState('quadratic');
    const [xBounds, setXBounds] = useState([-5, 5])
    const [yBounds, setYBounds] = useState([-5, 5])

    useEffect(() => {
        document.getElementById('error').innerHTML = '';
        try {
            functionPlot({
                target: '#graph',
                data: [{
                    fn: functionType === 'quadratic' ? `${a}x^2 + ${b}x + ${c}` : `${a}x + ${b}`,
                }],
                grid: true,
                xAxis: { domain: xBounds },
                yAxis: { domain: yBounds },
            });
        } catch {
            document.getElementById('error').innerHTML = 'Invalid function.';
        }
    }, [a, b, c, xBounds, yBounds, functionType])


    const isValidEquation = (type, coeffs) => {
        if (type === 'quadratic') {
            return isValidQuadraticEquation(coeffs[0], coeffs[1], coeffs[2])
        }
        if (type === 'linear') {
            return isValidLinearEquation(coeffs[0], coeffs[1])
        }
        return false
    }

    const isValidLinearEquation = (a, b) => {
        return (b > 0 && -1 * b / a > 0)
    }

    const isValidQuadraticEquation = (a, b, c) => {
        const first_root = (-1 * b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)
        const second_root = (-1 * b - Math.sqrt(b * b - 4 * a * c)) / (2 * a)
        return (first_root > 0 || second_root > 0) && (c > 0)
    }

    const navigate = useNavigate();
    const handleStartLesson = () => {
        const functionString = functionType === 'quadratic' ? `${a}x^2 + ${b}x + ${c}` : `${a}x + ${b}`;
        console.log(functionString);
        navigate('/lesson', { state: { functionString: functionString, xBounds: xBounds, yBounds: yBounds } });
    }

    return (
        <>
            <NavBar />
            <div className="function-selector-screen">
                <h1>Choose the type of equation</h1>
                <input className="btn-check" type="radio" id="quadratic" name="functionType" value="quadratic" checked={functionType === 'quadratic'} onChange={(e) => setFunctionType(e.target.value)} />
                <label htmlFor="quadratic" className="btn btn-success">Quadratic</label>
                <input className="btn-check" type="radio" id="linear" name="functionType" value="linear" checked={functionType === 'linear'} onChange={(e) => setFunctionType(e.target.value)} />
                <label htmlFor="linear" className="btn btn-success">Linear</label>
                <h1>Enter the equation you want to plot</h1>
                <StaticMathField>{'y ='}</StaticMathField>
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
                <div id="graph"></div>
                <div id="error"></div>
                <button className="btn btn-primary" onClick={handleStartLesson} disabled={!isValidEquation(functionType, [a, b, c])}>Start Lesson</button>
            </div>
        </>
    )
}

const router = createBrowserRouter([
    {
        path: "/lesson",
        element: <Lesson />,
    },
    {
        path: "/",
        element: <Customize />,
    },
]);


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);