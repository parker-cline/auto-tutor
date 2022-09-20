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

    advanceDialogue() {
        this.state.runner.advance()
        this.setState({ runner: this.state.runner });
    }

    advanceDialogueWithOption(option) {
        this.state.runner.advance(option)
        this.setState({ runner: this.state.runner });
    }
    
    render() {
        const currRunner = this.state.runner;
        if (currRunner.currentResult.text) {
            return (
                <div>
                    <h3>{currRunner.currentResult.markup[0].properties.name}: {currRunner.currentResult.text}</h3>
                    <button onClick={() => this.advanceDialogue()}>Next</button>
                </div>
            );
        }
        else if (currRunner.currentResult.options) {
            const listItems = currRunner.currentResult.options.map((dialogueChoice, index) =>
                <li key={index} onClick={() => this.advanceDialogueWithOption(index)}>{dialogueChoice.text}</li>
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

