// Versiyon numarası oluştur
const version = new Date().getTime();

// CSS dosyalarına versiyon ekle
document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
  if (!link.href.includes("fonts.googleapis.com")) {
    link.href = addVersionToUrl(link.href);
  }
});

// Script dosyalarına versiyon ekle
document.querySelectorAll("script[src]").forEach((script) => {
  script.src = addVersionToUrl(script.src);
});

// Resimlere versiyon ekle
document.querySelectorAll("img").forEach((img) => {
  if (img.src.includes("assets/")) {
    img.src = addVersionToUrl(img.src);
  }
});

// URL'ye versiyon parametresi ekle
function addVersionToUrl(url) {
  return url.includes("?") ? `${url}&v=${version}` : `${url}?v=${version}`;
}

// Sayfa yenilendiğinde service worker'ı güncelle
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.update();
    }
  });
}
