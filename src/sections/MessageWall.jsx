import { useState, useEffect, useCallback } from 'react'
import { messages, decorations } from '../data/messages'
import { cn } from '../lib/utils'

// 木纹背景SVG图案（内联data URL）
const woodPattern = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`

// 磁吸贴颜色映射
const colorMap = {
  plum: 'bg-plum/15 border-plum/30 text-paper',
  earth: 'bg-earth/15 border-earth/30 text-paper',
  fire: 'bg-fire/15 border-fire/30 text-paper',
  ghost: 'bg-ghost/15 border-ghost/30 text-paper',
}

// 刻字效果组件
function EngravedText({ children, className, featured = false }) {
  return (
    <div
      className={cn(
        'relative font-serif',
        featured && 'text-lg md:text-xl',
        className
      )}
      style={{
        textShadow: featured
          ? '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 1px rgba(255,255,255,0.05)'
          : '0.5px 0.5px 1px rgba(0,0,0,0.2), -0.5px -0.5px 0.5px rgba(255,255,255,0.03)',
      }}
    >
      {children}
    </div>
  )
}

// 磁吸贴卡片
function MagnetCard({ message, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        'absolute cursor-pointer transition-all duration-300',
        'animate-on-scroll scroll-stagger-' + Math.min((index % 8) + 1, 8)
      )}
      style={{
        ...message.position,
        transform: `rotate(${message.rotation}deg) ${isHovered ? 'scale(1.08) translateY(-4px)' : 'scale(1)'}`,
        zIndex: isHovered ? 50 : 10 + index,
        maxWidth: '200px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 磁吸贴主体 */}
      <div
        className={cn(
          'rounded-lg border backdrop-blur-sm px-3 py-2.5',
          'shadow-[0_3px_12px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.1)]',
          'transition-shadow duration-300',
          isHovered && 'shadow-[0_8px_24px_rgba(0,0,0,0.2),0_2px_6px_rgba(0,0,0,0.15)]',
          colorMap[message.color] || colorMap.plum
        )}
        style={{
          backgroundImage: woodPattern,
        }}
      >
        {/* 磁吸钉效果 */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-paper/40 border border-paper/20 shadow-sm" />
        
        <p className="text-sm leading-relaxed line-clamp-4">{message.content}</p>
        <div className="flex items-center gap-1.5 mt-2 pt-1.5 border-t border-current/10">
          <span className="text-base">{message.avatar}</span>
          <span className="text-xs opacity-70">{message.author}</span>
        </div>
      </div>
    </div>
  )
}

// 刻字留言（内圈展示）
function EngravedMessage({ message, index }) {
  return (
    <div
      className={cn(
        'animate-on-scroll scroll-stagger-' + Math.min((index % 8) + 1, 8),
        'text-center px-4 py-3'
      )}
    >
      <EngravedText featured={message.featured}>
        <span className="text-paper/90">「{message.content}」</span>
      </EngravedText>
      <div className="flex items-center justify-center gap-1.5 mt-2">
        <span className="text-base">{message.avatar}</span>
        <span className="text-xs text-paper-dim">— {message.author}</span>
      </div>
    </div>
  )
}

// 装饰贴纸
function DecorationSticker({ deco }) {
  return (
    <div
      className="absolute pointer-events-none select-none opacity-40 animate-float"
      style={{
        ...deco.style,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${15 + Math.random() * 10}s`,
      }}
    >
      <span className="text-2xl">{deco.emoji}</span>
    </div>
  )
}

