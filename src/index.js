import React from "react";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import YarnBound from "yarn-bound";
import { dialogue as dialogue1 } from "./lessons/lesson_1.js";
import { dialogue as dialogue2 } from "./lessons/lesson_2.js";
import reactStringReplace from "react-string-replace";
import "animate.css";
import "./index.css";

import BeachSunset from "./assets/images/beach_sunset.png";
import CartoonAlien from "./assets/images/cartoon_alien.png";
import FlowerSeaside from "./assets/images/flower_seaside_town.png";
import PurpleCrystals from "./assets/images/purple_crystals.png";
import PurpleCrystals2 from "./assets/images/purple_crystals2.png";
import PurpleCrystals3 from "./assets/images/purple_crystals3.png";
import ShiningCrystal from "./assets/images/shining_crystal1.png";
import ShiningCrystal2 from "./assets/images/shining_crystal2.png";
import ShiningCrystal3 from "./assets/images/shining_crystal3.png";
import SleepingAlien from "./assets/images/sleeping_alien.png";
import CajaFruit from "./assets/images/caja_fruit.png";
import MagicBroomstick from "./assets/images/magic_broomstick.png";
import QuaintSeaside from "./assets/images/quaint_seaside_town.png";
import SunsetWaves from "./assets/images/sunset_waves.png";

// note: may later want to refactor this code using https://reactjs.org/docs/hooks-effect.html
// bug: can't highlight entire text with a square bracket tag

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

    const [runner] = useState(new YarnBound({ dialogue: dialogueItem }));
    const [dialogueText, setDialogueText] = useState(
        generateDialogue(runner.currentResult)
    );
    const [imageName, setImageName] = useState(getImageName(runner.currentResult));

    if (dialogueText) {
        return (
            <>
                <Root />
                <h1>Dialogue</h1>
                <ImageDisplayer img_string={imageName} />
                <DialogueText
                    currPage={runner.currentResult}
                    dialogueText={dialogueText}
                    advanceDialogue={advanceDialogue}
                />
                <History
                    historyItems={runner.history}
                    generateDialogue={generateDialogue}
                />
            </>
        );
    } else {
        return (
            <>
                <Root />
                <h1>Dialogue</h1>
                <ImageDisplayer img_string={imageName} />
                <DialogueList
                    currPage={runner.currentResult}
                    advanceDialogue={advanceDialogue}
                />
                <History
                    historyItems={runner.history}
                    generateDialogue={generateDialogue}
                />
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

    const mappings = {
        "img_sunset": BeachSunset,
        "img_alien": CartoonAlien,
        "img_flower": FlowerSeaside,
        "img_crystals": PurpleCrystals,
        "img_crystals2": PurpleCrystals2,
        "img_crystals3": PurpleCrystals3,
        "img_quaint": QuaintSeaside,
        "img_waves": SunsetWaves,
        "img_shining": ShiningCrystal,
        "img_shining2": ShiningCrystal2,
        "img_shining3": ShiningCrystal3,
        "img_sleeping": SleepingAlien,
        "img_fruit": CajaFruit,
        "img_broomstick": MagicBroomstick

    }
    return <img src={mappings[img_string]} style={{ width: "25%", height: "25%" }} alt={img_string} />
}
function Root() {
    return (
        <>
            <h1>Exploring Irilia</h1>
            <h2>Choose a lesson.</h2>
            <nav>
                <a href="/lesson1">Lesson 1</a>
                <br />
                <a href="/lesson2">Lesson 2</a>
            </nav>
        </>
    );
}

// ========================================

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />
    },
    {
        path: "/lesson1",
        element: <Dialogue dialogueItem={dialogue1} />,
    },
    {
        path: "/lesson2",
        element: <Dialogue dialogueItem={dialogue2} />,
    },
]);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
