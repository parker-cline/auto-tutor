import React from 'react';
import { createRoot } from 'react-dom/client';
import YarnBound from 'yarn-bound';
import { dialogue } from './dialogue.js';
import reactStringReplace from 'react-string-replace';

class Dialogue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            runner: new YarnBound({
                dialogue
            }),
            dialogueText: '',
            dialogueOptions: [],
        }
    }

    advanceDialogue(option=null) {
        this.state.runner.advance(option);
        this.setState({ runner: this.state.runner });
        const currPage = this.state.runner.currentResult;
        if (currPage.text) {
            if (currPage.markup.length > 1) {
                const tagDetails = currPage.markup[1];
                const slicedString = currPage.text.slice(tagDetails.position, tagDetails.position + tagDetails.length);
                this.setState({
                    dialogueText: reactStringReplace(currPage.text, slicedString, (match, i) => (
                        <span key={i} style={{ color: 'red' }}>{match}</span>
                    ))
                });
            } else {
                this.setState({ dialogueText: currPage.text });
            }
        }
    }
    
    render() {
        const currPage = this.state.runner.currentResult;
        if (currPage.options) {
            const listItems = currPage.options.map((dialogueChoice, index) =>
                <li key={index} onClick={() => this.advanceDialogue(index)}>{dialogueChoice.text}</li>
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
                    <h3>{currPage.markup[0].properties.name}: {this.state.dialogueText}</h3>
                    <button onClick={() => this.advanceDialogue()}>Next</button>
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

