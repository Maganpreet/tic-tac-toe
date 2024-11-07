export default function GameOver({ winner, draw, onRestart }) {
    return (
      <div id="game-over">
        <h2>Game Over!</h2>
        {winner && <p>{winner} won!</p>}
        {draw && <p>It&apos;s a draw!</p>}
        <p>
          <button onClick={onRestart}>Rematch!</button>
        </p>
      </div>
    );
}