
import React from 'react';
import { ContentType, ContentTone, HookStyle, ContentEntry } from './types';

export const INITIAL_CONTENT_DATA: ContentEntry[] = [
  {
    id: '1',
    title: '5 Tips for Better Lighting',
    type: ContentType.SHORT_VIDEO,
    duration: 0.8,
    tone: ContentTone.EDUCATIONAL,
    hookStyle: HookStyle.QUESTION,
    publishTime: new Date(Date.now() - 86400000 * 10).toISOString(),
    views: 12500,
    engagementRate: 8.5,
    retentionRate: 72,
    topic: 'Photography'
  },
  {
    id: '2',
    title: 'Why I Switched to MirrorOS',
    type: ContentType.LONG_FORM,
    duration: 12.5,
    tone: ContentTone.ENTERTAINING,
    hookStyle: HookStyle.BOLD_STATEMENT,
    publishTime: new Date(Date.now() - 86400000 * 7).toISOString(),
    views: 45000,
    engagementRate: 12.2,
    retentionRate: 45,
    topic: 'Technology'
  },
  {
    id: '3',
    title: 'Daily Morning Routine 2024',
    type: ContentType.SHORT_VIDEO,
    duration: 0.9,
    tone: ContentTone.RELAXED,
    hookStyle: HookStyle.VISUAL_HOOK,
    publishTime: new Date(Date.now() - 86400000 * 3).toISOString(),
    views: 8200,
    engagementRate: 5.4,
    retentionRate: 68,
    topic: 'Lifestyle'
  },
  {
    id: '4',
    title: 'The Truth About Creator Burnout',
    type: ContentType.LONG_FORM,
    duration: 18.2,
    tone: ContentTone.PROVOCATIVE,
    hookStyle: HookStyle.STORY_START,
    publishTime: new Date(Date.now() - 86400000 * 1).toISOString(),
    views: 15200,
    engagementRate: 15.1,
    retentionRate: 58,
    topic: 'Psychology'
  }
];
