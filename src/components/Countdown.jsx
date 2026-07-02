import { useState, useEffect } from 'react'

function getTargetDate() {
  const now = new Date()
  const year = now.getFullYear()
  const target = new Date(year, 6, 15, 0, 0, 0)
  if (now > target) {
    return new Date(year + 1, 6, 15, 0, 0, 0)
  }
  return target
}

function useCountdown() {
  const [target] = useState(getTargetDate)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = Math.max(0, target - now)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
}

export default function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown()

  return (
    <div className="inline-flex flex-col items-start gap-1 px-5 py-2.5 rounded-2xl bg-card/60 border border-card-border/60 backdrop-blur-sm">
      <span className="text-xs text-paper-dim/70">距离 7 月 15 日生日还有</span>
      <div className="flex items-center gap-1.5 text-paper font-mono text-lg md:text-xl tabular-nums">
        <span className="text-plum font-bold">{days}</span>
        <span className="text-sm text-paper-dim">天</span>
        <span className="w-px h-4 bg-card-border mx-1" />
        <span>{String(hours).padStart(2, '0')}</span>
        <span className="text-paper-dim">:</span>
        <span>{String(minutes).padStart(2, '0')}</span>
        <span className="text-paper-dim">:</span>
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
    </div>
  )
}
