import { useState } from "react"
import '../assets/calculator.css'
import CustomButton from "./button"
import { MessageModal } from "./messageModal"

type CalculatorProps = {
  darkMode: boolean
}

function calculate(data: string[]): number {
  // TODO:
  // Add parentheses and functionality around them

  let expression = data.join('');
  const isNegativeFirst = expression.startsWith('-');
  if (isNegativeFirst) {
    expression = expression.substring(1);
  }

  const adjustedExpression = expression.replace(/(\+{2}|-{2})/g, '+').replace(/(\+{1}-|-{1}\+)/g, '-');

  const operators = adjustedExpression.match(/[+\-*\/]/g);
  const operands = adjustedExpression.split(/[+\-*\/]/).map(parseFloat);

  if (!operators || operands.some(isNaN)) {
    console.log(operands, operators);
    return NaN;
  }

  let result = operands[0] * (isNegativeFirst ? -1 : 1);

  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    const operand = operands[i + 1];

    switch (operator) {
      case '+':
        result += operand;
        break;
      case '-':
        result -= operand;
        break;
      case '*':
        result *= operand;
        break;
      case '/':
        if (operand === 0) {
          throw new Error('Division by zero');
        }
        result /= operand;
        break;
    }
  }

  return result;
}

export const Calculator = (Props: CalculatorProps) => {
  const [displayContent, setDisplayContent] = useState<string[]>([])
  const [messageModalShow, setMessageModalShow] = useState(false)
  const [messageModalContent, setMessageModalContent] = useState('')

  const buttons = [
    'Clear', '/', '*', '7', '8', '9', '-', '4', '5', '6', '+', '1','2','3', '=', '0', '.', 'C'
  ]

  const handleClear = () => {
    setDisplayContent([''])
  }

  const handleReset = () => {
    setDisplayContent([''])
  }

  const handleEquals = () => {
    console.log(displayContent)
    setDisplayContent(calculate(displayContent).toString().split(''))
  }

  

  const handleButtonClick = (content: string) => {
    const validInputRegex = /^[0-9+\-*/.\=\Clear\C]+$/
    const operators = ['+', '-', '*', '/']

    if (validInputRegex.test(content)) {
      const lastChar = displayContent[displayContent.length - 1];

      if (
        (displayContent.includes('.') && content === '.') ||
        (
          operators.includes(content) &&
          operators.includes(lastChar) &&
          (content === '*' && lastChar === '*' || lastChar === '/') && (content === '/' && lastChar === '/' || lastChar === '*')
        ) || operators.includes(displayContent[displayContent.length - 2]) && operators.includes(content) && operators.includes(displayContent[displayContent.length - 1])
      ) {
        return;
      }

      if (content === '=') {
        handleEquals()
        return
      } else if (content === 'Clear') {
        handleClear()
        return
      } else if (content === 'C') {
        handleReset()
        return
      }

      setDisplayContent((prevContent: string[]) => [...prevContent, content]);
    } else {
      setMessageModalContent('Invalid input')
      setMessageModalShow(true)
    }
  }

  const ButtonsDiv = () => {
    const operatorsButtonDivHolder: JSX.Element[] = []
    for (let i = 0; i < buttons.length; i++) {
      operatorsButtonDivHolder.push(<CustomButton key={i} content={buttons[i]} className="button" handleClickOnButton={(content) => handleButtonClick(content)}/>)
    }
    return operatorsButtonDivHolder
  }

  const handleModalClose = () => {
    setMessageModalShow(false)
  }

  return (
    <div className={Props.darkMode ? "calculator-container dark-mode" : "calculator-container light-mode"} >
      {messageModalShow && <MessageModal id={Math.random()} message={messageModalContent} handleClose={() => handleModalClose()}/>}
      <div className={Props.darkMode ? "calculator-top-container dark-mode" : "calculator-top-container light-mode"} >
        <input type="text" disabled value={displayContent.join('')}/>
      </div>
      <div className="calculator-bottom-container">
        {ButtonsDiv && ButtonsDiv()}
      </div>
    </div>  
  )
}