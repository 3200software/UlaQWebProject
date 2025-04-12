// Modal işlevselliği
const modal = document.getElementById("detailsModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.querySelector(".close-modal");

// Tüm feature cardlarını seçiyoruz
const featureCards = document.querySelectorAll(".feature-card");

// IntersectionObserver ile scroll animasyonları
const observeElements = (elements) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
};

// Sayfa yüklendiğinde animasyon ve observer'ı başlat
document.addEventListener("DOMContentLoaded", () => {
  // Animasyonlar için CSS class'larını resetleme
  featureCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.animationDelay = `${index * 0.2}s`;
    card.classList.add("animate-on-scroll");
  });

  observeElements(featureCards);
});

function showDetails(type) {
  const modal = document.getElementById("detailsModal");
  const modalContent = document.getElementById("modalContent");
  let content = "";

  // Modal açıldığında body'e modal-open class'ı ekle
  document.body.classList.add("modal-open");

  switch (type) {
    case "order":
      content = `
        <h2>📝 UlaQ Davetiye ile Adım Adım Sipariş Oluşturma</h2>
        <p style="font-style: italic; margin-bottom: 20px;">Sanki yanındayız, birlikte özelleştiriyoruz gibi anlatıyoruz.</p>

        <div style="margin-bottom: 30px;">
          <h3>1. 🎨 Davetiyeni Seç</h3>
          <p>Beğendiğin davetiyeyi mağazamızdan seç ve sepetine ekle.<br>
          Ardından "Özelleştir" butonuna tıklayarak sihirli davetiyeni yaratmaya başla.</p>
          <p style="font-style: italic; color: var(--purple-dark);">Not: Özelleştirme işlemleri tamamlanmadan ödeme yapılamaz.</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h3>2. ✍️ Davetiye Bilgilerini Gir</h3>
          <p>İlk adımda, sana ait bilgileri girmeye başlıyorsun:</p>
          <ul style="list-style: none; padding-left: 20px;">
            <li>• Gelin ve Damat Adı – Soyadı</li>
            <li>• Gelin ve Damat Anne & Baba Adları</li>
            <li>• "Çocuklara İyi Uyuyor" kutucuğunu işaretlersen, fiziksel davetiyene özel bir dipnot eklenir.</li>
            <li>• Davetiye metnini yaz veya hazır şablonlardan birini seç.</li>
          </ul>
        </div>

        <div style="margin-bottom: 30px;">
          <h3>3. 🎉 Etkinliklerini Ekle</h3>
          <p>Düğünle ilgili tüm özel anları buraya ekleyebilirsin. Örneğin:</p>
          <ul style="list-style: none; padding-left: 20px;">
            <li>• Kına Gecesi</li>
            <li>• Konvoy</li>
            <li>• Düğün</li>
            <li>• After Party... Ne istersen!</li>
          </ul>
          <p>Her etkinlik için:</p>
          <ul style="list-style: none; padding-left: 20px;">
            <li>• Etkinlik Adı</li>
            <li>• Tarih</li>
            <li>• Başlangıç ve Bitiş Saati</li>
            <li>• Mekan Adı</li>
            <li>• Açık Adres</li>
            <li>• Harita üzerinden konum işaretleme</li>
          </ul>
          <p style="font-style: italic; color: var(--purple-dark);">Dilersen sınırsız etkinlik ekleyebilirsin. Ama en fazla 3 tanesi fiziksel davetiyeye basılabilir. Diğerleri dijitalde yer alır.</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h3>4. 📹 Video Ekle (İsteğe Bağlı)</h3>
          <p>Burada karar sende.</p>
          <ul style="list-style: none; padding-left: 20px;">
            <li>• İstersen doğrudan kamerayla bir video çekebilir</li>
            <li>• İstersen daha önce hazırladığın videoyu yükleyebilirsin.</li>
          </ul>
          <p>Bu video, hem "Save the Date" alanında gösterilir, hem de Sihirli Davetiye (AR) özelliğinde kullanılabilir.</p>
          <p style="font-style: italic; color: var(--purple-dark);">Video eklemek zorunda değilsin, istersen bu adımı atlayabilirsin.</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h3>5. 🖨️ Baskı Türünü Seç</h3>
          <p>Burada fiziksel davetiyenin kalitesine dokunuyoruz.</p>
          <p>Aşağıdaki alanlar için baskı tipi seçersin:</p>
          <ul style="list-style: none; padding-left: 20px;">
            <li>• Davetiye Baskısı</li>
            <li>• Zarf Baskısı</li>
          </ul>
          <p>Sunulan baskı türleri:</p>
          <ul style="list-style: none; padding-left: 20px;">
            <li>• Ofset Baskı (klasik ve kaliteli)</li>
            <li>• Varak Baskı (yaldızlı, daha gösterişli)</li>
          </ul>
          <p style="font-style: italic; color: var(--purple-dark);">⚠️ Bu adım zorunludur. Baskı seçmeden devam edemezsin.</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h3>6. 🎁 Ekstra Hizmetler</h3>
          <p>İhtiyacına göre özel ek seçenekler sunarız:</p>
          <ul style="list-style: none; padding-left: 20px;">
            <li>• LCV (Katılım Bildirimi)</li>
            <li>• İsim Yazdırma (davetiye üzerine)</li>
            <li>• Katlama ve Zarflama</li>
            <li>• Reklamları Kaldır</li>
          </ul>
          <p style="font-style: italic;">İsim yazdırmayı seçersen, katlama ve zarflama otomatik olarak işaretlenir.</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h3>7. 📱 QR Kod Oluşturuluyor</h3>
          <p>Tebrikler! Tüm özelleştirme adımlarını tamamladın.</p>
          <p>Şimdi, sadece sana özel bir QR kod oluşturuyoruz.</p>
          <p>Bu QR kod, fiziksel davetiyene basılıyor.</p>
          <p>Davetliler bu kodu okutarak:</p>
          <ul style="list-style: none; padding-left: 20px;">
            <li>✓ Haritaya ulaşır</li>
            <li>✓ Sihirli Davetiyeni izler</li>
            <li>✓ LCV yanıtlarını verir</li>
            <li>✓ Davetini telefonuna kaydeder</li>
          </ul>
          <p style="font-style: italic; color: var(--purple-dark);">📝 QR kodun hazırlandıktan sonra sepet ekranına geri dönersin.</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h3>8. 💳 Ödeme ve Tamamla</h3>
          <p>Sepetten "Alışverişi Tamamla" diyerek ödeme işlemini yaparsın.</p>
          <p>Eğer isim yazdırma veya LCV hizmeti seçtiysen, ödeme sonrası "Siparişlerim" bölümünden:</p>
          <ul style="list-style: none; padding-left: 20px;">
            <li>• Katılımcı listesi oluşturabilir,</li>
            <li>• LCV ayarlarını kolayca yapabilirsin.</li>
          </ul>
        </div>

        <p style="text-align: center; margin-top: 30px; font-style: italic;">Hepsi bu kadar! Şimdi sana özel davetiyeler hazırlanıyor ve kargoyla yolculuğa çıkıyor.</p>
      `;
      break;
    case "ar":
      content = `
        <h2>✨ Sihirli Davetiye (Artırılmış Gerçeklik)</h2>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 30px 0;">
          <!-- Davet Sahibi Bölümü -->
          <div style="padding: 20px; background: rgba(255, 255, 255, 0.1); border-radius: 15px;">
            <h3 style="color: var(--purple-dark); margin-bottom: 20px;">👰 Davet Sahibi için</h3>
            <p style="margin-bottom: 15px; font-weight: 600;">Davetiyene hayat ver – konuklarını şaşırt!</p>
            
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 10px;">📹 Uygulama üzerinden davetiyene özel bir video yüklersin.</li>
              <li style="margin-bottom: 10px;">🖨️ Bu video, baskıya giden davetiyeye eklenir ve davetiyenin üstüne özel bir QR kod basılır.</li>
              <li style="margin-bottom: 10px;">🔗 Davetliler bu QR kodu okuttuğunda, senin seçtiğin video, davetiyenin üstüne yansıtılarak oynatılır.</li>
            </ul>

            <p style="margin-top: 20px;">💡 Bu özellik sayesinde davetin sadece bir kâğıt değil, gerçek bir deneyime dönüşür.</p>
            <p>✨ Kendi sesinle davet et, hatıraları paylaş, konuklarını duygulandır!</p>
          </div>

          <!-- Davetli Bölümü -->
          <div style="padding: 20px; background: rgba(255, 255, 255, 0.1); border-radius: 15px;">
            <h3 style="color: var(--purple-dark); margin-bottom: 20px;">🎁 Davetli için</h3>
            <p style="margin-bottom: 15px; font-weight: 600;">Bir davetiyeden fazlasını yaşa!</p>

            <ol style="padding-left: 20px;">
              <li style="margin-bottom: 10px;">Eline ulaşan davetiyedeki QR kodu telefonunun kamerasıyla okutarak uygulamıyı aç.</li>
              <li style="margin-bottom: 10px;">Açılan ekranda "Sihirli Davetiye" butonuna dokun.</li>
              <li style="margin-bottom: 10px;">Eğer telefonun Artırılmış Gerçeklik (AR) destekliyorsa,
                <ul style="list-style: none; padding-left: 20px; margin-top: 10px;">
                  <li>• Kameranı davetiyenin üzerine tut.</li>
                  <li>• Ve… 🎥 Video sihirli şekilde canlansın!</li>
                  <li>• Video, sanki davetiyenin üzerine yansıtılmış gibi görünür – etkileyici ve duygusal bir deneyim!</li>
                </ul>
              </li>
            </ol>

            <p style="margin-top: 20px;">💡 Telefonun AR desteklemiyorsa sorun değil!<br>
            Aynı videoyu uygulama içindeki "Save The Date" bölümünden de izleyebilirsin.</p>
          </div>
        </div>

        <p style="text-align: center; margin-top: 30px; font-style: italic; border-top: 1px solid rgba(76, 29, 149, 0.3); padding-top: 20px;">
          ✨ Bu sadece bir davetiye değil, unutulmaz bir anıya dönüşen sihirli bir deneyimdir.<br>
          UlaQ Davetiye ile fark yarat!
        </p>
      `;
      break;
    case "lcv":
      content = `
        <h2 style="text-align: center; margin-bottom: 10px;">3. ✅ LCV – "Lütfen Cevap Verin"</h2>
        <p style="text-align: center; font-size: 1.2em; margin-bottom: 30px; font-style: italic;">"Kimler geliyor, kimler gelemiyor?" sorusuna en net cevap burada!</p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
          <!-- Davet Sahibi Bölümü -->
          <div style="background: rgba(255, 255, 255, 0.1); padding: 25px; border-radius: 15px;">
            <h3 style="color: var(--purple-dark); margin-bottom: 20px;">🔹 Davet Sahibiysen:</h3>
            <p style="margin-bottom: 15px;">Siparişini tamamladıktan sonra, Siparişlerim sayfasına gel.<br>
            Buradan hemen LCV işlemlerine başlayabilirsin.</p>
            <p style="margin-bottom: 10px;">👇 Şöyle adım adım gidelim:</p>
            
            <ol style="padding-left: 20px;">
              <li style="margin-bottom: 15px;">LCV Sayfasına gir.</li>
              <li style="margin-bottom: 15px;">Burada daha önce oluşturduğun her etkinlik için birer kart göreceksin.
                <ul style="list-style: none; padding-left: 20px; margin-top: 10px;">
                  <li>• Her kartta:</li>
                  <li>• Etkinlik adı (örneğin: Nikah, Yemek, Konvoy…)</li>
                  <li>• "Kişi sayısı sorulsun mu?" seçeneği (checkbox)</li>
                  <li>• Katılacak / Katılmayacak / Cevap bekleniyor gibi durumları gösteren mini grafikler var.</li>
                  <li>• Eğer kişi sayısı sorulsun seçeneğini işaretlersen, konuklara bu etkinlik için kaç kişiyle katılacakları da sorulacak.</li>
                </ul>
              </li>
              <li style="margin-bottom: 15px;">Daha sonra en önemli kısma geliyoruz:
                <p style="margin: 10px 0;">"Davetli Listesi" butonuna dokun.</p>
                <ul style="list-style: none; padding-left: 20px;">
                  <li>• Burada konuklarını tek tek eklemeye başla:</li>
                  <li>• Adını yaz (nasıl davetiyede geçiyorsa öyle)</li>
                  <li>• Hangi etkinliklere davetli olduğunu işaretle (hepsi olabilir, sadece biri olabilir – tamamen sana kalmış).</li>
                  <li>• Her konuk için bu adımları tekrar edebilirsin.</li>
                </ul>
              </li>
            </ol>
          </div>

          <!-- Davetli Bölümü -->
          <div>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 25px; border-radius: 15px;">
              <h3 style="color: var(--purple-dark); margin-bottom: 20px;">🔹 Davetliysen (yani davetiyeyi alan kişisen):</h3>
              <p style="margin-bottom: 15px; font-weight: 600;">İşte burası çok önemli ve sistemin en havalı kısmı! 👇</p>

              <ol style="padding-left: 20px;">
                <li style="margin-bottom: 10px;">Davetiyedeki QR kodu okut.</li>
                <li style="margin-bottom: 10px;">Açılan ekranda "Lütfen Cevap Verin" butonuna dokun.</li>
                <li style="margin-bottom: 15px;">Karşına bir arama alanı çıkacak.
                  <ul style="list-style: none; padding-left: 20px; margin-top: 5px;">
                    <li>• Buraya ismini, davetiyede yazdığı gibi aynen yaz.</li>
                    <li>• İsim listede çıkınca, "Bu benim" butonuna dokun.</li>
                  </ul>
                </li>
                <li style="margin-bottom: 15px;">Şimdi sırada doğrulama kısmı var:
                  <ul style="list-style: none; padding-left: 20px; margin-top: 5px;">
                    <li>• Sistem sana diyor ki:</li>
                    <li style="font-style: italic;">"Cevap verebilmeniz için davet sahibinin onayı gerekir."</li>
                    <li>• Altta bir buton var: "Doğrulama Kodu İste" → buna dokun.</li>
                  </ul>
                </li>
                <li style="margin-bottom: 15px;">Bu istek, davet sahibine bildirim olarak gider.
                  <ul style="list-style: none; padding-left: 20px; margin-top: 5px;">
                    <li>• Davet sahibi uygulamasındaki LCV bölümünden "Doğrulama Kodu Gönder" butonuna tıklayarak sana özel bir kod oluşturur.</li>
                    <li>• Bu kodu sana WhatsApp, SMS, DM – nasıl isterse o yolla gönderir.</li>
                  </ul>
                </li>
                <li style="margin-bottom: 15px;">Sen de bu kodu aldıktan sonra uygulamaya girip, ekrandaki kutucuğa kodu yaz.
                  <ul style="list-style: none; padding-left: 20px; margin-top: 5px;">
                    <li>• Kod geçerli ise: 🎉 Etkinlik listesi açılır!</li>
                    <li>• Hangi etkinliğe katılıyorsan tek tek işaretle.</li>
                    <li>• Eğer "kişi sayısı sorulsun" seçilmişse, yanında kaç kişiyle geleceğini de belirt.</li>
                  </ul>
                </li>
              </ol>

              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(76, 29, 149, 0.3);">
                <p style="font-style: italic; margin-bottom: 10px;">Ve bitti! Artık senin katılım durumun davet sahibine ulaştı,</p>
                <p style="font-style: italic;">ve organizasyon çok daha net planlanabilir hale geldi 🙌</p>
              </div>
            </div>
          </div>
        </div>
      `;
      break;
    case "map":
      content = `
        <h2>Harita ve Yol Tarifi</h2>
        <p>Mekan bilgilerini akıllıca paylaşın:</p>
        <ul>
          <li>İnteraktif harita</li>
          <li>Farklı ulaşım seçenekleri</li>
          <li>Adım adım yol tarifi</li>
          <li>Önemli noktalar (otopark, giriş vb.)</li>
          <li>Navigasyon uygulamalarına kolay entegrasyon</li>
        </ul>
        <p>Davetlileriniz mekanı kolayca bulabilir.</p>
      `;
      break;
    case "inbox":
      content = `
        <h2 style="text-align: center; margin-bottom: 10px;">📦 Davet Kutum</h2>
        <p style="text-align: center; font-size: 1.2em; margin-bottom: 30px;">Tüm davetiyelerin tek bir yerde, her zaman elinin altında!</p>

        <!-- İlk Adım Bölümü -->
        <div style="background: rgba(255, 255, 255, 0.1); padding: 25px; border-radius: 15px; margin-bottom: 30px;">
          <h3 style="color: var(--purple-dark); margin-bottom: 15px;">🔍 İlk Adım: Davetiyeni Uygulamaya Ekle</h3>
          <ul style="list-style: none; padding-left: 0;">
            <li style="margin-bottom: 10px;">📩 Eline ulaşan bir davetiyedeki QR kodu telefonunun kamerasıyla okut.</li>
            <li style="margin-bottom: 10px;">📲 Açılan ekrandan "Davet Kutuma Ekle" seçeneğine dokun – bu kadar kolay!</li>
            <li>Davetiyen artık dijital olarak seninle, kaybolmaz, unutulmaz.</li>
          </ul>
        </div>

        <!-- Ana Özellikler -->
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <!-- 1. Özellik -->
          <div style="background: rgba(255, 255, 255, 0.1); padding: 25px; border-radius: 15px;">
            <h3 style="color: var(--purple-dark); margin-bottom: 15px;">📥 1. Davetiyelerini Topla</h3>
            <ul style="list-style: none; padding-left: 0;">
              <li style="margin-bottom: 10px;">• Farklı kişilerden aldığın tüm davetiyeleri uygulamada bir araya getir.</li>
              <li style="margin-bottom: 10px;">• Her davetiye için ayrı ayrı QR okutmana gerek kalmaz – ekledikten sonra uygulamadan erişebilirsin.</li>
              <li>• Hepsi, hesabına bağlı olarak güvenli şekilde saklanır.</li>
            </ul>
          </div>

          <!-- 2. Özellik -->
          <div style="background: rgba(255, 255, 255, 0.1); padding: 25px; border-radius: 15px;">
            <h3 style="color: var(--purple-dark); margin-bottom: 15px;">📍 2. Tek Bir Yerden Erişim</h3>
            <ul style="list-style: none; padding-left: 0;">
              <li style="margin-bottom: 10px;">• Fiziksel ya da dijital fark etmeksizin, tüm davetiyelerini aynı yerde görüntüle.</li>
              <li style="margin-bottom: 10px;">• Geçmiş ve yaklaşan etkinlikleri, tarihlerini ve içeriklerini kolayca takip et.</li>
              <li>• Kargaşadan uzak, sade ve düzenli bir davetiye arşivin olsun.</li>
            </ul>
          </div>

          <!-- 3. Özellik -->
          <div style="background: rgba(255, 255, 255, 0.1); padding: 25px; border-radius: 15px;">
            <h3 style="color: var(--purple-dark); margin-bottom: 15px;">✨ 3. Sihirli Davetiye & İnteraktif Özellikler</h3>
            <ul style="list-style: none; padding-left: 0;">
              <li style="margin-bottom: 10px;">• Sihirli Davetiye, Harita, LCV gibi tüm özellikler buradan da çalışır.</li>
              <li>• QR kod okutmaya tekrar gerek yok – tek tıkla etkileşim başlasın!</li>
            </ul>
          </div>

          <!-- 4. Özellik -->
          <div style="background: rgba(255, 255, 255, 0.1); padding: 25px; border-radius: 15px;">
            <h3 style="color: var(--purple-dark); margin-bottom: 15px;">⏳ 4. Geri Sayım ve Bildirimler</h3>
            <ul style="list-style: none; padding-left: 0;">
              <li style="margin-bottom: 10px;">• Her davetiyede bulunan geri sayım sayacı ile etkinliğe kalan zamanı anlık takip et.</li>
              <li>• Bildirimleri açarsan, yaklaşan davetler öncesinde seni uyarır, hiçbir etkinliği kaçırmazsın.</li>
            </ul>
          </div>
        </div>

        <!-- Alt Mesaj -->
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(76, 29, 149, 0.3);">
          <p style="font-style: italic; margin-bottom: 10px;">🎉 UlaQ Davet Kutusu ile tüm etkinliklerin elinin altında.</p>
          <p style="font-style: italic;">Her şey düzenli, her şey hatırlatmalı. Kaybolan davetiyelere elveda! 👋</p>
        </div>
      `;
      break;
  }

  modalContent.innerHTML = content;
  modal.style.display = "block";

  // Modal açıldığında animasyon ekleyelim
  setTimeout(() => {
    modalContent.style.opacity = "0";
    modalContent.style.transform = "translateY(-20px)";

    setTimeout(() => {
      modalContent.style.opacity = "1";
      modalContent.style.transform = "translateY(0)";
      modalContent.style.transition = "all 0.5s ease";
    }, 100);
  }, 0);
}

closeModal.onclick = function () {
  modal.style.display = "none";
  // Modal kapandığında body'den modal-open class'ını kaldır
  document.body.classList.remove("modal-open");
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    // Modal kapandığında body'den modal-open class'ını kaldır
    document.body.classList.remove("modal-open");
  }
};

// Mobil menü işlevselliği
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");
const mobileMenu = document.querySelector(".mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});

// Sayfa yüklendiğinde aktif menü öğesini işaretle
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
});
