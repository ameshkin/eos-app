import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/foundation.min.css';
import '../node_modules/materialize-css/dist/css/materialize.min.css'
import BlockList from "./eos/pages/BlockList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div>

            <BlockList/>

        </div>
      </div>
    );
  }
}

export default App;
