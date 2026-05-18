import { motion } from 'framer-motion'
import styles from './PetCard.module.css'

const PETS = {
  dog: { emoji: '🐶', label: 'Dog' },
  cat: { emoji: '🐱', label: 'Cat' },
}

export function PetCard({ type, selected, onSelect }) {
  const { emoji, label } = PETS[type]

  return (
    <motion.button
      className={`${styles.card} ${selected ? styles.selected : ''}`}
      onClick={() => onSelect(type)}
      whileHover={{ y: -6, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      animate={selected ? { scale: 1.03 } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      aria-pressed={selected}
    >
      <motion.span
        className={styles.emoji}
        animate={selected ? { scale: [1, 1.25, 1] } : { scale: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {emoji}
      </motion.span>
      <span className={styles.label}>{label}</span>
      {selected && (
        <motion.div
          className={styles.dot}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        />
      )}
    </motion.button>
  )
}
