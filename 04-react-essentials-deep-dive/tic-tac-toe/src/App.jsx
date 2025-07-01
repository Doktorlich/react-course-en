import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";
import Log from "./components/Log.jsx";

function deriveActivePlayer(gameTurns) {
    let currentPlayer = "X";
    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = "0";
    }
    return currentPlayer;
}

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    // const [activePlayer, setActivePlayer] = useState("X");

    let activePlayer = deriveActivePlayer(gameTurns);

    function handleSelectSquare(rowIndex, colIndex) {
        // setActivePlayer(curActiveSquare => (curActiveSquare === "X" ? "0" : "X"));

        setGameTurns(prevTurns => {
           let currentPlayer = deriveActivePlayer(prevTurns)
            const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
            return updatedTurns;
        });
    }
    return (
        <main>
            <div id="game-container">
                <ol id={"players"} className={"highlight-player"}>
                    <Player name={"Player 1"} symbol={"X"} isActive={activePlayer === "X"} />
                    <Player name={"Player 2"} symbol={"0"} isActive={activePlayer === "0"} />
                </ol>
                <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;
