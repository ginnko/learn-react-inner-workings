import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg:'init'
    };
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get started, edit <code>{this.state.msg}</code> and save to reload.
        </p>
        <button onClick={() => {
          this.setState({msg: 'clicked'});
        }}>hehe
        </button>
      </div>
    );
  }
}

export default App;
