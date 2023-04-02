import './App.css';

const GameSelect = ({startGame, setSize, setDifficulty, setOperators, size, difficulty, operators}) => {
    let pastWins = localStorage.getItem('gameWins') || '{}';
    let pastWinsArray = pastWins.split(', ');

    const formatList = (arr) => {
        let listItems = [];
        for (let i = 0; i < arr.length; i++) {
          let obj = JSON.parse(arr[i]);
          const { size, time } = obj;
          const listItem = <li key={`item-${i}`}>{`size: ${size} - time: ${time}`}</li>;
          listItems.push(listItem);
        }
        return <ul>{listItems}</ul>;
    }


    return (
    <div className='selection'>
        Select Size
        <div className='sizes'>
            <button className={size === 3 ? 'selected' : undefined} onClick={() => setSize(3)}>3 x 3</button>
            <button className={size === 4 ? 'selected' : undefined} onClick={() => setSize(4)}>4 x 4</button>
            <button className={size === 5 ? 'selected' : undefined} onClick={() => setSize(5)}>5 x 5</button>
            <button className={size === 6 ? 'selected' : undefined} onClick={() => setSize(6)}>6 x 6</button>
            <button className={size === 7 ? 'selected' : undefined} onClick={() => setSize(7)}>7 x 7</button>
            <button className={size === 8 ? 'selected' : undefined} onClick={() => setSize(8)}>8 x 8</button>
            <button className={size === 9 ? 'selected' : undefined} onClick={() => setSize(9)}>9 x 9</button>
        </div>
        Select Difficulty
        <div className='difficulties'>
            <button className={difficulty === 'easy' ? 'selected' : undefined} onClick={() => setDifficulty('easy')}>Easy</button>
            <button className={difficulty === 'medium' ? 'selected' : undefined} onClick={() => setDifficulty('medium')}>Medium</button>
            <button className={difficulty === 'hard' ? 'selected' : undefined} onClick={() => setDifficulty('hard')}>Hard</button>
        </div>
        Select Operators
        <div className='operators'>
            <button className={operators === 'plus' ? 'selected' : undefined} onClick={() => setOperators('plus')}>+</button>
            <button className={operators === 'plus-minus' ? 'selected' : undefined} onClick={() => setOperators('plus-minus')}>+ -</button>
            <button className={operators === 'all' ? 'selected' : undefined} onClick={() => setOperators('all')}>+ - * /</button>
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
  