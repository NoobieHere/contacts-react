import {BsPersonAdd, BsPencilFill} from 'react-icons/bs'

const ActionBtn = ({action, icon, onClick}) => {
  const getActionIcon = () => {
    switch (action) {
      case 'add': 
        return <BsPersonAdd />
      case 'edit':
        return <BsPencilFill />
      default:
        return icon | 'Icon'
    }
  }
  return (
    <button type="button" onClick={onClick}>{getActionIcon()}</button>
  )
}

export default ActionBtn