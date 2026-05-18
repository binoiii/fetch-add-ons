import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import styles from './AnimatedPet.module.css'

const SPARKLE_SLOTS = [
  { top: '10%', left: '14%', delay: 0 },
  { top: '8%', right: '16%', delay: 0.65 },
  { top: '52%', left: '4%', delay: 0.32 },
  { top: '68%', right: '8%', delay: 1.1 },
  { top: '28%', left: '6%', delay: 0.88 },
  { top: '74%', left: '20%', delay: 0.48 },
]

const SPARKLE_COUNT = [0, 2, 4, 6]

const STATUS = ['', 'Getting happier...', 'Looking great!', 'Thriving! 🎉']

const springBadge = { type: 'spring', stiffness: 360, damping: 26 }

// One badge per addon — uses the same emoji as the option card, at the 8 compass points
const BADGE_MAP = {
  dental:       { emoji: '🦷', style: { top: '8%',     left: '8%'                                   } },
  nutrition:    { emoji: '🥗', style: { top: '-5%',    left: '50%',  transform: 'translateX(-50%)' } },
  preventative: { emoji: '💊', style: { top: '8%',     right: '8%'                                  } },
  vaccinations: { emoji: '🛡️', style: { top: '50%',    right: '-7%', transform: 'translateY(-50%)' } },
  emergency:    { emoji: '🚑', style: { bottom: '8%',  right: '8%'                                  } },
  wellness:     { emoji: '❤️', style: { bottom: '-5%', left: '50%',  transform: 'translateX(-50%)' } },
  grooming:     { emoji: '✂️', style: { bottom: '8%',  left: '8%'                                   } },
  mental:       { emoji: '🧠', style: { top: '50%',    left: '-7%',  transform: 'translateY(-50%)' } },
}

export function AnimatedPet({ pet, level, selectedAddons }) {
  const reduced = useReducedMotion()
  const sparkleCount = SPARKLE_COUNT[level]
  const petEmoji = pet === 'dog' ? '🐶' : '🐱'

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.scene} ${styles[`scene${level}`]}`}>
        <div className={`${styles.aura} ${styles[`aura${level}`]}`} />

        {level >= 2 && (
          <motion.div
            className={styles.ring}
            animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.12, 0.35] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {SPARKLE_SLOTS.map((pos, i) => (
          <motion.span
            key={i}
            className={styles.sparkle}
            style={pos}
            animate={
              reduced ? { opacity: 0 } :
              i < sparkleCount
                ? { opacity: [0, 1, 0], scale: [0.4, 1.3, 0.4] }
                : { opacity: 0, scale: 0 }
            }
            transition={
              i < sparkleCount
                ? { duration: 1.9, repeat: Infinity, delay: pos.delay, ease: 'easeInOut' }
                : { duration: 0.25 }
            }
          >
            ✨
          </motion.span>
        ))}

        <motion.div
          className={`${styles.floatWrapper} ${!reduced && level === 3 ? styles.wag : ''}`}
          animate={reduced ? {} : { y: [0, -11, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={pet}
              className={`${styles.emoji} ${styles[`emoji${level}`]}`}
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.82, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {petEmoji}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {Object.entries(BADGE_MAP).map(([id, { emoji, style }]) =>
            selectedAddons.has(id) ? (
              <motion.span
                key={id}
                className={styles.badge}
                style={style}
                initial={{ scale: 0, opacity: 0, rotate: -12 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0, rotate: -12 }}
                transition={springBadge}
              >
                {emoji}
              </motion.span>
            ) : null
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {level > 0 && (
          <motion.p
            key={level}
            className={styles.status}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
          >
            {STATUS[level]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