// 投稿表单
function SubmitForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return
    
    onSubmit?.({ name: name.trim(), content: content.trim() })
    setSubmitted(true)
    setName('')
    setContent('')
    
    setTimeout(() => setSubmitted(false), 3000)
  }, [name, content, onSubmit])

  return (
    <div className="max-w-lg mx-auto mt-12">
      <div className="divider-gradient mb-8" />
      <h3 className="text-title text-xl md:text-2xl text-paper text-center mb-6">
        刻下你的祝福
      </h3>
      
      {submitted ? (
        <div className="text-center py-8 animate-fade-up">
          <div className="text-4xl mb-3">🎉</div>
          <p className="text-paper text-lg">祝福已刻入木桶！</p>
          <p className="text-paper-dim text-sm mt-1">待堂主过目后会贴上墙</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="你的昵称"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              className={cn(
                'w-full px-4 py-3 rounded-input',
                'bg-card/50 border border-card-border/60',
                'text-paper placeholder:text-paper-dim/50',
                'focus:outline-none focus:border-plum/50 focus:bg-card/70',
                'transition-all duration-200'
              )}
            />
          </div>
          <div>
            <textarea
              placeholder="写下对堂主的祝福..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={200}
              rows={4}
              className={cn(
                'w-full px-4 py-3 rounded-xl resize-none',
                'bg-card/50 border border-card-border/60',
                'text-paper placeholder:text-paper-dim/50',
                'focus:outline-none focus:border-plum/50 focus:bg-card/70',
                'transition-all duration-200'
              )}
            />
            <div className="text-right text-xs text-paper-dim/50 mt-1">
              {content.length}/200
            </div>
          </div>
          <button
            type="submit"
            disabled={!name.trim() || !content.trim()}
            className={cn(
              'w-full py-3 rounded-btn font-serif text-paper',
              'bg-plum/80 hover:bg-plum',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              'transition-all duration-200',
              'btn-primary'
            )}
          >
            贴上木桶 🧲
          </button>
        </form>
      )}
    </div>
  )
}

// 木桶箍装饰组件
function BarrelHoop({ position = 'top' }) {
  return (
    <div
      className={cn(
        'absolute left-0 right-0 h-5 md:h-6',
        'bg-gradient-to-r from-earth/40 via-earth/60 to-earth/40',
        'border-y border-earth/30',
        position === 'top' ? '-top-2 md:-top-3' : '-bottom-2 md:-bottom-3'
      )}
      style={{
        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.2)',
      }}
    >
      {/* 铆钉效果 */}
      <div className="absolute inset-0 flex justify-between items-center px-4 md:px-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-earth/50 shadow-inner"
          />
        ))}
      </div>
    </div>
  )
}

