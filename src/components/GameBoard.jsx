import { useState } from "react"

const initialGameBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
]

export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    const squareSelectHandler = (rowIdx, colIdx) => {
        setGameBoard((prevGameBoard) => {
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updatedBoard[rowIdx][colIdx] = 'X';
            console.log(updatedBoard)
            return updatedBoard
        })
    }

    return <ol id="game-board">
        {gameBoard.map((row, rowIdx) => <li key={rowIdx}>
            <ol>
                {row.map((playerSymbol, colIdx) => <li key={colIdx}>
                    <button onClick={() => squareSelectHandler(rowIdx, colIdx)}>{playerSymbol}</button>
                </li>)}
            </ol>
        </li>)}
    </ol>
}