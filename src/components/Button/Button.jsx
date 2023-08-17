import styles from './Button.module.css'

const Button = ({state, className, children, ...props}) => {
  const getClass = () => {
    let defState = 'primary'

    if (state) {
      defState = state
    }

    return `${styles.btn} ${styles[`btn--${defState}`]} ${className || ''}`
  }

  return (
    <button className={getClass()} {...props}>{children}</button>
  )
}

export default Button