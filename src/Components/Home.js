import React from 'react';
import Login from '../Pages/Login';
import logo from '../trivia.png';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
        <Login />
      </header>
    </div>
  );
}
