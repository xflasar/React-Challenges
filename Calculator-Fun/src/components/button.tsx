type ButtonProps = {
  content: string,
  className: string,
  handleClickOnButton: (content: string) => void
}

const ButtonNumbers = (buttonProps: ButtonProps) => {
  const handleClickOnButton = (content: string) => {
    buttonProps.handleClickOnButton(content)
  }

  return(
    <button type="button" className={buttonProps.className} onClick={() => handleClickOnButton(buttonProps.content)}>{buttonProps.content}</button>
  )
}

export default ButtonNumbers