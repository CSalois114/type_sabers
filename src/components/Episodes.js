import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Episodes({setLevel}) {
  const [episodes, setEpisodes] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetch("http://localhost:8001/gameTexts")
      .then((res) => res.json())
      .then(setEpisodes);
  }, []);

  const handleClick = (level) => {
    setLevel(level)
    navigate(`/episodes/${level}`)
  };

  const episodeStyles = {
    "color": "#FFE81F",
    "cursor": "pointer",
    "font-family": "Franlin Gothic",
  };

  const renderEpisodes = episodes.map(e=> {return <h1 key={e.level} style={episodeStyles} onClick={()=> handleClick(e.level)}>{e.episode}</h1>});
  

  return (
    <div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" alt='Star Wars' className='SWLogo'/>
      <h1 id="swFont">Choose an Episode:</h1>
      {renderEpisodes}
    </div>
  )
}
