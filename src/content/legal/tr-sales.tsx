import { Branches, CompanyTable, Email, Hours, Reach } from "../../components/layout/DocParts";
import { branches, company, pickupHoldMinutes } from "../../lib/site";
import { PaymentMarks } from "../../components/ui/PaymentMarks";
import type { LegalDoc } from "./types";

export const preInformation: LegalDoc = {
  key: "preInformation",
  name: "Ön Bilgilendirme Formu",
  lines: ["Ön Bilgilendirme", <em key="e" className="text-amber italic">Formu.</em>],
  intro: (
    <>
      Koordinat Coffee uygulamasından verilen her siparişten önce okunur: ne satın aldığın, nasıl ödediğin, nasıl
      teslim aldığın ve hakların.
    </>
  ),
  sections: [
    {
      id: "amac",
      title: "Amaç",
      body: (
        <p>
          İşbu Ön Bilgilendirme Formu, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler
          Yönetmeliği'nin 5. maddesi uyarınca, <strong>Koordinat Coffee</strong> mobil uygulaması (“Uygulama”) üzerinden
          sipariş vermeden önce Alıcı'nın bilgilendirilmesi amacıyla hazırlanmıştır. Alıcı, siparişini onaylamadan önce
          bu formu okuyup onaylar.
        </p>
      ),
    },
    { id: "satici", title: "Satıcı bilgileri", body: <CompanyTable /> },
    {
      id: "alici",
      title: "Alıcı bilgileri",
      body: (
        <p>
          Alıcı; Uygulama'da hesap oluşturan ve sipariş veren kişidir. Alıcı'nın adı soyadı, e-posta adresi ve (girilmişse)
          telefon numarası, Uygulama'daki hesap bilgilerinden alınır ve sipariş özetinde gösterilir.
        </p>
      ),
    },
    {
      id: "urunler",
      title: "Sözleşme konusu ürünlerin temel nitelikleri",
      body: (
        <p>
          Sözleşme konusu ürünler; Uygulama'daki menüde yer alan, siparişe özel hazırlanan kahve ve diğer içecek/gıda
          ürünleridir. Ürünlerin adı, boyutu, seçilen ekstralar (süt tipi, şurup vb.), adedi ve birim fiyatı sipariş onay
          ekranında ve sipariş özetinde ayrıca gösterilir.
        </p>
      ),
    },
    {
      id: "fiyat",
      title: "Fiyat ve ödeme",
      body: (
        <ul>
          <li>
            Tüm fiyatlar Türk Lirası cinsinden ve <strong>KDV dahil</strong> satış fiyatıdır.
          </li>
          <li>
            Siparişin toplam bedeli, onay ekranında tüm vergiler dahil olarak gösterilir. Gel-al siparişlerde teslimat veya
            kargo ücreti alınmaz.
          </li>
          <li>
            Ödeme; kredi kartı veya banka kartı (Visa, Mastercard, Troy) ile, lisanslı ödeme kuruluşu{" "}
            <strong>PayTR Ödeme ve Elektronik Para Kuruluşu A.Ş.</strong> altyapısı üzerinden, 3D Secure doğrulamasıyla{" "}
            <strong>peşin</strong> olarak alınır.
          </li>
          <li>Kart bilgileri Satıcı tarafından görülmez ve saklanmaz; doğrudan PayTR'ın güvenli ödeme sayfasında işlenir.</li>
        </ul>
      ),
    },
    {
      id: "teslimat",
      title: "Teslimat",
      body: (
        <ul>
          <li>
            Siparişler, sipariş özetinde gösterilen Koordinat şubesinde <strong>şubeden teslim (gel-al)</strong> usulüyle
            teslim edilir: <Branches />. Adrese teslimat veya kargo yapılmaz.
          </li>
          <li>
            Sipariş, ödemenin onaylanmasının ardından hazırlanmaya başlanır ve hazır olduğunda Uygulama üzerinden
            bildirilir. Tahmini hazırlama süresi sipariş ekranında gösterilir.
          </li>
          <li>
            Hazır siparişler, hazır bildiriminden itibaren <strong>{pickupHoldMinutes} dakika</strong> süreyle şubede
            bekletilir. Ayrıntılar: <a href="/tr/teslimat/">Teslimat (Gel-Al) Koşulları</a>.
          </li>
        </ul>
      ),
    },
    {
      id: "cayma",
      title: "Cayma hakkı",
      body: (
        <>
          <p>
            Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesinin 1. fıkrasının (c) bendi uyarınca,{" "}
            <strong>
              çabuk bozulabilen veya son kullanma tarihi geçebilecek malların teslimine ilişkin sözleşmelerde cayma hakkı
              kullanılamaz.
            </strong>{" "}
            Siparişe özel hazırlanan içecek ve gıda ürünleri bu kapsamdadır.
          </p>
          <p>
            Bununla birlikte Alıcı, sipariş <strong>hazırlanmaya başlanmadan önce</strong> Uygulama üzerinden veya Satıcı
            ile iletişime geçerek siparişini iptal edebilir ve ödediği bedelin tamamını geri alır. Hatalı, eksik veya ayıplı
            ürün teslimi hâlinde Alıcı'nın 6502 sayılı Kanun'dan doğan hakları saklıdır. Ayrıntılar:{" "}
            <a href="/tr/iptal-ve-iade/">İptal, İade ve Cayma Koşulları</a>.
          </p>
        </>
      ),
    },
    {
      id: "sikayet",
      title: "Şikâyet ve itiraz yolları",
      body: (
        <p>
          Alıcı, şikâyetlerini Satıcı'nın yukarıdaki iletişim bilgileri üzerinden iletebilir. Uyuşmazlıklarda, Ticaret
          Bakanlığınca her yıl ilan edilen parasal sınırlar dâhilinde Alıcı'nın yerleşim yerindeki veya işlemin yapıldığı
          yerdeki Tüketici Hakem Heyetleri ile Tüketici Mahkemeleri yetkilidir.
        </p>
      ),
    },
    {
      id: "onay",
      title: "Onay",
      body: (
        <p>
          Alıcı, siparişini tamamlamadan önce Uygulama'daki ödeme ekranında bu Ön Bilgilendirme Formu'nu ve{" "}
          <a href="/tr/mesafeli-satis-sozlesmesi/">Mesafeli Satış Sözleşmesi</a>'ni okuduğunu, anladığını ve elektronik
          ortamda onayladığını kabul eder. Sipariş, ödeme yükümlülüğü doğurur. Form ve sözleşmenin bir örneği sipariş
          kaydıyla birlikte saklanır ve talep hâlinde Alıcı'ya e-posta ile iletilir.
        </p>
      ),
    },
  ],
};

