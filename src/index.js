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

  const [runner] = useState(new YarnBound({ dialogue: dialogueItem }));
  const [dialogueText, setDialogueText] = useState(
    generateDialogue(runner.currentResult)
  );

  if (dialogueText) {
    return (
      <>
        <h1>Dialogue</h1>
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
        <h1>Dialogue</h1>
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
      <h1>Choose an option.</h1>
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

function Root() {
  return (
    <>
      <h1>Choose a lesson.</h1>
      <a href="/lesson1">Lesson 1</a>
      <br />
      <a href="/lesson2">Lesson 2</a>
    </>
  );
}

// ========================================

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
