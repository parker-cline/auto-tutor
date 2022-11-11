import React from 'react';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import YarnBound from 'yarn-bound';
import { dialogue } from './lessons/lesson2.js';
import reactStringReplace from 'react-string-replace';
import 'animate.css';
/*
import useSound from 'use-sound';
import trumpetSound from './assets/sounds/trumpets.mp3';
import crystalLoopSound from './assets/sounds/crystalloop.wav';
import crystalGlassSound from './assets/sounds/crystalglass.wav';
*/

function Dialogue() {

    const advanceDialogue = (option = null) => {
        runner.advance(option);
        setDialogueText(generateDialogue(runner.currentResult));
    }

    const generateDialogue = (currPage) => {
        if (!currPage.text) {
            return null;
        }
        const speaker = currPage.markup[0].properties.name;
        if (currPage.markup.length > 1) {
            const tagDetails = currPage.markup[1];
            const slicedString = currPage.text.slice(tagDetails.position, tagDetails.position + tagDetails.length);
            return reactStringReplace(speaker + ": " + currPage.text, slicedString, (match, i) => (
                <span key={i} className="animate__animated animate__pulse" style={{ color: tagDetails.name, display: 'inline-block' }}>{match}</span>
            ));
        } else {
            return (
                <span>{speaker}: {currPage.text}</span>
            );
        }
    }

    const [runner] = useState(new YarnBound({ dialogue }));
    const [dialogueText, setDialogueText] = useState(generateDialogue(runner.currentResult));

    if (dialogueText) {
        return (
            <>
                <DialogueText currPage={runner.currentResult} dialogueText={dialogueText} advanceDialogue={advanceDialogue} />
                <History historyItems={runner.history} generateDialogue={generateDialogue}/>
            </>
        );
    } else {
        return (
            <>
                <DialogueList currPage={runner.currentResult} advanceDialogue={advanceDialogue} />
                <History historyItems={runner.history} generateDialogue={generateDialogue}/>
            </>
        );
    }
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
    const listItems = currPage.options.map((dialogueChoice, index) => 
        <li key={index} onClick={() => advanceDialogue(index)}>{dialogueChoice.text}</li>
    );
    return (
        <>
            <h1>Choose an option.</h1>
            <ul>{listItems}</ul>
        </>
    );
}

function History({ historyItems, generateDialogue }) {

    const [historyVisibility, setHistoryVisibility] = useState(false);
    const [buttonText, setButtonText] = useState('Show History');
    const handleHistoryVisibility = () => {
        setHistoryVisibility(!historyVisibility);
        setButtonText(historyVisibility ? 'Show History' : 'Hide History');
    }

    const listItems = historyItems.map((historyItem, index) =>
        <li key={index}>{historyItem.text ? generateDialogue(historyItem) : 'You: ' + historyItem.options[historyItem.selected].text}</li>
    );

    return (
        <>
            <HistoryVisibilityButton handleHistoryVisibility={handleHistoryVisibility} buttonText={buttonText}/>
            {historyVisibility && <ul>{listItems}</ul>}
        </>
    );
}

function HistoryVisibilityButton({ buttonText, handleHistoryVisibility }) {
    return (
        <button onClick={handleHistoryVisibility} >{buttonText}</button>
    );
}


// ========================================

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Dialogue />
);