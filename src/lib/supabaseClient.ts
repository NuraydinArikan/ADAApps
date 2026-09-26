import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variable extraction with Vite client prefix
const metaEnv = (import.meta as { env?: Record<string, string> }).env || {};
const envUrl = metaEnv.VITE_SUPABASE_URL?.trim();
const envKey = (metaEnv.VITE_SUPABASE_PUBLISHABLE_KEY || metaEnv.VITE_SUPABASE_ANON_KEY)?.trim();

export interface SupabaseCredentials {
  url: string;
  key: string;
  source: 'env' | 'local' | 'none';
  isValid: boolean;
}

export function getSupabaseCredentials(): SupabaseCredentials {
  if (envUrl && envKey && envUrl.startsWith('http')) {
    return {
      url: envUrl,
      key: envKey,
      source: 'env',
      isValid: true,
    };
  }

  // Graceful browser fallback if configured via Creator Studio UI
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const localUrl = localStorage.getItem('adaapps_supabase_url')?.trim() || '';
      const localKey = localStorage.getItem('adaapps_supabase_key')?.trim() || '';
      if (localUrl && localKey && localUrl.startsWith('http')) {
        return {
          url: localUrl,
          key: localKey,
          source: 'local',
          isValid: true,
        };
      }
    }
  } catch {
    // Ignore localStorage errors
  }

  return {
    url: '',
    key: '',
    source: 'none',
    isValid: false,
  };
}

let cachedClient: SupabaseClient | null = null;
let cachedSignature = '';

/**
 * Returns a configured SupabaseClient or null if credentials are not set.
 * Uses lazy initialization so missing env variables never crash the application.
 */
export function getSupabaseClient(): SupabaseClient | null {
  const creds = getSupabaseCredentials();
  if (!creds.isValid) {
    return null;
  }

  const signature = `${creds.url}_${creds.key}`;
  if (cachedClient && cachedSignature === signature) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(creds.url, creds.key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
    cachedSignature = signature;
    return cachedClient;
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error);
    return null;
  }
}

/**
 * Standard Supabase client instance.
 * Safe to import directly; initializes when valid credentials exist.
 */
export const supabase = getSupabaseClient();

/**
 * Checks if Supabase client is actively configured and ready to use.
 */
export function isSupabaseReady(): boolean {
  return getSupabaseCredentials().isValid;
}
