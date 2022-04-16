import React from 'react';
import ReactDOM from 'react-dom';
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
                    <h1>{this.state.runner.currentResult.markup[0].properties.name}: {this.state.runner.currentResult.text}</h1>
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
class Prompt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        value: '',
        };
    }
    
    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }
    
    handleSubmit = (event) => {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }
    
    render() {
        return (
        <form onSubmit={this.handleSubmit}>
            <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        );
    }
}
class DialogueTree extends React.Component {
    render() {
        return (
            <div className="dialogue">
                <h1>Hello!</h1>
                <Dialogue />
                <Prompt />
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <DialogueTree />,
    document.getElementById('root')
);

