
export enum ContentType {
  SHORT_VIDEO = 'Short Video',
  LONG_FORM = 'Long Form',
  LIVESTREAM = 'Livestream',
  PODCAST = 'Podcast'
}

export enum ContentTone {
  EDUCATIONAL = 'Educational',
  ENTERTAINING = 'Entertaining',
  INSPIRATIONAL = 'Inspirational',
  PROVOCATIVE = 'Provocative',
  RELAXED = 'Relaxed'
}

export enum HookStyle {
  QUESTION = 'Question',
  BOLD_STATEMENT = 'Bold Statement',
  VISUAL_HOOK = 'Visual Hook',
  STORY_START = 'Story Start',
  CONTROVERSIAL = 'Controversial'
}

export interface ContentEntry {
  id: string;
  title: string;
  type: ContentType;
  duration: number; // minutes
  tone: ContentTone;
  hookStyle: HookStyle;
  publishTime: string; // ISO String
  views: number;
  engagementRate: number; // percentage
  retentionRate: number; // percentage
  topic: string;
}

export interface PerformanceDNA {
  strengthScore: number;
  hookEffectiveness: number;
  retentionPrediction: number;
  audienceSensitivity: string;
  topTone: ContentTone;
  bestDuration: number;
}

export interface AIRecommendation {
  suggestedDuration: number;
  suggestedTone: ContentTone;
  suggestedHook: HookStyle;
  predictedEngagement: number;
  reasoning: string;
}

export interface DashboardInsights {
  trends: { date: string; views: number; engagement: number }[];
  suggestions: string[];
  alerts: { severity: 'low' | 'medium' | 'high'; message: string }[];
}
