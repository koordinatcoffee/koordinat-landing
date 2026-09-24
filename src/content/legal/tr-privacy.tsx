import { Addr, CompanyTable, Email } from "../../components/layout/DocParts";
import { controllerIntro, controllerName } from "../../lib/site";
import type { LegalDoc } from "./types";

export const privacy: LegalDoc = {
  key: "privacy",
  name: "Gizlilik Politikası",
  lines: ["Gizlilik", <em key="e" className="text-amber italic">politikası.</em>],
  intro: <>Web sitesinde ve Koordinat Coffee uygulamasında hangi verileri, neden topladığımız ve nasıl koruduğumuz.</>,
  summary: (
    <>
      Web sitesi senin hakkında hiçbir veri toplamaz. Uygulama yalnızca hesabın, siparişlerin ve sadakat kartın için
      gerekenleri tutar — kart bilgilerini ise hiç görmeyiz.
    </>
  ),
  sections: [
    {
      id: "kapsam",
      title: "Kapsam",
      body: (
        <p>
          Bu Gizlilik Politikası; {controllerIntro("tr")} tarafından işletilen <strong>koordinatcoffee.com</strong> web
          sitesi (“Site”) ve <strong>Koordinat Coffee</strong> mobil uygulaması (“Uygulama”) kullanılırken kişisel
          verilerinin 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) ve ilgili mevzuata uygun olarak nasıl
          işlendiğini, saklandığını ve korunduğunu açıklar. İşletme, KVKK kapsamında veri sorumlusudur.
        </p>
      ),
    },
    {
      id: "veriler",
      title: "Topladığımız veriler",
      body: (
        <>
          <h3>Web sitesi</h3>
          <p>
            Site yalnızca bilgilendirme amaçlıdır; üyelik, form veya ödeme içermez. Sitede çerez, analitik veya reklam takip
            aracı kullanılmaz. Barındırma (hosting) sağlayıcımız, güvenlik ve hizmetin çalışması amacıyla IP adresi,
            tarayıcı bilgisi ve erişim zamanı gibi standart sunucu kayıtlarını kısa süreli tutabilir.
          </p>
          <h3>Mobil uygulama</h3>
          <ul>
            <li>
              <strong>Hesap bilgileri:</strong> Ad, soyad, e-posta adresi; isteğe bağlı olarak doğum tarihi, cinsiyet ve
              telefon numarası.
            </li>
            <li>
              <strong>Sipariş bilgileri:</strong> Sipariş edilen ürünler, tutar, sipariş tarihi ve saati, sipariş durumu,
              teslim bilgisi.
            </li>
            <li>
              <strong>Ödeme bilgileri:</strong> Ödeme işlem numarası, tutar, ödeme sonucu (başarılı/başarısız) ve iade
              kayıtları. <strong>Kart numarası, son kullanma tarihi ve CVV tarafımızca görülmez ve saklanmaz</strong>; bu
              bilgiler yalnızca ödeme kuruluşu PayTR tarafından işlenir.
            </li>
            <li>
              <strong>Sadakat kartı verileri:</strong> Papağan sadakat kartının çalışması için kahve alım kayıtların,
              damga/ödül sayaçların ve QR okutma işlemlerin.
            </li>
            <li>
              <strong>Fal / eğlence verileri:</strong> Fal türü tercihin, isteğe bağlı girdiğin ilişki durumu ve merak
              konusu ile üretilen fal sonuçları; puan, seviye, oyun skorları ve davet kodu kullanımları.
            </li>
            <li>
              <strong>Kullanıcı içeriği:</strong> Paylaştığın değerlendirme ve yorumlar.
            </li>
            <li>
              <strong>Teknik veriler:</strong> Oturum ve kimlik doğrulama bilgileri, cihaz bildirim jetonu (push token),
              uygulama içi etkileşim kayıtları ile hata/log kayıtları.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "fal",
      title: "Fal fotoğrafları cihazından çıkmaz",
      body: (
        <p>
          Kahve falı ve el falı için çektiğin veya galeriden seçtiğin fotoğraflar cihazından dışarı gönderilmez;
          sunucularımıza veya herhangi bir üçüncü tarafa yüklenmez ve saklanmaz. Fal yorumu, fotoğraf içeriği olmaksızın
          sınırlı metin bilgileri esas alınarak yapay zekâ ile otomatik olarak üretilir ve yalnızca eğlence amaçlıdır.
        </p>
      ),
    },
    {
      id: "amaclar",
      title: "Verileri kullanma amaçlarımız",
      body: (
        <p>
          Verilerini; hesabını oluşturmak ve yönetmek, siparişlerini almak, hazırlamak ve teslim etmek, ödemeleri ve
          iadeleri gerçekleştirmek, mali belge düzenlemek, sadakat programını yürütmek, talep ettiğin eğlence içeriklerini
          üretmek, hizmet güvenliğini sağlamak ve dolandırıcılığı önlemek, hizmet kalitesini iyileştirmek, bildirim
          göndermek ve yasal yükümlülüklerimizi yerine getirmek amacıyla işleriz. Hukuki sebepler ve ayrıntılar için{" "}
          <a href="/tr/kvkk/">KVKK Aydınlatma Metni</a>'ne bakabilirsin.
        </p>
      ),
    },
    {
      id: "paylasim",
      title: "Veri paylaşımı",
      body: (
        <>
          <p>
            Kişisel verilerin pazarlama amacıyla üçüncü kişilere satılmaz, kiralanmaz veya paylaşılmaz. Verilerin yalnızca
            hizmetin sunulması için zorunlu olduğu ölçüde şu taraflara aktarılır:
          </p>
          <ul>
            <li>
              <strong>PayTR Ödeme ve Elektronik Para Kuruluşu A.Ş.</strong> ve bankalar (ödeme, 3D Secure doğrulama, iade
              ve dolandırıcılık önleme),
            </li>
            <li>bulut veri tabanı ve sunucu altyapısı sağlayıcıları,</li>
            <li>yapay zekâ hizmet sağlayıcısı (yalnızca fal içeriği için sınırlı metin bilgileri),</li>
            <li>anlık bildirim altyapısı (cihaz bildirim jetonu),</li>
            <li>kimlik doğrulama sağlayıcıları (Google veya Apple ile giriş tercih edilirse),</li>
            <li>mali müşavir ve yetkili kamu kurumları (vergi mevzuatı ve yasal zorunluluklar kapsamında).</li>
          </ul>
          <p>
            Bazı altyapı sağlayıcılarının sunucuları yurt dışında bulunabilir. Yurt dışına aktarım, KVKK md. 9'daki
            güvencelere ve/veya açık rızana dayanılarak gerçekleştirilir.
          </p>
        </>
      ),
    },
    {
      id: "saklama",
      title: "Saklama süreleri",
      body: (
        <p>
          Hesap verilerin hesabın aktif olduğu sürece saklanır. Hesabını Uygulama ayarlarından dilediğin zaman
          silebilirsin. Sipariş, ödeme ve mali belge kayıtları, 213 sayılı Vergi Usul Kanunu ve 6102 sayılı Türk Ticaret
          Kanunu gereği <strong>10 yıl</strong> süreyle saklanır; bu kayıtlar hesabın silinse de yasal süre boyunca sınırlı
          erişimle muhafaza edilir. Diğer veriler, işleme amacı sona erdiğinde silinir, yok edilir veya anonim hâle
          getirilir.
        </p>
      ),
    },
    {
      id: "guvenlik",
      title: "Veri güvenliği",
      body: (
        <p>
          Verilerin iletim sırasında SSL/TLS ile şifrelenir. Sunucu tarafında erişim kontrolü, yetkilendirme, satır bazlı
          erişim kuralları ve kayıt altına alma dâhil idari ve teknik tedbirler uygulanır. Ödeme işlemleri PCI-DSS uyumlu
          PayTR altyapısında gerçekleşir.
        </p>
      ),
    },
    {
      id: "haklar",
      title: "Hakların",
      body: (
        <p>
          KVKK md. 11 kapsamındaki haklarını (bilgi talep etme, düzeltme, silme, itiraz vb.) kullanmak için <Email />{" "}
          adresine veya <Addr /> adresine başvurabilirsin. Başvurular en geç 30 gün içinde ücretsiz sonuçlandırılır.
        </p>
      ),
    },
    {
      id: "cocuklar",
      title: "Çocukların gizliliği",
      body: <p>Uygulama 18 yaş altındaki kişilere yönelik değildir ve bu yaş grubundan bilerek kişisel veri toplanmaz.</p>,
    },
    {
      id: "degisiklikler",
      title: "Değişiklikler",
      body: (
        <p>
          Bu politika güncellenebilir. Güncel sürüm bu sayfada yayımlandığı tarihte yürürlüğe girer; önemli değişikliklerde
          Uygulama içinde bilgilendirme yapılır.
        </p>
      ),
    },
    {
      id: "iletisim",
      title: "İletişim",
      body: (
        <p>
          {controllerName} — <Addr /> — <Email />
        </p>
      ),
    },
  ],
};

