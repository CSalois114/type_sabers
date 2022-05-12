import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate = useNavigate(); 
  
  const handleClick = () => {
    navigate(`/episodes/1`);
  };

  return (
    <>
      <img src="https://www.freepnglogos.com/uploads/star-wars-logo-png-10.png" alt="Star Wars" className="SWLogo"/>
      <h1 id="swFont">TypeSabers</h1>
      <button className="button" onClick={handleClick}>Begin</button>
    </>
  )
}
