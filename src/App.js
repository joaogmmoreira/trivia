import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Games from './Pages/Games';
import Settings from './Pages/Settings';
import Feedback from './Pages/Feedback';
import Ranking from './Pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/quiz" component={ Games } />
      <Route exact path="/settings" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
