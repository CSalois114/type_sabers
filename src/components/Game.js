import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';

export default function Game({ episodes }) {
  const [isGameOver, setIsGameOver] = useState(false);
  const [userEntry, setUserEntry]   = useState("");
  const [errors, setErrors]         = useState(0);
  const [gameObj, setGameObj]       = useState({
    level: "",
    episode: "",
    title: "",
    text: "",
  });

  const level = useParams().level - 1;
  const startTime = useRef(new Date());
  const index = useRef(0);
  const textIndex = index.current

  const completed = gameObj.text.slice(0, textIndex);
  const uncompleted = gameObj.text.slice(textIndex);
  
  const cursor = useRef();
  const gameBox = useRef();
  const checkIsGameOver = () => (
    cursor.current.getBoundingClientRect().top <
    gameBox.current.getBoundingClientRect().top
  );
  
  useEffect(() => {
    if(episodes[1]) {
      setGameObj(episodes[parseInt(level)]);
    } else {
      fetch(`http://localhost:8001/gameTexts`)
      .then((res) => res.json())
      .then(data => setGameObj(data[level]));
    }

    let tickRate
    if(!isGameOver) {
      tickRate = setInterval(() => {
        if(checkIsGameOver()){
          finalTime.current = secondsSinceStart();
          clearInterval(tickRate);
          setIsGameOver(true);
        }
      }, 500);
    }
    
    const song = new Audio("https://ia903204.us.archive.org/16/items/StarWarsThemeSongByJohnWilliams/Star%20Wars%20Theme%20Song%20By%20John%20Williams.mp3")
    song.volume = .5;
    song.play()
    
    return(() => {
      song.pause()
      clearInterval(tickRate)
    });
  }, []);

  const finalTime = useRef()
  const secondsSinceStart = () => 
    (new Date().getTime() - startTime.current.getTime()) / 1000;

  const handleEntry = (e) => {
    if(isGameOver) return setUserEntry("");
    if(e.target.value.slice(-1) === gameObj.text.charAt(textIndex)){
      setUserEntry(gameObj.text.charAt(textIndex) === " " ? "" : e.target.value)
      index.current = textIndex + 1  
    } else {
      setErrors(errors + 1)
    }
  }
  
  const charsCompleted = () => completed.split("").length;
  const wordsPerMin = () => (
    completed ? completed.split(" ").length / (finalTime.current / 60) : 0);
    
  const percentAccuracy = () => (
    completed ? charsCompleted() / (charsCompleted() + errors) * 100 : 100);

  const finalScore = () =>
    Math.round((wordsPerMin() * 100)+(charsCompleted()*(percentAccuracy()/100)-(errors*2)));
    
  const navigate = useNavigate();
  const handleSubmission = () => { 
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
        <div id="gameText" style={{animationDuration: `${200 - (20 * level)}s`}}>
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
