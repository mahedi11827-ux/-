
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { DashboardInsights } from '../types';
import { AlertCircle, TrendingUp, CheckCircle2, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  insights: DashboardInsights | null;
  loading: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ insights, loading }) => {
  if (loading) return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <div className="h-4 w-1/3 bg-gray-800 rounded animate-pulse"></div>
        <div className="h-48 w-full bg-gray-800/50 rounded-xl animate-pulse"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-24 bg-gray-800/30 rounded-lg animate-pulse"></div>
          <div className="h-24 bg-gray-800/30 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  if (!insights) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl min-h-[300px]">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-400" /> Monthly Growth Trajectory
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={insights.trends}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Area type="monotone" dataKey="views" stroke="#3b82f6" fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="engagement" stroke="#10b981" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <AlertCircle size={20} className="text-orange-400" /> Strategic Alerts
          </h3>
          <div className="flex-1 space-y-3">
            {insights.alerts.map((alert, idx) => (
              <div key={idx} className={`p-3 rounded-xl border flex gap-3 ${
                alert.severity === 'high' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                alert.severity === 'medium' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' :
                'bg-blue-500/10 border-blue-500/20 text-blue-400'
              }`}>
                <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                <p className="text-xs font-medium leading-relaxed">{alert.message}</p>
              </div>
            ))}
            {insights.alerts.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm">
                <CheckCircle2 size={32} className="mb-2 opacity-20" />
                No critical risks detected.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl">
        <h3 className="text-lg font-bold mb-4">MirrorAI Improvement Suggestions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.suggestions.map((suggestion, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 bg-gray-900/40 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-colors group">
              <div className="h-6 w-6 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 font-bold text-xs shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                {idx + 1}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{suggestion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
