import React from 'react';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import YarnBound from 'yarn-bound';
import { dialogue } from './dialogue2.js';
import reactStringReplace from 'react-string-replace';
import 'animate.css';
import useSound from 'use-sound';
import trumpetSound from './assets/sounds/trumpets.mp3';

function Dialogue() {

    const generateDialogue = () => {
        const currPage = runner.currentResult;
        if (currPage.text) {
            if (currPage.markup.length > 1) {
                const tagDetails = currPage.markup[1];
                const slicedString = currPage.text.slice(tagDetails.position, tagDetails.position + tagDetails.length);
                return reactStringReplace(currPage.text, slicedString, (match, i) => (
                    <span key={i} className="animate__animated animate__pulse" style={{ color: tagDetails.name, display: 'inline-block' }}>{match}</span>
                ))
            } else {
                return currPage.text
            }
        }
    }

    const [runner, setRunner] = useState(new YarnBound({ dialogue }));
    const [dialogueText, setDialogueText] = useState(generateDialogue());
    const [playTrumpet] = useSound(trumpetSound);

    const advanceDialogue = (option=null) => {
        runner.advance(option);
        setRunner(runner);
        setDialogueText(generateDialogue());
    }

    const currPage = runner.currentResult;
    if (currPage.options) {
        const listItems = currPage.options.map((dialogueChoice, index) =>
            <li key={index} onClick={() => advanceDialogue(index)}>{dialogueChoice.text}</li>
        );
        return (
            <div>
                <h1>Choose an option.</h1>
                <ul>{listItems}</ul>
            </div>
        );
    } else if (currPage.text) {
        return (
            <div>
                <h3>{currPage.markup[0].properties.name}: {dialogueText}</h3>
                <button onClick={() => advanceDialogue()}>Next</button>
            </div>
        );
    } else {
        return (
            <div>
                <h1>End of dialogue.</h1>
            </div>
        );
    }
}

class DialogueTree extends React.Component {
    render() {
        return (
            <div className="dialogue">
                <Dialogue />
            </div>
        );
    }
}

// ========================================

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <DialogueTree />
);

