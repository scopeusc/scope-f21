import React, {ReactNode, useState} from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

//NOTE: when I copy and pasted the 'X' and 'O' the apostrophes weren't being picked up 
//and resulted in an error. So I fixed it by manually putting the apostrophe. 
//Make the same changes to the above import statements with the apostrophe and quotation marks.
//Purpose of line below is to define this SquareValue type to make our code less repetitive.
type SquareValue = 'X' | 'O' | null;

interface SquareProps {
  onClick(): void; //we see that the onClick function in Square takes in no parameters and calls 
  //the onClick function on the props. Looking at the Game component, we see that 
  //the onClick function passes i and calles the handleClick method. 
  //Looking at the handleClick method, we see that nothing is being returned. Thus, we type to void.
	value: SquareValue;
}

const calculateWinner = (squares: SquareValue[]): SquareValue => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

//converted to arrow notation
//in this line below we let Typescript know that this is a funcitonal component
//We assigned the type of our props by the <SquareProps>
const Square: React.FC<SquareProps> = props => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

interface BoardProps {
	onClick(i: number): void; //takes in number i and returns void
  squares: SquareValue[]; //the Board is constructed as a 9x9 array of tiles that can either
  //be X, O, or null. So we want to represent this as an array hence the [].
}

//Again, let Typescript know this is a functional component. Change the syntax. 
const Board: React.FC<BoardProps> = props => {
  //This returns a Square component. How do we tell Typescript that this is returning
  //a React component. 
  //The most general term for all React components is ReactNode so we will use 
  //this when defining the type that we are returning. 
  const renderSquare = (i: number) : ReactNode => {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }
  //used to be a render() here
  //In Functional component, don't need render method. That is why we deleted it.
    return (
      <div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
  };

//This Game component is unique to the Board and Square component because
//it manages its own state. We use state in a functional component
//by using the useState hook which we defined all the way at the top
//in the import statement.
const Game: React.FC = () => { 
  //before we changed the code to what we have below, 
  //we had a constructor. But in a functional component, we don't have a constructor.
  //We will use the useState hook to declare the variables defined in the previous constructor.
  //format below is const [variable, function where you update value] = useState<type>(initial value);
    const [xIsNext, setxIsNext] = useState<boolean>(true);
    const [stepNumber, setStepNumber] = useState<number> (0);
    //NOTE: there was a typo in line below. with a misplaced bracket. Now fixed. 
    //type set to an array of object Squares
    const [history, setHistory] = useState<{squares: SquareValue[]}[]> ([
      {
        squares: Array(9).fill(null)
      }
    ]);


  const handleClick = (i: number): void => {
    //previously we had: 
    // const history = state.history.slice(0, state.stepNumber + 1);
    //but since history is already defined above and its within the same scope, we had
    //to rename to newHistory which is indicated below. 
    const newHistory = history.slice(0, stepNumber+1);
    //updated down below changing history to newHistory
//===========================THIS IS WHERE WE WILL CONTINUE NEXT TUESDAY :) SEE YA THEN ======================//
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(newHistory.concat([
      {
        squares: squares
      }
    ]));
    setStepNumber(newHistory.length);
    setxIsNext(!xIsNext);

  }

  const jumpTo = (step: number) : void => {
    setStepNumber(step);
    setxIsNext((step%2) === 0);  
  };
    
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
// }

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));



