import type { OptimizationSuggestion } from '@/store/useStoryStore'

interface Props {
  suggestion: OptimizationSuggestion
}

function DiffText({ original, optimized }: { original: string; optimized: string }) {
  const origChars = original.split('')
  const optChars = optimized.split('')
  const maxLen = Math.max(origChars.length, optChars.length)

  let origIdx = 0
  let optIdx = 0
  const origParts: { text: string; changed: boolean }[] = []
  const optParts: { text: string; changed: boolean }[] = []

  for (let i = 0; i < maxLen; i++) {
    if (origIdx < origChars.length && optIdx < optChars.length && origChars[origIdx] === optChars[optIdx]) {
      if (origParts.length > 0 && !origParts[origParts.length - 1].changed) {
        origParts[origParts.length - 1].text += origChars[origIdx]
      } else {
        origParts.push({ text: origChars[origIdx], changed: false })
      }
      if (optParts.length > 0 && !optParts[optParts.length - 1].changed) {
        optParts[optParts.length - 1].text += optChars[optIdx]
      } else {
        optParts.push({ text: optChars[optIdx], changed: false })
      }
      origIdx++
      optIdx++
    } else {
      if (origIdx < origChars.length) {
        if (origParts.length > 0 && origParts[origParts.length - 1].changed) {
          origParts[origParts.length - 1].text += origChars[origIdx]
        } else {
          origParts.push({ text: origChars[origIdx], changed: true })
        }
        origIdx++
      }
      if (optIdx < optChars.length) {
        if (optParts.length > 0 && optParts[optParts.length - 1].changed) {
          optParts[optParts.length - 1].text += optChars[optIdx]
        } else {
          optParts.push({ text: optChars[optIdx], changed: true })
        }
        optIdx++
      }
    }
  }

  return (
    <div className="space-y-2">
      <div className="text-xs leading-relaxed">
        <span className="text-inkGreen/30 mr-1">原文：</span>
        {origParts.map((p, i) =>
          p.changed ? (
            <span key={i} className="bg-softRed/15 text-softRed line-through rounded px-0.5">{p.text}</span>
          ) : (
            <span key={i} className="text-inkGreen/60">{p.text}</span>
          )
        )}
      </div>
      <div className="text-xs leading-relaxed">
        <span className="text-inkGreen/30 mr-1">优化：</span>
        {optParts.map((p, i) =>
          p.changed ? (
            <span key={i} className="bg-amberGold/15 text-amberGold-400 rounded px-0.5">{p.text}</span>
          ) : (
            <span key={i} className="text-inkGreen/60">{p.text}</span>
          )
        )}
      </div>
    </div>
  )
}

export default function OptimizationCard({ suggestion }: Props) {
  return (
    <div className="border border-inkGreen/10 rounded-lg p-4 bg-white/60 backdrop-blur-sm">
      <DiffText original={suggestion.original} optimized={suggestion.optimized} />
      <div className="mt-3 pt-2 border-t border-inkGreen/5">
        <p className="text-xs text-inkGreen/50 italic leading-relaxed">{suggestion.reason}</p>
      </div>
    </div>
  )
}
