import { useState, useEffect } from 'react'

/* ── 彩色梅花（5瓣） ── */
function ColorPlumFlower({ cx, cy, scale = 1, variant = 'red' }) {
  const colors = {
    red:   { petal: '#c23b22', center: '#8B2500' },
    pink:  { petal: '#e0665a', center: '#c23b22' },
    light: { petal: '#f2a6a0', center: '#e0665a' },
  }
  const c = colors[variant] || colors.red

  return (
    <g transform={`translate(${cx},${cy}) scale(${scale})`}>
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <g key={i} transform={`rotate(${angle})`}>
          <path
            d="M0 0C-2.5 -4 -8 -10 -5 -16Q-2.5 -17.5 0 -16Q2.5 -17.5 5 -16C8 -10 2.5 -4 0 0Z"
            fill={c.petal}
          />
        </g>
      ))}
      <circle r="3" fill={c.center} />
      {/* 花蕊点缀 */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <circle key={i} r="0.8" fill="#FFD700" opacity="0.8"
          cx={Math.cos(a * Math.PI / 180) * 1.5}
          cy={Math.sin(a * Math.PI / 180) * 1.5}
        />
      ))}
    </g>
  )
}

/* ── 绿叶 ── */
function Leaf({ cx, cy, angle, scale = 1 }) {
  return (
    <g transform={`translate(${cx},${cy}) rotate(${angle}) scale(${scale})`}>
      <path
        d="M0 0C-4 -6 -8 -12 -3 -18C0 -20 3 -18 6 -12C8 -6 4 0 0 0Z"
        fill="#4a7c59"
        opacity="0.85"
      />
      <path d="M0 0L0 -16" stroke="#3d6b4a" strokeWidth="0.8" opacity="0.6" />
    </g>
  )
}

/* ── 飘落花瓣 ── */
function FallingPetal({ delay, left, duration, color }) {
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
          opacity="0.7"
        />
      </svg>
    </div>
  )
}

