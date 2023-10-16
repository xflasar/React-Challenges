import { useEffect, useState } from "react";
import '../assets/Traffic_light/Traffic_light.css'

const Traffic_light = () => {
  const [color, setColor] = useState("red");
  const [timer, setTimer] = useState(20000)

  function getLightChangeClass (colorSet: string): string {
    return `traffic-light-item-${colorSet}` + (color === colorSet ? " active" : "")
  
  }

  useEffect(() => {
    if(timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1000)
      }, 1000)
    } else {
      if(color === "red"){
        setTimer(5000)
        setColor("yellow")
      } else if (color === "yellow") {
        setTimer(15000)
        setColor("green")
      } else {
        setTimer(20000)
        setColor("red")
      }
    }
  }, [color, timer])

  return (
    <div className="traffic-light-container">
      <div className={`traffic-light`}>
        <div className="traffic-light-inner">
        <div className={getLightChangeClass('red')}>
            {color === 'red' && (
              <div className="traffic-light-item-timer">
                {Math.floor((timer as number) / 1000)}s
              </div>
            )}
          </div>
          <div className={getLightChangeClass('yellow')}>
            {color === 'yellow' && (
              <div className="traffic-light-item-timer">
                {Math.floor((timer as number) / 1000)}s
              </div>
            )}
          </div>
          <div className={getLightChangeClass('green')}>
            {color === 'green' && (
              <div className="traffic-light-item-timer">
                {Math.floor((timer as number) / 1000)}s
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Traffic_light;