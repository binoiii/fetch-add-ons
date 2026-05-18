import { useMemo, useEffect, useState } from 'react'
import styles from './Confetti.module.css'

const COLORS = ['#FF4FA3', '#6DDC91', '#FFD166', '#FFB3D9', '#A8EDEA', '#FF9F43', '#FD79A8']

export function Confetti() {
  const [alive, setAlive] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setAlive(false), 4500)
    return () => clearTimeout(t)
  }, [])

  const pieces = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORS[i % COLORS.length],
      w: 7 + Math.random() * 6,
      h: 10 + Math.random() * 7,
      delay: Math.random() * 1.5,
      duration: 2.4 + Math.random() * 1.8,
      drift: (Math.random() - 0.5) * 90,
      rotate: Math.random() * 720 - 360,
      isCircle: Math.random() > 0.55,
    }))
  , [])

  if (!alive) return null

  return (
    <div className={styles.wrapper} aria-hidden="true">
      {pieces.map(p => (
        <div
          key={p.id}
          className={styles.piece}
          style={{
            left: `${p.left}%`,
            width: p.w,
            height: p.isCircle ? p.w : p.h,
            background: p.color,
            borderRadius: p.isCircle ? '50%' : '3px',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--drift': `${p.drift}px`,
            '--rotate': `${p.rotate}deg`,
          }}
        />
      ))}
    </div>
  )
}
