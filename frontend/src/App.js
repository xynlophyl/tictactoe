import React from 'react';
import TicTacToe from './views/ttt-view/GamePage.js'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
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
