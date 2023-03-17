import { useState, useEffect, useRef } from 'react';
import './App.css';

const Game = ({size, difficulty, operators, answerMap, playerMap, setAnswerMap, setPlayerMap}) => {
    //ignore difficulty and operators for a while

    const [selectedBox, setSelectedBox] = useState();
    const [playerArray, setPlayerArray] = useState([...Array(size)].map(e => Array(size).fill().map(u => ({num: '', cage: ''}))));
    const [answerArray, setAnswerArray] = useState();

    let lastTarget = null;
    const selectBox = (num, e) => {
        setSelectedBox(num)
        lastTarget && lastTarget.classList.remove('selectedBox')
        e.currentTarget.classList.toggle('selectedBox')
        lastTarget = e.currentTarget;
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
                playerRow.push(<div tabIndex='0' onClick={(e) => selectBox(boxNum, e)} className='box'>
                    <div className='cage'>{playerArray[i][j].cage}</div>
                    <div className='num'>{playerArray[i][j].num}</div>
                </div>);
            }
            playerMap.push(<div className='row'>{playerRow}</div>);
        }
        setPlayerMap(playerMap);
        const playerNums = playerArray.map(arr => arr.map(obj => obj.num));
        // console.log(JSON.stringify(answerArray))
        // console.log(JSON.stringify(playerNums))
        if (JSON.stringify(playerNums) === JSON.stringify(answerArray)) {
            alert('you win!');
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
        console.log(answerArray)
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (Math.random() <.4 && j+1 < size && !playerArray[i][j].cage && !playerArray[i][j+1].cage) {
                    playerArray[i][j].cage = `+${answerArray[i][j] + answerArray[i][j+1]}`;
                    playerArray[i][j+1].cage = '^'
                } else if (Math.random() <.8 && i+1 < size && !playerArray[i][j].cage && !playerArray[i+1][j].cage) {
                    playerArray[i][j].cage = `+${answerArray[i][j] + answerArray[i+1][j]}`;
                    playerArray[i+1][j].cage = '<'
                } else if (!playerArray[i][j].cage) {
                    playerArray[i][j].cage = answerArray[i][j];
                }

                // if (Math.random() < .2 && !playerArray[i][j].cage) {
                //     playerArray[i][j].cage = answerArray[i][j]
                // } else (Math.random() <.5)
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
            if(event.key <= size.toString() && event.key > 0){
                let i = Math.floor((selectedBox - 1) / size);
                let j = selectedBox - 1 - size * i;
                console.log(playerArray, i, j, selectedBox)
                playerArray[i][j].num = parseInt(event.key);
                setPlayerArray(playerArray);
                updatePlayerMap(size);
                lastTarget = event.target;
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
  