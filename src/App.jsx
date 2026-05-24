import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PetCard } from './components/PetCard'
import { AddonCard } from './components/AddonCard'
import { AnimatedPet } from './components/AnimatedPet'
import { HealthScore } from './components/HealthScore'
import { Button } from './components/Button'
import { Confetti } from './components/Confetti'
import { ADDONS, BASE_SCORE } from './data/addons'
import styles from './App.module.css'
import './index.css'

function computeScore(selected) {
  return ADDONS
    .filter(a => selected.has(a.id))
    .reduce((sum, a) => sum + a.scoreBoost, BASE_SCORE)
}

function getLevel(count) {
  if (count === 0) return 0
  if (count <= 2) return 1
  if (count <= 5) return 2
  return 3
}

const page = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
  exit:    { opacity: 0, y: -14, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
}

export default function App() {
  const [step, setStep] = useState('choose')
  const [pet, setPet] = useState(null)
  const [petName, setPetName] = useState('')
  const [selectedAddons, setSelectedAddons] = useState(new Set())

  const trimmed = petName.trim()
  const name = trimmed
    ? trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
    : (pet === 'dog' ? 'your pup' : 'your cat')
  const score = computeScore(selectedAddons)
  const level = getLevel(selectedAddons.size)

  function toggleAddon(id) {
    setSelectedAddons(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function reset() {
    setPet(null)
    setPetName('')
    setSelectedAddons(new Set())
    setStep('choose')
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <span className={styles.logo}>🐾 Fetch</span>
        <nav className={styles.steps} aria-label="Form progress">
          <button
            className={`${styles.stepBtn} ${step === 'choose' ? styles.stepActive : styles.stepDone}`}
            onClick={() => setStep('choose')}
            disabled={step === 'choose'}
            aria-current={step === 'choose' ? 'step' : undefined}
          >Choose</button>
          <div className={styles.stepLine} aria-hidden="true" />
          <button
            className={`${styles.stepBtn} ${
              step === 'build' ? styles.stepActive :
              step === 'summary' ? styles.stepDone :
              styles.stepIdle
            }`}
            onClick={step === 'summary' ? () => setStep('build') : undefined}
            disabled={step !== 'summary'}
            aria-current={step === 'build' ? 'step' : undefined}
          >Customise</button>
          <div className={styles.stepLine} aria-hidden="true" />
          <button
            className={`${styles.stepBtn} ${step === 'summary' ? styles.stepActive : styles.stepIdle}`}
            disabled
            aria-current={step === 'summary' ? 'step' : undefined}
          >Plan</button>
        </nav>
        <div aria-hidden="true" className={styles.headerEnd} />
      </header>

      <AnimatePresence mode="wait">

        {step === 'choose' && (
          <motion.section key="choose" className={styles.choosePage} {...page}>
            <h1 className={styles.headline}>Who are we caring for?</h1>
            <p className={styles.subline}>Choose your pet to build a personalised care plan.</p>

            <div className={styles.petGrid}>
              <PetCard type="dog" selected={pet === 'dog'} onSelect={setPet} />
              <PetCard type="cat" selected={pet === 'cat'} onSelect={setPet} />
            </div>

            <AnimatePresence>
              {pet && (
                <motion.div
                  className={styles.nameBlock}
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: 10, height: 0 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <label htmlFor="petName" className={styles.nameLabel}>
                    What's their name? <span className={styles.optional}>(optional)</span>
                  </label>
                  <input
                    id="petName"
                    type="text"
                    className={styles.nameInput}
                    placeholder={pet === 'dog' ? 'e.g. Buddy' : 'e.g. Luna'}
                    value={petName}
                    onChange={e => setPetName(e.target.value)}
                    maxLength={24}
                    autoFocus
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Button onClick={() => setStep('build')} disabled={!pet}>
              Build their plan →
            </Button>
          </motion.section>
        )}

        {step === 'build' && (
          <motion.div key="build" className={styles.buildPage} {...page}>
            <div className={styles.petColumn}>
              <div className={styles.petSticky}>
                <AnimatedPet pet={pet} level={level} selectedAddons={selectedAddons} compact />
                <HealthScore score={score} />
              </div>
            </div>

            <div className={styles.addonsColumn}>
              <h2 className={styles.addonsTitle}>Build {name}'s plan</h2>
              <p className={styles.addonsSubline}>
                Each add-on makes {name} happier — watch the score climb.
              </p>

              <div className={styles.addonsList}>
                {ADDONS.map((addon, i) => (
                  <motion.div
                    key={addon.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <AddonCard
                      addon={addon}
                      selected={selectedAddons.has(addon.id)}
                      onToggle={toggleAddon}
                    />
                  </motion.div>
                ))}
              </div>

              <div className={styles.buildActions}>
                <Button variant="ghost" onClick={() => setStep('choose')}>Back</Button>
                <Button onClick={() => setStep('summary')} disabled={selectedAddons.size === 0}>
                  See {name}'s plan →
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'summary' && (
          <motion.section key="summary" className={styles.summaryPage} {...page}>
            <Confetti />
            <Summary
              pet={pet}
              name={name}
              score={score}
              level={level}
              selectedAddons={selectedAddons}
              onBack={() => setStep('build')}
              onReset={reset}
            />
          </motion.section>
        )}

      </AnimatePresence>
    </div>
  )
}

function Summary({ pet, name, score, level, selectedAddons, onBack, onReset }) {
  const [showModal, setShowModal] = useState(false)
  const chosen = ADDONS.filter(a => selectedAddons.has(a.id))

  return (
    <div className={styles.summaryContent}>
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.08, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <AnimatedPet pet={pet} level={Math.max(level, 2)} selectedAddons={selectedAddons} />
      </motion.div>

      <motion.div
        className={styles.summaryCard}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.18, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <h1 className={styles.summaryHeadline}>
          {name.charAt(0).toUpperCase() + name.slice(1)}'s care plan 💖
        </h1>
        <p className={styles.summarySubline}>Here's what Fetch will cover.</p>

        <div className={styles.summaryScoreRow}>
          <HealthScore score={score} />
        </div>

        <ul className={styles.addonList}>
          {chosen.map((addon, i) => (
            <motion.li
              key={addon.id}
              className={styles.addonRow}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.28 + i * 0.07, duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className={styles.addonEmoji}>{addon.emoji}</span>
              <span className={styles.addonLabel}>{addon.label}</span>
              <span className={styles.addonCheck}>✓</span>
            </motion.li>
          ))}
        </ul>

        <div className={styles.summaryActions}>
          <Button variant="ghost" onClick={onBack}>Edit plan</Button>
          <Button onClick={() => setShowModal(true)}>Get this plan</Button>
        </div>
      </motion.div>

      <button className={styles.startOver} onClick={onReset}>Start over</button>

      <AnimatePresence>
        {showModal && (
          <PlanModal
            name={name}
            score={score}
            chosen={chosen}
            onClose={() => setShowModal(false)}
            onReset={onReset}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function PlanModal({ name, score, chosen, onClose, onReset }) {
  return (
    <motion.div
      className={styles.modalBackdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modalCard}
        initial={{ scale: 0.9, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 10 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <button
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className={styles.modalIcon} aria-hidden="true">🐾</div>

        <h2 id="modal-headline" className={styles.modalHeadline}>
          You're all set!
        </h2>
        <p className={styles.modalBody}>
          {name.charAt(0).toUpperCase() + name.slice(1)}'s plan is ready. A Fetch advisor will
          reach out within 24 hours to finalise coverage and get everything activated.
        </p>

        <div className={styles.modalPlanSummary}>
          <span className={styles.modalPlanLabel}>
            {chosen.length} add-on{chosen.length !== 1 ? 's' : ''} · health score {score}
          </span>
          <span className={styles.modalPlanAddons}>
            {chosen.map(a => a.emoji).join(' ')}
          </span>
        </div>

        <div className={styles.modalActions}>
          <Button onClick={onReset}>Start a new plan</Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