export default function MessageWall() {
  const [localMessages, setLocalMessages] = useState(messages)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )

    const elements = document.querySelectorAll('#message-wall .animate-on-scroll')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [localMessages])

  const handleSubmit = useCallback(({ name, content }) => {
    const newMessage = {
      id: Date.now(),
      author: name,
      avatar: '✨',
      content,
      date: new Date().toISOString().split('T')[0],
      type: 'magnet',
      rotation: (Math.random() - 0.5) * 8,
      position: {
        top: `${15 + Math.random() * 60}%`,
        left: `${5 + Math.random() * 40}%`,
      },
      color: ['plum', 'earth', 'fire', 'ghost'][Math.floor(Math.random() * 4)],
    }
    setLocalMessages((prev) => [...prev, newMessage])
  }, [])

  const magnetMessages = localMessages.filter((m) => m.type === 'magnet')
  const engravedMessages = localMessages.filter((m) => m.type === 'engraved')
  const stickerMessages = localMessages.filter((m) => m.type === 'sticker')

  return (
    <section id="message-wall" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="divider-gradient mb-8" />
          <h2 className="text-title text-3xl md:text-4xl text-paper mb-4">
            粉丝留言墙
          </h2>
          <p className="text-paper-dim max-w-xl mx-auto">
            每一句祝福都刻在木桶上，每一份心意都贴在磁吸里。
            堂主的生日，由大家共同书写。
          </p>
        </div>

        {/* 木桶容器 */}
        <div className="relative animate-on-scroll">
          {/* 木桶外形 */}
          <div
            className={cn(
              'relative mx-auto',
              'max-w-3xl min-h-[600px] md:min-h-[700px]',
              'rounded-[3rem] md:rounded-[4rem]',
              'border-4 border-earth/20',
              'overflow-visible'
            )}
            style={{
              background: `
                linear-gradient(180deg, 
                  rgba(120,80,40,0.15) 0%, 
                  rgba(160,100,50,0.1) 15%,
                  rgba(140,90,45,0.08) 50%,
                  rgba(160,100,50,0.1) 85%,
                  rgba(120,80,40,0.15) 100%
                ),
                linear-gradient(90deg,
                  rgba(139,90,43,0.06) 0%,
                  rgba(160,110,60,0.03) 20%,
                  rgba(139,90,43,0.06) 40%,
                  rgba(160,110,60,0.03) 60%,
                  rgba(139,90,43,0.06) 80%,
                  rgba(160,110,60,0.03) 100%
                )
              `,
              backgroundBlendMode: 'multiply',
              boxShadow: `
                inset 0 0 60px rgba(0,0,0,0.15),
                0 20px 60px rgba(0,0,0,0.2),
                0 0 0 1px rgba(var(--color-earth),0.1)
              `,
            }}
          >
            {/* 木纹覆盖 */}
            <div
              className="absolute inset-0 rounded-[inherit] opacity-30 pointer-events-none"
              style={{
                backgroundImage: woodPattern,
                backgroundSize: '100px 100px',
              }}
            />

            {/* 上下桶箍 */}
            <BarrelHoop position="top" />
            <BarrelHoop position="bottom" />

            {/* 中间桶箍 */}
            <div
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-4 md:h-5
                bg-gradient-to-r from-earth/30 via-earth/50 to-earth/30
                border-y border-earth/20"
              style={{
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.15)',
              }}
            >
              <div className="absolute inset-0 flex justify-between items-center px-6 md:px-12">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-earth/40 shadow-inner"
                  />
                ))}
              </div>
            </div>

            {/* 装饰贴纸 */}
            {decorations.map((deco) => (
              <DecorationSticker key={deco.id} deco={deco} />
            ))}

            {/* 小贴纸元素 */}
            {stickerMessages.map((msg, i) => (
              <div
                key={msg.id}
                className="absolute animate-on-scroll"
                style={{
                  ...msg.position,
                  zIndex: 20,
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div className="text-3xl md:text-4xl filter drop-shadow-lg">
                  {msg.sticker}
                </div>
              </div>
            ))}

            {/* 磁吸贴留言 */}
            {magnetMessages.map((msg, i) => (
              <MagnetCard key={msg.id} message={msg} index={i} />
            ))}

            {/* 中心圆形木纹展示区 - 刻字留言 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-[240px] h-[240px] md:w-[320px] md:h-[320px]
              rounded-full flex flex-col items-center justify-center p-6 md:p-8"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, 
                    rgba(160,110,60,0.2) 0%,
                    rgba(120,80,40,0.15) 50%,
                    rgba(100,65,35,0.2) 100%
                  )
                `,
                boxShadow: `
                  inset 0 0 40px rgba(0,0,0,0.2),
                  0 0 0 3px rgba(var(--color-earth),0.15),
                  0 0 30px rgba(0,0,0,0.15)
                `,
                backgroundImage: woodPattern,
              }}
            >
              {/* 年轮圈 */}
              <div className="absolute inset-4 md:inset-6 rounded-full border border-earth/10" />
              <div className="absolute inset-8 md:inset-10 rounded-full border border-earth/8" />
              
              <div className="relative z-10 space-y-3 md:space-y-4 overflow-y-auto max-h-full scrollbar-thin">
                {engravedMessages.map((msg, i) => (
                  <EngravedMessage key={msg.id} message={msg} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 投稿表单 */}
        <div className="animate-on-scroll">
          <SubmitForm onSubmit={handleSubmit} />
        </div>
      </div>
    </section>
  )
}
