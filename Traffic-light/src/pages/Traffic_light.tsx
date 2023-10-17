import { useEffect, useState } from "react";
import '../assets/Traffic_light/Traffic_light.css'

const Traffic_light = () => {
  const [color, setColor] = useState("red");
  const [timer, setTimer] = useState(20000)

  function getLightChangeClass (colorSet: string): string {
    return `traffic-light-item-${colorSet}` + (color === colorSet ? " active" : "")
  
  }

  const getNextColor = (currentColor: string) => {
    switch (currentColor) {
      case 'red':
        return 'yellow'
      case 'yellow':
        return 'green'
      case 'green':
        return 'red'
      default:
        return 'red'
    }
  }

  const LIGHT_TIMES: { [key: string]: number }  = {
    red: 20000,
    yellow: 5000,
    green: 15000
  }

  const decreaseTimer = () => {
    setTimer((prevTimer) => prevTimer - 1000)
  }

  useEffect(() => {
    if(timer > 0) {
      const timerId = setTimeout(decreaseTimer, 1000)
      return () => clearTimeout(timerId)
    } else {
      const nextColor = getNextColor(color)
      setColor(nextColor)
      setTimer(LIGHT_TIMES[nextColor])
    }
  }, [color, timer])

  return (
    <div className="traffic-light-container">
      <div className={`traffic-light`}>
        <div className="traffic-light-inner">
          {Object.keys(LIGHT_TIMES).map((lightColor) => (
            <div className={getLightChangeClass(lightColor)} key={lightColor}>
              {color === lightColor && (
                <div className="traffic-light-item-timer">
                  {Math.floor(timer / 1000)}s
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Traffic_light;