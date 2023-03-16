import { useState, useEffect, useRef } from 'react';
import './App.css';

const Game = ({size, difficulty, operators}) => {
    //ignore difficuluty and operators for a while

    const createMap = (size) => {
        const map =[];
        const mapEls = [];
        for (let i = 0; i < size; i++) {
            let nums = Array.from({length: size}, (_, i) => i + 1)
            let row = [];
            let rowEls = [];
            for (let j = 0; j < size; j++) {
                const noList = [];
                // console.log(j)
                for (let k = i; k > 0; k-=1) {
                    // console.log(i, k);
                    noList.push(mapEls[k-1][j]);
                }
                let newNumList = nums.filter((el) => !noList.includes(el));
                let newNum = newNumList[Math.floor(Math.random()*newNumList.length)];
                if (!newNum) {
                    return createMap(size);
                }
                let newNumIdx = nums.indexOf(newNum);
                // console.log(newNumList, newNum, newNumIdx)

                rowEls.push(newNum);
                row.push(<div className='box'>{nums.splice(newNumIdx, 1)}</div>);
            }
            map.push(<div className='row'>{row}</div>)
            mapEls.push(rowEls);
            // console.log(mapEls)

        }
        console.log(mapEls)
        return map;
    }
    const map = createMap(size);
  
    return (
    <div className='game'>
        <div>
            size: {size}  difficulty: {difficulty}  operators: {operators}
        </div>
        <div className='map'>
            {map}
        </div>
    </div>
    );
  }
  
  export default Game;
  