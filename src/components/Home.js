import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate = useNavigate(); 
  
  const handleClick = () => {
    navigate(`/episodes/1`);
  };

  return (
    <>
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" alt="Star Wars" className="SWLogo"/>
      <h1 id="swFont">TypeSabers</h1>
      <button className="button" onClick={handleClick}>Begin</button>
    </>
  )
}
