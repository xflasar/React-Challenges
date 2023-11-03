import { ChangeEvent, useEffect, useState } from "react"
import '../../../assets/SudokuTable/Tile.css'
interface TileProps {
  position: number
  value: number
  error: boolean
  onValueCollected: (value: number, position: number) => void
}
const Tile = (Props: TileProps) => {
  const [value, setValue] = useState(Props.value + '')

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement> | null) => {
    if (!e) return

    let newValue = e.target.value

    if (newValue === '' || parseInt(newValue) <= 0 || newValue.match(/^[a-zA-Z]+$/)) {
      newValue = '0'
    } else if (parseInt(newValue) > 9) {
      newValue = '9'
    }

    document.querySelector('.Table')?.setAttribute('class', 'Table')
    setValue(newValue)
    Props.onValueCollected(parseInt(newValue), Props.position)
  }

  useEffect(() => {
    setValue(Props.value + '')
  }, [Props.value])

  return (
    <div className={Props.error ? 'tile error' : 'tile'}>
      <input
        type='number'
        maxLength={1}
        value={value}
        pattern='[1-9]*'
        onChange={(e) => handleChangeInput(e)}
      />
    </div>
  )
}


export default Tile