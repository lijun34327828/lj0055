import { Users } from 'lucide-react'
import type { Character } from '@/store/useStoryStore'

interface Props {
  characters: Character[]
}

export default function CharacterCards({ characters }: Props) {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-amberGold" />
        <h3 className="font-serif text-base font-semibold text-inkGreen">人物角色</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {characters.map((char, i) => (
          <div
            key={i}
            className="border border-amberGold/30 rounded-lg p-4 bg-white/60 backdrop-blur-sm hover:border-amberGold/60 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-full bg-inkGreen flex items-center justify-center text-cream font-serif text-sm font-semibold shrink-0">
                {char.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="font-serif text-sm font-semibold text-inkGreen truncate">{char.name}</div>
                <div className="text-xs text-inkGreen/50">{char.role}</div>
              </div>
            </div>
            {char.relationships.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {char.relationships.map((rel, j) => (
                  <span
                    key={j}
                    className="inline-block text-xs px-2 py-0.5 rounded-full bg-amberGold/10 text-amberGold-400 border border-amberGold/20"
                  >
                    {rel}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
