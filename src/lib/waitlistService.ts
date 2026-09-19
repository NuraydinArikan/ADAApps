import { WaitlistSubmission } from '../types';

const metaEnv = (import.meta as { env?: Record<string, string> }).env || {};
const SUPABASE_URL = metaEnv.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = metaEnv.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL.startsWith('http'));
};

export async function submitWaitlist(submission: WaitlistSubmission): Promise<{ success: boolean; source: 'supabase' | 'local'; error?: string }> {
  // Always keep a local copy for offline resilience
  try {
    const localList: WaitlistSubmission[] = JSON.parse(localStorage.getItem('adaapps_waitlist') || '[]');
    const exists = localList.some(s => s.email.toLowerCase() === submission.email.toLowerCase() && s.appId === submission.appId);
    if (!exists) {
      localList.push(submission);
      localStorage.setItem('adaapps_waitlist', JSON.stringify(localList));
    }
  } catch (e) {
    console.warn('Local storage write failed', e);
  }

  // If Supabase is configured, submit via Supabase REST API
  if (isSupabaseConfigured()) {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          app_id: submission.appId,
          app_name: submission.appName,
          email: submission.email,
          created_at: submission.timestamp,
          status: submission.status
        })
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Supabase waitlist error:', text);
        return { success: true, source: 'local', error: `Supabase: ${response.statusText}` };
      }

      return { success: true, source: 'supabase' };
    } catch (err: any) {
      console.error('Supabase network error:', err);
      return { success: true, source: 'local', error: err.message };
    }
  }

  return { success: true, source: 'local' };
}

export async function getWaitlistSubmissions(): Promise<WaitlistSubmission[]> {
  if (isSupabaseConfigured()) {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/waitlist?select=*&order=created_at.desc`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data.map((item: any) => ({
          appId: item.app_id || item.appId,
          appName: item.app_name || item.appName,
          email: item.email,
          timestamp: item.created_at || item.timestamp,
          status: item.status || 'queued'
        }));
      }
    } catch (err) {
      console.warn('Failed to fetch from Supabase, falling back to local storage', err);
    }
  }

  try {
    return JSON.parse(localStorage.getItem('adaapps_waitlist') || '[]');
  } catch {
    return [];
  }
}
