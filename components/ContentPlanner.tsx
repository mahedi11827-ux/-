
import React, { useState } from 'react';
import { ContentEntry, AIRecommendation } from '../types';
import { getRecommendation } from '../services/geminiService';
import { Sparkles, ArrowRight, BrainCircuit, Clock, MessageSquare, TrendingUp } from 'lucide-react';

interface ContentPlannerProps {
  history: ContentEntry[];
}

const ContentPlanner: React.FC<ContentPlannerProps> = ({ history }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const rec = await getRecommendation(topic, history);
      setRecommendation(rec);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-blue-400" size={24} />
        <h2 className="text-xl font-bold">Adaptive Planner</h2>
      </div>

      <div className="space-y-4 mb-8">
        <p className="text-gray-400 text-sm">Input your next video idea, and MirrorAI will optimize the strategy based on your historical performance DNA.</p>
        <div className="relative">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Designing a futuristic workspace..."
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !topic}
            className="absolute right-2 top-2 h-8 px-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center gap-1 text-sm font-semibold"
          >
            {loading ? 'Thinking...' : 'Optimize'} <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {recommendation ? (
        <div className="flex-1 space-y-4 overflow-y-auto">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <h3 className="flex items-center gap-2 text-blue-300 font-semibold mb-3">
              <BrainCircuit size={18} /> MirrorAI Recommendation
            </h3>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                <div className="text-[10px] uppercase text-gray-500 mb-1 flex items-center gap-1">
                  <Clock size={10} /> Optimal Duration
                </div>
                <div className="text-sm font-bold text-white">{recommendation.suggestedDuration} mins</div>
              </div>
              <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                <div className="text-[10px] uppercase text-gray-500 mb-1 flex items-center gap-1">
                  <MessageSquare size={10} /> Winning Tone
                </div>
                <div className="text-sm font-bold text-white">{recommendation.suggestedTone}</div>
              </div>
              <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                <div className="text-[10px] uppercase text-gray-500 mb-1 flex items-center gap-1">
                  <TrendingUp size={10} /> Success Prediction
                </div>
                <div className="text-sm font-bold text-emerald-400">~{recommendation.predictedEngagement}% Eng.</div>
              </div>
              <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                <div className="text-[10px] uppercase text-gray-500 mb-1">Recommended Hook</div>
                <div className="text-sm font-bold text-purple-400">{recommendation.suggestedHook}</div>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed italic">
              "Based on your recentProvocative content having 2x retention, we suggest starting with a <strong>{recommendation.suggestedHook}</strong>. {recommendation.reasoning}"
            </p>
          </div>
        </div>
      ) : !loading && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 opacity-30">
          <BrainCircuit size={48} className="mb-4 text-gray-500" />
          <p className="text-sm text-gray-400">Your content strategy engine is ready.<br/>Enter a topic to begin optimization.</p>
        </div>
      )}

      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 animate-spin"></div>
          </div>
          <p className="text-blue-400 text-sm animate-pulse">Running pattern analysis algorithms...</p>
        </div>
      )}
    </div>
  );
};

export default ContentPlanner;
