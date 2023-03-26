import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import YarnBound from "yarn-bound";
import { dialogue as dialogue1 } from "./lessons/lesson_1.js";
import NavBar from "./navBar.js";
import DrawingCanvas from "./canvas.js";
import FunctionPlot from "./functionPlot.js";

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

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fontsource/work-sans";
import "animate.css";
import "./index.css";

addStyles() // needed for mathquill library

/* Customize Page */

function FunctionTypeSetter({ functionType, setFunctionType, checked }) {
    return (
        <>
            <input className="btn-check" type="radio" id={functionType} name="functionType" value={functionType} checked={checked} onChange={(e) => setFunctionType(e.target.value)} />
            <label htmlFor={functionType} className="btn btn-success">{functionType.charAt(0).toUpperCase() + functionType.slice(1)}</label>
        </>
    )
}

function ChecklistItem({ testFunc, itemDescription }) {
    return (
        <li className="list-group-item" style={testFunc() ? { 'color': 'black' } : { 'color': 'red' }}>
            {itemDescription} {testFunc() && <span className="badge bg-success">✓</span>}
        </li>
    );

}

function CoefficientSetter({ coeff, setCoeff, label }) {
    return (
        <>
            <StaticMathField>{label}</StaticMathField>
            <EditableMathField
                latex={coeff}
                onChange={(mathField) => {
                    setCoeff(mathField.latex())
                }} />
        </>
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
        return (xInterceptPositiveCheck() && xInterceptBoundsCheck() && heightCheck() && yInterceptallFieldsFilledCheck());
    }

    const navigate = useNavigate();
    const handleStartLesson = () => {
        const functionString = functionType === 'quadratic' ? `${a}x^2 + ${b}x + ${c}` : `${a}x + ${b}`;
        const xIntercepts = functionType === 'quadratic' ? getQuadraticXIntercepts() : getLinearXIntercepts();
        navigate('/lesson', { state: { functionType: functionType, studentName: studentName, functionString: functionString, xBounds: xBounds, yBounds: yBounds, xIntercepts: xIntercepts } });
    }

    return (
        <>
            <div className="function-selector-screen container p-3">
                <div className="row">
                    <div className="col-sm-4">

                        <h1>Choose the type of equation</h1>
                        <FunctionTypeSetter functionType="linear" selectedFunctionType={functionType === 'linear'} setFunctionType={setFunctionType} />
                        <FunctionTypeSetter functionType="quadratic" checked={functionType === 'quadratic'} setFunctionType={setFunctionType} />

                        <h1>Enter the equation you want to plot</h1>
                        <CoefficientSetter coeff={a} setCoeff={setA} label={'f(x) ='} />
                        <CoefficientSetter coeff={b} setCoeff={setB} label={functionType === 'quadratic' ? 'x^2 +' : 'x +'} />
                        {functionType === 'quadratic' && <CoefficientSetter coeff={c} setCoeff={setC} label={'x +'} />}

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
                        <input type="text" className="form-control" value="TestName" onChange={e => setStudentName(e.target.value)} />
                    </div>

                    <div className="col-sm-4">
                        <FunctionPlot functionString={functionType === 'quadratic' ? `${a}x^2 + ${b}x + ${c}` : `${a}x + ${b}`} xBounds={xBounds} yBounds={yBounds} factor={3.5} />
                    </div>

                    <div className="col-sm-4">
                        <h3>Checklist</h3>
                        <ul className="list-group">
                            <ChecklistItem itemDescription={<StaticMathField>f(0) > 0</StaticMathField>} testFunc={heightCheck} />
                            <ChecklistItem itemDescription='There is some x-intercept with an x-value greater than 0' testFunc={xInterceptPositiveCheck} />
                            <ChecklistItem itemDescription='The x-intercept(s) are visible within the selected x-bounds' testFunc={xInterceptBoundsCheck} />
                            <ChecklistItem itemDescription='The y-intercept is visible within the selected y-bounds' testFunc={yInterceptBoundsCheck} />
                            <ChecklistItem itemDescription='All fields are filled' testFunc={allFieldsFilledCheck} />
                        </ul>
                        <button className="btn btn-primary" onClick={handleStartLesson} disabled={!isValidSetup()}>Start Lesson</button>
                    </div>

                </div>
            </div>
        </>
    );
}

/* Main Chat Page */

function ChatMessageLeft({ index, children }) {
    return (
        <div key={index} className="chat-message p-2">
            {children}
        </div>
    );
}

