import './App.css';
import { useState, useEffect, useRef } from 'react';
import GameSelect from './GameSelect';
import Game from './Game';

const App = () => {
  const [mapSelected, setMapSelected] = useState(false);
  const [size, setSize] = useState(4);
  const [difficulty, setDifficulty] = useState('medium');
  const [operators, setOperators] = useState('all');
  const [answerMap, setAnswerMap] = useState();
  const [playerMap, setPlayerMap] = useState();


const startGame = () => {
  if (size && difficulty && operators) {
    // let [mapEls] = createAnswerMap(size);
    setMapSelected(true);
    // console.log(answerMap)
    }
  }

  return (
    <div className="App">
      <div className='header'>
        Welcome to KenKen
      </div>
      <div className='game'>
        {mapSelected ? <Game size={size} difficulty={difficulty} operators={operators} playerMap={playerMap} setAnswerMap={setAnswerMap} setPlayerMap={setPlayerMap}/> : <GameSelect startGame={startGame} setSize={setSize} setDifficulty={setDifficulty} setOperators={setOperators} size={size} difficulty={difficulty} operators={operators}/>} 
      </div>
      <div className='header'>
        Created by Michael Quint 2023
      </div>
    </div>
  );
}

export default App;