export const kvkk: LegalDoc = {
  key: "kvkk",
  name: "KVKK Aydınlatma Metni",
  lines: ["KVKK", <em key="e" className="text-amber italic">aydınlatma metni.</em>],
  intro: <>6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.</>,
  sections: [
    {
      id: "metin",
      title: "Bu metin hakkında",
      body: (
        <p>
          Bu Aydınlatma Metni; 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) md. 10 ve Aydınlatma
          Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ uyarınca, veri sorumlusu sıfatıyla{" "}
          {controllerName} tarafından hazırlanmıştır.
        </p>
      ),
    },
    { id: "sorumlu", title: "Veri sorumlusu", body: <CompanyTable /> },
    {
      id: "kategoriler",
      title: "İşlenen kişisel veri kategorileri",
      body: (
        <>
          <table>
            <thead>
              <tr>
                <th>Kategori</th>
                <th>Veriler</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Kimlik</td>
                <td>Ad, soyad; isteğe bağlı doğum tarihi ve cinsiyet</td>
              </tr>
              <tr>
                <td>İletişim</td>
                <td>E-posta adresi; isteğe bağlı telefon numarası</td>
              </tr>
              <tr>
                <td>Müşteri işlem</td>
                <td>
                  Sipariş içeriği, tutarı, tarihi ve durumu; teslim bilgisi; kahve alım kayıtları; damga, ödül ve puan
                  bilgileri; QR okutma işlemleri; davet kodu kullanımları
                </td>
              </tr>
              <tr>
                <td>Finans</td>
                <td>
                  Ödeme işlem numarası, tutar, ödeme ve iade sonucu, mali belge bilgileri.{" "}
                  <em>Kart numarası, son kullanma tarihi ve CVV İşletme tarafından işlenmez; yalnızca PayTR tarafından işlenir.</em>
                </td>
              </tr>
              <tr>
                <td>Eğlence (fal) verileri</td>
                <td>Fal türü tercihi, isteğe bağlı ilişki durumu ve merak konusu, üretilen fal sonuçları</td>
              </tr>
              <tr>
                <td>Kullanıcı içeriği</td>
                <td>Değerlendirme ve yorumlar, oyun skorları</td>
              </tr>
              <tr>
                <td>İşlem güvenliği</td>
                <td>
                  Oturum ve kimlik doğrulama bilgileri, cihaz bildirim jetonu, uygulama içi etkileşim kayıtları, hata/log
                  kayıtları, IP adresi
                </td>
              </tr>
            </tbody>
          </table>
          <p>Özel nitelikli kişisel veri (KVKK md. 6) işlenmesi hedeflenmez.</p>
        </>
      ),
    },
    {
      id: "amaclar",
      title: "İşleme amaçları ve hukuki sebepler",
      body: (
        <ul>
          <li>
            Hesabın oluşturulması, yönetilmesi ve kimlik doğrulama — <em>sözleşmenin kurulması ve ifası (md. 5/2-c)</em>
          </li>
          <li>
            Siparişlerin alınması, hazırlanması ve teslimi; ödeme ve iade işlemlerinin yürütülmesi —{" "}
            <em>sözleşmenin kurulması ve ifası (md. 5/2-c)</em>
          </li>
          <li>
            Mali belge düzenlenmesi, muhasebe ve vergi kayıtlarının tutulması — <em>hukuki yükümlülük (md. 5/2-ç)</em>
          </li>
          <li>
            Ödeme güvenliği ve dolandırıcılığın önlenmesi — <em>meşru menfaat (md. 5/2-f)</em> ve{" "}
            <em>hukuki yükümlülük (md. 5/2-ç)</em>
          </li>
          <li>
            Sadakat programının yürütülmesi — <em>sözleşmenin ifası (md. 5/2-c)</em>
          </li>
          <li>
            Fal içeriklerinin talebin üzerine üretilmesi — <em>açık rıza (md. 5/1)</em> ve{" "}
            <em>sözleşmenin ifası (md. 5/2-c)</em>
          </li>
          <li>
            Hizmet güvenliği, hata tespiti, hizmet kalitesinin ölçülmesi — <em>meşru menfaat (md. 5/2-f)</em>
          </li>
          <li>
            Sipariş durumu ve hesap işlemlerine ilişkin zorunlu bildirimler — <em>sözleşmenin ifası (md. 5/2-c)</em>
          </li>
          <li>
            Kampanya ve pazarlama bildirimleri — <em>açık rıza (md. 5/1)</em>
          </li>
          <li>
            Yetkili makam taleplerinin karşılanması ve hukuki uyuşmazlıklarda hakların korunması —{" "}
            <em>hukuki yükümlülük (md. 5/2-ç)</em>, <em>hakkın tesisi ve korunması (md. 5/2-e)</em>
          </li>
        </ul>
      ),
    },
    {
      id: "yontem",
      title: "Toplama yöntemi",
      body: (
        <p>
          Kişisel verilerin; Uygulama üzerinden hesap oluşturman, sipariş ve ödeme yapman, QR okutman ve diğer özellikleri
          kullanman sırasında elektronik ortamda, tamamen veya kısmen otomatik yollarla; ödeme sonuçları ise PayTR'dan
          elektronik bildirim yoluyla toplanır.
        </p>
      ),
    },
    {
      id: "aktarim",
      title: "Aktarım",
      body: (
        <>
          <p>Kişisel verilerin, yukarıdaki amaçlarla sınırlı olarak:</p>
          <ul>
            <li>
              ödeme ve iade işlemleri için <strong>PayTR Ödeme ve Elektronik Para Kuruluşu A.Ş.</strong>'ye ve ilgili
              bankalara,
            </li>
            <li>bulut veri tabanı, sunucu, bildirim ve kimlik doğrulama altyapısı sağlayıcılarına,</li>
            <li>yalnızca fal içeriği üretimi için sınırlı metin bilgileriyle yapay zekâ hizmet sağlayıcısına,</li>
            <li>mali müşavirimize ve yasal zorunluluk hâlinde yetkili kamu kurum ve kuruluşlarına</li>
          </ul>
          <p>
            aktarılabilir. Bazı altyapı sağlayıcılarının sunucuları yurt dışında bulunabilir; yurt dışına aktarım KVKK md.
            9'daki güvencelere ve/veya açık rızana dayanılarak gerçekleştirilir. Verilerin pazarlama amacıyla satılmaz veya
            paylaşılmaz.
          </p>
        </>
      ),
    },
    {
      id: "saklama",
      title: "Saklama süreleri",
      body: (
        <ul>
          <li>
            Hesap ve sadakat verileri: hesap aktif olduğu sürece; hesap silindiğinde makul teknik süre içinde silinir veya
            anonimleştirilir.
          </li>
          <li>Sipariş, ödeme ve mali belge kayıtları: Vergi Usul Kanunu ve Türk Ticaret Kanunu gereği 10 yıl.</li>
          <li>
            Mesafeli satış sözleşmesi ve ön bilgilendirme onay kayıtları: Mesafeli Sözleşmeler Yönetmeliği gereği en az 3
            yıl.
          </li>
          <li>Fal fotoğrafları: sunucularda hiç saklanmaz.</li>
        </ul>
      ),
    },
    {
      id: "haklar",
      title: "Hakların (KVKK md. 11)",
      body: (
        <p>
          Veri sorumlusuna başvurarak; kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme,
          işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme, aktarıldığı üçüncü kişileri bilme, eksik
          veya yanlış işlenmişse düzeltilmesini isteme, KVKK md. 7 çerçevesinde silinmesini veya yok edilmesini isteme, bu
          işlemlerin aktarılan üçüncü kişilere bildirilmesini isteme, münhasıran otomatik sistemlerle analiz sonucu aleyhine
          bir sonuca itiraz etme ve kanuna aykırı işleme nedeniyle zararın giderilmesini talep etme haklarına sahipsin.
        </p>
      ),
    },
    {
      id: "basvuru",
      title: "Başvuru usulü",
      body: (
        <p>
          Taleplerini, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ'e uygun olarak kimliğini tevsik edici
          bilgilerle birlikte <Email /> adresine veya <Addr /> adresine yazılı olarak iletebilirsin. Başvurun en geç 30 gün
          içinde ücretsiz sonuçlandırılır. Başvurunun reddi veya yanıtın yetersiz bulunması hâlinde Kişisel Verileri Koruma
          Kurulu'na şikâyet hakkın saklıdır.
        </p>
      ),
    },
  ],
};

