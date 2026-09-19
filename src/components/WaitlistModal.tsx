import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Mail, CheckCircle2, X, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { AppItem, WaitlistSubmission } from '../types';
import { submitWaitlist } from '../lib/waitlistService';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen || !app) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const submission: WaitlistSubmission = {
      appId: app.id,
      appName: app.name,
      email: email.trim(),
      timestamp: new Date().toISOString(),
      status: 'queued'
    };

    try {
      await submitWaitlist(submission);

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
      if (onSuccess) onSuccess(submission);
    } catch (err: any) {
      setError(err?.message || 'Kayıt sırasında bir sorun oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setIsSubmitting(false);
    setEmail('');
    setError('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="waitlist-title"
        className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>

            <h3 id="waitlist-title" className="text-lg font-bold text-white mb-1.5 font-display">
              {app.name} Erken Erişim
            </h3>
            <p className="text-xs text-slate-300 mb-5 leading-relaxed">
              Bu uygulama şu anda aktif geliştirme aşamasındadır. Kapalı beta ve ilk açık sürüm yayınlandığında size doğrudan haber verelim.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  E-posta Adresiniz
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="ornek@alanadi.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Spam Yapılmaz, Bilgileriniz Paylaşılmaz</span>
                </div>
                <p>E-postanız yalnızca {app.name} sürüm güncellemeleri için saklanır.</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Kaydediliyor...</span>
                  </>
                ) : (
                  <>
                    <span>Erken Erişim Listesine Katıl</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">Talebiniz Alındı!</h3>
            <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
              <strong className="text-white">{email}</strong> adresiniz {app.name} bekleme listesine başarıyla eklendi. İlk sürüm hazır olduğunda doğrudan bildirim alacaksınız.
            </p>
            <button
              onClick={handleClose}
              className="mt-2 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition cursor-pointer"
            >
              Tamam
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
