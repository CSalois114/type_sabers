import React from 'react'
import { NavLink } from 'react-router-dom';


export default function NavBar() {
  const navLinkStyle = ({isActive})=>({
    color: isActive ? "#FFE81F":"white",
    cursor: "url(https://cdn.custom-cursor.com/db/9763/32/star-wars-millennium-falcon-pointer.png), auto",
  });

  const handleClick = () => {
    const sound = new Audio("https://www.myinstants.com/media/sounds/blaster.mp3");
    sound.play();
  };

  return (
    <div id="swFont" className='navbar'>
      <NavLink 
      onClick={handleClick}
      style={navLinkStyle}
      to="/"
      >Home</NavLink>
      <NavLink 
      onClick={handleClick}
      style={navLinkStyle}
      to="/episodes"
      >Episodes</NavLink>
      <NavLink 
      onClick={handleClick}
      style={navLinkStyle}
      to="/leaderboard"
      >Jedi Masters</NavLink>
    </div>
  )
}
