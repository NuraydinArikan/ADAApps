import { AppItem } from '../types';

export const INITIAL_APPS: AppItem[] = [
  {
    id: 'evdekihesap',
    name: 'Evdeki Hesap',
    tagline: 'Tüm Ev ve Aile Yönetimi Tek Uygulamada',
    description: 'Banka şifrelerinizi istemeyen, harcamalarınızı üçüncü taraflara satmayan, 17 modülü (market, bütçe, diyet, gardırop, araç bakımı, abonelikler, enerji tasarrufu vb.) ve "Mutfak Masası" Gemini AI sohbetini bir araya getiren bağımsız ev asistanı.',
    problem: 'Geleneksel finans uygulamaları kullanıcıdan hassas bankacılık şifreleri ister, verileri sunuculara depolar veya pahalı aylık abonelikler dayatır. Ayrıca ev hayatı bütçe, market listesi ve bakım gibi dağınık uygulamalara bölünmüştür.',
    solution: 'Mağazadan indirilmeden tek tıkla kurulan bir PWA. Veriler uçtan uca şifrelenir ve aile grubuyla güvenle paylaşılır. Mutfak Masası AI yardımcısı fatura okuma, bütçe analizi ve tarif önerisi sunar; kullanıcı istemediği modülleri kapatabilir.',
    category: 'finance',
    platform: 'pwa',
    status: 'live',
    url: 'https://evdekihesap.app',
    iconName: 'WalletCards',
    accentColor: 'from-emerald-500 to-teal-700',
    previewAccent: 'emerald',
    badgeText: 'Canlı PWA • 17 Modül & Gemini AI',
    features: [
      '17 Kapsamlı Ev Modülü: Bütçe, Market Listesi, Diyet/Kalori, Gardırop, Araç Bakımı, Abonelikler, Enerji/Su Tasarrufu ve Kütüphane.',
      'Mutfak Masası (Gemini AI): Her sekmede bağlama duyarlı yapay zeka desteği, fatura fotoğrafından otomatik harcama kaydı ve tasarruf tüyoları.',
      'Bireysel ve Aile (Grup) Modu: Aile fertleriyle şifreli ve senkronize bütçe yönetimi.',
      'Uçtan Uca Şifreli & Yerel Öncelikli: Hassas harcama ve aile kayıtları sunucuya açık metin olarak gitmez.',
      'Pro Katman Desteği: Lemon Squeezy entegrasyonu ile esnek yükseltme seçeneği.'
    ],
    techStack: ['PWA', 'Vanilla JS', 'Firebase Realtime DB', 'Cloud Functions', 'Google Gemini API', 'Lemon Squeezy'],
    verifiedBadge: 'Doğrulanmış PWA',
    lastUpdated: 'Ağustos 2026',
    isFeatured: true,
    privacyHighlights: [
      'Banka veya Kredi Kartı Şifresi İstenmez',
      'Aile Verileri Uçtan Uca Şifreli',
      'Sıfır Üçüncü Parti Veri Madenciliği'
    ],
    privacyArchitecture: {
      localData: 'Cihaz içi IndexedDB & LocalStorage (Şifreli harcama kayıtları)',
      serverSync: 'Firebase Realtime DB (Uçtan uca şifreli aile paylaşımı)',
      aiExternalApi: 'Google Gemini API (Sadece Mutfak Masası fiş/tavsiye istendiğinde)',
      accountRequired: 'Opsiyonel (Tekil cihazda hesapsız çalışır, aile modu için e-posta)'
    },
    changelog: [
      {
        version: 'v109 (Son Sürüm)',
        date: 'Ağustos 2026',
        notes: ['Lemon Squeezy Pro akışı ve yükseltme modülü', 'Firebase client-side sort optimizasyonları', 'Mutfak Masası AI yanıt hızı iyileştirmesi']
      },
      {
        version: 'v108',
        date: 'Temmuz 2026',
        notes: ['17 modüllü tam sürüm lansmanı', 'Çevrimdışı PWA Service Worker güncellemesi']
      }
    ],
    mockupType: 'finance_dashboard'
  },
  {
    id: 'guitarfriends',
    name: 'GuitarFriends',
    tagline: 'Gitarlı Sohbetler, Her An Her Yerde',
    description: 'Kamp ateşi, arkadaş ortamı veya tek başına şarkı söylerken Karplus-Strong sentezi ile canlı akustik gitar ve perküsyon eşliği çalan, söz ve akorları tüm cihazlara senkronize akıtan bağımsız müzik PWA\'sı.',
    problem: 'Arkadaş buluşmalarında ve kamp ateşinde birlikte şarkı söylemek istenir ancak ya gitar yoktur ya da gitar çalan kişi yorulur. Sözleri ve akorları aynı anda herkesin takip edebileceği pratik bir araç bulunmaz.',
    solution: 'Gerçek MP3 kaydı çalmak yerine Web Audio API ve Karplus-Strong algoritmasıyla canlı akustik gitar sentezler. Host ("Halkayı Kur") sesi ve ritmi yönetir, davet edilen arkadaşlar ("Halkaya Katıl") kendi telefonlarından söz ve akor akışını gecikmesiz senkronize takip eder.',
    category: 'music',
    platform: 'pwa',
    status: 'live',
    url: 'https://guitarfriends.app',
    iconName: 'Guitar',
    accentColor: 'from-amber-500 to-rose-600',
    previewAccent: 'amber',
    badgeText: 'Canlı PWA • Karplus-Strong Sentezi',
    features: [
      'Karplus-Strong Akustik Sentez: Önceden kaydedilmiş ses dosyası değil, teli titreten canlı algoritmik gitar sesi.',
      'Çok Cihazlı "Halka" Senkronizasyonu: WebSocket ile tek bir lider çalar, tüm arkadaşların ekranında şarkı sözleri aynı anda akar.',
      'LRCLIB API Entegrasyonu: Binlerce yerli ve yabancı şarkının satır satır zamanlanmış söz kütüphanesi.',
      'Dinamik Akor Üretimi & ChordPro: Gemini destekli akor çözümleme ve özel şarkı yapıştırma.',
      'Zengin Ambiyans Sistemi: 13 konum × 6 ruh hali × 5 hava durumu (kamp ateşi çıtırtısı, kumsal dalgası, yağmur eşliği).'
    ],
    techStack: ['PWA', 'React 19', 'Vite 6', 'TypeScript', 'Web Audio API', 'WebSocket', 'Render', 'Neon Postgres', 'Gemini'],
    verifiedBadge: 'Doğrulanmış PWA',
    lastUpdated: 'Ağustos 2026',
    isFeatured: true,
    privacyHighlights: [
      'Mikrofon Dinlemesi Yok',
      'Parolasız HMAC İmzalı Güvenli Oturum',
      'Anonim Katılımcı Deneyimi'
    ],
    privacyArchitecture: {
      localData: 'Tarayıcı önbelleği (Web Audio ses sentez algoritmaları ve ayarlar)',
      serverSync: 'WebSocket & Render (Yalnızca canlı halka akor/söz eşitleme oturum ID\'si)',
      aiExternalApi: 'LRCLIB API (Şarkı sözleri) & Opsiyonel Gemini akor analizi',
      accountRequired: 'Gerektirmez (Anonim takma adla halkaya anında katılım)'
    },
    changelog: [
      {
        version: 'v1.2.0',
        date: 'Ağustos 2026',
        notes: ['Sahne Modu ve canlı tempo ayarlayıcı', 'LRCLIB dinamik söz eşleme motoru', 'Ambiyans ses katmanları optimizasyonu']
      },
      {
        version: 'v1.0.0',
        date: 'Haziran 2026',
        notes: ['İlk halka açık lansman', 'Karplus-Strong akustik algoritması devreye alındı']
      }
    ],
    mockupType: 'guitar_sync'
  },
  {
    id: 'openguard',
    name: 'OpenGuard',
    tagline: 'Halka Açık Ağlarda Windows 11 Sistem Sertleştirmesi',
    description: 'Kafe, havaalanı ve ortak Wi-Fi ağlarında trafiği yavaşlatan VPN\'lere gerek kalmadan; uyarlanabilir güvenlik duvarı kuralları, DNS-over-HTTPS (DoH) ve süreç/ağ izleme ile Windows 11 sisteminizin saldırı yüzeyini daraltan masaüstü güvenlik aracı.',
    problem: 'Halka açık ortak Wi-Fi ağlarında aynı yerel ağdaki cihazlar saldırı yüzeyi oluşturur. Geleneksel VPN\'ler internet hızını düşürürken yerel ağdaki SMB/NetBIOS ve açık port tehditlerini her zaman engellemez.',
    solution: 'Trafiği şifrelemek yerine doğrudan Windows 11 işletim sistemini sertleştirir. Tek tıkla açık dinleme portlarını kapatır, DNS-over-HTTPS zorlar ve şüpheli arka plan süreçlerini yerel SQLite/JSONL kayıtlarıyla anlık denetler.',
    category: 'security',
    platform: 'desktop',
    status: 'in_development',
    url: 'https://github.com/nuraydinarikan/openguard',
    iconName: 'ShieldCheck',
    accentColor: 'from-blue-600 to-indigo-700',
    previewAccent: 'blue',
    badgeText: 'v0.7.0 Alpha • Windows 11 Masaüstü',
    features: [
      'Uyarlanabilir Windows Güvenlik Duvarı: Ortak Wi-Fi algılandığında tek tıkla sıkı koruma modunu aktif eder.',
      'DNS-over-HTTPS (DoH) Güvencesi: Ağ sağlayıcısının veya kötü niyetli tarafların ziyaret ettiğiniz siteleri görmesini engeller.',
      'Süreç ve Ağ İzleme (ProcessMonitor): Arka planda habersizce dış ağa bağlanan yazılımları tespit eder.',
      'Hafif ve Kaynak Tüketmeyen Yapı: RAM ve işlemciyi yormayan 4 katmanlı yerel Python mimarisi.',
      'Inno Setup Kurulum Paketi: Yönetici yetkili 4 ekranlı sade kurulum sihirbazı.'
    ],
    techStack: ['Python 3.12', 'PyQt6', 'PowerShell Subprocess IPC', 'SQLite', 'JSONL Event Log', 'Inno Setup'],
    verifiedBadge: 'Açık Kaynak Kodlu',
    lastUpdated: 'Ağustos 2026',
    isFeatured: true,
    privacyHighlights: [
      'İnternet Trafiğiniz Sunuculara Yönlendirilmez',
      'Tamamen Yerel Cihazda Çalışır',
      'Açık Kaynak Kod Şeffaflığı'
    ],
    privacyArchitecture: {
      localData: 'Yerel SQLite ve JSONL dosyaları (Kendi makinenizde saklanır)',
      serverSync: 'Yok (Sıfır dış sunucu bağlantısı)',
      aiExternalApi: 'Yok',
      accountRequired: 'Gerektirmez (Yönetici yetkili yerel masaüstü aracı)'
    },
    changelog: [
      {
        version: 'v0.7.0 Alpha',
        date: 'Ağustos 2026',
        notes: ['4 katmanlı mimari tamamlandı', 'Inno Setup bağımsız installer paketi hazırlandı', 'DoH yapılandırma modülü entegre edildi']
      },
      {
        version: 'v0.5.0',
        date: 'Ağustos 2026',
        notes: ['PowerShell IPC güvenlik duvarı kural motoru']
      }
    ],
    mockupType: 'openguard_shield'
  },
  {
    id: 'haberverbana',
    name: 'haberverbana.app',
    tagline: 'Akıllı Web, Fiyat ve Değişim Takip Alarmı',
    description: 'Web sitelerindeki fiyat düşüşleri, stok güncellemeleri, bilet/kontenjan hareketleri ve resmi duyurularda kriteriniz gerçekleştiğinde anında "Haber Veren" hafif ve bağımsız takip asistanı.',
    problem: 'İnternette beklediğiniz bir indirim, açılan bir sınav/bilet kontenjanı veya kritik bir resmi duyuru için sayfaları her gün onlarca kez kontrol etmek zorunda kalırız. Mevcut izleme araçları ise karmaşık, verinizi toplayan ve pahalı abonelikler dayatan yapılardır.',
    solution: 'Arka planda sessizce çalışan Service Worker ve Web Push bildirimleriyle hedef sayfaları periyodik tarayan; fiyat düştüğünde veya içerik değiştiğinde anında telefonunuza uyarı gönderen, sıfır sunucu veri kaydı prensipli bağımsız PWA.',
    category: 'alerts',
    platform: 'pwa',
    status: 'live',
    url: 'https://haberverbana.app',
    iconName: 'BellRing',
    accentColor: 'from-amber-500 to-orange-600',
    previewAccent: 'amber',
    badgeText: 'Canlı PWA • Anlık Takip & Alarm',
    features: [
      'Akıllı URL & Fiyat Takibi: İlgilendiğiniz ürün, bilet veya duyuru sayfasını ekleyin, periyodik olarak sessizce denetlensin.',
      'Doğrudan Web Push Bildirimi: E-posta kalabalığına boğulmadan, koşul sağlandığında anında telefonunuza ve saatinize uyarı düşer.',
      'Kural & Eşik Tanımlama: "Fiyat ₺500 altına indiğinde", "Stokta var yazısı çıktığında" gibi akıllı tetikleyiciler.',
      'Arka Plan Senkronizasyonu (Background Sync): Uygulama kapalıyken dahi cihazınızın enerji dostu arka plan rutinleriyle çalışır.',
      'Gizli & Mahrem İzleme: Hangi sayfaları izlediğiniz hiçbir merkezi sunucuya gitmez, cihazınızın yerelinde şifreli tutulur.'
    ],
    techStack: ['PWA', 'Web Push API', 'Service Worker', 'Background Sync', 'IndexedDB', 'Tailwind CSS'],
    verifiedBadge: 'Doğrulanmış PWA',
    lastUpdated: 'Eylül 2026',
    isFeatured: true,
    privacyHighlights: [
      'Takip Ettiğiniz Sayfalar Cihazınızda Kalır',
      'Kişisel Veri ve Çerez Taraması Yok',
      'Sıfır Reklam & İzleyicisiz'
    ],
    privacyArchitecture: {
      localData: 'Yerel IndexedDB (İzlediğiniz URL listesi ve eşik kuralları)',
      serverSync: 'Web Push Sunucusu (Şifreli bildirim aboneliği endpoint\'i)',
      aiExternalApi: 'Yok',
      accountRequired: 'Gerektirmez (Tarayıcı bildirim izni yeterlidir)'
    },
    changelog: [
      {
        version: 'v1.8.0',
        date: 'Ağustos 2026',
        notes: ['Düşük pil tüketimli periyodik arka plan denetimi', 'Web Push bildirim altyapısı güçlendirildi']
      },
      {
        version: 'v1.5.0',
        date: 'Temmuz 2026',
        notes: ['Fiyat ve metin değişim algılayıcı hassasiyet filtresi eklendi']
      }
    ],
    mockupType: 'alert_monitor'
  },
  {
    id: 'algorithmless',
    name: 'Algorithmless',
    tagline: 'Algoritma Değil, Sen Seç: Yankı Odası Karşıtı Medya Platformu',
    description: 'Aynı gündem maddesini farklı platformlardan (YouTube, X, bağımsız medya, podcast) ve farklı perspektiflerden yan yana sunarak sizi tek bir algoritmanın filtre balonundan çıkaran bağımsız medya küratörlüğü.',
    problem: 'Sosyal medya algoritmaları etkileşimi artırmak için kullanıcıları kutuplaştırır, yanlı içeriklerle besler ve karşıt fikirleri görünmez kılan filtre balonlarına hapseder.',
    solution: 'Kişiselleştirme yerine kasıtlı çeşitlilik sunar. "Matris Görünümü" ile konuları platform ve perspektif ekseninde karşılaştırır; "Çarkıfelek Görünümü" ile farklı bakış açılarını keşfetmeyi oyunlaştırır. Katı "Çıplak Gerçek" 5N1K formatıyla dezenformasyonu eler.',
    category: 'journalism',
    platform: 'pwa',
    status: 'live',
    url: 'https://nuraydinarikan.github.io/algorithmless/',
    iconName: 'Compass',
    accentColor: 'from-cyan-500 to-blue-700',
    previewAccent: 'cyan',
    badgeText: 'Canlı PWA • Matris & Çarkıfelek',
    features: [
      'Matris Görünümü: Konu × platform tablosunda tüm perspektifleri tek bakışta kıyaslayın.',
      'Çarkıfelek Görünümü: Oyunlaştırılmış tarafsız keşif arayüzü.',
      '"Çıplak Gerçek" Editoryal Formatı: Yorumsuz 5N1K olayı, Neden Önemli analizi ve Algoritmik Çarpıtma teşhisi.',
      'Bilinçli Olarak Reklamsız: Medya okuryazarlığına adanmış bağımsız editoryal yapı.',
      'Hafif Tek Dosyalık PWA: GitHub Pages üzerinde ışık hızında açılan, sıfır izleyicili deneyim.'
    ],
    techStack: ['PWA', 'Vanilla JS (Tek Dosya)', 'Supabase Headless CMS', 'Service Worker', 'GitHub Pages', 'Plausible Analytics'],
    verifiedBadge: 'Açık Kaynak PWA',
    lastUpdated: 'Ağustos 2026',
    isFeatured: true,
    privacyHighlights: [
      'Kullanıcı Davranış Profilleme Yok',
      'Algoritmik Manipülasyon Yok',
      'Reklamsız ve Şeffaf Kaynaklandırma'
    ],
    privacyArchitecture: {
      localData: 'Tarayıcı oturum belleği',
      serverSync: 'GitHub Pages & Supabase (Yalnızca kamuya açık editoryal içerik okunur)',
      aiExternalApi: 'Yok',
      accountRequired: 'Gerektirmez (Tamamen açık ve reklamsız okuma)'
    },
    changelog: [
      {
        version: 'v1.4.0',
        date: 'Ağustos 2026',
        notes: ['Supabase veri entegrasyonu hazırlığı', 'Mobil dokunmatik Çarkıfelek fizikleri iyileştirildi']
      },
      {
        version: 'v1.0.0',
        date: 'Temmuz 2026',
        notes: ['İlk açık PWA yayını (GitHub Pages)']
      }
    ],
    mockupType: 'clean_feed'
  },
  {
    id: 'lesstoken',
    name: 'Less Token',
    tagline: 'Görsel, PDF ve Metinlerde %95\'e Varan LLM Token Tasarrufu',
    description: 'Görsel, PDF, Word, CSV ve metinleri ChatGPT, Claude, Gemini veya DeepSeek\'e göndermeden önce akıllıca sıkıştırıp özetleyen; API maliyetlerinizi ve prompt kotalarınızı radikal biçimde düşüren geliştirici aracı.',
    problem: 'Yapay zeka modellerine 4000×2500px ham görsel veya 50 sayfalık taranmış PDF göndermek on binlerce gereksiz token tüketir, API faturalarını kabartır ve context penceresini doldurur.',
    solution: 'Görselleri okunurluk kaybı olmadan optimize eder; PDF/CSV dokümanlarını anlamsal olarak ayıklar. Chrome MV3 eklentisi ve web uygulamasıyla geliştiricilere token tasarrufu sağlar.',
    category: 'ai_tools',
    platform: 'chrome_extension',
    status: 'in_development',
    url: 'https://lesstoken.app',
    iconName: 'Cpu',
    accentColor: 'from-sky-500 to-indigo-600',
    previewAccent: 'sky',
    badgeText: 'Aktif Geliştirme • Chrome Ext & Web',
    features: [
      'Görsel Optimizasyonu: Yüksek çözünürlüklü görselleri LLM için optimize ederek 5KB\'a kadar indirgeme.',
      'PDF & CSV Derin Sıkıştırma: 50 sayfalık teknik dokümanlarda %95\'e varan context tasarrufu.',
      'Chrome Manifest V3 Eklentisi: ChatGPT ve Claude arayüzünde dosya yüklerken doğrudan tek tıkla sıkıştırma.',
      'Kendi Anahtarını Getir (BYOK): API anahtarlarınız yalnızca kendi tarayıcınızda saklanır.',
      'Railway Flask Backend: Yüksek hızlı belge ayrıştırma mikroservisi (pdfjs-dist, mammoth).'
    ],
    techStack: ['Next.js 14', 'React 18', 'Python Flask', 'Railway', 'Chrome Extension MV3', 'Tailwind CSS'],
    verifiedBadge: 'Chrome MV3 & Web',
    lastUpdated: 'Ağustos 2026',
    isFeatured: true,
    privacyHighlights: [
      'Dokümanlar Sunucularda Saklanmaz',
      'Yerel Tarayıcıda Sıkıştırma Önceliği',
      'API Anahtarları Cihazınızda Kalır'
    ],
    privacyArchitecture: {
      localData: 'Tarayıcı yerel belleği & BYOK (Kendi API anahtarınız sunucuya gitmez)',
      serverSync: 'Railway Flask mikroservisi (Yalnızca yüklenen PDF/CSV ayrıştırma esnasında RAM\'de işlenir, saklanmaz)',
      aiExternalApi: 'Kullanıcının kendi LLM sağlayıcısı (OpenAI / Anthropic / Gemini)',
      accountRequired: 'Gerektirmez (Doğrudan araç kullanımı)'
    },
    changelog: [
      {
        version: 'v1.0.1 (Hazır Paket)',
        date: 'Ağustos 2026',
        notes: ['PDF ve CSV dosya işleme tamamlandı', 'Chrome Web Store mağaza paketi hazırlandı']
      },
      {
        version: 'v0.9.0',
        date: 'Ağustos 2026',
        notes: ['Railway Flask backend Docker kurulumu']
      }
    ],
    mockupType: 'token_counter'
  },
  {
    id: 'koza',
    name: 'Koza',
    tagline: 'Anonim Eşten-Eşe Sesli Ruhsal Destek ve Rahatlama Ağı',
    description: 'İki yabancıyı sesli ve tamamen anonim şekilde bir araya getiren akranlar arası (peer-to-peer) ruh sağlığı destek ağı. Gerçek zamanlı ses maskeleme (<50ms gecikmeli formant kaydırma) ve 3D avatarlarla kimliğiniz gizlenirken, anlamsal eşleşmeyle benzer duygusal durumu yaşayan kişiler buluşur.',
    problem: 'Modern dünyada yalnızlık, tükenmişlik ve yoğun anksiyete artarken; damgalanma korkusu, yüksek terapi ücretleri ve yargılanma endişesi insanların içlerini dökmesini engeller.',
    solution: 'Bilinçli olarak "tıbbi bir tedavi" değil, insan insana bir "akran destek ağı" olarak tasarlandı. Web Audio API ile kullanıcının ses tonunu gerçek zamanlı maskeler, WebRTC ile doğrudan eşler arasında (P2P) uçtan uca şifreli ses hattı kurar; sunucu görüşme içeriğini asla duymaz.',
    category: 'therapy',
    platform: 'pwa',
    status: 'beta',
    url: 'https://koza.app',
    iconName: 'HeartPulse',
    accentColor: 'from-teal-500 to-emerald-700',
    previewAccent: 'teal',
    badgeText: 'Açık Beta • P2P Ses Maskeleme',
    features: [
      'Gerçek Zamanlı Ses Maskeleme: <50ms gecikmeli Web Audio API formant shifting ile sesiniz tanınmaz hale gelir.',
      'Anlamsal (Semantik) Eşleştirme: Yaş/cinsiyet yerine duygu durumu onboarding cevaplarının OpenAI embeddings benzerliğine göre eşleşme.',
      'Uçtan Uca Şifreli WebRTC P2P: Ses doğrudan iki cihaz arasında akar, sunucu sadece TURN rölesi görevi görür.',
      'PII (Kişisel Veri) Dedektörü: Sohbet sırasında isim, telefon veya konum gibi hassas veriler otomatik filtrelenir.',
      'Zaman Ayarlı Kendini İmha: Görüşme sona erdiğinde tüm geçici oturum verileri anında silinir.'
    ],
    techStack: ['React 18', 'TypeScript', 'Vite', 'Web Audio API', 'WebRTC (P2P + TURN)', 'Supabase pgvector', 'OpenAI Embeddings'],
    verifiedBadge: 'Açık Beta PWA',
    lastUpdated: 'Ağustos 2026',
    isFeatured: false,
    privacyHighlights: [
      'Ses Tonunuz ve Kimliğiniz Gizlenir',
      'Sunucu Görüşmeyi Asla Dinleyemez',
      'Tıbbi Kayıt Tutulmaz, Mutlak Anonimlik'
    ],
    privacyArchitecture: {
      localData: 'Web Audio API ses maskeleme parametreleri (Cihaz üzerinde çalışır)',
      serverSync: 'Supabase pgvector (Duygu eşleşmesi) & WebRTC P2P (Eşten eşe şifreli ses)',
      aiExternalApi: 'OpenAI Embeddings (Yalnızca anonim duygu eşleştirme vektörü için)',
      accountRequired: 'Gerektirmez (Tek kullanımlık anonim takma ad)'
    },
    changelog: [
      {
        version: 'v0.3.0 (Beta)',
        date: 'Ağustos 2026',
        notes: ['Ses maskeleyici formant algoritması ve semantik pgvector eşleşmesi kodlandı', 'WebRTC TURN bağlantı katmanı test edildi']
      },
      {
        version: 'v0.1.0',
        date: 'Haziran 2026',
        notes: ['Akran destek ağı mimari dokümantasyonu ve PII koruma protokolü']
      }
    ],
    mockupType: 'therapy_voice'
  },
  {
    id: 'kahveapps',
    name: 'KahveApps',
    tagline: 'Semtinin Kahve Kartı — Hepsi Tek Uygulamada',
    description: 'Bir semtteki tüm bağımsız 3. nesil kahvecileri tek bir müşteri uygulamasında buluşturan dijital sadakat platformu. Kullanıcı her kahvecide dijital damga toplar (10 kahveye 1 bedava), tüm kartlarını tek cüzdanda görür.',
    problem: 'Bağımsız kahveciler dev zincirler gibi yüksek bütçeli özel mobil sadakat uygulaması yaptıramaz; müşteriler ise cüzdanlarında taşımaktan bıktıkları veya kaybettikleri kağıt damga kartlarından sıkılmıştır.',
    solution: 'Bağımsız kahveciye zincir kalitesinde müşteri sadakat altyapısı, anlık push bildirim kanalı ve QR damga sistemi sunar. Kullanıcı semtteki tüm kahve kartlarını tek bir PWA cüzdanında yönetir; "Kampanya Radarı" ile yerel kahve fırsatlarını keşfeder.',
    category: 'loyalty',
    platform: 'pwa',
    status: 'concept',
    url: 'https://kahveapps.com',
    iconName: 'Coffee',
    accentColor: 'from-amber-600 to-amber-900',
    previewAccent: 'amber',
    badgeText: 'Konsept • Ankara Pilot Doğrulaması',
    features: [
      'Tek Dijital Damga Cüzdanı: Semtteki tüm bağımsız kahvecilerin "10 damgaya 1 hediye" kartları tek ekranda.',
      '3 Saniyede Barista QR Modu: Yoğun saatlerde kasayı yavaşlatmayan dinamik sunucu imzalı QR okutma.',
      'Kampanya Radarı: Semtteki kahvecilerin taze çekirdek tadımları ve indirimleri tek canlı akışta.',
      'Bağımsız Kahveciye Güç: Aylık makul bir abonelikle zincir seviyesinde sadakat motoru ve müşteri iletişimi.',
      'Ankara Pilot Bölgesi: Tunalı–Esat–Arjantin hattında 20 kahveci saha doğrulaması.'
    ],
    techStack: ['PWA', 'Expo / Web', 'Supabase', 'NetGSM SMS OTP', 'Dynamic QR Code Engine', 'Tailwind CSS'],
    verifiedBadge: 'Pilot Tasarım',
    lastUpdated: 'Temmuz 2026',
    isFeatured: false,
    privacyHighlights: [
      'Konum Geçmişiniz İzlenmez',
      'Müşteri Verisi Üçüncü Taraflarla Paylaşılmaz',
      'Yalnızca Dijital Damga Cüzdanı'
    ],
    privacyArchitecture: {
      localData: 'Yerel cüzdan önbelleği & damga durumu',
      serverSync: 'Supabase & Dinamik QR motoru (Barista damga onayı)',
      aiExternalApi: 'Yok',
      accountRequired: 'Opsiyonel (SMS OTP ile telefon numarası doğrulama)'
    },
    changelog: [
      {
        version: 'v0.2.0 (Prototip)',
        date: 'Temmuz 2026',
        notes: ['Tıklanabilir müşteri cüzdan prototipi hazırlandı', 'PRD ürün dokümanı ve alan adları (kahveapps.com/.app) tescillendi']
      }
    ],
    mockupType: 'kahve_wallet'
  },
  {
    id: 'projectfn',
    name: 'Project FN',
    tagline: 'Haber, Doğrulanabilir ve İlişkilendirilebilir Bir Bilgi Nesnesidir',
    description: 'Türkiye haberciliğinin hız ve hacim odaklı doğrulama zafiyetini hedef alan; 30+ yıllık araştırmacı gazetecilik birikimiyle geliştirilen yeni nesil doğrulanabilir haber ve medya şeffaflık platformu.',
    problem: 'Geleneksel ve dijital medyada haberler teyit edilmeden, kaynak gösterilmeden ve sansasyon amaçlı yayılır. Okur hangi bilginin belgeye dayandığını, hangi iddianın taraflarca doğrulandığını bilemez.',
    solution: 'Her haberi "Doğrulama Karnesi" ile yayınlar (kaynak, resmi belge, uzman ve taraf görüşü sayımı elle doldurulamaz). Olay Kronolojisi ile haberin kök nedenini gösterir ve "Bu haberi kim nasıl verdi" modülüyle medya organlarının dili arasındaki farkı tarafsızca ortaya koyar.',
    category: 'journalism',
    platform: 'web',
    status: 'concept',
    url: 'https://projectfn-iota.vercel.app',
    iconName: 'FileCheck',
    accentColor: 'from-slate-600 to-indigo-900',
    previewAccent: 'indigo',
    badgeText: 'Prototip / MVP • Araştırmacı Gazetecilik',
    features: [
      'Otomatik Doğrulama Karnesi: Her haberin altında kaynak, resmi evrak, tanık ve taraf görüşü sayısı objektif olarak karnelenir.',
      'Olay Kronolojisi: Gelişen olayların adım adım doğrulanmış zaman çizelgesi.',
      '"Bu Haberi Kim Nasıl Verdi?": Farklı medya kanallarının haberi ele alış üslubunu ve manşetlerini karşılaştıran analiz.',
      'Çoklu Okuma Modları: 60 saniyelik brifing, derinlemesine araştırma dosyası ve sesli dinleme seçenekleri.',
      '30+ Yıllık Gazetecilik Deneyimi: Kıdemli araştırmacı gazetecilerin metodolojisiyle şekillenen editoryal omurga.'
    ],
    techStack: ['Next.js 15 (App Router)', 'React 19', 'TypeScript', 'Supabase Postgres', 'Claude API (Planlı)', 'Tailwind CSS'],
    verifiedBadge: 'Araştırma & MVP',
    lastUpdated: 'Ağustos 2026',
    isFeatured: false,
    privacyHighlights: [
      'Reklamsız ve Tık Tuzağından Arındırılmış',
      'Açık Metodoloji ve Kaynak Belirtme Şartı',
      'Okur Profili Çıkartılmaz'
    ],
    privacyArchitecture: {
      localData: 'Tarayıcı okuma tercihleri',
      serverSync: 'Supabase Postgres (Doğrulanmış haber kayıtları ve karneler)',
      aiExternalApi: 'Claude API (Planlı - yalnızca kaynak teyit metin analizi için)',
      accountRequired: 'Gerektirmez (Kamusal şeffaf haber arşivi)'
    },
    changelog: [
      {
        version: 'v0.3.0 (Demo MVP)',
        date: 'Ağustos 2026',
        notes: ['Doğrulama karnesi ve yayın eşiği motoru entegre edildi', 'projectfn-iota.vercel.app demosu devreye alındı']
      }
    ],
    mockupType: 'journalism_factcheck'
  }
];
