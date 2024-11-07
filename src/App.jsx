import { useState } from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { WINNING_COMBINATIONS } from '../winning-combinations';

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
}

const INITTIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

function deriveActivePlayer(gameTurns) {

  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITTIAL_GAME_BOARD.map(array => [...array])];

    for (const turn of gameTurns) {
      console.log(turn);
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = undefined;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combinations[0].row][combinations[0].column]
    const secondSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSymbol = gameBoard[combinations[2].row][combinations[2].column]

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol &&
      secondSymbol === thirdSymbol
    ) {
      winner = players[firstSymbol];
    }
  }
  return winner;
}



function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  //const [activePlayer, setActivePlayer] = useState('X');
  let activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const squareSelectHandler = (rowIdx, colIdx) => {
    // setActivePlayer(currActivePlayer => currActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIdx, col: colIdx }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  const playerNameChangeHandler = (symbol, newName) => {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  const RestartGameHandler = () => {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={playerNameChangeHandler}
          ></Player>
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={playerNameChangeHandler}
          ></Player>
        </ol>
        {(winner || hasDraw) && (
          <GameOver
            winner={winner}
            draw={hasDraw}
            onRestart={RestartGameHandler}
          ></GameOver>
        )}
        <GameBoard
          board={gameBoard}
          onSquareSelect={squareSelectHandler}
          activePlyerSymbol={activePlayer}
        ></GameBoard>
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App
