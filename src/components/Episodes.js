import { useNavigate } from "react-router-dom";

export default function Episodes({ episodes }) {
  const navigate = useNavigate();

  const episodeStyles = {
    color: "#FFE81F",
    cursor: "pointer",
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
        src="https://www.freepnglogos.com/uploads/star-wars-logo-png-10.png"
        alt="Star Wars"
        className="SWLogo"
      />
      <h1 id="swFont">Choose an Episode:</h1>
      {renderEpisodes}
    </div>
  );
}