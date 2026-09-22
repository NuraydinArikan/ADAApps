import { WaitlistSubmission } from '../types';
import { 
  getSupabaseClient, 
  getSupabaseCredentials, 
  isSupabaseReady,
  SupabaseCredentials 
} from './supabaseClient';

export interface SupabaseConfig {
  url: string;
  key: string;
  source: 'env' | 'local' | 'none';
  isConfigured: boolean;
}

export const getSupabaseConfig = (): SupabaseConfig => {
  const creds: SupabaseCredentials = getSupabaseCredentials();
  return {
    url: creds.url,
    key: creds.key,
    source: creds.source,
    isConfigured: creds.isValid,
  };
};

export const setSupabaseConfig = (url: string, key: string) => {
  try {
    if (url.trim() && key.trim()) {
      localStorage.setItem('adaapps_supabase_url', url.trim());
      localStorage.setItem('adaapps_supabase_key', key.trim());
    } else {
      localStorage.removeItem('adaapps_supabase_url');
      localStorage.removeItem('adaapps_supabase_key');
    }
  } catch {
    // ignore
  }
};

export const isSupabaseConfigured = (): boolean => {
  return isSupabaseReady();
};

export async function testSupabaseConnection(): Promise<{
  ok: boolean;
  message: string;
  tableExists?: boolean;
}> {
  const creds = getSupabaseCredentials();
  if (!creds.isValid) {
    return { 
      ok: false, 
      message: 'VITE_SUPABASE_URL veya VITE_SUPABASE_ANON_KEY henüz tanımlanmadı.' 
    };
  }

  const client = getSupabaseClient();
  if (!client) {
    return { 
      ok: false, 
      message: 'Supabase istemcisi başlatılamadı. Lütfen URL formatını kontrol edin.' 
    };
  }

  try {
    const { error } = await client
      .from('waitlist')
      .select('id')
      .limit(1);

    if (!error) {
      return { 
        ok: true, 
        message: 'Supabase istemcisi ve waitlist tablosu başarıyla doğrulandı!', 
        tableExists: true 
      };
    }

    // Check table not found error code in PostgreSQL (42P01: undefined_table)
    if (
      error.code === '42P01' || 
      error.message?.toLowerCase().includes('relation') || 
      error.message?.toLowerCase().includes('does not exist')
    ) {
      return {
        ok: false,
        message: `Supabase'e başarıyla bağlanıldı fakat 'waitlist' tablosu bulunamadı. Lütfen Supabase konsolunda 'waitlist' tablosunu oluşturun. (${error.message})`,
        tableExists: false
      };
    }

    if (
      error.code === 'PGRST301' || 
      error.message?.toLowerCase().includes('jwt') || 
      error.message?.toLowerCase().includes('apikey')
    ) {
      return { 
        ok: false, 
        message: `Yetkilendirme hatası: ${error.message}. Lütfen VITE_SUPABASE_ANON_KEY değerini kontrol edin.` 
      };
    }

    return { 
      ok: false, 
      message: `Supabase sorgu hatası: ${error.message} (Kod: ${error.code || 'Bilinmiyor'})` 
    };
  } catch (e: any) {
    return { ok: false, message: `Ağ bağlantısı hatası: ${e.message}` };
  }
}

export async function submitWaitlist(
  submission: WaitlistSubmission
): Promise<{ success: boolean; source: 'supabase' | 'local'; error?: string }> {
  // Always write to local storage as an immediate offline-first guarantee
  try {
    const localList: WaitlistSubmission[] = JSON.parse(
      localStorage.getItem('adaapps_waitlist') || '[]'
    );
    const exists = localList.some(
      s => s.email.toLowerCase() === submission.email.toLowerCase() && s.appId === submission.appId
    );
    if (!exists) {
      localList.push(submission);
      localStorage.setItem('adaapps_waitlist', JSON.stringify(localList));
    }
  } catch (e) {
    console.warn('Local storage write failed', e);
  }

  // If Supabase client is configured, insert into waitlist table
  const client = getSupabaseClient();
  if (client) {
    try {
      const { error } = await client.from('waitlist').insert([
        {
          app_id: submission.appId,
          app_name: submission.appName,
          email: submission.email,
          created_at: submission.timestamp,
          status: submission.status || 'queued',
        },
      ]);

      if (error) {
        console.error('Supabase waitlist insert error:', error.message);
        return { success: true, source: 'local', error: error.message };
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
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        return data.map((item: any) => ({
          appId: item.app_id || item.appId,
          appName: item.app_name || item.appName,
          email: item.email,
          timestamp: item.created_at || item.timestamp,
          status: item.status || 'queued',
        }));
      }

      if (error) {
        console.warn('Supabase select error:', error.message);
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
