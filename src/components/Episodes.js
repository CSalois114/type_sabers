import { useNavigate } from "react-router-dom";

export default function Episodes({ episodes }) {
  const navigate = useNavigate();


  const episodeStyles = {
    color: "#FFE81F",
    cursor: "url(https://cdn.custom-cursor.com/db/9763/32/star-wars-millennium-falcon-pointer.png), auto",
    // fontFamily: "Gothic"
  };

  const renderEpisodes = episodes.map((episode) => {
    return (
      <h1
        key={episode.level}
        style={episodeStyles}
        onClick={() => navigate(`/episodes/${episode.level}`)}>
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
