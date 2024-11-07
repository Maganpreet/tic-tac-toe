export default function GameBoard({ onSquareSelect, board }) {

    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // const squareSelectHandler = (rowIdx, colIdx) => {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIdx][colIdx] = activePlyerSymbol;
    //         console.log(updatedBoard)
    //         return updatedBoard
    //     })
    //     onSquareSelect();
    // }

    return (
      <ol id="game-board">
        {board.map((row, rowIdx) => (
          <li key={rowIdx}>
            <ol>
              {row.map((playerSymbol, colIdx) => (
                <li key={colIdx}>
                  <button
                    onClick={() => onSquareSelect(rowIdx, colIdx)}
                    disabled={playerSymbol !== null}
                  >
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    );
}