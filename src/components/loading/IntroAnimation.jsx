import { useState, useEffect } from 'react'

function PlumFlower({ delay, size, left, top }) {
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), delay)
    const fadeTimer = setTimeout(() => setFading(true), delay + 600)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(fadeTimer)
    }
  }, [delay])

  if (!visible) return null

  return (
    <svg
      className={`absolute transition-all duration-500 ease-out ${fading ? 'opacity-0 scale-150' : 'opacity-100 scale-100'}`}
      style={{ left, top, width: size, height: size, transformOrigin: 'center' }}
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M20 5C20 5 16 12 16 16C16 18 18 20 20 20C22 20 24 18 24 16C24 12 20 5 20 5Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M5 20C5 20 12 16 16 16C18 16 20 18 20 20C20 22 18 24 16 24C12 24 5 20 5 20Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M35 20C35 20 28 16 24 16C22 16 20 18 20 20C20 22 22 24 24 24C28 24 35 20 35 20Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M20 35C20 35 16 28 16 24C16 22 18 20 20 20C22 20 24 22 24 24C24 28 20 35 20 35Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M20 5C20 5 18 12 20 16C21 18 22 19 20 20C19 21 18 20 16 20C12 20 5 20 5 20"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

export default function IntroAnimation({ onComplete }) {
  const [fading, setFading] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2200)
    const hideTimer = setTimeout(() => {
      setHidden(true)
      onComplete?.()
    }, 2800)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [onComplete])

  if (hidden) return null

  const flowers = [
    { delay: 100, size: 48, left: '20%', top: '30%' },
    { delay: 250, size: 36, left: '50%', top: '20%' },
    { delay: 400, size: 42, left: '75%', top: '40%' },
    { delay: 150, size: 32, left: '35%', top: '60%' },
    { delay: 300, size: 40, left: '65%', top: '65%' },
    { delay: 500, size: 28, left: '45%', top: '45%' },
    { delay: 200, size: 34, left: '10%', top: '50%' },
    { delay: 350, size: 30, left: '85%', top: '25%' },
    { delay: 450, size: 38, left: '55%', top: '75%' },
  ]

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink transition-opacity duration-600 ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ transitionDuration: '600ms' }}
    >
      <div className="relative w-80 h-80">
        {flowers.map((f, i) => (
          <PlumFlower key={i} {...f} />
        ))}
      </div>
      <div className="relative mt-8 text-center">
        <p
          className={`text-display text-2xl md:text-3xl text-paper transition-opacity duration-500 ${fading ? 'opacity-0' : 'opacity-100'}`}
          style={{ transitionDelay: '200ms' }}
        >
          雪霁梅香
        </p>
        <p
          className={`text-decorative text-sm text-paper-dim mt-2 transition-opacity duration-500 ${fading ? 'opacity-0' : 'opacity-100'}`}
          style={{ transitionDelay: '400ms' }}
        >
          胡桃生日会
        </p>
      </div>
    </div>
  )
}