export const cookies: LegalDoc = {
  key: "cookies",
  name: "Çerez Politikası",
  lines: ["Çerez", <em key="e" className="text-amber italic">politikası.</em>],
  intro: <>Kısa, çünkü söylenecek pek bir şey yok.</>,
  summary: (
    <>
      koordinatcoffee.com çerez kullanmaz. Analitik, reklam veya sosyal medya takip aracı bulunmaz — bu yüzden çerez onay
      penceresi de yoktur.
    </>
  ),
  sections: [
    {
      id: "nedir",
      title: "Çerez nedir?",
      body: (
        <p>
          Çerezler, ziyaret ettiğin web siteleri tarafından tarayıcına kaydedilen küçük metin dosyalarıdır. Oturum yönetimi,
          tercihlerin hatırlanması, istatistik veya reklam amacıyla kullanılabilirler.
        </p>
      ),
    },
    {
      id: "sitemiz",
      title: "Sitemizde kullanılan çerezler",
      body: (
        <>
          <p>
            Sitemiz bilgilendirme amaçlı sayfalardan oluşur ve <strong>hiçbir çerez yerleştirmez</strong>. Yazı tipleri,
            görseller ve videolar kendi sunucumuzdan yüklenir; Google Analytics, Meta Pixel veya benzeri üçüncü taraf takip
            araçları kullanılmaz.
          </p>
          <p>
            Sayfalar arası geçiş animasyonunu oynatmak için site, tarayıcının oturum deposuna (session storage) tek bir teknik
            kayıt yazar ve bir sonraki sayfa açılır açılmaz siler. Bu kayıt kişisel veri içermez; bize veya başka birine
            gönderilmez.
          </p>
        </>
      ),
    },
    {
      id: "ucuncu",
      title: "Üçüncü taraf bağlantılar",
      body: (
        <p>
          App Store, Google Play, Google Haritalar, Instagram veya Facebook bağlantılarına tıkladığında ilgili siteye
          yönlendirilirsin. Bu sitelerin çerez uygulamaları kendi politikalarına tabidir.
        </p>
      ),
    },
    {
      id: "uygulama",
      title: "Mobil uygulama",
      body: (
        <p>
          Koordinat Coffee mobil uygulaması tarayıcı çerezi kullanmaz; oturum bilgileri cihazının güvenli (şifreli) depolama
          alanında tutulur. Ödeme adımında açılan PayTR ödeme sayfası, işlem güvenliği için zorunlu çerezler kullanabilir; bu
          çerezler PayTR'ın politikalarına tabidir.
        </p>
      ),
    },
    {
      id: "degisiklik",
      title: "Değişiklikler",
      body: (
        <p>
          İleride sitede çerez kullanılmaya başlanırsa bu politika güncellenecek ve gerekli durumlarda onayın alınacaktır.
        </p>
      ),
    },
    {
      id: "iletisim",
      title: "İletişim",
      body: (
        <p>
          Soruların için: <Email />
        </p>
      ),
    },
  ],
};

