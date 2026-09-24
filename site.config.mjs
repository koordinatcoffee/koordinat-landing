// =============================================================================
// Koordinat Coffee — site bilgileri
// =============================================================================
// Sitedeki TÜM işletme bilgileri ve menü buradan gelir (ana sayfa, menü,
// iletişim ve yasal sayfalar). Değiştirdikten sonra `npm run build` yeterli.
//
// ⚠️  `null` bırakılan alanlar sitede gösterilmez ve build sırasında uyarı
//     verir. PayTR başvurusundan ÖNCE ticari ünvan, vergi bilgileri ve
//     telefonu doldurun.
// =============================================================================

export default {
  siteUrl: "https://koordinatcoffee.com",

  company: {
    // Tabelada / uygulamada görünen ad
    tradeName: "Koordinat Coffee Factory",
    // Vergi levhasındaki TAM ünvan.
    // Şahıs işletmesiyse: "Ad Soyad – Koordinat Coffee Factory"
    // Şirketse: "Koordinat Gıda Ltd. Şti." gibi
    legalName: "Anıl Reyhanoğulları ve Bünyamin Reyhanoğulları Adi Ortaklığı",
    // Yasal (tebligat) adresi — sözleşmelerde ve KVKK başvurularında kullanılır
    address: "Çiğdede Mah. Mehmet Aslan Cad. No: 201 D: 1",
    postcode: "31800",
    district: "Samandağ",
    city: "Hatay",
    country: "Türkiye",
    taxOffice: "Samandağ Vergi Dairesi",
    taxNumber: "7701232031",
    mersis: "", // Varsa MERSİS no; yoksa "" bırakın (satır gizlenir)
    phone: "0536 616 6166",
    email: "coffeekoordinat@gmail.com", // Alan adı e-postası açılınca: info@koordinatcoffee.com
    kep: "", // Varsa KEP adresi; yoksa "" bırakın
  },

  // Çalışma saatleri (iki şube için ortak)
  hours: {
    days: "Every day",
    daysTr: "Her gün",
    open: "07:00",
    close: "02:00",
    // schema.org biçimi (Google için)
    schema: "Mo-Su 07:00-02:00",
  },

  // ---------------------------------------------------------------------------
  // ŞUBELER — sırası önemli: İLK şube (denize yakın olan) sitenin ana koordinatıdır
  // (hero, sayfa geçişi, footer vb.). lat/lng Google Haritalar'daki pin'den alınır.
  // ---------------------------------------------------------------------------
  branches: [
    {
      id: "cigdede",
      name: "Koordinat Coffee Factory",
      area: "Çiğdede",
      address: "Çiğdede Mah. Mehmet Aslan Cad. No: 201 D: 1",
      postcode: "31800",
      lat: 36.0812993,
      lng: 35.9471517,
      mapsUrl:
        "https://www.google.com/maps/place/Koordinat+Coffee+Factory/@36.0812993,35.9471517,17z/data=!4m6!3m5!1s0x1525d5007cd17025:0x687be93deac3f7d!8m2!3d36.0812993!4d35.9471517!16s%2Fg%2F11yb1fx3r6",
    },
    {
      id: "ataturk",
      name: "Koordinat Coffee",
      area: "Atatürk",
      address: "Atatürk Mah. Nazım Hikmet Ran Cad. No: 32",
      postcode: "31800",
      lat: 36.0836591,
      lng: 35.9804144,
      mapsUrl:
        "https://www.google.com/maps/place/Koordinat+Coffee/@36.0836591,35.9804144,17z/data=!4m6!3m5!1s0x1525d77d734944c7:0x968c8588c9bab35e!8m2!3d36.0836591!4d35.9804144!16s%2Fg%2F11fjtfqk55",
    },
  ],

  stores: {
    appStore: "https://apps.apple.com/tr/app/id6788413238",
    googlePlay: "https://play.google.com/store/apps/details?id=com.koordinat.coffeeapp",
  },

  instagram: "https://www.instagram.com/koordinatcoffeetr/?hl=en",
  facebook: "https://www.facebook.com/koordinatcoffe/",

  // Hazır bildiriminden sonra siparişin şubede bekletildiği süre (dakika)
  pickupHoldMinutes: 30,

  // Sadakat kartı: kaç damgada bir kahve bedava (uygulamadaki ayarla aynı olmalı)
  stampsPerCard: 5,

  // Yasal metinlerin yürürlük tarihi
  legalDate: "24 September 2026",
  legalDateTr: "24 Eylül 2026",

  // ---------------------------------------------------------------------------
  // MENÜ — Fiyatlar TL, KDV dahil.
  // ⚠️ ŞU ANKİ ÜRÜN VE FİYATLAR ÖRNEKTİR (dummy). Gerçek menüyle değiştirin;
  //    uygulamadaki fiyatlarla BİREBİR aynı olmalı.
  // group: ana sayfadaki 3 panelden hangisine ait olduğu (coffee / food / sweet)
  // nameTr / descTr / titleTr: Türkçe sayfada gösterilir (nameTr yoksa name kullanılır)
  // ---------------------------------------------------------------------------
  menu: [
    {
      id: "hot-coffee",
      group: "coffee",
      title: "Hot Coffee",
      titleTr: "Sıcak Kahveler",
      items: [
        { name: "Espresso", desc: "A single, balanced shot.", descTr: "Tek shot, yoğun ve dengeli.", price: 70 },
        { name: "Double Espresso", nameTr: "Duble Espresso", desc: "Two shots, fuller body.", descTr: "İki shot, daha dolgun gövde.", price: 85 },
        { name: "Americano", desc: "Espresso lengthened with hot water.", descTr: "Sıcak suyla uzatılmış espresso.", price: 85 },
        { name: "Cortado", desc: "Espresso cut with a little warm milk.", descTr: "Az miktarda sıcak sütle kesilmiş espresso.", price: 95 },
        { name: "Cappuccino", desc: "Espresso, steamed milk and a deep foam cap.", descTr: "Espresso, süt ve bol köpük.", price: 105 },
        { name: "Caffè Latte", nameTr: "Latte", desc: "Espresso and silky steamed milk.", descTr: "Espresso ve ipeksi sıcak süt.", price: 110 },
        { name: "Flat White", desc: "Double espresso, thin micro-foam.", descTr: "Duble espresso, ince mikro köpük.", price: 110 },
        { name: "Caramel Latte", nameTr: "Karamelli Latte", desc: "Latte with house caramel.", descTr: "Ev yapımı karamelli latte.", price: 120 },
        { name: "Mocha", desc: "Espresso, chocolate and milk.", descTr: "Espresso, çikolata ve süt.", price: 120 },
        { name: "Turkish Coffee", nameTr: "Türk Kahvesi", desc: "Cooked in a cezve, served with lokum.", descTr: "Cezvede pişer, lokumla servis edilir.", price: 75 },
        { name: "Filter Coffee", nameTr: "Filtre Kahve", desc: "The brew of the day.", descTr: "Günün demlemesi.", price: 90 },
      ],
    },
    {
      id: "cold-coffee",
      group: "coffee",
      title: "Cold Coffee",
      titleTr: "Soğuk Kahveler",
      items: [
        { name: "Iced Americano", nameTr: "Buzlu Americano", desc: "Espresso over ice and cold water.", descTr: "Buz ve soğuk su üzerine espresso.", price: 95 },
        { name: "Iced Latte", nameTr: "Buzlu Latte", desc: "Espresso, cold milk, ice.", descTr: "Espresso, soğuk süt, buz.", price: 115 },
        { name: "Cold Brew", desc: "Steeped slowly for 12 hours.", descTr: "12 saat boyunca soğuk demlenir.", price: 120 },
        { name: "Iced Mocha", nameTr: "Buzlu Mocha", desc: "Chocolate, espresso and cold milk.", descTr: "Çikolata, espresso ve soğuk süt.", price: 125 },
        { name: "Espresso Tonic", desc: "Espresso over tonic and citrus.", descTr: "Tonik ve narenciye üzerine espresso.", price: 130 },
      ],
    },
    {
      id: "not-coffee",
      group: "coffee",
      title: "Not Coffee",
      titleTr: "Kahve Dışı",
      items: [
        { name: "Hot Chocolate", nameTr: "Sıcak Çikolata", desc: "Dark cocoa, steamed milk.", descTr: "Bitter kakao, sıcak süt.", price: 100 },
        { name: "Chai Latte", desc: "Spiced black tea and milk.", descTr: "Baharatlı siyah çay ve süt.", price: 105 },
        { name: "Matcha Latte", desc: "Stone-ground matcha and milk.", descTr: "Taş değirmen matcha ve süt.", price: 125 },
        { name: "Fresh Lemonade", nameTr: "Ev Yapımı Limonata", desc: "Lemon, mint, a little sugar.", descTr: "Limon, nane, az şeker.", price: 90 },
        { name: "Black Tea", nameTr: "Çay", desc: "Brewed Turkish tea.", descTr: "Demlik çayı.", price: 40 },
      ],
    },
    {
      id: "food",
      group: "food",
      title: "Food",
      titleTr: "Yemekler",
      items: [
        { name: "Breakfast Plate", nameTr: "Kahvaltı Tabağı", desc: "Eggs, cheeses, olives, bread and jam.", descTr: "Yumurta, peynirler, zeytin, ekmek ve reçel.", price: 280 },
        { name: "Avocado Toast", nameTr: "Avokado Tost", desc: "Sourdough, avocado, egg, chilli.", descTr: "Ekşi mayalı ekmek, avokado, yumurta, pul biber.", price: 220 },
        { name: "Butter Croissant", nameTr: "Tereyağlı Kruvasan", desc: "Baked every morning.", descTr: "Her sabah taze pişer.", price: 90 },
        { name: "Toasted Cheese Sandwich", nameTr: "Kaşarlı Tost", desc: "Kaşar and white cheese, pressed.", descTr: "Kaşar ve beyaz peynirli bastırma tost.", price: 160 },
        { name: "Chicken Sandwich", nameTr: "Tavuklu Sandviç", desc: "Grilled chicken, greens, house sauce.", descTr: "Izgara tavuk, yeşillik, özel sos.", price: 210 },
        { name: "Koordinat Burger", desc: "Beef patty, cheddar, pickles, fries.", descTr: "Dana köfte, cheddar, turşu, patates.", price: 290 },
        { name: "Penne Arrabbiata", desc: "Tomato, garlic, chilli, parmesan.", descTr: "Domates, sarımsak, acı biber, parmesan.", price: 230 },
        { name: "Chicken Alfredo", nameTr: "Tavuklu Alfredo", desc: "Fettuccine, cream, chicken, mushrooms.", descTr: "Fettuccine, krema, tavuk, mantar.", price: 260 },
      ],
    },
    {
      id: "sweet",
      group: "sweet",
      title: "Sweet",
      titleTr: "Tatlılar",
      items: [
        { name: "San Sebastián Cheesecake", desc: "Burnt top, soft centre.", descTr: "Yanık yüzey, yumuşak iç.", price: 180 },
        { name: "Tiramisu", desc: "Mascarpone, espresso, cocoa.", descTr: "Mascarpone, espresso, kakao.", price: 170 },
        { name: "Brownie", desc: "Dark chocolate, served warm.", descTr: "Bitter çikolata, sıcak servis.", price: 140 },
        { name: "Belgian Waffle", nameTr: "Waffle", desc: "Fruit, chocolate sauce.", descTr: "Meyve, çikolata sosu.", price: 190 },
        { name: "Chocolate Chip Cookie", nameTr: "Damla Çikolatalı Kurabiye", desc: "Crisp edge, chewy middle.", descTr: "Çıtır kenar, yumuşak iç.", price: 70 },
      ],
    },
  ],
};
