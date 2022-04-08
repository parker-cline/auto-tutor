import React from 'react';
import ReactDOM from 'react-dom';
import YarnBound from 'yarn-bound';

const dialogue = ` 
  title: Start
  ---
  Where are ou?
  Hello, world!
  That's it!
  sjkhdaophfopa
  hdksaophkspodh
  ===
`
class Dialogue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            runner: new YarnBound({
                dialogue
            })
        };
        console.log(this.state.runner);
    }

    advanceDialogue() {
        this.state.runner.advance()
        this.setState({ runner: this.state.runner });
    }
    
    render() {
        return (
            <div>
                <h1>{this.state.runner.currentResult.text}</h1>
                <button onClick={() => this.advanceDialogue()}>Next</button>
            </div>
        );
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

