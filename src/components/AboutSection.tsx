import React, { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  Copy, 
  Check, 
  Send, 
  GraduationCap, 
  Cpu, 
  Lightbulb, 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Compass, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  HeartHandshake
} from 'lucide-react';
import { AdaAppsLogo } from './AdaAppsLogo';
import { saveContactMessage } from '../lib/contactService';

export const AboutSection: React.FC = () => {
  // Copy email state
  const [isCopied, setIsCopied] = useState(false);
  const supportEmail = 'destek@adaapps.dev';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(supportEmail);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Feedback / Contact Form State
  const [formSubject, setFormSubject] = useState<'idea' | 'bug' | 'collab' | 'feedback'>('idea');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Save message to local studio inbox
    saveContactMessage({
      senderName: senderName.trim(),
      senderEmail: senderEmail.trim(),
      subjectType: formSubject,
      message: message.trim()
    });

    setIsSubmitted(true);
  };

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'ADAApps nedir ve arkasındaki amaç nedir?',
      a: 'ADAApps, dijital dünyada karşılaşılan günlük pratik sorunları çözmek amacıyla geliştirilmiş bağımsız bir uygulama stüdyosudur. Amacı; kullanıcıyı reklam bombardımanına tutmayan, telefon hafızasını gereksiz şişirmeyen, gizliliğe saygılı ve doğrudan tarayıcıdan cihazınıza kurulabilen (PWA) hafif araçlar sunmaktır.'
    },
    {
      q: 'Uygulamalar neden ücretsiz ve reklamsız?',
      a: 'ADAApps ticari kâr maksimizasyonundan ziyade; yapay zeka, kullanıcı deneyimi ve iletişim dinamiklerini öğrenme, uygulama ve çevreye faydalı olma heyecanıyla inşa edilmektedir. Bu nedenle pop-up reklamlar, kullanıcı profilini satan veri aracıları veya gizli abonelikler kesinlikle yer almaz.'
    },
    {
      q: 'PWA (Progressive Web App) nedir ve nasıl kullanılır?',
      a: 'PWA; geleneksel uygulama mağazalarına (App Store, Google Play) ihtiyaç duymadan, doğrudan web tarayıcınızdan telefonunuzun veya bilgisayarınızın ana ekranına uygulama gibi ekleyebileceğiniz modern bir web teknolojisidir. Çevrimdışı çalışabilir, anında açılır ve cihazınızda megabaytlarca yer kaplamaz.'
    },
    {
      q: 'Girdiğim veriler nerede saklanıyor?',
      a: 'ADAApps uygulamaları çoğunlukla "Local-First" (Önce Yerel Veri) mimarisini benimser. Yani girdiğiniz notlar, bütçe kayıtları veya kişisel tercihler kendi cihazınızdaki tarayıcı hafızasında (localStorage/IndexedDB) tutulur, harici sunuculara aktarılmaz.'
    },
    {
      q: 'Yeni bir uygulama fikrim veya ihtiyacım var, nasıl iletebilirim?',
      a: 'Aşağıdaki iletişim formunu kullanarak veya doğrudan destek@adaapps.dev adresine e-posta göndererek ihtiyacınızı paylaşabilirsiniz. Çevremizdeki insanların günlük hayatını kolaylaştıracak yeni fikirleri tasarlamaktan büyük heyecan duyuyoruz!'
    }
  ];

  return (
    <section id="hakkinda" className="my-16 sm:my-24 scroll-mt-24">
      {/* Container with glowing background accent */}
      <div className="relative about-section-container border rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden">
        {/* Ambient background blur elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Tag */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-500 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tanışma & Hikaye</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full about-card border text-xs">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
            <span>Bağımsız Tasarım & Yapay Zeka Atölyesi</span>
          </div>
        </div>

        {/* Main Section Header */}
        <div className="max-w-3xl mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight leading-tight">
            ADAApps Hakkında
          </h2>
          <p className="about-story-description text-sm sm:text-base mt-3 leading-relaxed">
            Dijital dünyayı daha sade, şeffaf ve insan odaklı bir yere dönüştürme motivasyonuyla hayata geçen kişisel bir ürün atölyesi.
          </p>
        </div>

        {/* Core Spotlight Card: The Golden Sentence & Story */}
        <div className="relative about-spotlight-card rounded-2xl p-6 sm:p-8 mb-12 shadow-md border">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-500 items-center justify-center shrink-0 mt-1">
              <GraduationCap className="w-6 h-6" />
            </div>

            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-500">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Geliştirici & Ürün Yolculuğu</span>
              </div>

              {/* Verbatim Required Sentence Highlighted */}
              <blockquote className="about-quote-box text-base sm:text-lg lg:text-xl font-medium leading-relaxed border-l-4 pl-4 py-3 italic rounded-r-xl">
                “ADAApps bir İletişim Fakültesi okuyan üniversite öğrencisinin kendisini hem yapay zeka hem de uygulama tasarlama alanlarında geliştirme çabasının henüz yolun başında olan bir ürünüdür. Şimdilik kendisinin ve çevresinin ihtiyaçlarına yönelik uygulama tasarımları yapmaktadır.”
              </blockquote>

              <p className="about-story-description text-xs sm:text-sm leading-relaxed">
                Burada insan ve yeryüzündeki tüm canlılara odaklı düşünce yapısı, kullanıcı deneyimi (UX) duyarlılığı ve medya etiği ilkeleri; günümüzün yapay zeka ve modern web teknolojileriyle buluşturulmaya çalışılıyor. Büyük teknoloji şirketlerinin kullanıcıları çeşitli çıkarlar için yönlendiren algoritmalarını reddeden bir çabayla, kullanıcı ihtiyaçlarını kusursuz şekilde gidermeyi hedefleyen sade ve yerel araçlar üretilmektedir. Şu ana kadar herhangi bir ticari kazanç elde edilmemiştir.
              </p>

              {/* Pillars in Brief */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="about-card border p-3.5 rounded-xl">
                  <div className="text-indigo-500 font-semibold text-xs flex items-center gap-1.5 mb-1">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Yapay Zeka & LLM</span>
                  </div>
                  <p className="text-[11px] opacity-80 leading-relaxed">
                    Süreçleri otomatikleştiren, kod ve arayüz üretimini hızlandıran yeni nesil yapay zeka entegrasyonları.
                  </p>
                </div>

                <div className="about-card border p-3.5 rounded-xl">
                  <div className="text-emerald-500 font-semibold text-xs flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>İnsan, Hayvan, Çevre & İletişim Odaklı</span>
                  </div>
                  <p className="text-[11px] opacity-80 leading-relaxed">
                    Açık, tüm canlılara saygılı ve duyarlı, karmaşadan uzak ve kullanıcının mahremiyetini merkezine alan tasarım yaklaşımı.
                  </p>
                </div>

                <div className="about-card border p-3.5 rounded-xl">
                  <div className="text-pink-500 font-semibold text-xs flex items-center gap-1.5 mb-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Çevrenin Gerçek İhtiyaçları</span>
                  </div>
                  <p className="text-[11px] opacity-80 leading-relaxed">
                    Masa başında uydurulan değil; arkadaşların, ailenin ve çevrenin her gün yaşadığı problemlere pratik çözümler.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Roadmap / Gelişim Yol Haritası */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <Compass className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg sm:text-xl font-bold font-display">
              Gelişim Yol Haritası & Kilometre Taşları
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="about-card border border-emerald-500/40 rounded-2xl p-5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600">
                  Faz 1 • Tamamlandı
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <h4 className="text-sm font-bold mb-2 font-display">
                Temel İhtiyaç Araçları & PWA Vitrini
              </h4>
              <p className="text-xs opacity-80 leading-relaxed">
                Kişisel bütçe (evdekihesap), müzik prova eşlikçisi, token hesaplayıcı gibi doğrudan hayatı kolaylaştıran araçların yayına alınması ve bağımsız vitrin mimarisinin inşası.
              </p>
            </div>

            <div className="about-card border border-indigo-500/40 rounded-2xl p-5 relative overflow-hidden ring-1 ring-indigo-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-600">
                  Faz 2 • Aktif & Geliştiriliyor
                </span>
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              </div>
              <h4 className="text-sm font-bold mb-2 font-display">
                Yapay Zeka Destekli Akıllı Çözümler
              </h4>
              <p className="text-xs opacity-80 leading-relaxed">
                Gemini modelleriyle entegre bütçe analitiği, sesli terapi & nefes asistanı, otomatik sentetik arıza izleme (Sentinel) ve akıllı teyit modülleri.
              </p>
            </div>

            <div className="about-card border rounded-2xl p-5 relative overflow-hidden opacity-90">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-500">
                  Faz 3 • Gelecek Vizyonu
                </span>
                <Sparkles className="w-4 h-4 text-purple-500" />
              </div>
              <h4 className="text-sm font-bold mb-2 font-display">
                Topluluk Odaklı & Kamusal Araçlar
              </h4>
              <p className="text-xs opacity-80 leading-relaxed">
                Öğrenciler, bağımsız gazeteciler ve küçük üreticiler için açık kaynak, sıfır maliyetli ve mahremiyet kalkanlı yeni nesil açık web mikro araçları.
              </p>
            </div>
          </div>
        </div>

        {/* Contact & Feedback Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          {/* Left Column: Official Support Email & Quick Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="about-card border rounded-2xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-emerald-500 mb-3">
                <Mail className="w-4 h-4" />
                <span>Resmi İletişim & Destek Kanalı</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-display mb-2">
                Bize Ulaşın
              </h3>

              <p className="text-xs sm:text-sm opacity-80 leading-relaxed mb-6">
                Uygulamalar hakkında soru sormak, geri bildirimde bulunmak, teknik destek almak veya iş birliği önermek için bize doğrudan e-posta gönderebilirsiniz:
              </p>

              {/* Email Box with One-Click Copy */}
              <div className="about-card border rounded-xl p-3.5 flex items-center justify-between gap-3 mb-4 group transition">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs sm:text-sm font-semibold truncate select-all">
                    {supportEmail}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handleCopyEmail}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                      isCopied 
                        ? 'bg-emerald-600 text-white shadow-xs' 
                        : 'about-card border text-xs hover:border-slate-500'
                    }`}
                    title="E-posta adresini kopyala"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Kopyalandı!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Kopyala</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${supportEmail}`}
                    className="p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition"
                    title="E-posta programında aç"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Key Promises */}
              <div className="space-y-2.5 pt-2 text-xs opacity-80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Genellikle 24 saat içinde doğrudan geri dönüş yapılır.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Otomatik bot yanıtları değil, bizzat geliştirici yanıtlar.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Tüm hata bildirimleri öncelikli geliştirme listesine alınır.</span>
                </div>
              </div>
            </div>

            {/* Quick Suggestion Box */}
            <div className="about-card border border-purple-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-pink-500 font-bold text-xs uppercase tracking-wider mb-1.5">
                <HeartHandshake className="w-4 h-4" />
                <span>Bir İhtiyacın mı Var?</span>
              </div>
              <p className="text-xs opacity-85 leading-relaxed">
                "Keşke şöyle sade, telefonda yer kaplamayan bir uygulama olsaydı" dediğiniz kişisel bir ihtiyacınız varsa lütfen çekinmeden yazın! Çevremizin sorunlarını çözmek en büyük motivasyonumuz.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Feedback & Suggestion Form */}
          <div className="lg:col-span-7">
            <div className="about-card border rounded-2xl p-6 sm:p-7 shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-500 mb-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Geri Bildirim & İhtiyaç İletim Formu</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-display mb-1.5">
                  Fikrini veya Mesajını Gönder
                </h3>

                <p className="text-xs opacity-80 mb-5">
                  Aşağıdaki formu doldurarak doğrudan geliştiriciye ulaşabilir veya e-posta istemcinizi tetikleyebilirsiniz.
                </p>

                {isSubmitted ? (
                  <div className="py-8 px-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-4 animate-in fade-in">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold font-display mb-1">
                        Mesajınız Hazırlandı!
                      </h4>
                      <p className="text-xs opacity-85 max-w-md mx-auto leading-relaxed">
                        Geri bildiriminiz için çok teşekkür ederiz. Mesajınızı doğrudan e-posta programınız üzerinden göndermek isterseniz aşağıdaki butona tıklayabilirsiniz:
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <a
                        href={`mailto:${supportEmail}?subject=${encodeURIComponent(`[ADAApps] ${formSubject.toUpperCase()}: ${senderName || 'Kullanıcı Geri Bildirimi'}`)}&body=${encodeURIComponent(`İsim: ${senderName}\nE-posta: ${senderEmail}\n\nMesaj:\n${message}`)}`}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>E-posta Olarak Gönder</span>
                      </a>

                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setMessage('');
                        }}
                        className="px-4 py-2 about-card border text-xs font-semibold rounded-xl transition cursor-pointer"
                      >
                        Yeni Mesaj Yaz
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitContact} className="space-y-4">
                    {/* Subject Pills */}
                    <div>
                      <label className="block text-[11px] font-semibold opacity-90 mb-1.5">
                        Konu Türü
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'idea', label: 'Uygulama Önerisi' },
                          { id: 'bug', label: 'Hata Bildirimi' },
                          { id: 'collab', label: 'İş Birliği & Soru' },
                          { id: 'feedback', label: 'Genel Görüş' }
                        ].map((sub) => (
                          <button
                            type="button"
                            key={sub.id}
                            onClick={() => setFormSubject(sub.id as any)}
                            className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer border text-center ${
                              formSubject === sub.id
                                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                                : 'about-card opacity-80 hover:opacity-100'
                            }`}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold opacity-90 mb-1">
                          Adınız (Opsiyonel)
                        </label>
                        <input
                          type="text"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="Örn: Ayşe Yılmaz"
                          className="w-full about-card border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 transition"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold opacity-90 mb-1">
                          E-posta Adresiniz (Opsiyonel)
                        </label>
                        <input
                          type="email"
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          placeholder="Örn: ayse@ornek.com"
                          className="w-full about-card border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500 transition"
                        />
                      </div>
                    </div>

                    {/* Message Box */}
                    <div>
                      <label className="block text-[11px] font-semibold opacity-90 mb-1">
                        Mesajınız veya İhtiyacınız <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Neye ihtiyacınız olduğunu, karşılaştığınız sorunu veya geliştirmemizi istediğiniz bir özelliği buraya yazabilirsiniz..."
                        className="w-full about-card border rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-500 transition resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] opacity-70">
                        Doğrudan <span className="font-mono font-semibold">destek@adaapps.dev</span> adresine iletilir.
                      </span>

                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition cursor-pointer shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Mesajı İlet</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions (FAQ) Accordion */}
        <div className="border-t border-slate-500/20 pt-10">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg sm:text-xl font-bold font-display">
              Sıkça Sorulan Sorular (SSS)
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="about-card border rounded-xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-4 sm:px-5 py-3.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:opacity-90 transition"
                  >
                    <span className="text-xs sm:text-sm font-semibold">
                      {faq.q}
                    </span>
                    <span className="opacity-70 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 pt-1 text-xs opacity-85 leading-relaxed border-t border-slate-500/10">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