function ChatMessageRight({ index, children }) {
    return (
        <div key={index} className="p-3 chat-message right">
            {children}
        </div>
    );
}

function ChatBox({ chatMessages }) {
    return (
        <div id="chat-box" className="lesson-column border overflow-y-auto">{chatMessages}</div>
    );
}

function ImageDisplayer({ imgString }) {
    if (!imgString) {
        return null;
    }
    try {
        const imgSrc = require('./assets/images/' + imgString);
        return <img src={imgSrc} className="img-fluid" alt={imgString} />;
    } catch (err) {
        console.error(`Error displaying the image ${imgString}: ${err}`);
        return <p>Error displaying image</p>;
    }
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

    const generateTextBox = (currPage, index) => {
        const imageName = getImageName(currPage);
        return (
            <ChatMessageLeft index={index}>
                {imageName && <ImageDisplayer imgString={imageName} />}
                <h6>{currPage.text}</h6>
            </ChatMessageLeft>
        );
    };

    const generateOptionsBox = (currPage, index) => {
        const listItems = currPage.options.map((dialogueChoice, index) => (
            <li key={index} className="link-button" onClick={() => selectChoice(index)}>
                {dialogueChoice.text}
            </li>
        ));
        return (
            <ChatMessageRight index={index}>
                <h2>Choose an option.</h2>
                <ul>
                    {listItems}
                </ul>
            </ChatMessageRight>
        );
    }

    const generateSelectedOptionsBox = (currPage, index) => {
        return (
            <ChatMessageRight index={index}>
                <h2>{currPage.options[currPage.selected].text}</h2>
            </ChatMessageRight>
        );
    }

    const generateDialogue = (historyItems) => {
        const chatMessageList = historyItems.map((historyItem, index) => (
            historyItem.options ? generateSelectedOptionsBox(historyItem, index) : generateTextBox(historyItem, index)
        ));
        if (runner.currentResult.text !== "End of example.") {
            chatMessageList.push(generateOptionsBox(runner.currentResult));
        } else {
            chatMessageList.push(generateTextBox(runner.currentResult))
        }
        return chatMessageList;
    }

    const selectChoice = (idx) => {
        runner.advance(idx);
        fastForward(runner);
        setRunnerHistory(generateDialogue(runner.history));
    }

    const initializeHistory = (runner) => {

        const x1Coords = "(" + lessonInfo.xIntercepts[0].toString() + ", 0)"
        const x2Coords = lessonInfo.functionType === 'linear' ? "none" : "(" + lessonInfo.xIntercepts[1].toString() + ", 0)"
        const answerCoords = lessonInfo.functionType === 'linear' ? x1Coords : x2Coords
        const x1Num = lessonInfo.xIntercepts[0].toString();
        const x2Num = lessonInfo.functionType === 'linear' ? "none" : lessonInfo.xIntercepts[1].toString();
        const answerNum = lessonInfo.functionType === 'linear' ? x1Num : x2Num
        const linearity = lessonInfo.functionType === 'linear' ? "true" : "false"

        const variables = {
            'linearity': linearity,
            'studentName': lessonInfo.studentName,
            'x1': x1Coords,
            'x2': x2Coords,
            'x1Num': x1Num,
            'x2Num': x2Num,
            'answerNum': answerNum,
            'answerCoords': answerCoords,
            'functionString': lessonInfo.functionString
        }

        for (const key in variables) {
            runner.runner.variables.set(key, variables[key]);
        }

        fastForward(runner);
        return generateDialogue(runner.history);
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
            <div className="container p-3">
                <h1>AutoTutor</h1>
                <h2>Automated, adaptive, personalized math tutoring in algebra</h2>
                <Link to={'/setup'}>Setup Lesson</Link>
            </div>
        </>
    );
}

/* Routing */

function ErrorBoundary() {
    return (
        <>
            <h1>Looks like you've encountered an error.</h1>
            <p>If you see this message, you should contact Parker. Might be an issue. For now...</p>
            <Link to={'/setup'}>Go back to the setup page.</Link>
        </>
    )
}

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
        element: <Homepage />,
        errorElement: <ErrorBoundary />
    }
]);


const container = document.getElementById("root");
const root = createRoot(container);
root.render(

    <React.StrictMode>
        <NavBar />
        <RouterProvider router={router} />
    </React.StrictMode>
);