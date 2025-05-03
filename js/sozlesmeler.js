// Modal elementlerini seçelim
const modal = document.getElementById("contractModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const closeBtn = document.querySelector(".close-modal");

// Sözleşme başlıkları
const contractTitles = {
  "mesafeli-satis": "Mesafeli Satış Sözleşmesi",
  "on-bilgilendirme": "Ön Bilgilendirme Formu",
  kvkk: "KVKK Aydınlatma Metni",
  gizlilik: "Gizlilik Politikası",
  kullanim: "Kullanım Koşulları",
  cerez: "Çerez Politikası",
  iade: "İade – İptal Politikası",
  reklam: "Reklam İzleme Politikası",
};

// Sözleşme içeriklerini göster
function showContract(contractType) {
  modalTitle.textContent = contractTitles[contractType];

  let content = "";

  switch (contractType) {
    case "mesafeli-satis":
      content = `
        <div style="padding: 20px;">
          <h3>MESAFELİ SATIŞ SÖZLEŞMESİ</h3>
          
          <div style="margin-bottom: 20px;">
            <p><strong>1. Taraflar</strong></p>
            <p><strong>Satıcı:</strong> Ömer Faruk Dursun</p>
            <p><strong>Şirket Türü:</strong> Şahıs Şirketi</p>
            <p><strong>Vergi Dairesi ve No:</strong> Aziziye Vergi Dairesi - 3180541451</p>
            <p><strong>Adres:</strong> Soğucak Mah. Soğucak KM. EVL. No 1 Yakutiye/Erzurum</p>
            <p><strong>Telefon:</strong> 05523944319</p>
            <p><strong>E-posta:</strong> info@ulaqdavetiye.com</p>
            <p><strong>Web Sitesi:</strong> www.ulaqdavetiye.com</p>
            <p><strong>Alıcı:</strong> Uygulama/web sitesi üzerinden sipariş oluşturan kullanıcı.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p><strong>2. Konu</strong></p>
            <p>Bu sözleşme, alıcının satıcıya ait uygulama ve/veya web sitesi üzerinden elektronik ortamda siparişini verdiği ürün ve hizmetlerin satışı ve teslimi ile ilgili hak ve yükümlülükleri belirler.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p><strong>3. Ürün ve Hizmetler</strong></p>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Fiziksel davetiye</li>
              <li>Artırılmış gerçeklik destekli davetiye</li>
              <li>Katlama, zarflama, isim yazdırma gibi ek hizmetler</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <p><strong>4. Sipariş ve Teslimat</strong></p>
            <p>Sipariş onayından sonra üretime alınır ve 3-5 iş günü içinde kargoya verilir. Teslimat süreci kargo firması sorumluluğundadır.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p><strong>5. Ödeme Bilgisi</strong></p>
            <p>Tüm ödemeler PayTR altyapısı ile tahsil edilir.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p><strong>6. Cayma Hakkı ve İptal</strong></p>
            <p>Kişiye özel ürünlerde üretime başlanmadan önce sipariş iptali mümkündür. Üretim başladıktan sonra cayma hakkı geçerli değildir.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p><strong>7. AR Teknolojisi Uyarısı</strong></p>
            <p>AR özellikleri sadece bu teknolojiyi destekleyen cihazlarda çalışır. Cihaz uyumsuzluklarından satıcı sorumlu değildir.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p><strong>8. Veri Gizliliği ve Paylaşımı</strong></p>
            <p>Kullanıcının sipariş sırasında oluşturduğu etkinlik bilgileri (etkinlik adı, tarih, konum, video), yalnızca davetiyeyi alan kişi(ler) tarafından görüntülenmek üzere sistemde saklanır ve paylaşılır. Üçüncü şahıslarla veya firmalarla bu veriler ticari amaçlarla paylaşılmaz.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p><strong>9. Uyuşmazlık</strong></p>
            <p>Uyuşmazlık durumunda Erzurum Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p><strong>10. Yürürlük</strong></p>
            <p>Bu sözleşme, alıcı tarafından elektronik ortamda onaylandığında yürürlüğe girer.</p>
          </div>
        </div>
      `;
      break;
    case "reklam":
      content = `
        <div style="padding: 20px;">
          <h3>REKLAM İZLEME POLİTİKASI</h3>
          
          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">1. Giriş</h4>
            <p>Bu politika, UlaQ Davetiye mobil uygulamasında sunulan reklamlı kullanım seçeneğine dair kullanıcıların bilgilendirilmesini amaçlamaktadır.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">2. Reklamlı Kullanım Seçeneği</h4>
            <p>UlaQ Davetiye uygulamasında sunulan bazı gelişmiş özellikler (örneğin; LCV, harita, artırılmış gerçeklik gibi), kullanıcıya ücretsiz olarak sunulabilir. Bu ücretsiz kullanım, uygulama içi video reklamların izlenmesi karşılığında sağlanmaktadır.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">3. Reklamların Sunulma Şekli</h4>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Reklamlar, ilgili özelliğe erişmeden önce görüntülenir.</li>
              <li>Reklamlar, üçüncü taraf reklam sağlayıcılar (örneğin Google AdMob) aracılığıyla sunulur.</li>
              <li>Reklam gösterimi kullanıcıdan izni olmadan kişisel verilerini toplamaz.</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">4. Reklamsız Kullanım Seçeneği</h4>
            <p>Kullanıcı dilerse ücretli seçenek ile reklamları kaldırabilir. Bu durumda, özellikleri reklamsız kullanma hakkı elde eder.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">5. Reklamlara Müdahale Edilmemesi</h4>
            <p>Reklamların manuel olarak engellenmesi, uygulamanın doğru çalışmasını engelleyebilir. Bu tür müdahaleler, kullanıcı hesabının kısıtlanmasına neden olabilir.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">6. Üçüncü Tarafların Sorumluluğu</h4>
            <p>Reklam içerikleri, reklam sağlayıcıların sorumluluğundadır. UlaQ Davetiye, üçüncü taraf reklamların içeriğinden sorumlu tutulamaz.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">7. Gizlilik ve Rıza</h4>
            <p>Reklam izlemeli kullanım, yalnızca kullanıcının açık rızası ile etkinleştirilir. Kullanıcı, bu özelliği kullanarak reklamların görüntülenmesini kabul eder.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">8. İletişim</h4>
            <p>Reklamlı kullanım veya kaldırma talebi ile ilgili her türlü iletişim için <a href="mailto:info@ulaqdavetiye.com">info@ulaqdavetiye.com</a> adresine başvurabilirsiniz.</p>
          </div>
        </div>
      `;
      break;
    case "kvkk":
      content = `
        <div style="padding: 20px;">
          <h3>KİŞİSEL VERİLERİN KORUNMASI AYDINLATMA METNİ</h3>
          
          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">1. Veri Sorumlusu</h4>
            <p>Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, veri sorumlusu sıfatıyla hareket eden Ömer Faruk Dursun tarafından hazırlanmıştır.</p>
            <p><strong>Firma Adı:</strong> Ömer Faruk Dursun</p>
            <p><strong>Adres:</strong> Soğucak Mah. Soğucak KM. EVL. No 1 Yakutiye/Erzurum</p>
            <p><strong>E-posta:</strong> <a href="mailto:info@ulaqdavetiye.com">info@ulaqdavetiye.com</a></p>
            <p><strong>Telefon:</strong> 05523944319</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">2. İşlenen Kişisel Veriler</h4>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Ad Soyad</li>
              <li>Telefon Numarası</li>
              <li>E-posta Adresi</li>
              <li>Etkinlik Bilgileri (ad, tarih, konum)</li>
              <li>Yüklenen Video İçerikleri</li>
              <li>Teslimat Adresi (varsa)</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">3. Verilerin İşlenme Amaçları</h4>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Siparişlerin hazırlanması ve teslimi</li>
              <li>LCV, harita ve diğer dijital özelliklerin çalışması</li>
              <li>Artırılmış Gerçeklik özelliklerinin çalıştırılması</li>
              <li>Müşteri hizmetleri ve destek süreçleri</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">4. Verilerin Aktarımı</h4>
            <p>Kişisel veriler, sadece aşağıdaki taraflarla sınırlı olarak paylaşılır:</p>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Kargo firmaları (ürün teslimi amacıyla)</li>
              <li>PayTR (ödeme altyapısı hizmeti)</li>
              <li>Yasal zorunluluklar durumunda resmi merciler</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">5. Etkinlik ve İçerik Paylaşımı</h4>
            <p>Kullanıcı tarafından oluşturulan etkinlik bilgileri (etkinlik adı, tarih, saat, konum, video içerikleri), yalnızca davetiyeyi alan kişilerle paylaşılır. QR kodu okutulduğunda bu bilgilere erişim sağlanır. Bu işlem sistemin doğal işleyişinin bir parçasıdır.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">6. Saklama Süresi</h4>
            <p>Veriler, kullanıcı hesabı aktif olduğu sürece ve yasal yükümlülükler gereği saklanır. Hesap silindiğinde veriler 7 gün içinde sistemden kaldırılır.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">7. Haklarınız (KVKK md. 11)</h4>
            <p>Kullanıcılar aşağıdaki haklara sahiptir:</p>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Kişisel verilerinin işlenip işlenmediğini öğrenme</li>
              <li>Verilerine erişme, düzeltme, silme talebinde bulunma</li>
              <li>İşlemeye itiraz etme, şikâyet başvurusunda bulunma</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">8. Başvuru Yöntemi</h4>
            <p>KVKK kapsamındaki tüm taleplerinizi <a href="mailto:info@ulaqdavetiye.com">info@ulaqdavetiye.com</a> adresine iletebilirsiniz.</p>
          </div>
        </div>
      `;
      break;
    case "gizlilik":
      content = `
        <div style="padding: 20px;">
          <h3>GİZLİLİK POLİTİKASI</h3>
          
          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">1. Giriş</h4>
            <p>Bu Gizlilik Politikası, UlaQ Davetiye mobil uygulamasını veya web sitesini kullanan tüm kullanıcıların gizliliğini korumak amacıyla hazırlanmıştır. Kişisel verilerinizin gizliliği bizim için önemlidir.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">2. Toplanan Veriler</h4>
            <p>Uygulama üzerinden aşağıdaki veriler toplanabilir:</p>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Ad Soyad</li>
              <li>Telefon Numarası</li>
              <li>E-posta Adresi</li>
              <li>Etkinlik Bilgileri (etkinlik adı, tarih, saat, konum)</li>
              <li>Yüklenen videolar ve fotoğraflar</li>
              <li>Teslimat adresi (fiziksel siparişlerde)</li>
              <li>Cihaz bilgileri (AR desteği kontrolü için)</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">3. Verilerin Kullanımı</h4>
            <p>Toplanan kişisel veriler aşağıdaki amaçlarla kullanılır:</p>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Sipariş sürecinin yürütülmesi</li>
              <li>Etkinlik bazlı davetiye oluşturulması</li>
              <li>Harita, LCV ve AR gibi uygulama içi özelliklerin çalıştırılması</li>
              <li>Kullanıcıya özel içeriklerin sunulması</li>
              <li>Bildirim gönderimi (isteğe bağlı)</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">4. Davetliyle Bilgi Paylaşımı</h4>
            <p>Kullanıcı tarafından oluşturulan etkinlik bilgileri (etkinlik adı, tarih, saat, konum, video vb.), davetiyeyi alan kullanıcılarla paylaşılır. QR kodu okutulduğunda bu bilgiler davetli tarafından görüntülenebilir.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">5. Üçüncü Taraflara Veri Aktarımı</h4>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Kargo firması (teslimat için)</li>
              <li>PayTR (ödeme işlemleri için)</li>
              <li>Yasal yükümlülük durumunda resmi kurumlarla sınırlı paylaşım yapılabilir.</li>
              <li>Hiçbir şekilde reklam firmalarıyla veri paylaşımı yapılmaz.</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">6. Güvenlik</h4>
            <p>Kişisel verileriniz şifrelenmiş ortamda saklanır. Hesabınıza sadece sizin erişiminiz vardır.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">7. Saklama Süresi</h4>
            <p>Kişisel veriler, hesabınız aktif olduğu sürece sistemde tutulur. Hesap silme talebinizle birlikte verileriniz 7 gün içinde kalıcı olarak silinir.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">8. Haklarınız</h4>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Verilerinize erişim talep etme</li>
              <li>Hatalı bilgilerin düzeltilmesini isteme</li>
              <li>Verilerin silinmesini talep etme</li>
              <li>İşlemeye itiraz etme</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">9. İletişim</h4>
            <p>Tüm gizlilik talepleriniz için <a href="mailto:info@ulaqdavetiye.com">info@ulaqdavetiye.com</a> adresine ulaşabilirsiniz.</p>
          </div>
        </div>
      `;
      break;
    case "iade":
      content = `
        <div style="padding: 20px;">
          <h3>İPTAL VE İADE POLİTİKASI</h3>
          
          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">1. Giriş</h4>
            <p>Bu politika, UlaQ Davetiye üzerinden yapılan tüm alışverişlerde geçerli olan iptal ve iade şartlarını açıklamak amacıyla hazırlanmıştır.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">2. Kişiye Özel Ürünler</h4>
            <p>UlaQ Davetiye uygulaması üzerinden verilen siparişlerin büyük çoğunluğu kişiye özel olarak üretilmektedir (örneğin; isimli davetiye, özel etkinlik bilgileri, video eklemeli davetiye vb.). Bu nedenle;</p>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Kişiye özel üretilen ürünlerde <strong>cayma hakkı bulunmamaktadır</strong>.</li>
              <li>İlgili yasal mevzuat gereği, tüketiciye özel hazırlanan ürünlerde iade kabul edilmez.</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">3. Siparişin İptali</h4>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Sipariş <strong>üretime alınmadan önce</strong> kullanıcı tarafından iptal edilebilir.</li>
              <li>Üretime alındıktan sonra iptal hakkı sona erer.</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">4. Hatalı Ürün ve Baskı Sorunları</h4>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Ürün kusurlu ya da hatalı basılmış ise, kullanıcı destek birimi ile iletişime geçerek inceleme başlatabilir.</li>
              <li>Hatalı üretim firmadan kaynaklanıyorsa, kullanıcıya yeniden üretim veya ücret iadesi sağlanır.</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">5. Ürün Teslimatı ve Kargo Süreci</h4>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Teslimat süreci kargo firmaları aracılığıyla yürütülür.</li>
              <li>Kargo sürecinde oluşabilecek gecikmelerden dolayı firmamız sorumluluk kabul etmemektedir.</li>
              <li>Kullanıcı, kargoyu teslim almadan önce kontrol etmeli, hasarlı teslimat durumunda tutanak tutturmalıdır.</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">6. Başvuru ve İletişim</h4>
            <p>İptal veya iade talepleri aşağıdaki kanallar üzerinden yapılabilir:</p>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li><a href="mailto:info@ulaqdavetiye.com">info@ulaqdavetiye.com</a> adresine e-posta göndererek,</li>
              <li>Uygulama içerisindeki "Siparişlerim" bölümünde yer alan destek alanını kullanarak.</li>
            </ul>
          </div>
        </div>
      `;
      break;
    case "on-bilgilendirme":
      content = `
        <div style="padding: 20px;">
          <h3>ÖN BİLGİLENDİRME FORMU</h3>
          
          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">Satıcı Bilgileri</h4>
            <p><strong>Firma Adı:</strong> Ömer Faruk Dursun</p>
            <p><strong>Şirket Türü:</strong> Şahıs Şirketi</p>
            <p><strong>Vergi Dairesi ve No:</strong> Aziziye Vergi Dairesi - 3180541451</p>
            <p><strong>Adres:</strong> Soğucak Mah. Soğucak KM. EVL. No 1 Yakutiye/Erzurum</p>
            <p><strong>Telefon:</strong> 05523944319</p>
            <p><strong>E-posta:</strong> <a href="mailto:info@ulaqdavetiye.com">info@ulaqdavetiye.com</a></p>
            <p><strong>Web Sitesi:</strong> <a href="https://www.ulaqdavetiye.com" target="_blank">www.ulaqdavetiye.com</a></p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">Ürün ve Hizmet Bilgileri</h4>
            <p><strong>Satılan Ürünler:</strong></p>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Fiziksel davetiye</li>
              <li>Artırılmış gerçeklik destekli davetiye</li>
            </ul>
            <p><strong>Ek Hizmetler:</strong></p>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Katlama</li>
              <li>Zarflama</li>
              <li>İsim yazdırma</li>
            </ul>
            <p><strong>Teslim Süresi:</strong> 3-5 iş günü içinde kargoya verilir.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">İade Politikası</h4>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Kişiye özel üretim olan ürünlerde cayma hakkı bulunmamaktadır.</li>
              <li>Ancak üretime başlanmadan önce sipariş iptal edilebilir.</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">Ödeme Bilgisi</h4>
            <p>PayTR ödeme altyapısı ile ödeme alınır.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">AR Uyarısı</h4>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Artırılmış gerçeklik teknolojisi sadece bu özelliği destekleyen cihazlarda çalışır.</li>
              <li>Uyumlu olmayan cihazlarda yaşanabilecek sorunlardan satıcı sorumlu değildir.</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">Veri Paylaşımı</h4>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Kullanıcı tarafından oluşturulan etkinlik bilgileri (etkinlik adı, tarih, konum ve video), yalnızca davetiyeyi alan kişilerle paylaşılır.</li>
              <li>Bu içerikler QR kod okutularak erişilebilecek şekilde sistemde saklanır.</li>
            </ul>
          </div>
        </div>
      `;
      break;
    case "cerez":
      content = `
        <div style="padding: 20px;">
          <h3>ÇEREZ POLİTİKASI</h3>
          
          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">1. Giriş</h4>
            <p>Bu çerez politikası, UlaQ Davetiye web sitesini ziyaret eden kullanıcıların çerezlerle ilgili bilgilendirilmesini amaçlar. Bu politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında hazırlanmıştır.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">2. Çerez Nedir?</h4>
            <p>Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınıza gönderilen ve bilgisayarınızda veya mobil cihazınızda depolanan küçük metin dosyalarıdır. Bu dosyalar, site tercihlerinizi hatırlamak ve site kullanımınızı analiz etmek için kullanılır.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">3. Kullanılan Çerez Türleri</h4>
            <p>Web sitemizde aşağıdaki türlerde çerezler kullanılabilir:</p>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li><strong>Zorunlu Çerezler:</strong> Web sitesinin düzgün çalışması için gereklidir.</li>
              <li><strong>İşlevsel Çerezler:</strong> Site tercihlerinizi hatırlar (dil tercihi gibi).</li>
              <li><strong>Analitik Çerezler:</strong> Web sitemizin performansını analiz etmek için kullanılır.</li>
              <li><strong>Reklam ve Hedefleme Çerezleri:</strong> (Sadece aktif edilirse) İlgi alanlarınıza uygun reklamlar sunmak için kullanılır.</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">4. Çerezlerin Kullanım Amaçları</h4>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Web sitesinin temel işlevlerini sağlamak</li>
              <li>Kullanıcı deneyimini iyileştirmek</li>
              <li>Ziyaretçi trafiğini analiz etmek</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">5. Çerezleri Kontrol Etme</h4>
            <p>Tarayıcınızın ayarlarını değiştirerek çerezleri kabul edebilir, reddedebilir veya silinmesini sağlayabilirsiniz. Ancak bazı çerezleri devre dışı bırakmak, sitenin bazı özelliklerinin düzgün çalışmamasına neden olabilir.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">6. Üçüncü Taraf Çerezler</h4>
            <p>Google Analytics gibi üçüncü taraf hizmet sağlayıcıların çerezleri, istatistiksel analiz amacıyla kullanılabilir. Bu çerezler doğrudan tarafımıza ait değildir.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">7. Değişiklikler</h4>
            <p>Bu politika, yasal düzenlemelere göre güncellenebilir. Güncel politika her zaman web sitemizde yayınlanır.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">8. İletişim</h4>
            <p>Her türlü çerez politikası talebi için <a href="mailto:info@ulaqdavetiye.com">info@ulaqdavetiye.com</a> adresine e-posta gönderebilirsiniz.</p>
          </div>
        </div>
      `;
      break;
    case "kullanim":
      content = `
        <div style="padding: 20px;">
          <h3>KULLANICI SÖZLEŞMESİ (ÜYELİK VE KULLANIM KOŞULLARI)</h3>
          
          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">1. Taraflar ve Kapsam</h4>
            <p>Bu sözleşme, UlaQ Davetiye mobil uygulamasına ve/veya web sitesine kayıt olan kullanıcı ("Kullanıcı") ile uygulamanın sahibi Ömer Faruk Dursun ("Firma") arasında yapılmaktadır.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">2. Üyelik Koşulları</h4>
            <p>Uygulamaya kayıt olan herkes, bu sözleşmede belirtilen kuralları kabul etmiş sayılır. Kullanıcı, kayıt esnasında doğru ve eksiksiz bilgi vermekle yükümlüdür.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">3. Hizmet Tanımı</h4>
            <p>UlaQ Davetiye, fiziksel ve artırılmış gerçeklik destekli davetiye hizmeti sunar. Kullanıcılar etkinlik bilgilerini girerek özel davetiye siparişi verebilir.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">4. Kullanım Kuralları</h4>
            <ul style="list-style-type: disc; margin-left: 20px;">
              <li>Kullanıcı, uygulamayı sadece yasal amaçlarla kullanacağını taahhüt eder.</li>
              <li>Başkasına ait bilgilerle sahte hesap açmak yasaktır.</li>
              <li>Uygulama üzerinden yüklenen içeriklerin (video, metin vb.) yasalara uygun olması gerekir.</li>
              <li>Kullanıcı, oluşturduğu içeriklerin davetli kişilerle paylaşılacağını kabul eder.</li>
            </ul>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">5. Hesap Güvenliği</h4>
            <p>Kullanıcı, kendi hesabının güvenliğinden sorumludur. Şifresini kimseyle paylaşmamalı, izinsiz erişim durumunda derhal firma ile iletişime geçmelidir.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">6. Hizmetin Kesintiye Uğraması</h4>
            <p>Firma, gerekli durumlarda (bakım, güncelleme, güvenlik vb.) hizmeti geçici olarak durdurabilir.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">7. Fikri Mülkiyet Hakları</h4>
            <p>Uygulama ve tüm içeriklerinin telif hakları firmaya aittir. İzinsiz kopyalama, çoğaltma ve ticari kullanıma konu edilmesi yasaktır.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">8. Sözleşmenin Feshi</h4>
            <p>Kullanıcı, dilediği zaman hesabını silebilir. Firma da, bu sözleşmeye aykırı davranış durumunda kullanıcı hesabını askıya alma veya silme hakkını saklı tutar.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">9. Yasal Dayanak ve Yetkili Mahkeme</h4>
            <p>Bu sözleşme, Türkiye Cumhuriyeti kanunlarına tabidir. Taraflar, doğabilecek uyuşmazlıklarda Erzurum Mahkemeleri ve İcra Daireleri'nin yetkili olduğunu kabul eder.</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h4 style="color: var(--purple-dark); margin-bottom: 15px;">10. Yürürlük</h4>
            <p>Kullanıcı, kayıt olurken bu sözleşmeyi okuyup onayladığını kabul eder. Sözleşme elektronik ortamda yürürlüğe girer.</p>
          </div>
        </div>
      `;
      break;
    default:
      content = `
        <div style="padding: 20px;">
            <h3>${contractTitles[contractType]} İçeriği</h3>
            <p>Bu bölümde ${contractTitles[contractType]} içeriği yer alacaktır.</p>
            <p>İçerik daha sonra eklenecektir.</p>
        </div>
      `;
  }

  modalContent.innerHTML = content;

  // Modalı göster
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Scroll'u kapat
}

// Modal kapatma fonksiyonları
closeBtn.onclick = function () {
  closeModal();
};

window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // Scroll'u geri aç
}

// Escape tuşu ile modalı kapatma
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});

// URL parametresi ile modal açma fonksiyonu
function openContractFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const contractType = urlParams.get("contract");
  if (contractType) {
    showContract(contractType);
  }
}

// Sayfa yüklendiğinde URL'i kontrol et
document.addEventListener("DOMContentLoaded", openContractFromURL);
