import { useState, useEffect, useRef } from 'react';
import './App.css';

const Game = ({size, difficulty, operators, answerMap, playerMap, setAnswerMap, setPlayerMap}) => {
    //ignore difficulty and operators for a while

    const [selectedBox, setSelectedBox] = useState();
    const [playerArray, setPlayerArray] = useState([...Array(size)].map(e => Array(size)));
    const [answerArray, setAnswerArray] = useState();

    let lastTarget = null;
    const selectBox = (num, e) => {
        setSelectedBox(num)
        lastTarget && lastTarget.target.classList.remove('selectedBox')
        e.target.classList.toggle('selectedBox')
        lastTarget = e;
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
                playerRow.push(<div tabIndex='0' onClick={(e) => selectBox(boxNum, e)} className='box'>{playerArray[i][j]}</div>);
            }
            playerMap.push(<div className='row'>{playerRow}</div>);
        }
        setPlayerMap(playerMap);
        console.log(JSON.stringify(playerArray))
        console.log(JSON.stringify(answerArray))
        if (JSON.stringify(playerArray) === JSON.stringify(answerArray)) {
            alert('you win!');
        }
        return;
    };

    useEffect(() => {
        createAnswerMap(size);
        updatePlayerMap(size);
    }, []);

    useEffect(() => {
        const callback = (event) => {
            if(event.key <= size.toString() && event.key > 0){
                console.log(event.target)
                let i = Math.floor((selectedBox - 1) / size);
                let j = selectedBox - 1 - size * i;
                console.log(playerArray, i, j, selectedBox)
                playerArray[i][j] = parseInt(event.key);
                setPlayerArray(playerArray);
                updatePlayerMap(size);
                lastTarget = event
            }
        }
        document.addEventListener('keydown', callback);
        return () => {
            document.removeEventListener('keydown', callback);
        };
      }, [selectedBox])
  
    return (
    <div className='game'>
        <div>
            size: {size}  difficulty: {difficulty}  operators: {operators}
            {selectedBox}
        </div>
        <div className='map'>
            {answerMap}
        </div>
        <div className='map'>
            {playerMap}
        </div>
    </div>
    );
  }
  
  export default Game;
  