import { AlertTriangle } from 'lucide-react'
import type { Gap } from '@/store/useStoryStore'

interface Props {
  gaps: Gap[]
}

const gapTypeConfig: Record<string, { label: string; bg: string }> = {
  missing_plot: { label: '情节缺失', bg: 'bg-softRed/10 text-softRed border-softRed/30' },
  logic_gap: { label: '逻辑断层', bg: 'bg-orange-50 text-orange-600 border-orange-200' },
}

export default function GapsList({ gaps }: Props) {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-softRed" />
        <h3 className="font-serif text-base font-semibold text-inkGreen">缺口与问题</h3>
      </div>
      <div className="space-y-3">
        {gaps.map((gap, i) => {
          const config = gapTypeConfig[gap.type] || gapTypeConfig.missing_plot

          return (
            <div
              key={i}
              className="border border-softRed/20 rounded-lg p-4 bg-softRed/5 hover:bg-softRed/8 transition-colors duration-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-inkGreen/40 font-mono">{gap.position}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${config.bg}`}>
                  {config.label}
                </span>
              </div>
              <p className="text-sm text-inkGreen/80 leading-relaxed mb-2">{gap.description}</p>
              {gap.suggestion && (
                <div className="relative mt-2 pl-3 border-l-2 border-amberGold/40">
                  <p className="text-xs text-amberGold-400 leading-relaxed">{gap.suggestion}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