export const distanceSales: LegalDoc = {
  key: "distanceSales",
  name: "Mesafeli Satış Sözleşmesi",
  lines: ["Mesafeli Satış", <em key="e" className="text-amber italic">Sözleşmesi.</em>],
  intro: <>Koordinat Coffee uygulamasından verilen her sipariş için seninle {company.tradeName} arasındaki sözleşme.</>,
  sections: [
    {
      id: "taraflar",
      title: "Madde 1 — Taraflar",
      body: (
        <>
          <h3>1.1. Satıcı</h3>
          <CompanyTable />
          <h3>1.2. Alıcı</h3>
          <p>
            Koordinat Coffee mobil uygulamasında (“Uygulama”) hesap oluşturarak sipariş veren kişidir. Alıcı'nın ad-soyad,
            e-posta ve (girilmişse) telefon bilgileri, sipariş anında Uygulama'daki hesap bilgilerinden alınır.
          </p>
        </>
      ),
    },
    {
      id: "konu",
      title: "Madde 2 — Konu",
      body: (
        <p>
          İşbu sözleşmenin konusu; Alıcı'nın Uygulama üzerinden elektronik ortamda sipariş verdiği, nitelikleri ve satış
          fiyatı sipariş ekranında belirtilen ürünlerin satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin
          Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve
          yükümlülüklerinin belirlenmesidir.
        </p>
      ),
    },
    {
      id: "bedel",
      title: "Madde 3 — Ürün, bedel ve ödeme",
      body: (
        <>
          <p>
            3.1. Ürünlerin cinsi, adedi, seçilen ekstralar, birim fiyatı ve KDV dahil toplam satış bedeli sipariş onay
            ekranında ve sipariş özetinde yer alır; bu bilgiler sözleşmenin ayrılmaz parçasıdır.
          </p>
          <p>3.2. Fiyatlar Türk Lirası cinsinden ve KDV dahildir. Gel-al siparişlerde ek teslimat ücreti alınmaz.</p>
          <p>
            3.3. Ödeme, kredi kartı veya banka kartı ile PayTR Ödeme ve Elektronik Para Kuruluşu A.Ş. altyapısı üzerinden,
            3D Secure doğrulamasıyla peşin olarak yapılır. Satıcı, Alıcı'nın kart bilgilerini görmez ve saklamaz.
          </p>
          <p>
            3.4. Siparişe ilişkin mali belge (fiş veya e-Arşiv fatura), mevzuata uygun şekilde teslim sırasında verilir veya
            Alıcı'nın e-posta adresine iletilir.
          </p>
        </>
      ),
    },
    {
      id: "teslimat",
      title: "Madde 4 — Teslimat",
      body: (
        <>
          <p>
            4.1. Ürünler, sipariş özetinde gösterilen Satıcı şubesinde Alıcı'ya teslim edilir (gel-al): <Branches />. Adrese
            teslimat veya kargo yapılmaz.
          </p>
          <p>
            4.2. Sipariş, ödemenin onaylanmasıyla hazırlanmaya başlanır. Sipariş hazır olduğunda Alıcı Uygulama üzerinden
            bilgilendirilir. Teslim, Uygulama'da görünen sipariş numarasının ibrazıyla yapılır.
          </p>
          <p>
            4.3. Hazır siparişler, hazır bildiriminden itibaren {pickupHoldMinutes} dakika süreyle şubede bekletilir.
            Ürünlerin çabuk bozulabilir niteliği gereği, bu süre içinde teslim alınmayan siparişlerde ürün tazeliği garanti
            edilemez; bu durumda bedel iadesi yapılmaz. Mücbir sebep hâlleri ve Satıcı kaynaklı gecikmeler saklıdır.
          </p>
          <p>
            4.4. Satıcı, siparişin herhangi bir nedenle (stok tükenmesi, teknik arıza, şubenin kapalı olması vb.)
            hazırlanamayacağını tespit ederse Alıcı'yı derhal bilgilendirir ve tahsil edilen bedelin tamamını en geç 14 gün
            içinde Alıcı'nın ödeme yaptığı karta iade eder.
          </p>
        </>
      ),
    },
    {
      id: "cayma",
      title: "Madde 5 — Cayma hakkı",
      body: (
        <>
          <p>
            5.1. Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesinin 1. fıkrasının (c) bendi uyarınca, çabuk bozulabilen
            veya son kullanma tarihi geçebilecek malların teslimine ilişkin sözleşmelerde cayma hakkı kullanılamaz.
            Sözleşme konusu ürünler siparişe özel hazırlanan içecek ve gıda ürünleri olduğundan bu istisna kapsamındadır.
          </p>
          <p>
            5.2. Buna karşın Alıcı, siparişi <strong>hazırlanmaya başlanmadan önce</strong> Uygulama üzerinden veya
            Satıcı'nın iletişim kanalları aracılığıyla iptal edebilir. Bu durumda tahsil edilen bedelin tamamı, iptal
            tarihinden itibaren en geç 14 gün içinde Alıcı'nın ödeme yaptığı karta iade edilir.
          </p>
        </>
      ),
    },
    {
      id: "ayipli",
      title: "Madde 6 — Ayıplı veya hatalı ürün",
      body: (
        <>
          <p>
            6.1. Teslim edilen ürünün sipariş edilenden farklı, eksik veya ayıplı olması hâlinde Alıcı durumu teslim anında
            şube görevlisine ya da en kısa sürede Satıcı'nın iletişim kanallarına bildirir.
          </p>
          <p>
            6.2. Alıcı, 6502 sayılı Kanun'un 11. maddesi uyarınca; ürünün ayıpsız misliyle değiştirilmesini, bedel iadesini
            veya ayıp oranında bedel indirimini talep etme haklarına sahiptir. Bedel iadeleri Alıcı'nın ödeme yaptığı karta
            yapılır.
          </p>
        </>
      ),
    },
    {
      id: "iade",
      title: "Madde 7 — İade usulü",
      body: (
        <p>
          İadeler, ödemenin yapıldığı karta PayTR altyapısı üzerinden yapılır. İade tutarının kart hesabına yansıma süresi,
          Alıcı'nın bankasına bağlı olarak değişebilir (genellikle 2–10 iş günü). Taksitli işlem yapılmadığından iade tek
          seferde gerçekleşir.
        </p>
      ),
    },
    {
      id: "genel",
      title: "Madde 8 — Genel hükümler",
      body: (
        <>
          <p>
            8.1. Alıcı, sipariş öncesinde Ön Bilgilendirme Formu'nu okuduğunu, ürünlerin temel nitelikleri, satış fiyatı,
            ödeme ve teslimat koşulları ile cayma hakkı istisnası hakkında bilgi sahibi olduğunu ve bunları elektronik
            ortamda onayladığını kabul eder.
          </p>
          <p>
            8.2. Ödemenin, kartın hamili dışındaki bir kişi tarafından haksız veya hukuka aykırı şekilde kullanıldığının
            tespiti ya da bankanın ödemeyi onaylamaması hâlinde Satıcı siparişi hazırlamakla yükümlü değildir.
          </p>
          <p>
            8.3. Satıcı, Uygulama'daki menü, fiyat ve kampanyaları değiştirme hakkını saklı tutar. Onaylanmış siparişler,
            onay anındaki fiyat üzerinden tamamlanır.
          </p>
        </>
      ),
    },
    {
      id: "veri",
      title: "Madde 9 — Kişisel veriler",
      body: (
        <p>
          Alıcı'nın kişisel verileri, <a href="/tr/kvkk/">KVKK Aydınlatma Metni</a> ve{" "}
          <a href="/tr/gizlilik/">Gizlilik Politikası</a> kapsamında işlenir.
        </p>
      ),
    },
    {
      id: "uyusmazlik",
      title: "Madde 10 — Uyuşmazlıkların çözümü",
      body: (
        <p>
          İşbu sözleşmeden doğan uyuşmazlıklarda, Ticaret Bakanlığınca her yıl ilan edilen parasal sınırlar dâhilinde
          Alıcı'nın yerleşim yerindeki veya işlemin yapıldığı yerdeki Tüketici Hakem Heyetleri, bu sınırları aşan
          uyuşmazlıklarda Tüketici Mahkemeleri yetkilidir.
        </p>
      ),
    },
    {
      id: "yururluk",
      title: "Madde 11 — Yürürlük",
      body: (
        <p>
          Alıcı, siparişi onaylayıp ödemeyi tamamladığı anda işbu sözleşmenin tüm koşullarını kabul etmiş sayılır. Sözleşme,
          sipariş tarihinde elektronik ortamda kurulur ve bir örneği sipariş kaydıyla birlikte saklanır; talep hâlinde
          Alıcı'ya e-posta ile iletilir.
        </p>
      ),
    },
  ],
};

