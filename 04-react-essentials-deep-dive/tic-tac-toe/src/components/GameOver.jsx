export default function GameOver({ symbolWinner,onRestart }) {
    return (
        <div id={"game-over"}>
            <h2>Game Over!</h2>
            {symbolWinner && <p>{symbolWinner} won!</p>}
            {!symbolWinner && <p>It&apos;s a draw!</p>}
            <p>
                <button onClick={onRestart}>Rematch! </button>
            </p>
        </div>
    );
}
