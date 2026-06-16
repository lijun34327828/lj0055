import { Clock } from 'lucide-react'
import type { TimelineEvent } from '@/store/useStoryStore'

interface Props {
  timeline: TimelineEvent[]
}

export default function Timeline({ timeline }: Props) {
  const sorted = [...timeline].sort((a, b) => a.order - b.order)

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-amberGold" />
        <h3 className="font-serif text-base font-semibold text-inkGreen">时间线</h3>
      </div>
      <div className="relative overflow-x-auto pb-3">
        <div className="flex items-start gap-0 min-w-max">
          {sorted.map((item, i) => (
            <div key={i} className="flex items-start">
              <div className="flex flex-col items-center w-36">
                <div className="text-xs text-inkGreen/40 mb-2 font-sans">#{item.order}</div>
                <div className="w-3.5 h-3.5 rounded-full bg-amberGold border-2 border-amberGold/50 shrink-0 z-10 shadow-sm shadow-amberGold/30" />
                <div className="mt-2 px-2 py-1.5 text-xs text-inkGreen/80 text-center leading-relaxed bg-amberGold/5 rounded-md border border-amberGold/10 max-w-[8rem]">
                  {item.event}
                </div>
              </div>
              {i < sorted.length - 1 && (
                <div className="h-0.5 bg-gradient-to-r from-amberGold/50 to-amberGold/20 self-center mt-5 w-8 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
