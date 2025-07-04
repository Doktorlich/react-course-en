export default function GameBoard({ onSelectSquare, board }) {
    return (
        <ol id={"game-board"}>
            {board.map((row, rowIndex) => {
                return (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((cell, cellIndex) => {
                                return (
                                    <li key={cellIndex}>
                                        <button
                                            onClick={() => onSelectSquare(rowIndex, cellIndex)}
                                            disabled={cell !== undefined}
                                        >
                                            {cell}
                                        </button>
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