export const terms: LegalDoc = {
  key: "terms",
  name: "Kullanım Koşulları",
  lines: ["Kullanım", <em key="e" className="text-amber italic">koşulları.</em>],
  intro: <>Koordinat Coffee uygulaması ve web sitesinin kullanım kuralları.</>,
  sections: [
    {
      id: "kabul",
      title: "Taraflar, konu ve kabul",
      body: (
        <p>
          İşbu Kullanım Koşulları; {controllerIntro("tr")} tarafından sunulan <strong>Koordinat Coffee</strong> mobil
          uygulaması (“Uygulama”) ve koordinatcoffee.com web sitesinin kullanımına ilişkin şartları düzenler. Uygulamayı
          indirerek, hesap oluşturarak veya kullanarak bu Koşulları kabul etmiş sayılırsın.
        </p>
      ),
    },
    {
      id: "hizmet",
      title: "Hizmetin kapsamı",
      body: (
        <p>
          Uygulama; menü görüntüleme, <strong>sipariş verme ve kartla ödeme</strong> (gel-al), dijital sadakat programı
          (Papağan), eğlence amaçlı fal modülü, mini oyunlar, seviye/puan sistemi, duyuru ve bildirim hizmetleri sunar.
          Uygulamanın indirilmesi ve kullanımı ücretsizdir; sipariş edilen ürünler menüde belirtilen fiyatlarla
          ücretlendirilir. İşletme, Uygulamanın kapsamını ve kampanya kurallarını değiştirme hakkını saklı tutar.
        </p>
      ),
    },
    {
      id: "siparis",
      title: "Sipariş ve ödeme",
      body: (
        <>
          <p>
            3.1. Uygulama üzerinden verilen siparişler; <a href="/tr/on-bilgilendirme-formu/">Ön Bilgilendirme Formu</a>,{" "}
            <a href="/tr/mesafeli-satis-sozlesmesi/">Mesafeli Satış Sözleşmesi</a>,{" "}
            <a href="/tr/iptal-ve-iade/">İptal, İade ve Cayma Koşulları</a> ve{" "}
            <a href="/tr/teslimat/">Teslimat (Gel-Al) Koşulları</a>'na tabidir. Bu metinler, sipariş öncesinde ödeme
            ekranında ayrıca onayına sunulur.
          </p>
          <p>
            3.2. Ödemeler kredi veya banka kartıyla, PayTR altyapısı üzerinden 3D Secure doğrulamasıyla alınır. Kart
            bilgilerin İşletme tarafından görülmez ve saklanmaz.
          </p>
          <p>
            3.3. Başkasına ait kartın izinsiz kullanılması, sahte sipariş veya ödeme sistemini kötüye kullanma girişimleri
            yasaktır; bu durumlarda sipariş iptal edilir, hesap kapatılabilir ve yasal yollara başvurulur.
          </p>
        </>
      ),
    },
    {
      id: "hesap",
      title: "Hesap, yaş sınırı ve güvenlik",
      body: (
        <p>
          Doğru ve sana ait bilgilerle hesap oluşturmalısın. Uygulama 18 yaş altındaki kişilere yönelik değildir; fal modülü
          yalnızca 18 yaş ve üzeri kullanıcılara yöneliktir. Her kullanıcı yalnızca bir hesap açabilir. Hesabının
          güvenliğinden sen sorumlusun.
        </p>
      ),
    },
    {
      id: "sadakat",
      title: "Sadakat programı (Papağan)",
      body: (
        <p>
          Damgalar, şubelerimizde gerçekleştirilen geçerli alışverişlerde kasadaki güncel QR kodun okutulmasıyla kazanılır.
          QR kodlar kısa süreli ve tek kullanımlıktır; sistemi yanıltma girişimleri yasaktır. Damga ve ödüller parasal değer
          taşımaz, nakde çevrilemez ve devredilemez. Kampanya kuralları İşletme tarafından belirlenir ve değiştirilebilir.
        </p>
      ),
    },
    {
      id: "fal",
      title: "Fal ve eğlence modülü",
      body: (
        <p>
          Fal içerikleri yapay zekâ ile otomatik üretilir ve yalnızca eğlence amaçlıdır; gerçeği yansıtma iddiası taşımaz,
          hiçbir şekilde tıbbi, hukuki, mali veya psikolojik tavsiye niteliğinde değildir. Fal fotoğrafları cihazından
          dışarı gönderilmez. Fal hakları ve kredileri parasal değer taşımaz ve iade edilmez.
        </p>
      ),
    },
    {
      id: "icerik",
      title: "Kullanıcı içeriği",
      body: (
        <p>
          Paylaştığın yorum ve değerlendirmelerin hukuka uygun olmasından sen sorumlusun. Uygunsuz içerikler bildirimsiz
          kaldırılabilir.
        </p>
      ),
    },
    {
      id: "yasak",
      title: "Yasaklı davranışlar",
      body: (
        <p>
          Uygulamayı hukuka aykırı amaçlarla kullanmak; güvenliği aşmaya çalışmak; tersine mühendislik; bot veya otomasyon
          kullanmak; QR, damga, ödül, sipariş, ödeme, davet veya oyun sistemlerini manipüle etmek; başkasının hesabını veya
          kartını izinsiz kullanmak yasaktır. İhlal hâlinde kazanımlar iptal edilir, hesap kapatılabilir ve yasal yollara
          başvurulabilir.
        </p>
      ),
    },
    {
      id: "fikri",
      title: "Fikri mülkiyet",
      body: (
        <p>
          Site ve Uygulamadaki marka, logo, tasarım, metin, görsel ve yazılımların hakları İşletmeye veya lisans verenlerine
          aittir; izinsiz kullanılamaz.
        </p>
      ),
    },
    {
      id: "sorumluluk",
      title: "Sorumluluğun sınırlandırılması",
      body: (
        <p>
          Uygulama “olduğu gibi” sunulur. İşletme; üçüncü taraf servis kesintileri, cihaz veya bağlantı kaynaklı sorunlar ile
          dolaylı zararlardan mevzuatın izin verdiği ölçüde sorumlu değildir. Tüketicinin korunmasına ilişkin emredici
          hükümler ile İşletmenin kast veya ağır kusurundan doğan sorumluluğu saklıdır.
        </p>
      ),
    },
    {
      id: "silme",
      title: "Hesap silme",
      body: (
        <p>
          Hesabını Uygulama ayarlarından dilediğin zaman silebilirsin. Hesap silindiğinde birikmiş damga, ödül, kredi ve
          puanlar sona erer. Tamamlanmış sipariş ve ödeme kayıtları yasal saklama süresi boyunca muhafaza edilir.
        </p>
      ),
    },
    {
      id: "hukuk",
      title: "Uygulanacak hukuk ve uyuşmazlıklar",
      body: (
        <p>
          Bu Koşullar Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda Hatay mahkemeleri ve icra daireleri yetkilidir.
          Tüketicilerin, parasal sınırlar dâhilinde Tüketici Hakem Heyetlerine ve Tüketici Mahkemelerine başvuru hakları
          saklıdır.
        </p>
      ),
    },
    {
      id: "degisiklik",
      title: "Değişiklikler ve iletişim",
      body: (
        <p>
          İşletme bu Koşulları güncelleyebilir; güncel sürüm bu sayfada yayımlandığı tarihte yürürlüğe girer. Soruların
          için: <Email />
        </p>
      ),
    },
  ],
};