export const cancellation: LegalDoc = {
  key: "cancellation",
  name: "İptal, İade ve Cayma",
  lines: ["İptal, iade", <em key="e" className="text-amber italic">ve cayma.</em>],
  intro: <>Fikrini değiştirirsen ya da siparişinde bir sorun olursa ne olur?</>,
  summary: (
    <>
      Hazırlanmaya başlamadan iptal edersen ücretin tamamını karta iade ediyoruz. Hazırlanmaya başlanan siparişler taze
      gıda olduğu için iptal edilemez. Yanlış, eksik veya kusurlu ürün teslim edildiyse yeniden hazırlıyor ya da ücretini
      iade ediyoruz.
    </>
  ),
  sections: [
    {
      id: "iptal",
      title: "Sipariş iptali",
      body: (
        <ul>
          <li>
            <strong>Hazırlanmaya başlanmadan önce:</strong> Siparişini Uygulama'daki sipariş ekranından veya bizimle
            iletişime geçerek iptal edebilirsin. Ödediğin tutarın tamamı iade edilir.
          </li>
          <li>
            <strong>Hazırlanmaya başlandıktan sonra:</strong> Ürünler siparişe özel ve taze hazırlandığından iptal kabul
            edilmez.
          </li>
          <li>
            <strong>Satıcı kaynaklı iptal:</strong> Ürünün tükenmesi, teknik arıza veya şubenin kapalı olması gibi
            nedenlerle siparişini hazırlayamazsak seni bilgilendirir ve ücretin tamamını iade ederiz.
          </li>
        </ul>
      ),
    },
    {
      id: "cayma",
      title: "Cayma hakkı",
      body: (
        <p>
          Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesinin 1. fıkrasının (c) bendi uyarınca, çabuk bozulabilen veya son
          kullanma tarihi geçebilecek malların teslimine ilişkin sözleşmelerde <strong>cayma hakkı kullanılamaz</strong>.
          Siparişe özel hazırlanan içecek ve gıda ürünlerimiz bu kapsamdadır. Yukarıdaki iptal hakkı, bu yasal istisnaya
          rağmen tarafımızca sunulan bir kolaylıktır.
        </p>
      ),
    },
    {
      id: "ayipli",
      title: "Hatalı, eksik veya ayıplı ürün",
      body: (
        <>
          <p>
            Teslim aldığın ürün sipariş ettiğinden farklıysa, eksikse veya kusurluysa lütfen durumu teslim anında şube
            görevlimize ya da en kısa sürede <Email /> adresine bildir. 6502 sayılı Tüketicinin Korunması Hakkında Kanun'un
            11. maddesi kapsamında tercihine göre:
          </p>
          <ul>
            <li>ürünü ücretsiz olarak yeniden hazırlarız, veya</li>
            <li>ürün bedelini ödeme yaptığın karta iade ederiz, veya</li>
            <li>ayıp oranında indirim yaparız.</li>
          </ul>
        </>
      ),
    },
    {
      id: "teslim-alinmayan",
      title: "Teslim alınmayan siparişler",
      body: (
        <p>
          Hazır siparişler, hazır bildiriminden itibaren {pickupHoldMinutes} dakika süreyle şubede bekletilir. Bu süre içinde
          teslim alınmayan siparişlerde ürünlerin çabuk bozulabilir niteliği gereği bedel iadesi yapılmaz. Gecikeceğini
          önceden bildirirsen siparişini elimizden geldiğince bekletiriz.
        </p>
      ),
    },
    {
      id: "sureler",
      title: "İade süreci ve süreleri",
      body: (
        <>
          <table>
            <thead>
              <tr>
                <th>Adım</th>
                <th>Süre</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>İade talebinin değerlendirilmesi</td>
                <td>En geç 2 iş günü</td>
              </tr>
              <tr>
                <td>İadenin tarafımızca başlatılması</td>
                <td>Onaydan sonra en geç 14 gün (genellikle aynı gün)</td>
              </tr>
              <tr>
                <td>Tutarın kartına yansıması</td>
                <td>Bankana bağlı olarak genellikle 2–10 iş günü</td>
              </tr>
            </tbody>
          </table>
          <p>
            İadeler yalnızca ödemenin yapıldığı karta, PayTR ödeme altyapısı üzerinden yapılır; nakit iade veya başka bir
            hesaba iade yapılmaz. Banka kartı ile yapılan ödemelerde iade tutarı hesabına, kredi kartı ile yapılan
            ödemelerde kart limitine yansır.
          </p>
        </>
      ),
    },
    {
      id: "iletisim",
      title: "İletişim",
      body: (
        <p>
          İptal ve iade talepleri için: <Reach />. Lütfen talebine sipariş numaranı ekle.
        </p>
      ),
    },
  ],
};

