import '../assets/css/GameOver.css'

interface PropInterface {
  score: number;
  playAgain: () => void;
}
function GameOver(Props: PropInterface): JSX.Element {
  return (
    <div className='gameover-overlay'>
      <div className='gameover-container'>
        <h1>Game Over</h1>
        <button type="button" onClick={Props.playAgain}>Play Again</button>
      </div>
    </div>
  )
}

export default GameOver