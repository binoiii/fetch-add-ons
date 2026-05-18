import { motion, AnimatePresence } from 'framer-motion'
import styles from './AddonCard.module.css'

export function AddonCard({ addon, selected, onToggle }) {
  return (
    <motion.button
      className={`${styles.card} ${selected ? styles.selected : ''}`}
      onClick={() => onToggle(addon.id)}
      whileTap={{ scale: 0.98 }}
      aria-pressed={selected}
    >
      <span className={styles.emoji} aria-hidden="true">{addon.emoji}</span>
      <div className={styles.info}>
        <span className={styles.name}>{addon.label}</span>
        <span className={styles.desc}>{addon.description}</span>
      </div>
      <motion.div
        className={styles.check}
        animate={
          selected
            ? { backgroundColor: '#FF4FA3', borderColor: '#FF4FA3' }
            : { backgroundColor: 'transparent', borderColor: 'rgba(0,0,0,0.2)' }
        }
        transition={{ duration: 0.15 }}
        aria-hidden="true"
      >
        <AnimatePresence>
          {selected && (
            <motion.svg
              key="check"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M2 6l3 3 5-5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  )
}
