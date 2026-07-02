import TalismanCard from './ui/TalismanCard'

export default function MemberCard({ member }) {
  const card = (
    <TalismanCard className="h-full transition-transform duration-300 hover:-translate-y-1">
      <div className="flex flex-col items-center text-center">
        {/* 头像 */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-plum/20 to-earth/20 flex items-center justify-center mb-4 border-2 border-plum/25 overflow-hidden">
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="text-2xl">🎩</span>
          )}
        </div>
        <h3 className="text-title text-lg text-paper mb-1">{member.name}</h3>
        <p className="text-plum text-sm">{member.role}</p>
      </div>
    </TalismanCard>
  )

  if (member.bilibili) {
    return (
      <a
        href={member.bilibili}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-plum rounded-xl"
      >
        {card}
      </a>
    )
  }

  return <div className="h-full">{card}</div>
}
