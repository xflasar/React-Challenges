import { Component } from 'react'
import '../../../assets/SudokuTable/SudokuTable.css'
import Block from '../Block/Block'

interface SudokuTableProps {
  values: number[][]
  onSubmit: (submitString: string) => void
}

interface SudokuTableState {
  table: JSX.Element[]
  tableValues: number[][]
  blockIndexError: number | null
  tileNumError: number | null
}

function checkUniqueElements(arr: number[][]) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      for (let k = j + 1; k < arr[i].length; k++) {
        if ((arr[i][j] === arr[i][k]) && (arr[i][j] !== 0 || arr[i][k] !== 0)) {
          return {
            status: false,
            blockIndex: i,
            tileIndex: k,
            tileNum: arr[i][k]
          }
        }
      }
    }
  }

  for (let i = 0; i < arr[0].length; i++) {
    for (let j = 0; j < arr.length; j++) {
      for (let k = j + 1; k < arr.length; k++) {
        if ((arr[j][i] === arr[k][i]) && (arr[j][i] !== 0 || arr[k][i] !== 0)) {
          return {
            status: false,
            blockIndex: k,
            tileIndex: i,
            tileNum: arr[k][i]
          }
        }
      }
    }
  }
  
  return {
    status: true,
    blockIndex: null,
    tileIndex: null,
    tileNum: null
  }
}


class SudokuTable extends Component<SudokuTableProps, SudokuTableState> {
  constructor(props: SudokuTableProps) {
    super(props)

    this.state = {
      table: [],
      tableValues: Array(9).fill(Array(9).fill(0)),
      blockIndexError: null,
      tileNumError: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate(prevProps: SudokuTableProps, prevState: SudokuTableState) {
    if (
      prevProps.values !== this.props.values ||
      prevState.blockIndexError !== this.state.blockIndexError ||
      prevState.tileNumError !== this.state.tileNumError
    ) {
      this.createTable()
    }
  }

  handleReset() {
    this.setState({ blockIndexError: null })
    this.setState({ tileNumError: null })
    const blockElements = document.querySelectorAll('.tile')
    if (blockElements) {
      blockElements.forEach((el) => el.setAttribute('class', 'tile'))
    }
  }

  handleSubmit() {
    const blocks: number[][] = []
    const d1: number[] = []
    const d2: number[] = []
    const d3: number[] = []

    this.state.tableValues.forEach((block, index) => {
      if (index === 3 || index === 6) {
        blocks.push([...d1])
        blocks.push([...d2])
        blocks.push([...d3])
        d1.length = 0
        d2.length = 0
        d3.length = 0
      }

      d1.push(...block.slice(0, 3))
      d2.push(...block.slice(3, 6))
      d3.push(...block.slice(6, 9))

      if (index === this.state.tableValues.length - 1) {
        blocks.push([...d1])
        blocks.push([...d2])
        blocks.push([...d3])
      }
    })

    const check = checkUniqueElements(blocks)

    
    if (!check.status) {
      if(!check.blockIndex && !check.tileIndex) return

      const blockIndex = Math.floor(check.blockIndex / 3) * 3 + Math.floor(check.tileIndex / 3);
      this.setState({ blockIndexError: blockIndex });

      this.setState({ tileNumError: check.tileNum })
      return
    }

    this.setState({ blockIndexError: null })
    this.setState({ tileNumError: null })

    blocks.map((block) => {
      return block.flat()
    })

    const submitString = blocks.join('').replace(/0/g, '.').replace(/,/g, '')
    if (submitString.length !== 81 || /^[.]*$/.test(submitString)) {
      document.querySelector('.Table')?.setAttribute('class', 'Table error')
      return
    }

    this.props.onSubmit(submitString)
  }

  handleBlockValuesChange(blockValues: number[], startIndex: number) {
    const newTableValues = this.state.tableValues.map((block, index) => {
      if (index === startIndex) {
        return [...blockValues]
      } else {
        return [...block]
      }
    })
    this.setState({ tableValues: newTableValues })
  }

  componentDidMount() {
    this.createTable()
  }

  createTable() {
    this.setState({ table: [] })
    this.setState({ tableValues: this.props.values })

    const tableTemp = []
    for (let i = 0; i < this.props.values.length; i++) {
      tableTemp.push(
        <Block
          key={`block_${i}`}
          blockValues={this.props.values[i]}
          blockIndex={i}
          blockValuesChange={this.handleBlockValuesChange.bind(this)}
          blockError={i === this.state.blockIndexError}
          blockTileNumError={this.state.tileNumError}
          />
      )
    }

    this.setState({ table: tableTemp })
  }

  render() {
    return (
      <div className="Table">
        {this.state.table.map((Block) => Block)}
      </div>
    )
  }
}

export default SudokuTable