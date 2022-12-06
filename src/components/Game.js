import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import hilt from '../images/hilt.png'

export default function Game() {
  const [isGameOver, setIsGameOver]       = useState(false);
  const [highScore, setHighScore]         = useState(0);
  const [userEntry, setUserEntry]         = useState("");
  const [errors, setErrors]               = useState(0);
  const [gameObj, setGameObj]             = useState({
    level: "",
    episode: "",
    title: "",
    text: "",
  });

  const level             = useRef(useParams().level - 1);
  const episodes          = useRef();

  const animationSpeed    = 220 - (20 * level.current);
  const saberColor        = useRef("blue")

  const index             = useRef(0);
  const textIndex         = index.current
  
  const completed         = gameObj.text.slice(0, textIndex);
  const uncompleted       = gameObj.text.slice(textIndex);
  const isTextComplete    = useRef(false);
  isTextComplete.current  = (completed && completed === gameObj.text);

  const totalCorrectChars = useRef(0);
  const totalCorrectWords = useRef(0);
  const startTime         = useRef(new Date());
  const finalTime         = useRef()
  
  const animatedTextDiv   = useRef();
  const cursor            = useRef();
  const gameBox           = useRef();

  const isCursorOutOfBounds = () => {
    const cursorHeight = cursor.current.getBoundingClientRect().top; 
    const gameBoxHeight = gameBox.current.getBoundingClientRect().top;
    return cursorHeight < gameBoxHeight;
  };

  const resetElementAnimation = (element) => {
    element.style.animation = 'none';
    element.getBoundingClientRect();
    element.style.animation = "";
  }

  useEffect(() => {
    fetch(`https://type-sabers-server.herokuapp.com/gameTexts`)
    .then((res) => res.json())
    .then(data => {
      episodes.current = data;
      setGameObj(data[level.current]);
    });
    
    fetch(`https://type-sabers-server.herokuapp.com/highScores`)
    .then((res) => res.json())
    .then(leaders => {
      const lastLeader = leaders.sort((a,b)=> b.score - a.score).slice(9);
      setHighScore(lastLeader[0].score);
    });
  }, []);
  
  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (isTextComplete.current && level.current < 8) {
        totalCorrectWords.current++;
        index.current = 0;
        level.current++;
        setGameObj(episodes.current[level.current]);
        resetElementAnimation(animatedTextDiv.current);

      } else if (isCursorOutOfBounds() || isTextComplete.current){
        finalTime.current = secondsSinceStart();
        clearInterval(gameLoop);
        setIsGameOver(true);
      }
    }, 500);
    
    return () => clearInterval(gameLoop);
  }, []);

  useEffect(() => {
    const song = new Audio("https://ia903204.us.archive.org/16/items/StarWarsThemeSongByJohnWilliams/Star%20Wars%20Theme%20Song%20By%20John%20Williams.mp3")
    song.volume = .5;
    song.play();

    return () => song.pause();
  }, [])

  const handleEntry = (e) => {
    if(isGameOver) return setUserEntry("");
    if(e.target.value.slice(-1) === gameObj.text.charAt(textIndex)){
      totalCorrectChars.current++;
      saberColor.current = "blue";
      if (gameObj.text.charAt(textIndex) === " ") {
        setUserEntry("");
        totalCorrectWords.current++;
      } else {
        setUserEntry(e.target.value);
      }
      if(gameObj.text.charCodeAt(textIndex + 1) === 10){
        index.current = textIndex + 3;
        setUserEntry("");
      } else {
        index.current = textIndex + 1;
      }
    } else {
      saberColor.current = "red";
      setErrors(errors + 1);
    }
  }
  
  const secondsSinceStart = () => (
    (new Date().getTime() - startTime.current.getTime()) / 1000
  );
  const wordsPerMin = () => (
    totalCorrectWords.current ? 
      totalCorrectWords.current / (finalTime.current / 60) : 0
  );
  const percentAccuracy = () => (
    totalCorrectChars.current ? 
      totalCorrectChars.current / (totalCorrectChars.current + errors) * 100 : 100
  );
  const finalScore = () => (
    Math.round((wordsPerMin() * 100)+(totalCorrectChars.current*(percentAccuracy()/100)-(errors*2)))
  );
    
  const navigate = useNavigate();
  const handleVictorySubmission = () => { 
    const sound = new Audio("https://www.myinstants.com/media/sounds/blaster.mp3");
    sound.play();
    const score = {
      wpm: Math.round(wordsPerMin()),
      accuracy: Math.round(percentAccuracy()),
      finalScore: finalScore()
    };
    navigate(`/scorecard/new/${JSON.stringify(score)}`);
  };

  const handleLossClick = () => { 
    const sound = new Audio("https://www.myinstants.com/media/sounds/blaster.mp3");
    sound.play();
    navigate(`/episodes`);
  };

  const renderGameOverButton = () => {
    if(finalScore() > highScore) {
      return (<button className="button" 
        onClick={handleVictorySubmission}>Submit Score
        </button>)} else {
          return (<button className="button" 
          onClick={handleLossClick}>Continue Training
          </button>)}; 
  };

  const gameOverHeading = finalScore() > highScore ? "New Jedi Master" : "Defeated In Battle";
  

  const display = () => {
    if(isGameOver){
       return (
         <div>
          <h1 className="completed title over">{gameOverHeading}</h1>
          <h4 className="completed title">{Math.round(finalTime.current)} Seconds</h4>
          <h4 className="completed title">WPM {Math.round(wordsPerMin())}</h4>
          <h4 className="completed title">Accuracy {Math.round(percentAccuracy())}%</h4> 
          {renderGameOverButton()}
        </div>
       )
    } else {
       return (
        <div id="gameText" ref={animatedTextDiv} style={{animationDuration: `${animationSpeed}s`}}>
          <h3 className="completed title">{gameObj.episode}</h3>
          <h2 className="completed title">{gameObj.title}</h2>
          <span className="completed">{completed}</span>
          <span className="uncompleted">{uncompleted}
            <div id="cursor" ref={cursor}>|</div>
          </span>
        </div>
      )
    }
  }

  return (
    <div id="game">
      <div id="gameTextBox" ref={gameBox}>
        {display()}
      </div>
      <div id="gameUI">
        <input className={`saber ${saberColor.current}`} onChange={handleEntry} value={userEntry} autoFocus/>
        <img id="hilt" src={hilt} alt="saber hilt"/>
        {/* <span style={{position:"absolute"}}>  Errors: {errors}</span> */}
      </div>
    </div>
  );
}