import { useState, useEffect, useRef } from 'react';
import './App.css';

const Game = ({size, difficulty, operators, answerMap, playerMap, setAnswerMap, setPlayerMap}) => {
    //ignore difficulty and operators for a while

    // need to do notes!

    // harder but sometimes boards have multiple solutions... hmmm

    const [selectedBox, setSelectedBox] = useState();
    const [playerArray, setPlayerArray] = useState([...Array(size)].map(e => Array(size).fill().map(u => ({num: '', cage: '', style: ''}))));
    const [answerArray, setAnswerArray] = useState();
    const [counter, setCounter] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    let lastBoxNum = null;
    const selectBox = (num, lastBox) => {
        setSelectedBox(num)
        lastBoxNum && document.getElementById(`box-${lastBoxNum}`).classList.remove('selectedBox');
        lastBox && document.getElementById(`box-${lastBox}`).classList.remove('selectedBox');
        document.getElementById(`box-${num}`).classList.toggle('selectedBox');
        lastBoxNum = num;
      }
    const createAnswerMap = (size) => {
        const map =[];
        const answerArray = [];
        for (let i = 0; i < size; i++) {
            let nums = Array.from({length: size}, (_, i) => i + 1)
            let row = [];
            let rowEls = [];
            for (let j = 0; j < size; j++) {
                const noList = [];
                for (let k = i; k > 0; k-=1) {
                    noList.push(answerArray[k-1][j]);
                }
                let newNumList = nums.filter((el) => !noList.includes(el));
                let newNum = newNumList[Math.floor(Math.random()*newNumList.length)];
                if (!newNum) {
                    return createAnswerMap(size);
                }
                let newNumIdx = nums.indexOf(newNum);    
                rowEls.push(newNum);
                row.push(<div className='box'>{nums.splice(newNumIdx, 1)}</div>);
            }
            map.push(<div className='row'>{row}</div>)
            answerArray.push(rowEls);    
        }
        setAnswerMap(map);
        setAnswerArray(answerArray);
        return;
    };
    const updatePlayerMap = (size) => {
        console.log('update player map')
        const playerMap = [];
        for (let i = 0; i < size; i++) {
            let playerRow = [];
            for (let j = 0; j < size; j++) {
                let boxNum = i*size + j + 1;
                playerRow.push(<div tabIndex='0' id={`box-${boxNum}`} onClick={(e) => selectBox(boxNum)} className={`box ${playerArray[i][j].style}`}>
                    <div className='cage'>{playerArray[i][j].cage}</div>
                    <div className='num'>{playerArray[i][j].num}</div>
                </div>);
            }
            playerMap.push(<div className='row'>{playerRow}</div>);
        }
        setPlayerMap(playerMap);
        const playerNums = playerArray.map(arr => arr.map(obj => obj.num));
        if (JSON.stringify(playerNums) === JSON.stringify(answerArray)) {
            setGameOver(true);
        }
        return;
    };

    const createCages = (size) => {
        if (!answerArray) {
            return;
        }
        // will need playerMap to add the symbols - or it will happen during update
        // need the answerArray!
        // will need the playerArray to easily get the numbers and change the cage obj

        // TODO: cages that are 3 long or 3 wide or tetris block shaped (only for + or x)
        // Idea: have vars like numSquares that track things and make them less likely the more I have
        console.log(answerArray)
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                // 2 vertical
                if (Math.random() <.4 && j+1 < size && !playerArray[i][j].style && !playerArray[i][j+1].style) {
                    playerArray[i][j].cage = `+${answerArray[i][j] + answerArray[i][j+1]}`;
                    playerArray[i][j].style='open-down';
                    playerArray[i][j+1].style='open-up';
                    // 3 vertical
                    if (Math.random() <.4 && j+2 < size && !playerArray[i][j+2].style) {
                        playerArray[i][j].cage = `+${answerArray[i][j] + answerArray[i][j+1] + answerArray[i][j+2]}`;
                        playerArray[i][j+1].style='open-vertical';
                        playerArray[i][j+2].style='open-up';
                        // 4 vertical
                        if (Math.random() <.45 && j+3 < size && !playerArray[i][j+3].style) {
                            playerArray[i][j].cage = `+${answerArray[i][j] + answerArray[i][j+1] + answerArray[i][j+2] + answerArray[i][j+3]}`;
                            playerArray[i][j+2].style='open-vertical';
                            playerArray[i][j+3].style='open-up';    
                        }
                    }
                // squares
                } else if (Math.random() <.15 && j+1 < size && i+1 < size && !playerArray[i][j].style
                && !playerArray[i][j+1].style && !playerArray[i+1][j].style && !playerArray[i+1][j+1].style) {
                    playerArray[i][j].cage = `+${answerArray[i][j] + answerArray[i][j+1] + answerArray[i+1][j] + answerArray[i+1][j+1]}`;
                    playerArray[i][j].style='open-down open-right';
                    playerArray[i][j+1].style='open-up open-right';
                    playerArray[i+1][j].style='open-left open-down';
                    playerArray[i+1][j+1].style='open-left open-up';
                // triangles |~, |_. ~|
                } else if (Math.random() <.2 && j+1 < size && i+1 < size && !playerArray[i][j].style
                    && !playerArray[i][j+1].style && !playerArray[i+1][j].style) {
                    playerArray[i][j].cage = `+${answerArray[i][j] + answerArray[i][j+1] + answerArray[i+1][j]}`;
                    playerArray[i][j].style='open-down open-right';
                    playerArray[i][j+1].style='open-up';
                    playerArray[i+1][j].style='open-left';
                } else if (Math.random() <.25 && j+1 < size && i+1 < size && !playerArray[i][j].style
                    && !playerArray[i][j+1].style && !playerArray[i+1][j+1].style) {
                    playerArray[i][j].cage = `+${answerArray[i][j] + answerArray[i][j+1] + answerArray[i+1][j+1]}`;
                    playerArray[i][j].style='open-down';
                    playerArray[i][j+1].style='open-up open-right';
                    playerArray[i+1][j+1].style='open-left';
                } else if (Math.random() <.3 && j+1 < size && i+1 < size && !playerArray[i][j].style
                    && !playerArray[i+1][j].style && !playerArray[i+1][j+1].style) {
                    playerArray[i][j].cage = `+${answerArray[i][j] + answerArray[i+1][j] + answerArray[i+1][j+1]}`;
                    playerArray[i][j].style='open-right';
                    playerArray[i+1][j].style='open-left open-down';
                    playerArray[i+1][j+1].style='open-up';
                

            
                // 2 horizontal
                } else if (Math.random() <.8 && i+1 < size && !playerArray[i][j].style && !playerArray[i+1][j].style) {
                    playerArray[i][j].cage = `+${answerArray[i][j] + answerArray[i+1][j]}`;
                    playerArray[i][j].style='open-right';
                    playerArray[i+1][j].style='open-left';
                    // 3 horizontal
                    if (Math.random() <.4 && i+2 < size && !playerArray[i+2][j].style) {
                        playerArray[i][j].cage = `+${answerArray[i][j] + answerArray[i+1][j] + answerArray[i+2][j]}`;
                        playerArray[i+1][j].style='open-horizontal';
                        playerArray[i+2][j].style='open-left';
                        // 4 horizontal
                        if (Math.random() <.45 && i+3 < size && !playerArray[i+3][j].style) {
                            playerArray[i][j].cage = `+${answerArray[i][j] + answerArray[i+1][j] + answerArray[i+2][j] + answerArray[i+3][j]}`;
                            playerArray[i+2][j].style='open-horizontal';
                            playerArray[i+3][j].style='open-left';    
                        }
                    }
                // solo
                } else if (!playerArray[i][j].style) {
                    playerArray[i][j].cage = answerArray[i][j];
                }

            }
        }
    };

    useEffect(() => {
        createAnswerMap(size);
        updatePlayerMap(size);
    }, []);
    useEffect(() => {
        createCages(size);
        updatePlayerMap(size);
    }, [answerArray]);

    useEffect(() => {
        const callback = (event) => {
            console.log(event.key)
            let i = Math.floor((selectedBox - 1) / size);
            let j = selectedBox - 1 - size * i;
            if(event.key <= size.toString() && event.key > 0){
                playerArray[i][j].num = parseInt(event.key);
                setPlayerArray(playerArray);
                updatePlayerMap(size);
                lastBoxNum = selectedBox;
            } else if (event.key === 'Backspace') {
                playerArray[i][j].num = '';
                setPlayerArray(playerArray);
                updatePlayerMap(size);
                lastBoxNum = selectedBox;
            } else if (event.key === 'ArrowLeft' && i > 0) {
                selectBox(selectedBox - size, selectedBox);
            } else if (event.key === 'ArrowRight' && i < size - 1) {
                selectBox(selectedBox + size, selectedBox);
            } else if (event.key === 'ArrowUp' && j > 0) {
                selectBox(selectedBox - 1, selectedBox);
            } else if (event.key === 'ArrowDown' && j < size - 1) {
                selectBox(selectedBox + 1, selectedBox);
            }
        }
        document.addEventListener('keydown', callback);
        return () => {
            document.removeEventListener('keydown', callback);
        };
      }, [selectedBox])
  
    useEffect(() => {
        if (gameOver) {return;}
        const interval = setInterval(() => setCounter(counter+1), 1000);
        return () => clearInterval(interval);
      }, [counter]);

    return (
    <div className='game'>
        <div>
            size: {size}  difficulty: {difficulty}  operators: {operators}
        </div>
        <div>
            {Math.floor(counter/60)}:{counter%60 < 10 && '0'}{counter%60}
        </div>
        {gameOver && 'YOU WIN!'}
        {/* <div className='map'>
            {answerMap}
        </div> */}
        <div className='map'>
            {playerMap}
        </div>
    </div>
    );
  }
  
  export default Game;
  