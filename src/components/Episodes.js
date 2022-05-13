import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    fetch("https://salty-tor-76776.herokuapp.com/gameTexts")
      .then((res) => res.json())
      .then(setEpisodes);
  }, []);

  const navigate = useNavigate();

  const episodeStyles = {
    color: "#FFE81F",
    cursor: "url(https://cdn.custom-cursor.com/db/9763/32/star-wars-millennium-falcon-pointer.png), auto",
  };

  const renderEpisodes = episodes.map((episode) => {
    const handleClick = () => {
      const sound = new Audio("https://www.myinstants.com/media/sounds/blaster.mp3");
      sound.play()
      navigate(`/episodes/${episode.level}`)
      }
    return (
      <h1
        key={episode.level}
        style={episodeStyles}
        onClick={handleClick}>
        {episode.episode}
      </h1>
    );
  });

  return (
    <div>
      <img
        src="https://www.freepnglogos.com/uploads/star-wars-logo-png-10.png"
        alt="Star Wars"
        className="SWLogo"
      />
      <h1 id="swFont">Choose an Episode:</h1>
      {renderEpisodes}
    </div>
  );
}
