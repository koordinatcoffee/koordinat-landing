# koordinatcoffee.com

Koordinat Coffee Factory web sitesi — React + Vite + Tailwind + Framer Motion. Tüm sayfalar İngilizce.

## Yapı

```
site.config.mjs          ← TÜM işletme bilgileri: şirket, 2 şube (koordinatlar), saatler, menü ve fiyatlar
src/routes.ts            ← sayfa listesi + her sayfanın <title>/description bilgisi
src/pages/               ← Home, Menu, About, Contact, Legal (9 yasal metin), 404
src/content/legal/       ← yasal metinlerin İngilizce içerikleri
src/components/          ← ana sayfa bölümleri, navbar, footer, imleç
src/components/transitions/  ← bölüm geçişleri (CremaWave, SheetReveal) ve sayfa geçişi (PageCurtain)
public/media/            ← video ve görseller (Mixkit / Unsplash lisanslı stok)
public/assets/img/       ← logo-full.png, parrot-damn.png (Papağan damgası)
vite.config.ts           ← her sayfa için ayrı HTML + 404.html + sitemap.xml + robots.txt üretir
```

## Komutlar

```
npm install        # ilk seferde
npm run dev        # geliştirme → http://localhost:5173
npm run build      # tip kontrolü + derleme → dist/
npm run preview    # derlenmiş siteyi yerelde aç
```

## Sık yapılan güncellemeler

- **Menü ve fiyatlar:** `site.config.mjs` → `menu`. Şu anki ürün/fiyatlar ÖRNEKTİR.
- **Şubeler:** `site.config.mjs` → `branches`. İlk şube (denize yakın Çiğdede) sitenin ana koordinatıdır.
- **Çalışma saatleri:** `site.config.mjs` → `hours` (iki şube için ortak).
- **Görseller:** `public/media/` altındaki dosyaları aynı adla değiştirmeniz yeterli.

## Yayınlama (Vercel)

`vercel.json` hazır: build `npm run build`, çıktı `dist`. Eski Türkçe adresler (`/gizlilik/`, `/kvkk/` …) yeni
İngilizce adreslere kalıcı olarak yönlendirilir. Alan adı: Vercel → Project → Settings → Domains.

## PayTR başvurusu öncesi

- [ ] `site.config.mjs` içindeki `legalName`, `taxOffice`, `taxNumber`, `phone` dolduruldu
      (boş alanlar sitede gizlenir, build uyarı verir)
- [ ] Menü fiyatları uygulamadaki fiyatlarla birebir aynı
- [ ] Yasal metinler bir avukat / mali müşavir tarafından kontrol edildi
