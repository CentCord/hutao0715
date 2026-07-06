import { useState, useEffect } from 'react'

/* ── 5瓣彩色梅花 ── */
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
      {/* 金色花蕊 */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <circle key={i} r="0.7" fill="#FFD700"
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
        opacity="0.9"
      />
      <path d="M0 0L0 -16" stroke="#3d6b4a" strokeWidth="0.8" opacity="0.5" />
    </g>
  )
}

/* ── 花苞 ── */
function Bud({ cx, cy, color = '#c23b22' }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      <ellipse rx="4" ry="6" fill={color} opacity="0.75" />
      <ellipse rx="2" ry="3" fill={color} opacity="0.5" transform="rotate(-20)" />
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
      <div className="relative w-[380px] h-[400px] md:w-[460px] md:h-[480px]">
        <svg
          viewBox="0 0 460 480"
          className="w-full h-full"
          style={{ overflow: 'visible' }}
        >
          {/* ════════════════════════════════════════
             左侧枝干：从左下往右上
             ════════════════════════════════════════ */}
          {/* 左主干 */}
          <path
            d="M-20 420 C20 380, 70 330, 120 280 C160 240, 195 200, 220 160"
            fill="none"
            stroke="#7A5C1A"
            strokeWidth="5.5"
            strokeLinecap="round"
            className="intro-branch-main"
          />
          {/* 左上分叉 */}
          <path
            d="M220 160 C250 130, 285 100, 320 75 C355 50, 390 35, 430 25"
            fill="none"
            stroke="#8B6914"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="intro-branch-1"
          />
          {/* 左中分叉 */}
          <path
            d="M195 200 C235 180, 280 160, 325 145 C365 132, 400 122, 435 115"
            fill="none"
            stroke="#8B6914"
            strokeWidth="3"
            strokeLinecap="round"
            className="intro-branch-2"
          />
          {/* 左下分叉 */}
          <path
            d="M120 280 C160 260, 200 240, 240 225 C275 212, 305 202, 330 195"
            fill="none"
            stroke="#9A7B2A"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="intro-branch-3"
          />
          {/* 左细枝1 */}
          <path
            d="M320 75 C345 58, 370 42, 395 30"
            fill="none"
            stroke="#A07820"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="intro-branch-4"
          />
          {/* 左细枝2 */}
          <path
            d="M325 145 C350 130, 375 118, 400 108"
            fill="none"
            stroke="#A07820"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="intro-branch-5"
          />

          {/* ════════════════════════════════════════
             右侧枝干：从右下往左上（与左侧对称呼应）
             ════════════════════════════════════════ */}
          {/* 右主干 */}
          <path
            d="M480 420 C440 380, 390 330, 340 280 C300 240, 265 200, 240 160"
            fill="none"
            stroke="#7A5C1A"
            strokeWidth="5.5"
            strokeLinecap="round"
            className="intro-branch-main"
          />
          {/* 右上分叉 */}
          <path
            d="M240 160 C210 130, 175 100, 140 75 C105 50, 70 35, 30 25"
            fill="none"
            stroke="#8B6914"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="intro-branch-1"
          />
          {/* 右中分叉 */}
          <path
            d="M265 200 C225 180, 180 160, 135 145 C95 132, 60 122, 25 115"
            fill="none"
            stroke="#8B6914"
            strokeWidth="3"
            strokeLinecap="round"
            className="intro-branch-2"
          />
          {/* 右下分叉 */}
          <path
            d="M340 280 C300 260, 260 240, 220 225 C185 212, 155 202, 130 195"
            fill="none"
            stroke="#9A7B2A"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="intro-branch-3"
          />
          {/* 右细枝1 */}
          <path
            d="M140 75 C115 58, 90 42, 65 30"
            fill="none"
            stroke="#A07820"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="intro-branch-4"
          />
          {/* 右细枝2 */}
          <path
            d="M135 145 C110 130, 85 118, 60 108"
            fill="none"
            stroke="#A07820"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="intro-branch-5"
          />

          {/* ════════════════════════════════════════
             花苞（先显示）
             ════════════════════════════════════════ */}
          <g className={`intro-bud ${showFlowers ? 'opacity-0' : 'opacity-100'}`} style={{ transition: 'opacity 0.3s ease-out' }}>
            {/* 左侧花苞 */}
            <Bud cx={430} cy={25} color="#c23b22" />
            <Bud cx={435} cy={115} color="#e0665a" />
            <Bud cx={395} cy={30} color="#e0665a" />
            <Bud cx={400} cy={108} color="#c23b22" />
            <Bud cx={330} cy={195} color="#d4544a" />
            <Bud cx={320} cy={75} color="#c23b22" />
            <Bud cx={240} cy={225} color="#f2a6a0" />
            <Bud cx={220} cy={160} color="#d4544a" />
            {/* 右侧花苞 */}
            <Bud cx={30} cy={25} color="#c23b22" />
            <Bud cx={25} cy={115} color="#e0665a" />
            <Bud cx={65} cy={30} color="#e0665a" />
            <Bud cx={60} cy={108} color="#c23b22" />
            <Bud cx={130} cy={195} color="#d4544a" />
            <Bud cx={140} cy={75} color="#c23b22" />
            <Bud cx={220} cy={225} color="#f2a6a0" />
            <Bud cx={240} cy={160} color="#d4544a" />
          </g>

          {/* ════════════════════════════════════════
             绽放的梅花（后显示）
             ════════════════════════════════════════ */}
          <g
            className={`intro-flower ${showFlowers ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 0.3s ease-out' }}
          >
            {/* ── 左侧梅花 ── */}
            <g style={{ animation: 'flower-pop 0.5s ease-out 1.8s both' }}>
              <ColorPlumFlower cx={430} cy={25} scale={1.7} variant="red" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 1.9s both' }}>
              <ColorPlumFlower cx={435} cy={115} scale={1.5} variant="pink" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 2.0s both' }}>
              <ColorPlumFlower cx={395} cy={30} scale={1.3} variant="light" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 2.05s both' }}>
              <ColorPlumFlower cx={400} cy={108} scale={1.3} variant="red" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 1.85s both' }}>
              <ColorPlumFlower cx={320} cy={75} scale={1.5} variant="pink" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 2.1s both' }}>
              <ColorPlumFlower cx={330} cy={195} scale={1.3} variant="light" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 2.0s both' }}>
              <ColorPlumFlower cx={240} cy={225} scale={1.2} variant="pink" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 1.95s both' }}>
              <ColorPlumFlower cx={220} cy={160} scale={1.4} variant="red" />
            </g>

            {/* ── 右侧梅花 ── */}
            <g style={{ animation: 'flower-pop 0.5s ease-out 1.8s both' }}>
              <ColorPlumFlower cx={30} cy={25} scale={1.7} variant="red" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 1.9s both' }}>
              <ColorPlumFlower cx={25} cy={115} scale={1.5} variant="pink" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 2.0s both' }}>
              <ColorPlumFlower cx={65} cy={30} scale={1.3} variant="light" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 2.05s both' }}>
              <ColorPlumFlower cx={60} cy={108} scale={1.3} variant="red" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 1.85s both' }}>
              <ColorPlumFlower cx={140} cy={75} scale={1.5} variant="pink" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 2.1s both' }}>
              <ColorPlumFlower cx={130} cy={195} scale={1.3} variant="light" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 2.0s both' }}>
              <ColorPlumFlower cx={220} cy={225} scale={1.2} variant="pink" />
            </g>
            <g style={{ animation: 'flower-pop 0.5s ease-out 1.95s both' }}>
              <ColorPlumFlower cx={240} cy={160} scale={1.4} variant="red" />
            </g>
          </g>

          {/* ════════════════════════════════════════
             绿叶（梅花绽放后淡入）
             ════════════════════════════════════════ */}
          <g className={`intro-leaf ${showFlowers ? 'opacity-100' : 'opacity-0'}`} style={{ transition: 'opacity 0.6s ease-out 2.2s' }}>
            {/* 左侧叶子 */}
            <Leaf cx={320} cy={75} angle={-25} scale={0.9} />
            <Leaf cx={350} cy={115} angle={15} scale={0.8} />
            <Leaf cx={280} cy={180} angle={-40} scale={0.85} />
            <Leaf cx={200} cy={240} angle={30} scale={0.75} />
            <Leaf cx={360} cy={50} angle={-10} scale={0.8} />
            {/* 右侧叶子 */}
            <Leaf cx={140} cy={75} angle={25} scale={0.9} />
            <Leaf cx={110} cy={115} angle={-15} scale={0.8} />
            <Leaf cx={180} cy={180} angle={40} scale={0.85} />
            <Leaf cx={260} cy={240} angle={-30} scale={0.75} />
            <Leaf cx={100} cy={50} angle={10} scale={0.8} />
          </g>
        </svg>

        {/* ── 飘落花瓣层 ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { d: 1.8, l: '5%', dur: 3.5, c: '#e0665a' },
            { d: 2.0, l: '15%', dur: 4.0, c: '#f2a6a0' },
            { d: 2.2, l: '28%', dur: 3.8, c: '#c23b22' },
            { d: 2.4, l: '42%', dur: 4.2, c: '#e0665a' },
            { d: 2.6, l: '55%', dur: 3.6, c: '#f2a6a0' },
            { d: 2.8, l: '68%', dur: 4.0, c: '#d4544a' },
            { d: 3.0, l: '18%', dur: 3.7, c: '#c23b22' },
            { d: 3.2, l: '78%', dur: 4.3, c: '#e0665a' },
            { d: 3.4, l: '48%', dur: 3.9, c: '#f2a6a0' },
            { d: 3.6, l: '35%', dur: 4.1, c: '#d4544a' },
            { d: 3.8, l: '62%', dur: 3.8, c: '#e0665a' },
            { d: 4.0, l: '8%', dur: 4.2, c: '#f2a6a0' },
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
