import { useEffect, useState } from 'react'
import Tile from '../Title/Tile'
import '../../../assets/SudokuTable/Block.css'

interface BlockInterface {
  blockValues: number[]
  blockIndex: number
  blockError: boolean
  blockTileNumError: number | null
  blockValuesChange: (blockValues: number[], blockIndex: number) => void
}

const Block = (Props: BlockInterface) => {
  const [tiles, setTiles] = useState<number[]>([])

  const handleTileValueCollected = (value: number, position: number) => {
    const updatedValues = tiles.map((tile, index) => {
      if (index === position) return value
      return tile
    })

    setTiles(updatedValues)
    Props.blockValuesChange(updatedValues, Props.blockIndex)
  }

  useEffect(() => {
    if (!Props.blockValues) return

    if (Props.blockValues.length < 0) {
      const tilesArray = Array.from({ length: 9 }, () => 0)
      setTiles(tilesArray)
    }

    setTiles(Props.blockValues)
  }, [Props.blockValues])

  return (
    <div className={Props.blockError ? 'block error' : 'block'}>
      {tiles.map((value, index) => (
        <Tile
          key={`tile_${index}`}
          value={value}
          error={value === Props.blockTileNumError && Props.blockError}
          onValueCollected={handleTileValueCollected}
          position={index}
        />
      ))}
    </div>
  )
}


export default Block