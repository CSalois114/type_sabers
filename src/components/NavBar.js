import React from 'react'
import { NavLink } from 'react-router-dom';


export default function NavBar() {

  return (
    <div className='navbar'>
      <NavLink 
      style={({isActive})=>({
        color: isActive ? "#FFE81F":"white"
      })}
      to="/"
      >Home</NavLink>
      <NavLink 
      style={({isActive})=>({
        color: isActive ? "#FFE81F":"white"
      })}
      to="/episodes"
      >Episodes</NavLink>
      <NavLink 
      style={({isActive})=>({
        color: isActive ? "#FFE81F":"white"
      })}
      to="/leaderboard"
      >Jedi Masters</NavLink>
    </div>
  )
}
