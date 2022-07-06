import React from 'react';
import TicTacToe from './components/GamePage.js'
// import TicTacToe from './components/newGamePage.js';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/tictactoe" element={<TicTacToe />}></Route>
      </Routes>
    </Router>
  ); 
}
