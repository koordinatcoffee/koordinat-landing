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

## SEO

- **Önceden render (prerender):** `npm run build` her sayfayı statik HTML olarak üretir (`src/entry-server.tsx` +
  `scripts/prerender.mjs`); tarayıcı bu HTML'i hidrate eder. Google ve link önizlemeleri içeriği JS çalıştırmadan görür.
- **Başlık / açıklama:** `src/routes.ts`. Her başlık "Koordinat Coffee" markasını içerir.
- **Meta, hreflang, Open Graph, JSON-LD, sitemap:** `src/seo.ts` — Organization, WebSite, 2 × CafeOrCoffeeShop,
  Menu, FAQPage, MobileApplication ve BreadcrumbList. Marka varyasyonları `ALT_NAMES` listesinde.
- **SSS:** `src/content/faq.ts` — iletişim sayfasında görünür ve FAQPage verisine dönüşür.
- **Şube sayfaları:** `/tr/subeler/<slug>/` ve `/branches/<slug>/`, `site.config.mjs` → `branches` içindeki
  `slug`, `note`, `about` alanlarından üretilir. Google İşletme Profili'nde her şubenin "Web sitesi" alanına kendi
  sayfasını yazın.
- **Samandağ rehberi:** `src/content/guide.ts` → `/tr/samandag-rehberi/` ("samandağda gezilecek yerler" araması için).
- **Anahtar kelime haritası:** `src/routes.ts` başındaki yorum (Google otomatik tamamlama + Trends, Eylül 2026).
- **Ölçüm:** Vercel Web Analytics + Speed Insights (`src/main.tsx`, çerezsiz). Vercel → Project → Analytics ve
  Speed Insights sekmelerinden **etkinleştirin**; yerelde `/_vercel/*` 404 vermesi normaldir.

## Uygulama indirme linki: `/app-download`

QR kod, afiş ve Instagram biyografisi için tek link: **koordinatcoffee.com/app-download**

- iPhone / iPad → App Store, Android → Google Play: `vercel.json` içindeki `has` (user-agent) yönlendirmeleri,
  sunucuda, anında (307).
- Diğer cihazlar (masaüstü, kendini Mac olarak tanıtan iPad'ler) → iki mağaza butonlu yedek sayfa
  (`src/app-download.ts`); iPad'i JavaScript ile ayrıca algılar. Arama motorlarında indekslenmez.
- Mağaza linkleri `site.config.mjs` → `stores` **ve** `vercel.json` içinde. Biri değişirse ikisini de güncelleyin;
  farklı olurlarsa build uyarı verir.

## Yayınlama (Vercel)

`vercel.json` hazır: build `npm run build`, çıktı `dist`. Eski Türkçe adresler (`/gizlilik/`, `/kvkk/` …) yeni
İngilizce adreslere kalıcı olarak yönlendirilir. Alan adı: Vercel → Project → Settings → Domains.

## PayTR başvurusu öncesi

- [ ] `site.config.mjs` içindeki `legalName`, `taxOffice`, `taxNumber`, `phone` dolduruldu
      (boş alanlar sitede gizlenir, build uyarı verir)
- [ ] Menü fiyatları uygulamadaki fiyatlarla birebir aynı
- [ ] Yasal metinler bir avukat / mali müşavir tarafından kontrol edildi
