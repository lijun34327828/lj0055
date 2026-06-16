import { create } from 'zustand'

interface Character {
  name: string
  role: string
  relationships: string[]
}

interface TimelineEvent {
  event: string
  order: number
}

interface PlotNode {
  title: string
  description: string
  type: 'climax' | 'turning_point' | 'resolution' | 'exposition'
}

interface Gap {
  position: string
  type: 'missing_plot' | 'logic_gap'
  description: string
  suggestion: string
}

interface Score {
  overall: number
  characterDepth: number
  plotCoherence: number
  timelineCompleteness: number
  logicalConsistency: number
}

interface AnalyzeResponse {
  characters: Character[]
  timeline: TimelineEvent[]
  plotNodes: PlotNode[]
  gaps: Gap[]
  score: Score
}

interface OptimizationSuggestion {
  original: string
  optimized: string
  reason: string
}

interface OptimizeResponse {
  style: 'children' | 'literary'
  suggestions: OptimizationSuggestion[]
}

interface StoryState {
  text: string
  analyzeResult: AnalyzeResponse | null
  optimizeResult: OptimizeResponse | null
  style: 'children' | 'literary'
  isAnalyzing: boolean
  isOptimizing: boolean
  setText: (text: string) => void
  setAnalyzeResult: (result: AnalyzeResponse | null) => void
  setOptimizeResult: (result: OptimizeResponse | null) => void
  setStyle: (style: 'children' | 'literary') => void
  setIsAnalyzing: (val: boolean) => void
  setIsOptimizing: (val: boolean) => void
}

const useStoryStore = create<StoryState>((set) => ({
  text: '',
  analyzeResult: null,
  optimizeResult: null,
  style: 'literary',
  isAnalyzing: false,
  isOptimizing: false,
  setText: (text) => set({ text }),
  setAnalyzeResult: (analyzeResult) => set({ analyzeResult }),
  setOptimizeResult: (optimizeResult) => set({ optimizeResult }),
  setStyle: (style) => set({ style }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  setIsOptimizing: (isOptimizing) => set({ isOptimizing }),
}))

export default useStoryStore

export type {
  AnalyzeResponse,
  OptimizeResponse,
  Character,
  TimelineEvent,
  PlotNode,
  Gap,
  Score,
  OptimizationSuggestion,
}
