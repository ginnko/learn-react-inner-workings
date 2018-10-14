import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  onClick = () => {
    const newCount = this.state.count + 1;
    this.setState({
      count: newCount
    });
  }
  render() {
    const count = this.state.count;
    return (
      <div className="App">
        <header className="App-header">
          <div>{count}</div>
          <button onClick={this.onClick}>add</button>
        </header>
      </div>
    );
  }
}

export default App;
