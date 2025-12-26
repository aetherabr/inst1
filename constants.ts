import { Profile, ApiConfig, ActivityLog } from './types';

export const MOCK_PROFILES: Profile[] = [
  {
    id: '1',
    username: 'marketing_guru',
    fullName: 'Marketing Guru Official',
    avatarUrl: 'https://picsum.photos/200/200?random=1',
    status: 'ACTIVE',
    frequency: 4,
    lastScraped: '10 min ago',
    categories: ['STORY', 'POST'],
    totalMedia: 1240,
  },
  {
    id: '2',
    username: 'competitor_hq',
    fullName: 'Global Competitors HQ',
    avatarUrl: 'https://picsum.photos/200/200?random=2',
    status: 'ACTIVE',
    frequency: 2,
    lastScraped: '2 hours ago',
    categories: ['POST'],
    totalMedia: 850,
  },
  {
    id: '3',
    username: 'design_trends',
    fullName: 'Design Daily Trends',
    avatarUrl: 'https://picsum.photos/200/200?random=3',
    status: 'ERROR',
    frequency: 1,
    lastScraped: '1 day ago',
    categories: ['STORY'],
    totalMedia: 45,
  },
  {
    id: '4',
    username: 'tech_news_daily',
    fullName: 'Tech News & Reviews',
    avatarUrl: 'https://picsum.photos/200/200?random=4',
    status: 'PAUSED',
    frequency: 6,
    lastScraped: '5 hours ago',
    categories: ['STORY', 'POST'],
    totalMedia: 3200,
  },
];

export const MOCK_APIS: ApiConfig[] = [
  {
    id: 'api-1',
    name: 'InstaGraph Pro',
    category: 'STORY',
    endpoint: 'https://api.instagraph.pro/v1',
    priority: 1,
    status: 'ONLINE',
    successRate: 98.5,
    totalRequests: 14500,
    isFallback: false,
  },
  {
    id: 'api-2',
    name: 'RapidAPI Scraper',
    category: 'STORY',
    endpoint: 'https://rapidapi.com/scraper/v2',
    priority: 2,
    status: 'ONLINE',
    successRate: 92.1,
    totalRequests: 230,
    isFallback: true,
  },
  {
    id: 'api-3',
    name: 'Official Graph Mock',
    category: 'POST',
    endpoint: 'https://graph.instagram.mock',
    priority: 1,
    status: 'DEGRADED',
    successRate: 75.0,
    totalRequests: 8900,
    isFallback: false,
  },
  {
    id: 'api-4',
    name: 'PhantomJS Cluster',
    category: 'POST',
    endpoint: 'http://internal-cluster:3000',
    priority: 2,
    status: 'ONLINE',
    successRate: 99.9,
    totalRequests: 1200,
    isFallback: true,
  },
];

export const MOCK_LOGS: ActivityLog[] = [
  { id: '1', timestamp: 'Just now', profile: 'marketing_guru', action: 'Extract Stories', status: 'SUCCESS', details: 'Extracted 4 items' },
  { id: '2', timestamp: '2 min ago', profile: 'competitor_hq', action: 'Extract Posts', status: 'SUCCESS', details: 'Extracted 1 item' },
  { id: '3', timestamp: '15 min ago', profile: 'design_trends', action: 'Extract Stories', status: 'FAILURE', details: 'Rate Limit Exceeded' },
  { id: '4', timestamp: '15 min ago', profile: 'design_trends', action: 'Fallback Trigger', status: 'FALLBACK', details: 'Switched to RapidAPI' },
  { id: '5', timestamp: '1 hour ago', profile: 'marketing_guru', action: 'Upload S3', status: 'SUCCESS', details: 'Batch upload complete' },
];

export const CHART_DATA = [
  { name: 'Mon', stories: 400, posts: 240, errors: 20 },
  { name: 'Tue', stories: 300, posts: 139, errors: 10 },
  { name: 'Wed', stories: 200, posts: 980, errors: 5 },
  { name: 'Thu', stories: 278, posts: 390, errors: 15 },
  { name: 'Fri', stories: 189, posts: 480, errors: 8 },
  { name: 'Sat', stories: 239, posts: 380, errors: 2 },
  { name: 'Sun', stories: 349, posts: 430, errors: 12 },
];

export const MOCK_EXTRACTION_HISTORY = [
  { id: 1, date: '2023-10-24 14:30', profile: 'marketing_guru', type: 'STORY', items: 4, size: '12 MB', provider: 'InstaGraph Pro', status: 'SUCCESS' },
  { id: 2, date: '2023-10-24 12:15', profile: 'competitor_hq', type: 'POST', items: 1, size: '45 MB', provider: 'Official Graph Mock', status: 'SUCCESS' },
  { id: 3, date: '2023-10-24 10:00', profile: 'design_trends', type: 'STORY', items: 0, size: '0 MB', provider: 'InstaGraph Pro', status: 'FAILURE' },
  { id: 4, date: '2023-10-24 10:01', profile: 'design_trends', type: 'STORY', items: 12, size: '28 MB', provider: 'RapidAPI Scraper', status: 'FALLBACK' },
  { id: 5, date: '2023-10-23 23:45', profile: 'tech_news_daily', type: 'POST', items: 3, size: '150 MB', provider: 'PhantomJS Cluster', status: 'FALLBACK' },
  { id: 6, date: '2023-10-23 18:20', profile: 'marketing_guru', type: 'STORY', items: 8, size: '22 MB', provider: 'InstaGraph Pro', status: 'SUCCESS' },
  { id: 7, date: '2023-10-23 15:10', profile: 'competitor_hq', type: 'POST', items: 0, size: '0 MB', provider: 'Official Graph Mock', status: 'FAILURE' },
  { id: 8, date: '2023-10-23 14:00', profile: 'tech_news_daily', type: 'STORY', items: 15, size: '42 MB', provider: 'InstaGraph Pro', status: 'SUCCESS' },
];