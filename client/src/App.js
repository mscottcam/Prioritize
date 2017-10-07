import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './components/header'
import Tasks from './components/tasks'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <p className="App-intro">
          Prioritize is an productivity app designed to make your life easier. 
          You enter your tasks and Prioritize will reorder your tasks to and help you make the most of your time. 
        </p>
        <a href={'/api/auth/google'}>Login with Google Friend</a>
        <Tasks />
      </div>
    );
  }
}

export default App;
