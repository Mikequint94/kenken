import './App.css';

const GameSelect = ({startGame, setSize, setDifficulty, setOperators, size, difficulty, operators}) => {
    // const pastWins = [{size: 9, time: '1:34'}, {size: 5, time: '0:34'}];
    let pastWins = localStorage.getItem('gameWins') || '{}';
    // if (!pastWins.length) {
    //     localStorage.setItem('gameWins', )
    // }
    console.log(pastWins)
    let pastWinsArray = pastWins.split(', ');
    console.log (pastWinsArray);

    const formatList = (arr) => {
        let listItems = [];
        for (let i = 0; i < arr.length; i++) {
          let obj = JSON.parse(arr[i]);
          const { size, time } = obj;
          const listItem = <li>{`size: ${size} - time: ${time}`}</li>;
          listItems.push(listItem);
        }
        return <ul>{listItems}</ul>;
    }


    return (
    <div className='selection'>
        Select Size
        <div className='sizes'>
            <button className={size === 3 && 'selected'} onClick={() => setSize(3)}>3 x 3</button>
            <button className={size === 4 && 'selected'} onClick={() => setSize(4)}>4 x 4</button>
            <button className={size === 5 && 'selected'} onClick={() => setSize(5)}>5 x 5</button>
            <button className={size === 6 && 'selected'} onClick={() => setSize(6)}>6 x 6</button>
            <button className={size === 7 && 'selected'} onClick={() => setSize(7)}>7 x 7</button>
            <button className={size === 8 && 'selected'} onClick={() => setSize(8)}>8 x 8</button>
            <button className={size === 9 && 'selected'} onClick={() => setSize(9)}>9 x 9</button>
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
        <div className="history">
            Past wins:
            <div>
                {formatList(pastWinsArray)}
            </div>
        </div>
    </div>
    );
  }
  
  export default GameSelect;
  