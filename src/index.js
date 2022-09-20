import React from 'react';
import { createRoot } from 'react-dom/client';
import YarnBound from 'yarn-bound';
import { dialogue } from './dialogue.js'

console.log(dialogue);
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
        console.log(this.state.runner);
    }

    advanceDialogue() {
        this.state.runner.advance()
        this.setState({ runner: this.state.runner });
        console.log(this.state.runner);
    }

    advanceDialogueWithOption(option) {
        this.state.runner.advance(option)
        this.setState({ runner: this.state.runner });
        console.log(this.state.runner);
    }
    
    render() {
        if (this.state.runner.currentResult.text) {
            console.log(this.state.runner.currentResult.markup);
            return (
                <div>
                    <h3>{this.state.runner.currentResult.markup[0].properties.name}: {this.state.runner.currentResult.text}</h3>
                    <button onClick={() => this.advanceDialogue()}>Next</button>
                </div>
            );
        }
        else if (this.state.runner.currentResult.options) {
            console.log(this.state.runner.currentResult.options);
            const listItems = this.state.runner.currentResult.options.map((dialogueChoice, index) =>
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

