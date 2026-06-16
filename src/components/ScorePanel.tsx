import { useEffect, useCallback, useRef } from 'react'
import { Palette } from 'lucide-react'
import useStoryStore, { type Score } from '@/store/useStoryStore'

async function optimizeText(text: string, style: 'children' | 'literary', signal?: AbortSignal) {
  const res = await fetch('/api/optimize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, style }),
    signal,
  })
  return res.json()
}

function ScoreRing({ value, size = 100 }: { value: number; size?: number }) {
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference
  const center = size / 2

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(212,168,83,0.1)"
          strokeWidth="6"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#d4a853"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{
            '--ring-offset': offset,
            strokeDashoffset: offset,
          } as React.CSSProperties}
          className="score-ring-animated"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-2xl font-bold text-amberGold">{value}</span>
        <span className="text-xs text-inkGreen/40">综合评分</span>
      </div>
    </div>
  )
}

function DimensionBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-inkGreen/60">{label}</span>
        <span className="text-xs font-semibold text-amberGold">{value}</span>
      </div>
      <div className="h-1.5 bg-inkGreen/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amberGold/70 to-amberGold rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export default function ScorePanel() {
  const {
    text,
    analyzeResult,
    optimizeResult,
    style,
    setStyle,
    setOptimizeResult,
    setIsOptimizing,
    isOptimizing,
  } = useStoryStore()

  const abortRef = useRef<AbortController | null>(null)
  const lastOptimizeKeyRef = useRef<string>('')

  useEffect(() => {
    if (!text.trim() || !analyzeResult) return

    const key = `${text}::${style}`
    if (key === lastOptimizeKeyRef.current) return
    lastOptimizeKeyRef.current = key

    if (abortRef.current) {
      abortRef.current.abort()
    }
    const controller = new AbortController()
    abortRef.current = controller

    setIsOptimizing(true)
    optimizeText(text, style, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return
        if (result.success && result.data) {
          setOptimizeResult(result.data)
        } else {
          setOptimizeResult(null)
        }
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        if (controller.signal.aborted) return
        setOptimizeResult(null)
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsOptimizing(false)
        }
      })

    return () => {
      controller.abort()
    }
  }, [analyzeResult, style, text, setOptimizeResult, setIsOptimizing])

  const handleStyleChange = useCallback((newStyle: 'children' | 'literary') => {
    setStyle(newStyle)
  }, [setStyle])

  const score: Score = analyzeResult?.score ?? { overall: 0, characterDepth: 0, plotCoherence: 0, timelineCompleteness: 0, logicalConsistency: 0 }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center py-4">
        <ScoreRing value={score.overall} />
      </div>

      <div className="px-3 mb-4">
        <DimensionBar label="人物饱满度" value={score.characterDepth} />
        <DimensionBar label="剧情连贯性" value={score.plotCoherence} />
        <DimensionBar label="时间线完整性" value={score.timelineCompleteness} />
        <DimensionBar label="逻辑自洽度" value={score.logicalConsistency} />
      </div>

      <div className="px-3 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Palette className="w-4 h-4 text-amberGold" />
          <span className="text-xs text-inkGreen/60">风格切换</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleStyleChange('children')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${
              style === 'children'
                ? 'bg-amberGold text-white shadow-md shadow-amberGold/30'
                : 'bg-cream-200 text-inkGreen/50 hover:bg-cream-300'
            }`}
          >
            儿童向
          </button>
          <button
            onClick={() => handleStyleChange('literary')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${
              style === 'literary'
                ? 'bg-amberGold text-white shadow-md shadow-amberGold/30'
                : 'bg-cream-200 text-inkGreen/50 hover:bg-cream-300'
            }`}
          >
            文艺向
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <div className="text-xs text-inkGreen/50 mb-2">优化建议</div>
        {isOptimizing && (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-lg skeleton-shimmer" />
            ))}
          </div>
        )}
        {!isOptimizing && optimizeResult?.suggestions?.map((s, i) => (
          <div key={i} className="mb-3 p-3 bg-white/60 rounded-lg border border-inkGreen/5">
            <div className="text-xs text-softRed mb-1 line-through">{s.original}</div>
            <div className="text-xs text-inkGreen/80 mb-1">{s.optimized}</div>
            <div className="text-xs text-amberGold-400/70 italic">{s.reason}</div>
          </div>
        ))}
        {!isOptimizing && !optimizeResult?.suggestions?.length && (
          <div className="text-xs text-inkGreen/30 text-center py-4">暂无优化建议</div>
        )}
      </div>
    </div>
  )
}
