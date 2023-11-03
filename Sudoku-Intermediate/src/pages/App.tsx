import { useRef, useState } from 'react'
import SudokuTable from '../components/SudokuTable/Sudoku/Sudoku.tsx'
import '../assets/App.css'

function App() {
  const [tableShow, setTableShow] = useState(false)
  const sudokuTableRef = useRef<SudokuTable>(null)
  const [tableVal, setTableVal] = useState(Array(9).fill(Array(9).fill(0)) as number[][])

  const handleSubmit = async (er: string) => {
    try {
      const response = await fetch('http://localhost:9090/http://localhost:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'no-cors': 'true'
        },
        body: JSON.stringify({
          sudoku: [er]
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.data[0].status !== 'OK') {
          return
        }

        const dataTables = []
        let data1 = []
        let data2 = []
        let data3 = []

        for (let i = 0; i < data.data[0].solution.length; i += 9) {
          if (i % 27 === 0 && i !== 0) {
            dataTables.push(data1.flat())
            dataTables.push(data2.flat())
            dataTables.push(data3.flat())
            data1 = []
            data2 = []
            data3 = []
          }

          const horizontalString = data.data[0].solution.slice(i, i + 9)
          data1.push(horizontalString.slice(0, 3).split('').map((d: string) => parseInt(d)))
          data2.push(horizontalString.slice(3, 6).split('').map((d: string) => parseInt(d)))
          data3.push(horizontalString.slice(6, 9).split('').map((d: string) => parseInt(d)))
        }

        dataTables.push(data1.flat())
        dataTables.push(data2.flat())
        dataTables.push(data3.flat())

        const blockElements = document.querySelectorAll('.tile')
        if (blockElements) {
          blockElements.forEach((el) => el.setAttribute('class', 'tile solved'))
        }

        setTableVal(dataTables)
      } else {
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleResetTable = () => {
    setTableVal(Array(9).fill(Array(9).fill(0)) as number[][])
    sudokuTableRef.current?.handleReset()
    document.querySelector('.Table')?.setAttribute('class', 'Table')
  }

  return (
    <main>
      {tableShow ? <button onClick={() => setTableShow(false)}>Show Table</button> : <button onClick={() => setTableShow(true)}>New Table</button>}

      <button onClick={() => sudokuTableRef.current?.handleSubmit()}>Submit</button>
      <button onClick={handleResetTable}>Reset</button>

      {tableShow && <SudokuTable ref={sudokuTableRef} values={tableVal} onSubmit={handleSubmit} />}
    </main>
  )
}

export default App
