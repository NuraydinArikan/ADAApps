import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Mail, CheckCircle2, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { AppItem, WaitlistSubmission } from '../types';

interface WaitlistModalProps {
  app: AppItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (submission: WaitlistSubmission) => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({
  app,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !app) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    const submission: WaitlistSubmission = {
      appId: app.id,
      appName: app.name,
      email: email.trim(),
      timestamp: new Date().toISOString()
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('adaapps_waitlist') || '[]');
      existing.push(submission);
      localStorage.setItem('adaapps_waitlist', JSON.stringify(existing));
    } catch {
      // fallback
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    setIsSubmitted(true);
    setError('');
    if (onSuccess) onSuccess(submission);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setEmail('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-4 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white mb-1 font-display">
              {app.name} Erken Erişim Listesi
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-5">
              Bu uygulama şu anda aktif geliştirme aşamasındadır. İlk test sürümü (Beta) açıldığında davetiyenizi doğrudan e-postanıza gönderelim.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  E-Posta Adresiniz
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@alanadi.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                </div>
                {error && <p className="text-xs text-rose-400 mt-1.5">{error}</p>}
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Spam yok. Yalnızca bu projenin lansmanında tek seferlik bildirim.</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm rounded-xl transition shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Erken Erişim Listesine Katıl</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-white font-display">
              Listeye Eklendiniz!
            </h3>
            <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
              <strong className="text-emerald-400">{email}</strong> adresiniz kaydedildi. <strong className="text-white">{app.name}</strong> hazır olduğunda ilk haberdar olan siz olacaksınız.
            </p>

            <button
              onClick={handleClose}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition cursor-pointer"
            >
              Tamam
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
