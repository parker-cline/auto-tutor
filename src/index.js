import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import YarnBound from "yarn-bound";
import { dialogue as dialogue1 } from "./lessons/lesson_1.js";
import reactStringReplace from "react-string-replace";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fontsource/work-sans";

import "animate.css";
import "./index.css";

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
        <div className="col-sm-12">
            <canvas id="drawing-canvas"
                onMouseDown={startDraw}
                onMouseUp={stopDraw}
                onMouseMove={draw}
                ref={canvasRef}
                height="140"
            />
        </div>
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

function CanvasEditor() {
    return (
        <>
            <button type="button" className="btn btn-success col-sm-3"><i className="bi bi-trash"></i> Clear</button>
            <button type="button" className="btn btn-success col-sm-3"><i className="bi bi-arrow-counterclockwise"></i> Undo</button>
            <button type="button" className="btn btn-success col-sm-3"><i className="bi bi-paint-bucket"></i> Change Color</button>
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
                            <a className="nav-link active" aria-current="page" href="/lessons">Lessons</a>
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

function Dialogue({ dialogueItem }) {

    const generateDialogueText = (currPage, index) => {
        return (
            <div key={index} className="chat-message p-2">
                <i className="bi bi-bookmark-plus bookmark-icon"></i>
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

    const fastForward = (runner) => {
        while (!runner.currentResult.options) {
            if (runner.currentResult.text === "End of example.") {
                return;
            }
            runner.advance();
        }
    }

    const selectChoice = (idx) => {
        console.log(runner.currentResult);
        runner.advance(idx);
        fastForward(runner);
        setRunnerHistory(generateDialogueElements(runner.history));
    }

    const initializeHistory = (runner) => {
        fastForward(runner);
        return generateDialogueElements(runner.history);
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

    const runner = new YarnBound({ dialogue: dialogueItem });
    const [runnerHistory, setRunnerHistory] = useState(initializeHistory(runner));
    const imgSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/440px-Image_created_with_a_mobile_phone.png";

    return (
        <>
            <ImageCard imgSrc={imgSrc} captionName="test" />
            <ChatBox chatMessages={runnerHistory} />
        </>
    );
}

function App() {
    return (
        <>
            <NavBar />
            <div className="container p-3">
                <div className="row">
                    <Dialogue dialogueItem={dialogue1} />
                    <DrawingCanvas />
                    <CanvasEditor />
                </div>
            </div>
        </>
    );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);