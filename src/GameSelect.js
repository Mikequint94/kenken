import { useState, useEffect, useRef } from 'react';
import './App.css';

const GameSelect = ({startGame, setSize, setDifficulty, setOperators, size, difficulty, operators}) => {
  
    return (
    <div className='selection'>
        Select Size
        <div className='sizes'>
            <button className={size === 3 && 'selected'} onClick={() => setSize(3)}>3 x 3</button>
            <button className={size === 4 && 'selected'} onClick={() => setSize(4)}>4 x 4</button>
            <button className={size === 5 && 'selected'} onClick={() => setSize(5)}>5 x 5</button>
            <button className={size === 6 && 'selected'} onClick={() => setSize(6)}>6 x 6</button>
        </div>
        Select Difficulty
        <div className='difficulties'>
            <button className={difficulty === 'easy' && 'selected'} onClick={() => setDifficulty('easy')}>Easy</button>
            <button className={difficulty === 'medium' && 'selected'} onClick={() => setDifficulty('medium')}>Medium</button>
            <button className={difficulty === 'hard' && 'selected'} onClick={() => setDifficulty('hard')}>Hard</button>
        </div>
        Select Operators
        <div className='operators'>
            <button className={operators === 'plus' && 'selected'} onClick={() => setOperators('plus')}>+</button>
            <button className={operators === 'plus-minus' && 'selected'} onClick={() => setOperators('plus-minus')}>+ -</button>
            <button className={operators === 'all' && 'selected'} onClick={() => setOperators('all')}>+ - * /</button>
        </div>
        <button onClick={() => startGame()}className='start'> Start</button>
    </div>
    );
  }
  
  export default GameSelect;
  