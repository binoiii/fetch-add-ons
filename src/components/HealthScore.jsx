import { motion } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'
import styles from './HealthScore.module.css'

export function HealthScore({ score }) {
  const display = useCountUp(score)

  return (
    <div className={styles.wrapper}>
      <div className={styles.scoreRow}>
        <motion.span
          key={score}
          className={styles.number}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        >
          {display}
        </motion.span>
        <span className={styles.max}>/100</span>
      </div>
      <span className={styles.label}>Health Score</span>
      <div className={styles.track} role="progressbar" aria-label="Health Score" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100}>
        <motion.div
          className={styles.fill}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  )
}
