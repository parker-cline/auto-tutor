import React from 'react';
import { createRoot } from 'react-dom/client';
import YarnBound from 'yarn-bound';
import { dialogue } from './dialogue.js'
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
        this.state.runner.advance(option)
        this.setState({ runner: this.state.runner });
    }
    
    render() {
        const currPage = this.state.runner.currentResult;
        if (currPage.text) {
            return (
                <div>
                    <h3>{currPage.markup[0].properties.name}: {currPage.text}</h3>
                    <button onClick={() => this.advanceDialogue()}>Next</button>
                </div>
            );
        }
        else if (currPage.options) {
            const listItems = currPage.options.map((dialogueChoice, index) =>
                <li key={index} onClick={() => this.advanceDialogue(index)}>{dialogueChoice.text}</li>
            );
            return (
                <div>
                    <h1>Choose an option.</h1>
                    <ul>{listItems}</ul>
                </div>
            );

        }
        else {
            return (
                <div>
                    <h1>All done!</h1>
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

