import { BookOpen } from 'lucide-react'
import useStoryStore from '@/store/useStoryStore'
import TextInput from '@/components/TextInput'
import CharacterCards from '@/components/CharacterCards'
import Timeline from '@/components/Timeline'
import PlotNodes from '@/components/PlotNodes'
import GapsList from '@/components/GapsList'
import ScorePanel from '@/components/ScorePanel'

function SkeletonBlock() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 w-24 rounded skeleton-shimmer" />
      <div className="h-20 rounded-lg skeleton-shimmer" />
      <div className="h-20 rounded-lg skeleton-shimmer" />
    </div>
  )
}

function AnalysisSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-inkGreen/5">
      {children}
    </div>
  )
}

export default function Home() {
  const { analyzeResult, isAnalyzing, optimizeResult } = useStoryStore()

  const hasResult = analyzeResult !== null

  return (
    <div className="min-h-screen bg-cream font-sans">
      <header className="border-b border-inkGreen/5 bg-cream-50/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto px-6 py-3 flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-amberGold" />
          <h1 className="font-serif text-xl font-semibold text-inkGreen">故事语义分析工作台</h1>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-6 py-6">
        <div className="flex gap-6">
          <div className="flex-1 min-w-0 space-y-5">
            <div className="bg-inkGreen-200 rounded-xl p-5">
              <TextInput />
            </div>

            {isAnalyzing && (
              <div className="space-y-5">
                <AnalysisSection title="人物角色"><SkeletonBlock /></AnalysisSection>
                <AnalysisSection title="时间线"><SkeletonBlock /></AnalysisSection>
                <AnalysisSection title="情节点"><SkeletonBlock /></AnalysisSection>
              </div>
            )}

            {hasResult && !isAnalyzing && (
              <div className="space-y-5 animate-fade-in">
                {analyzeResult.characters.length > 0 && (
                  <AnalysisSection title="人物角色">
                    <CharacterCards characters={analyzeResult.characters} />
                  </AnalysisSection>
                )}

                {analyzeResult.timeline.length > 0 && (
                  <AnalysisSection title="时间线">
                    <Timeline timeline={analyzeResult.timeline} />
                  </AnalysisSection>
                )}

                {analyzeResult.plotNodes.length > 0 && (
                  <AnalysisSection title="情节点">
                    <PlotNodes plotNodes={analyzeResult.plotNodes} />
                  </AnalysisSection>
                )}

                {analyzeResult.gaps.length > 0 && (
                  <AnalysisSection title="缺口与问题">
                    <GapsList gaps={analyzeResult.gaps} />
                  </AnalysisSection>
                )}

                {optimizeResult?.suggestions && optimizeResult.suggestions.length > 0 && (
                  <div className="bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-inkGreen/5">
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-5 h-5 text-amberGold" />
                      <h3 className="font-serif text-base font-semibold text-inkGreen">优化建议</h3>
                    </div>
                    <div className="space-y-3">
                      {optimizeResult.suggestions.map((s, i) => (
                        <div key={i}>
                          <div className="text-xs text-softRed mb-1 line-through opacity-70">{s.original}</div>
                          <div className="text-xs text-inkGreen/80 mb-1">{s.optimized}</div>
                          <div className="text-xs text-amberGold-400/70 italic">{s.reason}</div>
                          {i < optimizeResult.suggestions.length - 1 && <hr className="my-3 border-inkGreen/5" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {!hasResult && !isAnalyzing && (
              <div className="text-center py-16">
                <BookOpen className="w-12 h-12 text-inkGreen/10 mx-auto mb-4" />
                <p className="font-serif text-inkGreen/25 text-sm">输入故事文本，开始语义分析</p>
              </div>
            )}
          </div>

          <aside className="w-72 shrink-0 sticky top-[57px] h-[calc(100vh-57px)] bg-white/50 backdrop-blur-sm rounded-xl border border-inkGreen/5 overflow-hidden">
            <ScorePanel />
          </aside>
        </div>
      </div>
    </div>
  )
}