export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState('growing') // growing -> blooming -> fading -> done

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
      {/* ── 主画布 ── */}
      <div className="relative w-[360px] h-[400px] md:w-[440px] md:h-[480px]">
        <svg
          viewBox="0 0 440 480"
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          {/* ── 枝干：从左侧伸出来 ── */}
          {/* 主枝干 */}
          <path
            d="M-20 400 C30 380, 80 340, 120 300 C160 260, 190 230, 220 200 C250 170, 280 140, 320 110"
            fill="none"
            stroke="#7A5C1A"
            strokeWidth="6"
            strokeLinecap="round"
            className="intro-branch-main"
          />

          {/* 上分叉 */}
          <path
            d="M220 200 C260 170, 300 140, 350 115 C390 95, 420 85, 450 75"
            fill="none"
            stroke="#8B6914"
            strokeWidth="4"
            strokeLinecap="round"
            className="intro-branch-1"
          />

          {/* 中分叉 */}
          <path
            d="M190 230 C240 215, 290 200, 340 190 C380 182, 415 175, 450 168"
            fill="none"
            stroke="#8B6914"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="intro-branch-2"
          />

          {/* 下分叉 */}
          <path
            d="M120 300 C160 285, 200 270, 235 260 C270 250, 300 242, 330 235"
            fill="none"
            stroke="#9A7B2A"
            strokeWidth="3"
            strokeLinecap="round"
            className="intro-branch-3"
          />

          {/* 细枝 1 */}
          <path
            d="M350 115 C375 100, 400 88, 420 78"
            fill="none"
            stroke="#A07820"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="intro-branch-4"
          />

          {/* 细枝 2 */}
          <path
            d="M340 190 C360 178, 380 168, 400 158"
            fill="none"
            stroke="#A07820"
            strokeWidth="2"
            strokeLinecap="round"
            className="intro-branch-5"
          />

          {/* 细枝 3 */}
          <path
            d="M235 260 C255 248, 275 238, 292 230"
            fill="none"
            stroke="#A07820"
            strokeWidth="2"
            strokeLinecap="round"
            className="intro-branch-6"
          />

          {/* ── 绿叶 ── */}
          <g className={`intro-leaf ${showFlowers ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 0.5s ease-out 2s' }}>
            <Leaf cx={320} cy={110} angle={-30} scale={0.9} />
            <Leaf cx={350} cy={115} angle={20} scale={0.8} />
            <Leaf cx={340} cy={190} angle={-45} scale={0.85} />
            <Leaf cx={220} cy={200} angle={30} scale={0.75} />
            <Leaf cx={235} cy={260} angle={-20} scale={0.8} />
            <Leaf cx={190} cy={230} angle={40} scale={0.7} />
            <Leaf cx={270} cy={175} angle={-15} scale={0.75} />
          </g>

          {/* ── 花苞（先显示） ── */}
          <g className={`intro-bud ${showFlowers ? 'opacity-0' : 'opacity-100'}`} style={{ transition: 'opacity 0.3s ease-out' }}>
            <ellipse cx="450" cy="75" rx="5" ry="7" fill="#c23b22" opacity="0.7" />
            <ellipse cx="450" cy="168" rx="4.5" ry="6.5" fill="#e0665a" opacity="0.7" />
            <ellipse cx="420" cy="78" rx="4" ry="6" fill="#e0665a" opacity="0.7" />
            <ellipse cx="400" cy="158" rx="4" ry="6" fill="#c23b22" opacity="0.7" />
            <ellipse cx="330" cy="235" rx="4" ry="6" fill="#d4544a" opacity="0.7" />
            <ellipse cx="320" cy="110" rx="4.5" ry="6.5" fill="#c23b22" opacity="0.7" />
            <ellipse cx="292" cy="230" rx="4" ry="6" fill="#e0665a" opacity="0.7" />
            <ellipse cx="235" cy={260} rx="4" ry="6" fill="#f2a6a0" opacity="0.7" />
          </g>

          {/* ── 绽放的梅花（后显示） ── */}
          <g
            className={`intro-flower ${showFlowers ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.3s ease-out' }}
          >
            <g style={{ animation: 'flower-pop 0.5s ease-out 1.8s both' }}>
              <ColorPlumFlower cx={450} cy={75} scale={1.8} variant="red" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 1.95s both' }}>
              <ColorPlumFlower cx={450} cy={168} scale={1.6} variant="pink" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 2.0s both' }}>
              <ColorPlumFlower cx={420} cy={78} scale={1.4} variant="light" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 2.05s both' }}>
              <ColorPlumFlower cx={400} cy={158} scale={1.4} variant="red" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 1.85s both' }}>
              <ColorPlumFlower cx={320} cy={110} scale={1.5} variant="pink" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 2.1s both' }}>
              <ColorPlumFlower cx={330} cy={235} scale={1.3} variant="light" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 2.15s both' }}>
              <ColorPlumFlower cx={292} cy={230} scale={1.3} variant="red" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 2.0s both' }}>
              <ColorPlumFlower cx={235} cy={260} scale={1.2} variant="pink" />
            </g>
          </g>
        </svg>

        {/* ── 飘落花瓣 ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { d: 1.8, l: '5%', dur: 3.5, c: '#e0665a' },
            { d: 2.0, l: '15%', dur: 4.0, c: '#f2a6a0' },
            { d: 2.2, l: '30%', dur: 3.8, c: '#c23b22' },
            { d: 2.4, l: '45%', dur: 4.2, c: '#e0665a' },
            { d: 2.6, l: '60%', dur: 3.6, c: '#f2a6a0' },
            { d: 2.8, l: '75%', dur: 4.0, c: '#d4544a' },
            { d: 3.0, l: '20%', dur: 3.7, c: '#c23b22' },
            { d: 3.2, l: '85%', dur: 4.3, c: '#e0665a' },
            { d: 3.4, l: '50%', dur: 3.9, c: '#f2a6a0' },
            { d: 3.6, l: '35%', dur: 4.1, c: '#d4544a' },
          ].map((p, i) => (
            <FallingPetal key={i} delay={p.d} left={p.l} duration={p.dur} color={p.c} />
          ))}
        </div>
      </div>

      {/* ── 标题 ── */}
      <div className="relative mt-4 text-center">
        <p
          className={`text-display text-3xl md:text-4xl text-paper transition-all duration-700 ${showFlowers ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '400ms' }}
        >
          雪霁梅香
        </p>
        <p
          className={`text-decorative text-sm text-paper-dim mt-2 transition-all duration-700 ${showFlowers ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '700ms' }}
        >
          胡桃生日会
        </p>
      </div>
    </div>
  )
}
