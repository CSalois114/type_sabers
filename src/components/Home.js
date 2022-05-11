import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function Home({setLevel, level}) {
  const navigate = useNavigate(); 
  
  const handleClick = () => {
    setLevel(0);
    navigate(`/episodes/${level}`);
  };

  return (
    <>
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" alt="Star Wars" className="SWLogo"/>
      <h1 id="swFont">TypeSabers</h1>
      <button className="button" onClick={handleClick}>Begin</button>
    </>
  )
}
