import { useMemo } from 'react'

const petalVars = ['var(--petal-1)', 'var(--petal-2)', 'var(--petal-3)']

function PlumPetalSVG({ color, size, rotateX, rotateY }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      className="overflow-visible"
      style={{
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 5瓣梅花 */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 15 15)`}>
          <path
            d="M15 3C15 3 12 10 12 13C12 15 13 16 15 16C17 16 18 15 18 13C18 10 15 3 15 3Z"
            fill={color}
            opacity="0.9"
          />
        </g>
      ))}
      <circle cx="15" cy="15" r="3" fill={color} opacity="0.7" />
    </svg>
  )
}

export default function PlumBlossoms() {
  const petals = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 10 + Math.random() * 12,
      color: petalVars[Math.floor(Math.random() * petalVars.length)],
      duration: 10 + Math.random() * 8,
      delay: Math.random() * 15,
      sway: Math.random() * 60 - 30,
      rotateX: Math.random() * 360,
      rotateY: Math.random() * 360,
      rotateXSpeed: 0.5 + Math.random() * 1.5,
      rotateYSpeed: 0.5 + Math.random() * 1.5,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-fall-3d"
          style={{
            left: petal.left,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            opacity: 0,
          }}
        >
          <div
            className="relative dark:drop-shadow-[0_0_8px_rgba(255,100,100,0.6)]"
            style={{
              width: petal.size,
              height: petal.size,
              animation: `sway-3d ${petal.duration * 0.6}s ease-in-out infinite alternate`,
              animationDelay: `${petal.delay}s`,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                animation: `rotate-3d ${8 + Math.random() * 6}s linear infinite`,
                animationDelay: `${petal.delay}s`,
              }}
            >
              <PlumPetalSVG
                color={petal.color}
                size={petal.size}
                rotateX={petal.rotateX}
                rotateY={petal.rotateY}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
