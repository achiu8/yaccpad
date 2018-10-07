import React, { Component } from 'react';
import Editor from './Editor';

import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
      output: ''
    };
  }

  handleExecute = () => {
    fetch('/execute')
      .then(response => response.json())
      .then(({ output }) => this.setState({ output }))
      .catch(() => this.setState({ output: 'There was an error' }));
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <button onClick={this.handleExecute}>Execute</button>
        </div>
        <Editor />
        <div className="section output">{this.state.output}</div>
      </div>
    );
  }
}

export default App;
