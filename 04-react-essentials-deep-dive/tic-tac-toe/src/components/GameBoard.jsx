import { useState } from "react";

const initialGameBoard = Array.from({ length: 3 }, (_, index) => {
    return Array.from({ length: 3 });
});
console.log(initialGameBoard.length);
// state для "чей ход"
// state для ""

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);
    function handleSelectSquare(rowIndex, cellIndex) {
        console.log(rowIndex, cellIndex);
        setGameBoard(prevGameBoard => {
            const updatedBoard = [...prevGameBoard.map(cell => [...cell])];
            updatedBoard[rowIndex][cellIndex] =activePlayerSymbol;
            return updatedBoard;
        });
        onSelectSquare()
    }
    return (
        <ol id={"game-board"} >
            {gameBoard.map((row, rowIndex) => {
                return (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((cell, cellIndex) => {
                                return (
                                    <li key={cellIndex}>
                                        <button onClick={() => handleSelectSquare(rowIndex, cellIndex)}>{cell} </button>
                                    </li>
                                );
                            })}
                        </ol>
                    </li>
                );
            })}
        </ol>
    );
}
