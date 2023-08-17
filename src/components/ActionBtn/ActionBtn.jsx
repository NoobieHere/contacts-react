import { BsPersonAdd, BsPersonCheckFill, BsArrowLeft } from 'react-icons/bs'

const ActionBtn = ({ action, icon, onClick }) => {
  const getActionIcon = () => {
    switch (action) {
      case 'add':
        return <BsPersonAdd />
      case 'save':
        return <BsPersonCheckFill />
      case 'back':
        return <BsArrowLeft />
      default:
        return icon | 'Icon'
    }
  }
  return (
    <button type="button" onClick={onClick}>
      {getActionIcon()}
    </button>
  )
}

export default ActionBtn
