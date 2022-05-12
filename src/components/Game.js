import { computeHeadingLevel } from "@testing-library/react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';

export default function Game() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [userEntry, setUserEntry]   = useState("");
  const [errors, setErrors]         = useState(0);
  const [gameObj, setGameObj]       = useState({
    level: "",
    episode: "",
    title: "",
    text: "",
  });

  const level             = useRef(useParams().level - 1);
  const episodes          = useRef();
  
  const index             = useRef(0);
  const textIndex         = index.current
  
  const completed         = gameObj.text.slice(0, textIndex);
  const uncompleted       = gameObj.text.slice(textIndex);
  const isTextComplete    = useRef(false);
  isTextComplete.current  = (completed && completed == gameObj.text);
  

  const totalCorrectChars = useRef(0);
  const totalCorrectWords = useRef(0);
  const startTime         = useRef(new Date());
  const finalTime         = useRef()
  
  const animatedTextDiv   = useRef();
  const cursor            = useRef();
  const gameBox           = useRef();
  const isCursorOffScreen = () => {
    const cursorHeight = cursor.current.getBoundingClientRect().top; 
    const gameBoxHeight = gameBox.current.getBoundingClientRect().top;
    return cursorHeight < gameBoxHeight;
  };
  
  useEffect(() => {
    fetch(`http://localhost:8001/gameTexts`)
    .then((res) => res.json())
    .then(data => {
      episodes.current = data;
      setGameObj(data[level.current]);
    });


    const gameLoop = setInterval(() => {
      console.log(totalCorrectChars.current, totalCorrectWords.current)
      if (isTextComplete.current && level.current < 8) {
        totalCorrectWords.current++
        index.current = 0;
        level.current++;
        setGameObj(episodes.current[level.current]);

        animatedTextDiv.current.style.animation = 'none';
        animatedTextDiv.current.getBoundingClientRect();
        animatedTextDiv.current.style.animation = "";

      } else if (isCursorOffScreen() || isTextComplete.current){
        finalTime.current = secondsSinceStart();
        clearInterval(gameLoop);
        setIsGameOver(true);
      }
    }, 500);
    
    const song = new Audio("https://ia903204.us.archive.org/16/items/StarWarsThemeSongByJohnWilliams/Star%20Wars%20Theme%20Song%20By%20John%20Williams.mp3")
    song.volume = .5;
    song.play()
    
    return(() => {
      song.pause()
      clearInterval(gameLoop)
    });
  }, []);
  
  const handleEntry = (e) => {
    if(isGameOver) return setUserEntry("");
    if(e.target.value.slice(-1) === gameObj.text.charAt(textIndex)){
      totalCorrectChars.current++
      if (gameObj.text.charAt(textIndex) === " ") {
        setUserEntry("")
        totalCorrectWords.current++
      } else {
        setUserEntry( e.target.value)
      }
      index.current = textIndex + 1  
    } else {
      setErrors(errors + 1)
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
  const handleSubmission = () => { 
    const sound = new Audio("https://www.myinstants.com/media/sounds/blaster.mp3");
    sound.play();
    const score = {
      wpm: Math.round(wordsPerMin()),
      accuracy: Math.round(percentAccuracy()),
      finalScore: finalScore()
    };
    navigate(`/scorecard/new/${JSON.stringify(score)}`);
  };

  const display = () => {
    if(isGameOver){
       return (
         <div>
          <h1 className="completed title over">Game Over</h1>
          <h4 className="completed title">{Math.round(finalTime.current)} Seconds</h4>
          <h4 className="completed title">WPM {Math.round(wordsPerMin())}</h4>
          <h4 className="completed title">Accuracy {Math.round(percentAccuracy())}%</h4> 
          <button className="button" onClick={handleSubmission}>Submit Score</button>
        </div>
       )
    } else {
       return (
        <div id="gameText" ref={animatedTextDiv} style={{animationDuration: `${220 - (20 * level.current)}s`}}>
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
      <input onChange={handleEntry} value={userEntry} autoFocus/>
      <span style={{position:"absolute"}}>  Errors: {errors}</span>
    </div>
  );
}