import styles from './Input.module.css'

const Input = ({type, onChange, ...props}) => {
  return (
    <input className={styles['input']} type={type || 'text'} onChange={onChange} {...props} />
  )
}

export default Input