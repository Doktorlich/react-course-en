import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combination.js";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = Array.from({ length: 3 }, (_, index) => {
    return Array.from({ length: 3 });
});

function deriveActivePlayer(gameTurns) {
    let currentPlayer = "X";
    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = "0";
    }
    return currentPlayer;
}

let symbolWinner;

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState({ X: "Player 1", 0: "Player 2" });

    let activePlayer = deriveActivePlayer(gameTurns);

    let gameBoard = [...initialGameBoard.map(array => [...array])];

    const hasDraw = gameTurns.length === 9 && !symbolWinner;
    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }
    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            symbolWinner = players[firstSquareSymbol];
            console.log(symbolWinner);
        }
    }
    function handleSelectSquare(rowIndex, colIndex) {
        // setActivePlayer(curActiveSquare => (curActiveSquare === "X" ? "0" : "X"));

        setGameTurns(prevTurns => {
            let currentPlayer = deriveActivePlayer(prevTurns);
            const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
            return updatedTurns;
        });
    }

    function handleRestart() {
        setGameTurns([]);
        symbolWinner = undefined;
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers(prevState => {
            return {
                ...prevState,
                [symbol]: newName,
            };
        });
    }
    return (
        <main>
            <div id="game-container">
                <ol id={"players"} className={"highlight-player"}>
                    <Player
                        name={"Player 1"}
                        symbol={"X"}
                        isActive={activePlayer === "X"}
                        onRename={handlePlayerNameChange}
                    />
                    <Player
                        name={"Player 2"}
                        symbol={"0"}
                        isActive={activePlayer === "0"}
                        onRename={handlePlayerNameChange}
                    />
                </ol>
                {(symbolWinner || hasDraw) && <GameOver symbolWinner={symbolWinner} onRestart={handleRestart} />}
                <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;
