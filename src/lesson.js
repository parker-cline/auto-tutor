/* Main Chat Page */

import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { useLocation } from 'react-router-dom';
import YarnBound from 'yarn-bound';
import FunctionPlot from './components/functionPlot.js';
import DrawingCanvas from './components/canvas.js';
import { dialogue as lesson1 } from "./lessons/lesson_1.js";

// speech bubble by the tutor
function ChatMessageLeft({ index, children }) {
    return (
        <div key={index} className="chat-message p-2">
            {children}
        </div>
    );
}

// speech bubble by the user, before they select a dialogue option
function ChatMessageRight({ index, children }) {
    return (
        <div key={index} className="p-3 chat-message right">
            {children}
        </div>
    );
}

function LessonImage({ imgString }) {
    // Returns an image element if the image exists in the assets/images folder.
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
        // display all lines of dialogue up to the next choice the user has to make
        while (!runner.currentResult.options) {
            // or stop fastforwarding if the lesson is complete
            if (runner.currentResult.isDialogueEnd) {
                return;
            }
            // otherwise, move to the next line of dialogue
            runner.advance();
        }
    }

    const getImageName = (currPage) => {
        // finds a tag [img_"imgname"] (imgname can be any string) in the dialogue 
        // and returns the tag as a string, if it exists.
        if (currPage.markup.length > 1) {
            const tagDetails = currPage.markup[1];
            if (tagDetails.name.startsWith("img", 0)) {
                return tagDetails.name;
            }
        }
        return null;
    };

    const generateTextBox = (currPage, index) => {
        // generate a text box with the text from the current line of dialogue
        if (!currPage.text) {
            return null;
        }
        const imageName = getImageName(currPage);
        return (
            <ChatMessageLeft index={index}>
                {imageName && <LessonImage imgString={getImageName(currPage)} />}
                <h6>{currPage.text}</h6>
            </ChatMessageLeft>
        );
    };

    const generateOptionsBox = (currPage, index) => {
        // generate a chatbox with a list of choices for the user to choose from
        // listItems is an array of choices as li elements
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
        // generate a text box with the option that the user selected (from a past list of options) on this page 
        return (
            <ChatMessageRight index={index}>
                <h2>{currPage.options[currPage.selected].text}</h2>
            </ChatMessageRight>
        );
    }

    const generateChatMessages = (historyItems) => {
        // for each history item, generate a chat message that is either a list of options or a text box, depending on the type of history item
        const chatMessageList = historyItems.map((historyItem, index) => (
            historyItem.options ? generateSelectedOptionsBox(historyItem, index) : generateTextBox(historyItem, index)
        ));
        // specific edge case for the last line of dialogue
        if (runner.currentResult.isDialogueEnd) {
            chatMessageList.push(generateTextBox(runner.currentResult));
        } else {
            chatMessageList.push(generateOptionsBox(runner.currentResult));
        }
        return chatMessageList;
    }

    const selectChoice = (idx) => {
        // select a choice number "idx" from the list of options
        runner.advance(idx);
        // move the dialogue forward to the next choice the user has to make
        fastForward(runner);
        // update the chat history to be displayed to the user
        setRunnerHistory(generateChatMessages(runner.history));
    }

    const setVariables = (runner) => {
        // set the variables for the dialogue to use
        const x1Coords = "(" + lessonInfo.xIntercepts[0].toString() + ", 0)"
        const x2Coords = lessonInfo.functionType === 'linear' ? "none" : "(" + lessonInfo.xIntercepts[1].toString() + ", 0)"
        const answerCoords = lessonInfo.functionType === 'linear' ? x1Coords : x2Coords
        const x1Num = lessonInfo.xIntercepts[0].toString();
        const x2Num = lessonInfo.functionType === 'linear' ? "none" : lessonInfo.xIntercepts[1].toString();
        const answerNum = lessonInfo.functionType === 'linear' ? x1Num : x2Num
        const linearity = lessonInfo.functionType === 'linear' ? "true" : "false"

        // put it in an object to make the code more readable...
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

        // now it's just one for loop to set all the variables
        for (const key in variables) {
            runner.runner.variables.set(key, variables[key]);
        }
    }

    const initializeHistory = (runner) => {
        // called when the dialogue is first started
        setVariables(runner);
        fastForward(runner);
        return generateChatMessages(runner.history);
    }

    // the runner is the object that runs the dialogue. This is THE key to the whole thing.
    // it's a YarnBound object, which is a wrapper for YarnSpinner.
    const runner = new YarnBound({ dialogue: dialogueItem });
    // the chat history is the list of chat messages that are displayed to the user on the webpage, i.e. all the chat messages encountered thus far
    const [runnerHistory, setRunnerHistory] = useState(initializeHistory(runner));
    return (
        <div id="chat-box" className="lesson-column border overflow-y-auto">{runnerHistory}</div>
    );
}

/* The Lesson Page */

function Lesson() {
    const lessonInfo = useLocation().state; // has a bunch of info about the function that the tutor has inputted on the Customize page
    // Bootstrap containers are used to define two columns: one for the chat box, and one for the function plot
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