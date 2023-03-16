import './App.css';
import { useState, useEffect, useRef } from 'react';
import GameSelect from './GameSelect';
import Game from './Game';

const App = () => {
  const [mapSelected, setMapSelected] = useState(true);
  const [size, setSize] = useState(4);
  const [difficulty, setDifficulty] = useState('medium');
  const [operators, setOperators] = useState('plus-minus');

  const startGame = () => {
    if (size && difficulty && operators) {
      setMapSelected(true);
    }
  }

  return (
    <div className="App">
      <div className='header'>
        Welcome to KenKen
      </div>
      <div className='game'>
        {mapSelected ? <Game size={size} difficulty={difficulty} operators={operators}/> : <GameSelect startGame={startGame} setSize={setSize} setDifficulty={setDifficulty} setOperators={setOperators} size={size} difficulty={difficulty} operators={operators}/>} 
      </div>
      <div className='header'>
        Created by Michael Quint 2023
      </div>
    </div>
  );
}

export default App;
