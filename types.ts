export type ContentType = 'STORY' | 'POST';

export interface Profile {
  id: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  status: 'ACTIVE' | 'PAUSED' | 'ERROR';
  frequency: number; // times per day
  lastScraped: string;
  categories: ContentType[];
  totalMedia: number;
}

export interface ApiConfig {
  id: string;
  name: string;
  category: ContentType;
  endpoint: string;
  priority: number;
  status: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
  successRate: number;
  totalRequests: number;
  isFallback: boolean;
}

export interface StorageConfig {
  provider: 'R2' | 'AWS' | 'MINIO';
  endpoint: string;
  bucket: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicUrl: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  profile: string;
  action: string;
  status: 'SUCCESS' | 'FAILURE' | 'FALLBACK';
  details: string;
}

export type ViewState = 'DASHBOARD' | 'PROFILES' | 'SETTINGS' | 'CONTENT';