import styles from './Button.module.css'

export function Button({ children, onClick, variant = 'primary', disabled, type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
