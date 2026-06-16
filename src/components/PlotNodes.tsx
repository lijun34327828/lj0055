import { useState } from 'react'
import { ChevronDown, ChevronRight, GitBranch } from 'lucide-react'
import type { PlotNode as PlotNodeType } from '@/store/useStoryStore'

interface Props {
  plotNodes: PlotNodeType[]
}

const typeConfig: Record<string, { label: string; color: string; bg: string }> = {
  climax: { label: '高潮', color: 'text-amberGold', bg: 'bg-amberGold/10 border-amberGold/30' },
  turning_point: { label: '转折', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
  resolution: { label: '结局', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
  exposition: { label: '铺垫', color: 'text-gray-500', bg: 'bg-gray-50 border-gray-200' },
}

export default function PlotNodes({ plotNodes }: Props) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0]))

  const toggle = (i: number) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <GitBranch className="w-5 h-5 text-amberGold" />
        <h3 className="font-serif text-base font-semibold text-inkGreen">情节点</h3>
      </div>
      <div className="space-y-2">
        {plotNodes.map((node, i) => {
          const config = typeConfig[node.type] || typeConfig.exposition
          const isOpen = expanded.has(i)

          return (
            <div
              key={i}
              className="border border-inkGreen/10 rounded-lg overflow-hidden bg-white/60 backdrop-blur-sm transition-all duration-200"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-cream-200/50 transition-colors"
              >
                {isOpen ? (
                  <ChevronDown className="w-4 h-4 text-inkGreen/40 shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-inkGreen/40 shrink-0" />
                )}
                <span className="font-serif text-sm font-semibold text-inkGreen flex-1">{node.title}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${config.bg} ${config.color}`}>
                  {config.label}
                </span>
              </button>
              {isOpen && (
                <div className="px-3 pb-3 pt-0 animate-slide-up">
                  <p className="text-sm text-inkGreen/70 leading-relaxed pl-7">{node.description}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