export const pickup: LegalDoc = {
  key: "pickup",
  name: "Teslimat (Gel-Al) Koşulları",
  lines: ["Teslimat", <em key="e" className="text-amber italic">(gel-al).</em>],
  intro: <>Uygulamadan verilen her sipariş tezgahtan teslim alınır — işte nasıl çalıştığı.</>,
  summary: <>Uygulamadan sipariş ver, kartla öde, hazır olunca bildirim al, sipariş numaranı tezgahta göster.</>,
  sections: [
    {
      id: "sekil",
      title: "Teslimat şekli",
      body: (
        <p>
          Koordinat Coffee uygulaması üzerinden verilen tüm siparişler, Samandağ'daki iki şubemizden birinde{" "}
          <strong>şubeden teslim (gel-al)</strong> usulüyle teslim edilir. Kargo, kurye veya adrese teslimat hizmeti{" "}
          <strong>verilmemektedir</strong>.
        </p>
      ),
    },
    {
      id: "noktalar",
      title: "Teslimat noktaları",
      body: (
        <>
          <table>
            <tbody>
              {branches.map((b) => (
                <tr key={b.id}>
                  <th scope="row">
                    Şube {b.n} · {b.area}
                  </th>
                  <td>
                    {b.name}
                    <br />
                    {b.full}
                    <br />
                    <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer">
                      Google Haritalar'da aç
                    </a>
                  </td>
                </tr>
              ))}
              <tr>
                <th scope="row">Çalışma saatleri</th>
                <td>
                  <Hours />
                </td>
              </tr>
              <tr>
                <th scope="row">İletişim</th>
                <td>
                  <Reach />
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Siparişler yalnızca şubenin açık olduğu saatlerde alınır. Siparişini hazırlayan şube, Uygulama'daki sipariş
            özetinde gösterilir.
          </p>
        </>
      ),
    },
    {
      id: "hazirlama",
      title: "Hazırlama süresi",
      body: (
        <p>
          Siparişin, ödemenin bankan tarafından onaylanmasının ardından hazırlanmaya başlanır. Tahmini hazırlama süresi
          sipariş sırasında Uygulama'da gösterilir; yoğunluğa göre genellikle 5–15 dakikadır. Siparişin hazır olduğunda
          Uygulama üzerinden bildirim alırsın.
        </p>
      ),
    },
    {
      id: "teslim-alma",
      title: "Teslim alma",
      body: (
        <ul>
          <li>
            Siparişini, Uygulama'da görünen <strong>sipariş numarasını</strong> şube görevlisine göstererek teslim alırsın.
          </li>
          <li>Siparişi başka biri teslim alacaksa sipariş numarasını o kişiyle paylaşman yeterlidir.</li>
          <li>
            Hazır siparişler, hazır bildiriminden itibaren <strong>{pickupHoldMinutes} dakika</strong> süreyle şubede
            bekletilir.
          </li>
        </ul>
      ),
    },
    {
      id: "ucret",
      title: "Teslimat ücreti",
      body: (
        <p>
          Gel-al siparişlerde herhangi bir teslimat veya hizmet ücreti alınmaz. Ödediğin tutar, menüdeki KDV dahil ürün
          fiyatlarının toplamıdır.
        </p>
      ),
    },
    {
      id: "geciken",
      title: "Teslim alınmayan veya geciken siparişler",
      body: (
        <p>
          Teslim alınmayan siparişler ve iade koşulları için{" "}
          <a href="/tr/iptal-ve-iade/">İptal, İade ve Cayma Koşulları</a> sayfasına bakabilirsin.
        </p>
      ),
    },
  ],
};

