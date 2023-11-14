import ReactDOM from "react-dom"
import '../assets/messageModal.css'

type MessageModalProps = {
  id: number,
  message: string,
  handleClose: () => void
}

export const MessageModal = (Props: MessageModalProps) => {
  const portalElement = document.getElementById('portal')
  
  const handleThisClose = () => {
    Props.handleClose()
  }

  return ReactDOM.createPortal(
    <div className="message-modal" id={`message-modal-${Props.id}`} >
      <span>{Props.message}</span>
      <button type="button" onClick={handleThisClose}>Close</button>
    </div>
  , portalElement!)
}