import { useState, useEffect, useRef } from 'react';
import './App.css';

const Game = ({size, difficulty, operators, playerMap, setAnswerMap, setPlayerMap}) => {
    //ignore difficulty and operators for a while
    // maybe allow to turn on and off different ones

    // need to do notes! Check. and smart notes. Check. Maybe add more styling to trying to add illegal ones?

    // harder but sometimes boards have multiple solutions... hmmm

    // Cool idea to take "screenshot" of map every minute.  And then when you finish it replays it for you!
    // undo button?

    const [selectedBox, setSelectedBox] = useState();
    const [playerArray, setPlayerArray] = useState([...Array(size)].map(e => Array(size).fill().map(u => ({num: '', cage: '', style: '', notes: new Set()}))));
    const [answerArray, setAnswerArray] = useState();
    const [counter, setCounter] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const selectBox = (num) => {
        setSelectedBox(num)
        document.getElementsByClassName('selectedBox')[0] && document.getElementsByClassName('selectedBox')[0].classList.remove('selectedBox');
        document.getElementById(`box-${num}`).classList.toggle('selectedBox');
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
                    <div className='notes'>{Array.from(playerArray[i][j].notes).sort((a, b) => a - b)}</div>
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

    const createPlusCage = (size, i, j) => {
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
    const createMinusCage = (size, i, j) => {
        // 2 vertical
        if (Math.random() <.4 && j+1 < size && !playerArray[i][j].style && !playerArray[i][j+1].style) {
            playerArray[i][j].cage = `-${Math.abs(answerArray[i][j]-answerArray[i][j+1])}`;
            playerArray[i][j].style='open-down';
            playerArray[i][j+1].style='open-up';
        // 2 horizontal
        } else if (Math.random() <.8 && i+1 < size && !playerArray[i][j].style && !playerArray[i+1][j].style) {
            playerArray[i][j].cage = `-${Math.abs(answerArray[i][j] - answerArray[i+1][j])}`;
            playerArray[i][j].style='open-right';
            playerArray[i+1][j].style='open-left';
            
        // solo
        } else if (!playerArray[i][j].style) {
            playerArray[i][j].cage = answerArray[i][j];
        }
    }
    const createTimesCage = (size, i, j) => {
        // 2 vertical
        if (Math.random() <.4 && j+1 < size && !playerArray[i][j].style && !playerArray[i][j+1].style) {
            playerArray[i][j].cage = `x${answerArray[i][j] * answerArray[i][j+1]}`;
            playerArray[i][j].style='open-down';
            playerArray[i][j+1].style='open-up';
            // 3 vertical
            if (Math.random() <.4 && j+2 < size && !playerArray[i][j+2].style) {
                playerArray[i][j].cage = `x${answerArray[i][j] * answerArray[i][j+1] * answerArray[i][j+2]}`;
                playerArray[i][j+1].style='open-vertical';
                playerArray[i][j+2].style='open-up';
                // 4 vertical
                if (Math.random() <.45 && j+3 < size && !playerArray[i][j+3].style) {
                    playerArray[i][j].cage = `x${answerArray[i][j] * answerArray[i][j+1] * answerArray[i][j+2] * answerArray[i][j+3]}`;
                    playerArray[i][j+2].style='open-vertical';
                    playerArray[i][j+3].style='open-up';    
                }
            }
        // squares
        } else if (Math.random() <.15 && j+1 < size && i+1 < size && !playerArray[i][j].style
        && !playerArray[i][j+1].style && !playerArray[i+1][j].style && !playerArray[i+1][j+1].style) {
            playerArray[i][j].cage = `x${answerArray[i][j] * answerArray[i][j+1] * answerArray[i+1][j] * answerArray[i+1][j+1]}`;
            playerArray[i][j].style='open-down open-right';
            playerArray[i][j+1].style='open-up open-right';
            playerArray[i+1][j].style='open-left open-down';
            playerArray[i+1][j+1].style='open-left open-up';
        // triangles |~, |_. ~|
        } else if (Math.random() <.2 && j+1 < size && i+1 < size && !playerArray[i][j].style
            && !playerArray[i][j+1].style && !playerArray[i+1][j].style) {
            playerArray[i][j].cage = `x${answerArray[i][j] * answerArray[i][j+1] * answerArray[i+1][j]}`;
            playerArray[i][j].style='open-down open-right';
            playerArray[i][j+1].style='open-up';
            playerArray[i+1][j].style='open-left';
        } else if (Math.random() <.25 && j+1 < size && i+1 < size && !playerArray[i][j].style
            && !playerArray[i][j+1].style && !playerArray[i+1][j+1].style) {
            playerArray[i][j].cage = `x${answerArray[i][j] * answerArray[i][j+1] * answerArray[i+1][j+1]}`;
            playerArray[i][j].style='open-down';
            playerArray[i][j+1].style='open-up open-right';
            playerArray[i+1][j+1].style='open-left';
        } else if (Math.random() <.3 && j+1 < size && i+1 < size && !playerArray[i][j].style
            && !playerArray[i+1][j].style && !playerArray[i+1][j+1].style) {
            playerArray[i][j].cage = `x${answerArray[i][j] * answerArray[i+1][j] * answerArray[i+1][j+1]}`;
            playerArray[i][j].style='open-right';
            playerArray[i+1][j].style='open-left open-down';
            playerArray[i+1][j+1].style='open-up';
        

    
        // 2 horizontal
        } else if (Math.random() <.8 && i+1 < size && !playerArray[i][j].style && !playerArray[i+1][j].style) {
            playerArray[i][j].cage = `x${answerArray[i][j] * answerArray[i+1][j]}`;
            playerArray[i][j].style='open-right';
            playerArray[i+1][j].style='open-left';
            // 3 horizontal
            if (Math.random() <.4 && i+2 < size && !playerArray[i+2][j].style) {
                playerArray[i][j].cage = `x${answerArray[i][j] * answerArray[i+1][j] * answerArray[i+2][j]}`;
                playerArray[i+1][j].style='open-horizontal';
                playerArray[i+2][j].style='open-left';
                // 4 horizontal
                if (Math.random() <.45 && i+3 < size && !playerArray[i+3][j].style) {
                    playerArray[i][j].cage = `x${answerArray[i][j] * answerArray[i+1][j] * answerArray[i+2][j] * answerArray[i+3][j]}`;
                    playerArray[i+2][j].style='open-horizontal';
                    playerArray[i+3][j].style='open-left';    
                }
            }
        // solo
        } else if (!playerArray[i][j].style) {
            playerArray[i][j].cage = answerArray[i][j];
        }
    }
    const createDivideCage = (size, i, j) => {
        // 2 vertical
        if (Math.random() < 0.5 && j+1 < size && Number.isInteger(Math.max(answerArray[i][j], answerArray[i][j+1]) / Math.min(answerArray[i][j], answerArray[i][j+1])) && !playerArray[i][j].style && !playerArray[i][j+1].style) {
            playerArray[i][j].cage = `÷${Math.max(answerArray[i][j], answerArray[i][j+1]) / Math.min(answerArray[i][j], answerArray[i][j+1])}`;
            playerArray[i][j].style='open-down';
            playerArray[i][j+1].style='open-up';
        // 2 horizontal
        } else if (i+1 < size && Number.isInteger(Math.max(answerArray[i][j], answerArray[i+1][j]) / Math.min(answerArray[i][j], answerArray[i+1][j])) && !playerArray[i][j].style && !playerArray[i+1][j].style) {
            playerArray[i][j].cage = `÷${Math.max(answerArray[i][j], answerArray[i+1][j]) / Math.min(answerArray[i][j], answerArray[i+1][j])}`;
            playerArray[i][j].style='open-right';
            playerArray[i+1][j].style='open-left';
        // try vertical again
        } else if (j+1 < size && Number.isInteger(Math.max(answerArray[i][j], answerArray[i][j+1]) / Math.min(answerArray[i][j], answerArray[i][j+1])) && !playerArray[i][j].style && !playerArray[i][j+1].style) {
            playerArray[i][j].cage = `÷${Math.max(answerArray[i][j], answerArray[i][j+1]) / Math.min(answerArray[i][j], answerArray[i][j+1])}`;
            playerArray[i][j].style='open-down';
            playerArray[i][j+1].style='open-up'; 
        // solo
        } else if (!playerArray[i][j].style) {
            playerArray[i][j].cage = answerArray[i][j];
        }
    }


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

                if (operators === 'plus') {
                    createPlusCage(size, i, j);
                } else if (operators === 'plus-minus') {
                    if (Math.random() < 0.5) {
                        createMinusCage(size, i, j);
                    } else {
                        createPlusCage(size, i, j);
                    }
                } else {
                    if (Math.random() < 0.25) {
                        createMinusCage(size, i, j);
                    } else if (Math.random() < 0.333) {
                        createPlusCage(size, i, j);
                    } else if (Math.random() < 0.5) {
                        createTimesCage(size, i, j);
                    } else {
                        createDivideCage(size, i, j);
                    }
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

    const shiftMap = {
        '!': '1',
        '@': '2',
        '#': '3',
        '$': '4',
        '%': '5',
        '^': '6',
        '&': '7',
        '*': '8',
        '(': '9',
    }

    useEffect(() => {
        const callback = (event) => {
            let i = Math.floor((selectedBox - 1) / size);
            let j = selectedBox - 1 - size * i;
            if(event.key <= size.toString() && event.key > 0){
                playerArray[i][j].num = parseInt(event.key);
                playerArray[i][j].notes = new Set();
                for (let k = 0; k < size; k ++) {
                    playerArray[k][j].notes.delete(event.key);
                    playerArray[i][k].notes.delete(event.key);
                };
                playerArray[i][j].notes = new Set();
                setPlayerArray(playerArray);
                updatePlayerMap(size);
            } else if (event.key === 'Backspace') {
                playerArray[i][j].num = '';
                setPlayerArray(playerArray);
                updatePlayerMap(size);
            } else if (event.key === 'ArrowLeft' && i > 0) {
                selectBox(selectedBox - size);
            } else if (event.key === 'ArrowRight' && i < size - 1) {
                selectBox(selectedBox + size);
            } else if (event.key === 'ArrowUp' && j > 0) {
                selectBox(selectedBox - 1);
            } else if (event.key === 'ArrowDown' && j < size - 1) {
                selectBox(selectedBox + 1);
            } else if (['!', '@', '#', '$', '%', '^', '&', '*', '('].includes(event.key)) {
                if (playerArray[i][j].notes.has(shiftMap[event.key])) {
                    playerArray[i][j].notes.delete(shiftMap[event.key]);
                } else {
                    let possibleNote = true;
                    for (let k = 0; k < size; k ++) {
                        if (playerArray[k][j].num === parseInt(shiftMap[event.key]) || playerArray[i][k].num === parseInt(shiftMap[event.key])) {
                            possibleNote = false;
                        }
                    };
                    possibleNote && playerArray[i][j].notes.add(shiftMap[event.key]);
                }
                updatePlayerMap(size);
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
  