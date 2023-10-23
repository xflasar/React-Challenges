import { useEffect, useState } from "react"
import '../assets/css/mole.css'

interface MoleProps {
  activate: boolean
  handleUserHit(): void
  handleUserMiss(): void
}

function Mole(Props: MoleProps): JSX.Element {
  const [active, setActive] = useState(false)
  const activeImage = '/mole.png'
  const inactiveImage = '/hole.png'

  useEffect(() => {
    if(Props.activate) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [Props.activate])

  const handleUserClick = () => {
    if(active) {
      setActive(false)
      Props.handleUserHit()
    } else {
      Props.handleUserMiss()
    }
  }

  
  return (
    <div onClick={() => handleUserClick()} style={{color: `${active ? 'red' : 'white'}` }} className="mole" >
      <img src={active ? activeImage : inactiveImage} />
    </div>
  )
}

export default Mole