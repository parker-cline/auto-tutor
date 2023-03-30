/* Main Chat Page */

import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { useLocation } from 'react-router-dom';
import YarnBound from 'yarn-bound';
import FunctionPlot from './components/functionPlot.js';
import DrawingCanvas from './canvas.js';
import { dialogue as lesson1 } from "./lessons/lesson_1.js";

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

function LessonImage({ imgString }) {
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

function ChatBox({ dialogueItem, lessonInfo }) {

    const fastForward = (runner) => {
        while (!runner.currentResult.options) {
            if (runner.currentResult.isDialogueEnd) {
                return;
            }
            runner.advance();
        }
    }

    const getImageName = (currPage) => {
        if (currPage.markup.length > 1) {
            const tagDetails = currPage.markup[1];
            if (tagDetails.name.startsWith("img", 0)) {
                return tagDetails.name;
            }
        }
        return null;
    };

    const generateTextBox = (currPage, index) => {
        if (!currPage.text) {
            return null;
        }
        const imageName = getImageName(currPage);
        return (
            <ChatMessageLeft index={index}>
                {imageName && <LessonImage imgString={imageName} />}
                <h6>{currPage.text}</h6>
            </ChatMessageLeft>
        );
    };

    const generateOptionsBox = (currPage, index) => {
        const listItems = currPage.options.map((userChoice, index) => (
            <li key={index} className="link-button" onClick={() => selectChoice(index)}>
                {userChoice.text}
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

    const generateChatMessages = (historyItems) => {
        const chatMessageList = historyItems.map((historyItem, index) => (
            historyItem.options ? generateSelectedOptionsBox(historyItem, index) : generateTextBox(historyItem, index)
        ));
        if (runner.currentResult.isDialogueEnd) {
            chatMessageList.push(generateTextBox(runner.currentResult));
        } else {
            chatMessageList.push(generateOptionsBox(runner.currentResult));
        }
        return chatMessageList;
    }

    const selectChoice = (idx) => {
        runner.advance(idx);
        fastForward(runner);
        setRunnerHistory(generateChatMessages(runner.history));
    }

    const setVariables = (runner) => {
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
    }

    const initializeHistory = (runner) => {
        setVariables(runner);
        fastForward(runner);
        return generateChatMessages(runner.history);
    }

    const runner = new YarnBound({ dialogue: dialogueItem });
    const [runnerHistory, setRunnerHistory] = useState(initializeHistory(runner));
    return (
        <div id="chat-box" className="lesson-column border overflow-y-auto">{runnerHistory}</div>
    );
}

/* The Lesson Page */

function Lesson() {
    const lessonInfo = useLocation().state;
    return (
        <>
            <div className="container p-3">
                <h2>{lessonInfo.studentName} stands on a balcony and throws a ball to his dog, who is at ground level.</h2>
                <h3>The ball's height (in meters above the ground) <InlineMath>x</InlineMath> seconds after {lessonInfo.studentName} threw it, is modeled by:</h3>
                <div className="equation">
                    <BlockMath math={lessonInfo.functionString} />
                </div>
                <h2>At what time does the ball reach the ground?</h2>
                <br></br>
                <div className="row">
                    <div className="col-sm-6">
                        <FunctionPlot functionString={lessonInfo.functionString} xBounds={lessonInfo.xBounds} yBounds={lessonInfo.yBounds} factor={2.5} />
                    </div>
                    <div className="col-sm-6">
                        <ChatBox dialogueItem={lesson1} lessonInfo={lessonInfo} />
                    </div>
                    <DrawingCanvas />
                </div>
            </div>
        </>
    );
}

export default Lesson;