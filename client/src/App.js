import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import MainMenu from './components/MainMenu';
import Main from './components/Main';
import './App.css';

const menuKeys = [
  'Generate Schema',
  'View Schema',
  'Check Database'
]
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MainMenu menu = {menuKeys}/>
          <div className="body">
            <Main routes={menuKeys}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
