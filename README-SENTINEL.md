# 🛡️ AdaApps Sentinel - 7/24 Sentetik İzleme ve Yapay Zeka QA Kılavuzu

Bu sistem, **adaapps.dev** ve stüdyonuza ait tüm canlı web uygulamalarının (`evdekihesap.app`, `guitarfriends.app`, `haberverbana.app`, `lesstoken.app`) kesintisiz çalışmasını, arayüzlerinin çökmemesini ve olası bir arızada **anında Telegram'ınıza bildirim gelmesini** sağlar.

---

## 🚀 Mimari Nasıl Çalışır?

1. **GitHub Actions (Cron Job):** Her saat başı ücretsiz olarak `sentinel-monitor.js` betiğini çalıştırır.
2. **HTTP & SSL Denetimi:** Her uygulamanın HTTP durum kodunu, yanıt süresini (latency) ve SSL sertifikasını kontrol eder.
3. **Google Gemini Multimodal QA:** Sayfa çıktısını veya hata loglarını Gemini API'ye analiz ettirir. Beklenmedik "White Screen of Death" (Beyaz Sayfa) ya da kod patlaması olup olmadığını tespit eder.
4. **Anında Telegram Uyarısı:** Herhangi bir servis 1 saniyeden uzun süredir çökükse veya hata veriyorsa, detaylı teşhis raporu anında telefonunuza Telegram mesajı olarak iletilir.

---

## 📲 Telegram Botu Nasıl Kurulur? (3 Dakika)

1. **Bot Oluşturun:**
   - Telegram'ı açın ve `@BotFather` kullanıcısını aratıp başlatın.
   - `/newbot` yazın ve botunuza bir isim verin (Örn: `AdaApps Sentinel Bot`).
   - BotFather size `123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ` şeklinde bir **API Token** verecektir. Bu sizin `TELEGRAM_BOT_TOKEN` değerinizdir.

2. **Kendi Chat ID'nizi Alın:**
   - Yeni oluşturduğunuz botunuza gidin ve **"Başlat" (Start)** butonuna basın.
   - Telegram'da `@userinfobot` hesabını aratın ve başlatın.
   - Size `Id: 987654321` gibi bir numara verecektir. Bu sizin `TELEGRAM_CHAT_ID` değerinizdir.

---

## 🔑 GitHub Secrets Ayarları

GitHub reponuza gidin:
1. **Settings > Secrets and variables > Actions > New repository secret** yolunu izleyin.
2. Aşağıdaki 3 gizli anahtarı ekleyin:
   - `GEMINI_API_KEY`: Google AI Studio'dan aldığınız Gemini API anahtarınız.
   - `TELEGRAM_BOT_TOKEN`: @BotFather'dan aldığınız token.
   - `TELEGRAM_CHAT_ID`: @userinfobot'tan aldığınız sohbet ID'niz.

Artık GitHub Actions her saat başı sistemlerinizi otomatik denetleyecek ve bir sorun olursa anında telefonunuza uyarı gönderecektir!

---

## 💻 Yerel Olarak Çalıştırmak İçin

Terminalinizde doğrudan şu komutla anında test başlatabilirsiniz:
```bash
node scripts/sentinel-monitor.js
```
