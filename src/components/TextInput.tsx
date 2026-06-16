import { useEffect, useRef, useState, useCallback } from 'react'
import { Feather } from 'lucide-react'
import useStoryStore from '@/store/useStoryStore'

async function analyzeText(text: string, signal?: AbortSignal) {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
    signal,
  })
  return res.json()
}

export default function TextInput() {
  const { setText, setAnalyzeResult, setIsAnalyzing, setOptimizeResult } = useStoryStore()
  const [isTyping, setIsTyping] = useState(false)
  const [localText, setLocalText] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const lastAnalyzedRef = useRef<string>('')

  const handleChange = useCallback((value: string) => {
    setLocalText(value)
    setIsTyping(true)

    if (typingRef.current) clearTimeout(typingRef.current)
    typingRef.current = setTimeout(() => setIsTyping(false), 1000)

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      if (!value.trim()) {
        setAnalyzeResult(null)
        lastAnalyzedRef.current = ''
        return
      }

      if (value === lastAnalyzedRef.current) return

      if (abortRef.current) {
        abortRef.current.abort()
      }
      const controller = new AbortController()
      abortRef.current = controller

      setText(value)
      setAnalyzeResult(null)
      setOptimizeResult(null)
      setIsAnalyzing(true)
      try {
        const result = await analyzeText(value, controller.signal)
        if (controller.signal.aborted) return
        if (result.success && result.data) {
          setAnalyzeResult(result.data)
          lastAnalyzedRef.current = value
        } else {
          setAnalyzeResult(null)
          lastAnalyzedRef.current = ''
        }
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        if (controller.signal.aborted) return
        setAnalyzeResult(null)
        lastAnalyzedRef.current = ''
      } finally {
        if (!controller.signal.aborted) {
          setIsAnalyzing(false)
        }
      }
    }, 600)
  }, [setText, setAnalyzeResult, setIsAnalyzing, setOptimizeResult])

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      if (typingRef.current) clearTimeout(typingRef.current)
      if (abortRef.current) abortRef.current.abort()
    }
  }, [])

  return (
    <div className="relative rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <Feather className="w-5 h-5 text-amberGold" />
        <h2 className="font-serif text-lg font-semibold text-cream-100">故事文本</h2>
      </div>
      <div className={`relative rounded-xl border-2 transition-colors duration-300 ${isTyping ? 'border-amberGold glow-active' : 'border-inkGreen-50/30'}`}>
        <textarea
          value={localText}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="在此输入或粘贴你的故事文本..."
          className="w-full h-64 bg-inkGreen-200 text-cream-100 placeholder-cream-300/40 p-5 font-sans text-sm leading-relaxed resize-none focus:outline-none rounded-xl"
        />
      </div>
      <div className="flex justify-end mt-2">
        <span className="text-xs text-cream-300/50 font-sans">
          {localText.length} 字
        </span>
      </div>
    </div>
  )
}