export const payment: LegalDoc = {
  key: "payment",
  name: "Ödeme ve Güvenlik",
  lines: ["Ödeme", <em key="e" className="text-amber italic">ve güvenlik.</em>],
  intro: <>Koordinat Coffee uygulamasında kartla ödeme nasıl çalışır, kart bilgilerin nasıl korunur?</>,
  summary: <>Kartını görmeyiz ve saklamayız. Ödemeler PayTR altyapısında, her seferinde bankandan gelen 3D Secure koduyla.</>,
  sections: [
    {
      id: "yontemler",
      title: "Ödeme yöntemleri",
      body: (
        <>
          <p>Koordinat Coffee uygulamasında siparişlerini şu kartlarla ödeyebilirsin:</p>
          <ul>
            <li>Kredi kartları (Visa, Mastercard, Troy)</li>
            <li>Banka kartları (Visa, Mastercard, Troy; internet alışverişine açık olmalıdır)</li>
          </ul>
          <p>
            Ödemeler Türk Lirası cinsinden ve <strong>peşin (tek çekim)</strong> olarak alınır. Taksit uygulanmaz.
          </p>
          <PaymentMarks className="pt-2" label="Kabul edilen kartlar ve ödeme altyapısı" />
        </>
      ),
    },
    {
      id: "paytr",
      title: "Ödeme altyapısı: PayTR",
      body: (
        <p>
          Ödemelerin, Türkiye Cumhuriyet Merkez Bankası lisanslı ödeme ve elektronik para kuruluşu{" "}
          <strong>PayTR Ödeme ve Elektronik Para Kuruluşu A.Ş.</strong> altyapısı üzerinden alınır. Ödeme adımında Uygulama
          içinde PayTR'ın güvenli ödeme sayfası açılır ve kart bilgilerini doğrudan bu sayfaya girersin.
        </p>
      ),
    },
    {
      id: "koruma",
      title: "Kart bilgilerin nasıl korunur?",
      body: (
        <ul>
          <li>
            <strong>Kart bilgilerini görmeyiz ve saklamayız.</strong> Kart numarası, son kullanma tarihi ve güvenlik kodu
            (CVV) yalnızca PayTR tarafından, PCI-DSS güvenlik standartlarına uygun olarak işlenir.
          </li>
          <li>
            <strong>3D Secure:</strong> Her ödemede bankanın gönderdiği tek kullanımlık doğrulama kodu (SMS) ile kimliğin
            doğrulanır.
          </li>
          <li>
            <strong>Şifreli bağlantı:</strong> Uygulama ile sunucularımız ve ödeme sayfası arasındaki tüm iletişim SSL/TLS
            ile şifrelenir.
          </li>
          <li>
            <strong>Sunucu taraflı doğrulama:</strong> Bir siparişin ödendiği, yalnızca PayTR'ın sunucumuza ilettiği
            imzalı ödeme bildirimi doğrulandıktan sonra kabul edilir.
          </li>
        </ul>
      ),
    },
    {
      id: "sonrasi",
      title: "Ödeme sonrası",
      body: (
        <p>
          Ödemen onaylandığında siparişin hazırlanmaya başlanır ve sipariş özeti Uygulama'da görüntülenir. Ödeme
          onaylanmazsa kartından tutar çekilmez; sipariş oluşmaz. Nadiren bankanın provizyonu kısa süreliğine görünebilir;
          onaylanmayan işlemlerin provizyonu bankan tarafından otomatik olarak kaldırılır.
        </p>
      ),
    },
    {
      id: "iade",
      title: "İade",
      body: (
        <p>
          İade koşulları için <a href="/tr/iptal-ve-iade/">İptal, İade ve Cayma Koşulları</a> sayfasına bakabilirsin.
          İadeler yalnızca ödemenin yapıldığı karta yapılır.
        </p>
      ),
    },
    {
      id: "supheli",
      title: "Şüpheli işlem bildirimi",
      body: (
        <p>
          Kartınla bilgin dışında işlem yapıldığını düşünüyorsan derhal bankanla ve <Email /> adresinden bizimle iletişime
          geç.
        </p>
      ),
    },
  ],
};
