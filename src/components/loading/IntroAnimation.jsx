import { useState, useEffect } from 'react'

/* ── SVG 梅花（5瓣） ── */
function PlumFlowerSVG({
  cx,
  cy,
  scale = 1,
  color = 'currentColor',
  opacity = 0.9,
}) {
  const s = scale
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <g key={angle} transform={`rotate(${angle})`}>
          <path
            d="M0 0C-2 -3 -6 -8 -4 -13Q-2 -14.5 0 -13.5Q2 -14.5 4 -13C6 -8 2 -3 0 0Z"
            fill={color}
            opacity={opacity}
          />
        </g>
      ))}
      <circle r="2.5" fill={color} opacity={opacity * 0.7} />
    </g>
  )
}

/* ── 飘落花瓣 ── */
function FallingPetal({ delay, left, duration }) {
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
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M6 12C4 9 1 5 3 1Q4.5 0 6 1Q7.5 0 9 1C11 5 8 9 6 12Z"
          fill="var(--petal-1)"
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

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink transition-opacity duration-700 ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* ── 水墨背景晕染 ── */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at 30% 80%, rgba(181,58,42,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(166,124,46,0.1) 0%, transparent 50%)',
        }}
      />

      {/* ── 主画布 ── */}
      <div className="relative w-[340px] h-[380px] md:w-[420px] md:h-[460px]">
        <svg
          viewBox="0 0 420 460"
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          {/* ── 枝干生长动画 ── */}
          {/* 主干：从左下往右上弯曲生长 */}
          <path
            d="M60 420 C60 380, 80 340, 110 300 C140 260, 160 240, 180 220 C200 200, 220 180, 240 150"
            fill="none"
            stroke="rgb(var(--color-paper-dim))"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="intro-branch-main"
          />

          {/* 主分叉 1：右上 */}
          <path
            d="M180 220 C200 200, 230 170, 260 140 C290 110, 320 90, 360 80"
            fill="none"
            stroke="rgb(var(--color-paper-dim))"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="intro-branch-1"
          />

          {/* 主分叉 2：右中 */}
          <path
            d="M160 240 C190 230, 230 220, 270 210 C300 200, 330 190, 360 180"
            fill="none"
            stroke="rgb(var(--color-paper-dim))"
            strokeWidth="2"
            strokeLinecap="round"
            className="intro-branch-2"
          />

          {/* 细枝 1 */}
          <path
            d="M260 140 C280 120, 300 100, 320 85"
            fill="none"
            stroke="rgb(var(--color-paper-dim))"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="intro-branch-3"
          />

          {/* 细枝 2 */}
          <path
            d="M270 210 C285 195, 300 180, 315 165"
            fill="none"
            stroke="rgb(var(--color-paper-dim))"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="intro-branch-4"
          />

          {/* 细枝 3 */}
          <path
            d="M110 300 C130 290, 150 280, 165 275"
            fill="none"
            stroke="rgb(var(--color-paper-dim))"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="intro-branch-5"
          />

          {/* ── 梅花花苞 → 绽放 ── */}
          {/* 花苞 1：顶部主枝末端 */}
          <g className="intro-bud-1" style={{ transformOrigin: '360px 80px' }}>
            <circle cx="360" cy="80" r="4" fill="rgb(var(--color-plum))" opacity="0.6" />
          </g>
          <g className="intro-flower-1" style={{ transformOrigin: '360px 80px' }}>
            <PlumFlowerSVG cx={360} cy={80} scale={1.6} />
          </g>

          {/* 花苞 2：右中分叉末端 */}
          <g className="intro-bud-2" style={{ transformOrigin: '360px 180px' }}>
            <circle cx="360" cy="180" r="3.5" fill="rgb(var(--color-plum))" opacity="0.6" />
          </g>
          <g className="intro-flower-2" style={{ transformOrigin: '360px 180px' }}>
            <PlumFlowerSVG cx={360} cy={180} scale={1.4} />
          </g>

          {/* 花苞 3：细枝1末端 */}
          <g className="intro-bud-3" style={{ transformOrigin: '320px 85px' }}>
            <circle cx="320" cy="85" r="3" fill="rgb(var(--color-plum))" opacity="0.6" />
          </g>
          <g className="intro-flower-3" style={{ transformOrigin: '320px 85px' }}>
            <PlumFlowerSVG cx={320} cy={85} scale={1.2} />
          </g>

          {/* 花苞 4：细枝2末端 */}
          <g className="intro-bud-4" style={{ transformOrigin: '315px 165px' }}>
            <circle cx="315" cy="165" r="3" fill="rgb(var(--color-plum))" opacity="0.6" />
          </g>
          <g className="intro-flower-4" style={{ transformOrigin: '315px 165px' }}>
            <PlumFlowerSVG cx={315} cy={165} scale={1.2} />
          </g>

          {/* 花苞 5：中部分叉 */}
          <g className="intro-bud-5" style={{ transformOrigin: '240px 150px' }}>
            <circle cx="240" cy="150" r="3.5" fill="rgb(var(--color-plum))" opacity="0.6" />
          </g>
          <g className="intro-flower-5" style={{ transformOrigin: '240px 150px' }}>
            <PlumFlowerSVG cx={240} cy={150} scale={1.3} />
          </g>

          {/* 花苞 6：左侧细枝 */}
          <g className="intro-bud-6" style={{ transformOrigin: '165px 275px' }}>
            <circle cx="165" cy="275" r="3" fill="rgb(var(--color-plum))" opacity="0.6" />
          </g>
          <g className="intro-flower-6" style={{ transformOrigin: '165px 275px' }}>
            <PlumFlowerSVG cx={165} cy={275} scale={1.1} />
          </g>

          {/* 花苞 7：主干中段 */}
          <g className="intro-bud-7" style={{ transformOrigin: '180px 220px' }}>
            <circle cx="180" cy="220" r="3" fill="rgb(var(--color-plum))" opacity="0.6" />
          </g>
          <g className="intro-flower-7" style={{ transformOrigin: '180px 220px' }}>
            <PlumFlowerSVG cx={180} cy={220} scale={1.2} />
          </g>
        </svg>

        {/* ── 飘落花瓣层 ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { d: 2.2, l: '15%', dur: 3.5 },
            { d: 2.6, l: '35%', dur: 4.0 },
            { d: 2.9, l: '55%', dur: 3.8 },
            { d: 3.2, l: '75%', dur: 4.2 },
            { d: 3.5, l: '25%', dur: 3.6 },
            { d: 3.8, l: '65%', dur: 4.0 },
            { d: 4.1, l: '45%', dur: 3.7 },
            { d: 4.4, l: '85%', dur: 4.3 },
          ].map((p, i) => (
            <FallingPetal key={i} delay={p.d} left={p.l} duration={p.dur} />
          ))}
        </div>
      </div>

      {/* ── 标题 ── */}
      <div className="relative mt-2 text-center">
        <p
          className={`text-display text-3xl md:text-4xl text-paper transition-all duration-700 ${phase === 'blooming' || phase === 'fading' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '200ms' }}
        >
          雪霁梅香
        </p>
        <p
          className={`text-decorative text-sm text-paper-dim mt-2 transition-all duration-700 ${phase === 'blooming' || phase === 'fading' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '500ms' }}
        >
          胡桃生日会
        </p>
      </div>
    </div>
  )
}
