import React from 'react'
import { NavLink } from 'react-router-dom';
import Home from './Home';
import Game from './Game';
import Leaderboard from './Leaderboard';

export default function NavBar() {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/game">Start A Game</NavLink>
      <NavLink to="/leaderboard">Leaderboard</NavLink>
    </div>
  )
}
