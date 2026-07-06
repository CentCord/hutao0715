import { useState, useEffect } from 'react'

/* ── 彩色梅花 SVG（红/粉色） ── */
function ColorPlumFlower({ cx, cy, scale = 1, variant = 'red' }) {
  const colors = {
    red: { petal: '#c23b22', center: '#e0665a' },
    pink: { petal: '#e0665a', center: '#f2a6a0' },
    light: { petal: '#d4544a', center: '#e8c4c0' },
  }
  const c = colors[variant] || colors.red
  const s = scale

  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <g key={i} transform={`rotate(${angle})`}>
          <path
            d="M0 0C-2.2 -3.5 -7 -9 -4.5 -15Q-2.2 -16.5 0 -15Q2.2 -16.5 4.5 -15C7 -9 2.2 -3.5 0 0Z"
            fill={c.petal}
            opacity="0.92"
          />
        </g>
      ))}
      <circle r="2.8" fill={c.center} opacity="0.85" />
    </g>
  )
}

/* ── 花苞 ── */
function FlowerBud({ cx, cy, scale = 1, color = '#c23b22' }) {
  return (
    <g transform={`translate(${cx},${cy}) scale(${scale})`}>
      <ellipse rx="4" ry="5.5" fill={color} opacity="0.75" />
      <ellipse rx="2" ry="3" fill={color} opacity="0.5" transform="rotate(-20)" />
    </g>
  )
}

/* ── 飘落花瓣 ── */
function FallingPetal({ delay, left, duration, color = '#e0665a' }) {
  return (
    <div
      className="absolute animate-fall-intro"
      style={{
        left,
        top: '-5%',
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 14C4.5 10.5 1 6 3.5 1Q5 0 7 1.5Q9 0 10.5 1C13 6 9.5 10.5 7 14Z"
          fill={color}
          opacity="0.65"
        />
      </svg>
    </div>
  )
}

export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState('growing')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('blooming'), 1800)
    const t2 = setTimeout(() => setPhase('fading'), 3400)
    const t3 = setTimeout(() => {
      setPhase('done')
      onComplete?.()
    }, 4000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onComplete])

  if (phase === 'done') return null

  const isFading = phase === 'fading'
  const showFlowers = phase === 'blooming' || phase === 'fading'

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink transition-opacity duration-700 ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* ── 柔和背景光晕 ── */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 20% 80%, rgba(194,59,34,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 60%, rgba(224,102,90,0.12) 0%, transparent 50%)',
        }}
      />

      {/* ── 主画布 ── */}
      <div className="relative w-[340px] h-[380px] md:w-[420px] md:h-[460px]">
        <svg
          viewBox="0 0 420 460"
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          {/* ── 枝干生长 ── */}
          {/* 主干：从左下往右上 */}
          <path
            d="M40 440 C45 390, 65 350, 100 310 C135 270, 160 245, 185 220 C210 195, 235 170, 260 140"
            fill="none"
            stroke="#8B6914"
            strokeWidth="4"
            strokeLinecap="round"
            className="intro-branch-main"
          />

          {/* 主分叉 1：向右上 */}
          <path
            d="M185 220 C210 195, 245 165, 280 135 C315 105, 350 85, 395 70"
            fill="none"
            stroke="#A07820"
            strokeWidth="3"
            strokeLinecap="round"
            className="intro-branch-1"
          />

          {/* 主分叉 2：向右中 */}
          <path
            d="M160 245 C195 235, 240 225, 285 215 C320 205, 355 195, 395 185"
            fill="none"
            stroke="#A07820"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="intro-branch-2"
          />

          {/* 细枝 1 */}
          <path
            d="M280 135 C305 115, 330 95, 355 80"
            fill="none"
            stroke="#B8942A"
            strokeWidth="2"
            strokeLinecap="round"
            className="intro-branch-3"
          />

          {/* 细枝 2 */}
          <path
            d="M285 215 C305 200, 325 185, 345 170"
            fill="none"
            stroke="#B8942A"
            strokeWidth="2"
            strokeLinecap="round"
            className="intro-branch-4"
          />

          {/* 细枝 3 */}
          <path
            d="M100 310 C125 300, 150 290, 170 282"
            fill="none"
            stroke="#B8942A"
            strokeWidth="2"
            strokeLinecap="round"
            className="intro-branch-5"
          />

          {/* 细枝 4：主干中段向左 */}
          <path
            d="M135 270 C115 255, 95 240, 80 230"
            fill="none"
            stroke="#B8942A"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="intro-branch-6"
          />

          {/* ── 花苞 ── */}
          <g className={`intro-bud ${showFlowers ? 'opacity-0' : 'opacity-100'}`}>
            <FlowerBud cx={395} cy={70} color="#c23b22" />
            <FlowerBud cx={395} cy={185} color="#d4544a" />
            <FlowerBud cx={355} cy={80} color="#e0665a" />
            <FlowerBud cx={345} cy={170} color="#c23b22" />
            <FlowerBud cx={260} cy={140} color="#d4544a" />
            <FlowerBud cx={170} cy={282} color="#e0665a" />
            <FlowerBud cx={185} cy={220} color="#c23b22" />
            <FlowerBud cx={80} cy={230} color="#d4544a" />
          </g>

          {/* ── 绽放的梅花 ── */}
          <g className={`intro-flower ${showFlowers ? 'opacity-100' : 'opacity-0'}`}>
            <ColorPlumFlower cx={395} cy={70} scale={1.7} variant="red" />
            <ColorPlumFlower cx={395} cy={185} scale={1.5} variant="pink" />
            <ColorPlumFlower cx={355} cy={80} scale={1.3} variant="light" />
            <ColorPlumFlower cx={345} cy={170} scale={1.3} variant="red" />
            <ColorPlumFlower cx={260} cy={140} scale={1.4} variant="pink" />
            <ColorPlumFlower cx={170} cy={282} scale={1.2} variant="light" />
            <ColorPlumFlower cx={185} cy={220} scale={1.3} variant="red" />
            <ColorPlumFlower cx={80} cy={230} scale={1.2} variant="pink" />
          </g>
        </svg>

        {/* ── 飘落花瓣层 ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { d: 2.0, l: '10%', dur: 3.5, c: '#e0665a' },
            { d: 2.3, l: '25%', dur: 4.0, c: '#f2a6a0' },
            { d: 2.6, l: '40%', dur: 3.8, c: '#e0665a' },
            { d: 2.9, l: '55%', dur: 4.2, c: '#c23b22' },
            { d: 3.2, l: '70%', dur: 3.6, c: '#f2a6a0' },
            { d: 3.5, l: '20%', dur: 4.0, c: '#e0665a' },
            { d: 3.8, l: '80%', dur: 3.7, c: '#d4544a' },
            { d: 4.1, l: '45%', dur: 4.3, c: '#f2a6a0' },
            { d: 4.4, l: '65%', dur: 3.9, c: '#e0665a' },
          ].map((p, i) => (
            <FallingPetal key={i} delay={p.d} left={p.l} duration={p.dur} color={p.c} />
          ))}
        </div>
      </div>

      {/* ── 标题 ── */}
      <div className="relative mt-2 text-center">
        <p
          className={`text-display text-3xl md:text-4xl text-paper transition-all duration-700 ${showFlowers ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '300ms' }}
        >
          雪霁梅香
        </p>
        <p
          className={`text-decorative text-sm text-paper-dim mt-2 transition-all duration-700 ${showFlowers ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '600ms' }}
        >
          胡桃生日会
        </p>
      </div>
    </div>
  )
}
