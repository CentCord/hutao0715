import Button from '../components/ui/Button'
import Tag from '../components/ui/Tag'
import ImageCarousel from '../components/ui/ImageCarousel'
import Butterflies from '../components/effects/Butterflies'
import Countdown from '../components/Countdown'

const CAROUSEL_IMAGES = [
  '/images/0076e02e245c16577fa78a3f63af4b37_5103137104824509611.webp',
  '/images/2a6f9c18ab0686d46167e42129b9c535_955622761399978787.webp',
  '/images/9e679c14a6f21f145854431f64d6600f_1852449604643516023.webp',
  '/images/e8b0734241af9e779abd7f2571302f9e_5642792909118691293.webp',
  '/images/f0a609999ca21704e13438a0ac7eb435_3079362125314025578.webp',
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <Butterflies count={5} />

      {/* 背景光晕 */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--hero-glow), transparent 70%)' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 animate-fade-up">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          {/* 左侧文字 */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="mb-6 flex justify-center md:justify-start">
              <Tag className="text-base px-4 py-1.5">
                🌸 往生堂第七十七代堂主 · 生日庆典
              </Tag>
            </div>

            <h1 className="text-display text-5xl md:text-7xl lg:text-8xl mb-6">
              <span
                className="inline-block text-plum"
                style={{
                  transform: 'rotate(-3deg)',
                  textShadow: 'var(--hero-text-glow)',
                }}
              >
                雪
              </span>
              <span
                className="inline-block text-paper"
                style={{
                  textShadow: 'var(--hero-text-glow)',
                }}
              >
                霁梅香
              </span>
            </h1>

            <div className="mb-6 flex justify-center md:justify-start">
              <Countdown />
            </div>

            <p className="text-decorative text-xl md:text-2xl text-paper-dim mb-4">
              「赤团开时斜飞去，最不安神晴又复雨」
            </p>

            <p className="text-paper-dim/70 text-base md:text-lg max-w-xl mx-auto md:mx-0 mb-10">
              欢迎来到胡桃生日会——一场属于往生堂第七十七代堂主的庆典。
              在这里，梅花与火焰共舞，蝴蝶引路，幽魂作伴。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <a href="#recruitment">
                <Button showFire={false}>立即加入招募</Button>
              </a>
              <a href="#about">
                <Button variant="secondary">了解我们</Button>
              </a>
            </div>
          </div>

          {/* 右侧轮播 */}
          <div className="w-full md:w-1/2 flex justify-center">
            <ImageCarousel images={CAROUSEL_IMAGES} />
          </div>
        </div>
      </div>

      {/* 底部渐变过渡 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgb(var(--color-ink)), transparent)' }}
      />
    </section>
  )
}
