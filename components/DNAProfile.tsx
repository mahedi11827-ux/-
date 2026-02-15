
import React from 'react';
import { PerformanceDNA } from '../types';
import { Zap, Target, BarChart, User } from 'lucide-react';

interface DNAProfileProps {
  dna: PerformanceDNA | null;
  loading: boolean;
}

const DNAProfile: React.FC<DNAProfileProps> = ({ dna, loading }) => {
  if (loading) return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p className="mt-4 text-blue-400 font-medium">Synthesizing Creator DNA...</p>
    </div>
  );

  if (!dna) return null;

  return (
    <div className="glass-panel p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Zap className="text-yellow-400" /> Performance DNA Profile
        </h2>
        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold border border-blue-500/30">
          AI UPDATED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm flex items-center gap-2"><Target size={16} /> Content Strength</span>
              <span className="text-blue-400 font-bold">{dna.strengthScore}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${dna.strengthScore}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm flex items-center gap-2"><BarChart size={16} /> Hook Effectiveness</span>
              <span className="text-purple-400 font-bold">{dna.hookEffectiveness}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${dna.hookEffectiveness}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm flex items-center gap-2"><User size={16} /> Audience Sensitivity</span>
              <span className="text-green-400 font-bold text-xs uppercase tracking-wider">{dna.audienceSensitivity}</span>
            </div>
            <div className="p-3 bg-gray-800/50 rounded-lg text-sm text-gray-300 italic border border-gray-700">
              "Audience resonates most with high-energy educational content delivered in short bursts."
            </div>
          </div>
        </div>

        <div className="bg-blue-500/5 rounded-2xl p-6 border border-blue-500/10 flex flex-col justify-center">
          <h3 className="text-sm font-semibold text-blue-300 mb-4 uppercase tracking-tighter">Optimization Core</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-xs">Primary Winning Tone</span>
              <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-md text-sm border border-blue-500/20">
                {dna.topTone}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-xs">Peak Retention Duration</span>
              <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-md text-sm border border-purple-500/20">
                {dna.bestDuration} mins
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-xs">Retention Prediction</span>
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-md text-sm border border-emerald-500/20">
                {dna.retentionPrediction}% avg
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DNAProfile;
