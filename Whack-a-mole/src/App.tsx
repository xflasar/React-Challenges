import { useCallback, useEffect, useState } from 'react'
import './App.css'
import Mole from './components/Mole'
import GameOver from './components/GameOver'
import ReactDOM from 'react-dom'

function App() {
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [moles, setMoles] = useState(Array(9).fill(0))

  
  const resetMoles = useCallback(() => {
    return moles.map(() => 0)
  }, [moles])

  useEffect(() => {
    if(score < 0) {
      setGameOver(true)
    } else {
      const timer = setTimeout(function(){
        const moleTemp = resetMoles()
        const updatedMoles = [...moleTemp]
        updatedMoles[Math.floor(Math.random() * moleTemp.length )] = 1
        setMoles(updatedMoles)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [moles, score, resetMoles])


  const handleUserHit = () => {
    setScore((prevScore) => prevScore + 1)
    setMoles(resetMoles())
  }

  const handleUserMiss = () => {
    setScore((prevScore) => prevScore - 1)
  }

  const handlePlayAgain = () => {
    resetMoles()
    setScore(0)
    setGameOver(false)
  }

  return (
    <div className='mole-main'>
      <div>Player score: {score}</div>
      <div className='mole-container'>
        {moles.map((mole, index) => (
          <Mole
            key={index}
            activate={mole === 1}
            handleUserHit={handleUserHit}
            handleUserMiss={handleUserMiss}
          />
        ))}
      </div>
      {gameOver && (
        ReactDOM.createPortal(<GameOver score={score} playAgain={() => handlePlayAgain()}/>, document.getElementById('portal')!)
      )}
    </div>
  )
}

export default App
