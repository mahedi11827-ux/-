
import React, { useState, useEffect, useCallback } from 'react';
import { 
  BarChart3, BrainCircuit, LayoutDashboard, PlusCircle, History, 
  ChevronRight, Settings, Bell, Search, User, Sparkles
} from 'lucide-react';
import { ContentEntry, PerformanceDNA, DashboardInsights } from './types';
import { INITIAL_CONTENT_DATA } from './constants';
import { analyzePerformance, getDashboardInsights } from './services/geminiService';
import Dashboard from './components/Dashboard';
import DNAProfile from './components/DNAProfile';
import ContentPlanner from './components/ContentPlanner';

const App: React.FC = () => {
  const [history, setHistory] = useState<ContentEntry[]>(INITIAL_CONTENT_DATA);
  const [dna, setDna] = useState<PerformanceDNA | null>(null);
  const [insights, setInsights] = useState<DashboardInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'planner' | 'history'>('dashboard');

  const updateAIState = useCallback(async (currentHistory: ContentEntry[]) => {
    setLoading(true);
    try {
      const [newDna, newInsights] = await Promise.all([
        analyzePerformance(currentHistory),
        getDashboardInsights(currentHistory)
      ]);
      setDna(newDna);
      setInsights(newInsights);
    } catch (error) {
      console.error("AI Update failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    updateAIState(history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex bg-[#030712] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 flex flex-col p-6 hidden md:flex">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center neon-glow">
            <BrainCircuit size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter italic">MirrorAI</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'text-gray-400 hover:bg-gray-800'}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-semibold text-sm">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('planner')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'planner' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'text-gray-400 hover:bg-gray-800'}`}
          >
            <BrainCircuit size={20} />
            <span className="font-semibold text-sm">AI Planner</span>
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'history' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'text-gray-400 hover:bg-gray-800'}`}
          >
            <History size={20} />
            <span className="font-semibold text-sm">Content Library</span>
          </button>
        </nav>

        <div className="pt-6 border-t border-gray-800 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 transition-all text-sm font-medium">
            <Settings size={20} /> Settings
          </button>
          <div className="p-4 bg-gray-900/50 rounded-2xl border border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <div>
                <p className="text-xs font-bold">Creator Pro</p>
                <p className="text-[10px] text-gray-500">Active Analytics</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-gray-800 px-8 flex items-center justify-between bg-black/40 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-4 bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800 w-full max-w-md">
            <Search size={18} className="text-gray-500" />
            <input type="text" placeholder="Search analytics or recommendations..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-full text-xs font-bold shadow-lg shadow-blue-600/20">
              <PlusCircle size={16} /> New Entry
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Hero Section / Stats */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
                MirrorAI Learning Engine <span className="text-blue-500 text-sm font-medium bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 uppercase tracking-widest">Active v2.5</span>
              </h1>
              <p className="text-gray-400">Self-learning content assistant tracking performance DNA in real-time.</p>
            </div>
            
            <div className="flex gap-4">
              <div className="glass-panel px-6 py-4 rounded-2xl flex items-center gap-4">
                <div className="h-10 w-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Engagement Delta</p>
                  <p className="text-lg font-bold text-emerald-400">+12.4%</p>
                </div>
              </div>
              <div className="glass-panel px-6 py-4 rounded-2xl flex items-center gap-4">
                <div className="h-10 w-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                  <History size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Stored Records</p>
                  <p className="text-lg font-bold">{history.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Content Area */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-8 space-y-8">
              {activeTab === 'dashboard' && (
                <>
                  <DNAProfile dna={dna} loading={loading} />
                  <Dashboard insights={insights} loading={loading} />
                </>
              )}
              {activeTab === 'planner' && (
                <div className="h-[600px]">
                  <ContentPlanner history={history} />
                </div>
              )}
              {activeTab === 'history' && (
                <div className="glass-panel rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-900/50 border-b border-gray-800">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-gray-400">Title</th>
                        <th className="px-6 py-4 font-semibold text-gray-400">Tone</th>
                        <th className="px-6 py-4 font-semibold text-gray-400">Views</th>
                        <th className="px-6 py-4 font-semibold text-gray-400">Retention</th>
                        <th className="px-6 py-4 font-semibold text-gray-400">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {history.map(item => (
                        <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-medium text-white">{item.title}</div>
                            <div className="text-[10px] text-gray-500">{item.type} • {item.duration}m</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400">{item.tone}</span>
                          </td>
                          <td className="px-6 py-4 font-bold">{item.views.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-800 h-1 rounded-full">
                                <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${item.retentionRate}%` }}></div>
                              </div>
                              <span className="text-xs">{item.retentionRate}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-emerald-500 text-xs font-bold uppercase">Optimized</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Right Sidebar - Planner Preview or AI Activity */}
            <div className="xl:col-span-4 space-y-8">
              {activeTab !== 'planner' && (
                <div className="sticky top-24">
                  <ContentPlanner history={history} />
                </div>
              )}
              
              <div className="glass-panel p-6 rounded-2xl">
                <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
                  Live Patterns <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full animate-pulse">Scanning</span>
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-900/50 rounded-xl border border-gray-800 flex items-center justify-between group">
                    <span className="text-xs text-gray-400">Peak Publishing Window</span>
                    <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">18:00 - 20:00 EST</span>
                  </div>
                  <div className="p-3 bg-gray-900/50 rounded-xl border border-gray-800 flex items-center justify-between group">
                    <span className="text-xs text-gray-400">Critical Hook Length</span>
                    <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">3.2 Seconds</span>
                  </div>
                  <div className="p-3 bg-gray-900/50 rounded-xl border border-gray-800 flex items-center justify-between group">
                    <span className="text-xs text-gray-400">Engagement Sentiment</span>
                    <span className="text-xs font-bold text-emerald-400">Mostly Positive (88%)</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <Sparkles size={64} />
                </div>
                <h4 className="text-sm font-bold mb-2">MirrorAI Tip of the Day</h4>
                <p className="text-xs text-gray-400 leading-relaxed italic">
                  "Your long-form educational videos see a 15% dip at minute 4. Try introducing a 'Pattern Interrupt' or a quick visual hook to maintain retention."
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
