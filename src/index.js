import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import YarnBound from "yarn-bound";
import { dialogue as dialogue1 } from "./lessons/lesson_1.js";
import reactStringReplace from "react-string-replace";
import "animate.css";
import "./index.css";
/*
import useSound from 'use-sound';
import trumpetSound from './assets/sounds/trumpets.mp3';
import crystalLoopSound from './assets/sounds/crystalloop.wav';
import crystalGlassSound from './assets/sounds/crystalglass.wav';
*/

function Dialogue({ dialogueItem }) {
    const advanceDialogue = (option = null) => {
        runner.advance(option);
        setDialogueText(generateDialogue(runner.currentResult));
        setImageName(getImageName(runner.currentResult));
    };

    const generateDialogue = (currPage) => {
        if (!currPage.text) {
            return null;
        }
        const speaker = currPage.markup[0].properties.name;
        if (currPage.markup.length > 1) {
            const tagDetails = currPage.markup[1];
            const slicedString = currPage.text.slice(
                tagDetails.position,
                tagDetails.position + tagDetails.length
            );
            return reactStringReplace(
                speaker + ": " + currPage.text,
                slicedString,
                (match, i) => (
                    <span key={i} className={tagDetails.name}>
                        {match}
                    </span>
                )
            );
        } else {
            return (
                <span>
                    {speaker}: {currPage.text}
                </span>
            );
        }
    };

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

    const handleKeyDown = event => {
        if (event.key === 'r' && dialogueText) {
            advanceDialogue();
        }
    };

    const [runner] = useState(new YarnBound({ dialogue: dialogueItem }));
    const [dialogueText, setDialogueText] = useState(
        generateDialogue(runner.currentResult)
    );
    const [imageName, setImageName] = useState(getImageName(runner.currentResult));
    return (
        <div tabIndex={0} onKeyDown={handleKeyDown}>
            <h1>Example</h1>
            <ImageDisplayer img_string={imageName} />
            {dialogueText && <DialogueText
                currPage={runner.currentResult}
                dialogueText={dialogueText}
                advanceDialogue={advanceDialogue}
            />}
            {!dialogueText && <DialogueList
                currPage={runner.currentResult}
                advanceDialogue={advanceDialogue}
            />}
            <History
                historyItems={runner.history}
                generateDialogue={generateDialogue}
            />
        </div>
    );
}

function DialogueText({ dialogueText, advanceDialogue }) {
    return (
        <>
            <h3>{dialogueText}</h3>
            <button onClick={() => advanceDialogue()}>Next</button>
        </>
    );
}

function DialogueList({ currPage, advanceDialogue }) {
    const listItems = currPage.options.map((dialogueChoice, index) => (
        <li
            key={index}
            onClick={() => advanceDialogue(index)}
            className="link-button"
        >
            {dialogueChoice.text}
        </li>
    ));
    return (
        <>
            <h2>Choose an option.</h2>
            <ul>{listItems}</ul>
        </>
    );
}

function History({ historyItems, generateDialogue }) {
    const [historyVisibility, setHistoryVisibility] = useState(false);
    const [buttonText, setButtonText] = useState("Show History");
    const handleHistoryVisibility = () => {
        setHistoryVisibility(!historyVisibility);
        setButtonText(historyVisibility ? "Show History" : "Hide History");
    };

    const listItems = historyItems.map((historyItem, index) => (
        <li key={index}>
            {historyItem.text
                ? generateDialogue(historyItem)
                : "You: " + historyItem.options[historyItem.selected].text}
        </li>
    ));

    return (
        <>
            <HistoryVisibilityButton
                handleHistoryVisibility={handleHistoryVisibility}
                buttonText={buttonText}
            />
            {historyVisibility && <ul>{listItems}</ul>}
        </>
    );
}

function HistoryVisibilityButton({ buttonText, handleHistoryVisibility }) {
    return <button onClick={handleHistoryVisibility}>{buttonText}</button>;
}

function ImageDisplayer({ img_string }) {
    if (!img_string) {
        return null;
    }
    console.log(img_string);
    return <img src={require('./assets/images/' + img_string)} style={{ width: "40%", height: "40%" }} alt={img_string}/>
}

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
        <>
            <h1>Canvas</h1>
            <canvas className="canvas"
                onMouseDown={startDraw}
                onMouseUp={stopDraw}
                onMouseMove={draw}
                ref={canvasRef}
            />
        </>
    );
}

function App() {
    return (
        <>
            <Dialogue dialogueItem={dialogue1} />
            <DrawingCanvas />
        </>
    )
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);