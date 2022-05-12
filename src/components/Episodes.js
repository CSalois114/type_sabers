import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8001/gameTexts")
      .then((res) => res.json())
      .then(setEpisodes);
  }, []);

  const navigate = useNavigate();

  const episodeStyles = {
    color: "#FFE81F",
    cursor: "url(https://cdn.custom-cursor.com/db/9763/32/star-wars-millennium-falcon-pointer.png), auto",
    // fontFamily: "Gothic"
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
        src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
        alt="Star Wars"
        className="SWLogo"
      />
      <h1 id="swFont">Choose an Episode:</h1>
      {renderEpisodes}
    </div>
  );
}
