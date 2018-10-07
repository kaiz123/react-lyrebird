import React, { Component } from 'react';
import {Audio} from './containers/Audio.js';
import './App.css';

console.log(process.env.REACT_APP_API_TOKEN)
class App extends Component {
  render() {
    return (
      <div className="App">
        <Audio/>
      </div>
    );
  }
}

export default App;
