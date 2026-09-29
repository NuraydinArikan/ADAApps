export interface ContactMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  subjectType: 'idea' | 'bug' | 'collab' | 'feedback';
  message: string;
  timestamp: string;
  isRead?: boolean;
}

const STORAGE_KEY = 'adaapps_contact_messages_v1';

export const getContactMessages = (): ContactMessage[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // fallback
  }
  return [];
};

export const saveContactMessage = (msg: Omit<ContactMessage, 'id' | 'timestamp' | 'isRead'>): ContactMessage => {
  const current = getContactMessages();
  const newMessage: ContactMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...msg,
    timestamp: new Date().toISOString(),
    isRead: false
  };

  const updated = [newMessage, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }

  // Dispatch custom event for real-time reactivity
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('adaapps_new_message', { detail: newMessage }));
  }

  return newMessage;
};

export const markMessageAsRead = (id: string) => {
  const current = getContactMessages();
  const updated = current.map((m) => (m.id === id ? { ...m, isRead: true } : m));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
};

export const deleteContactMessage = (id: string) => {
  const current = getContactMessages();
  const updated = current.filter((m) => m.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
};
