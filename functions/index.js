// index.js
const { onCall, onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const crypto = require("crypto"); // Sign işlemleri için
const axios = require("axios");
const functions = require("firebase-functions");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const logger = require("firebase-functions/logger");

// Firebase Admin SDK'yı başlat
admin.initializeApp();

// PayTR Secret tanımlamaları
const MERCHANT_ID = defineSecret("PAYTR_MERCHANT_ID");
const MERCHANT_KEY = defineSecret("PAYTR_MERCHANT_KEY");
const MERCHANT_SALT = defineSecret("PAYTR_MERCHANT_SALT");

// App Check bypass ile bildirim gönderme
exports.sendNotification = onCall(async (request) => {
  const data = request.data;
  console.log(
    "sendNotification fonksiyonu çağrıldı, veri:",
    JSON.stringify(data)
  );

  try {
    // Token kontrolü
    const token = data.token;
    if (!token) {
      console.error("Token eksik!");
      throw new Error("Token eksik");
    }

    // Mesaj hazırla
    const message = {
      token: token,
      notification: {
        title: data.title || "Bildirim",
        body: data.body || "Yeni bildirim",
      },
    };

    // Data kısmını ekle
    if (data.orderId) {
      message.data = {
        orderId: data.orderId,
      };
    }

    console.log("Bildirim gönderiliyor:", JSON.stringify(message));

    // FCM ile bildirim gönder
    const response = await admin.messaging().send(message);
    console.log("Bildirim başarılı:", response);

    return { success: true, messageId: response };
  } catch (error) {
    console.error("Bildirim hatası:", error);
    throw new Error(error.message);
  }
});

// PayTR bilgilerini kontrol et ve yükle
function checkAndLoadPayTRCredentials() {
  const merchant_id = process.env.PAYTR_MERCHANT_ID;
  const merchant_key = process.env.PAYTR_MERCHANT_KEY;
  const merchant_salt = process.env.PAYTR_MERCHANT_SALT;

  // Bilgiler eksikse veya boşsa
  if (!merchant_id || !merchant_key || !merchant_salt) {
    console.error(
      "PayTR bilgileri eksik! Lütfen Firebase Console'dan kontrol edin."
    );
    return false;
  }

  // Bilgilerin uzunluğunu kontrol et
  if (
    merchant_id.length < 5 ||
    merchant_key.length < 5 ||
    merchant_salt.length < 5
  ) {
    console.error("PayTR bilgileri geçersiz uzunlukta!");
    return false;
  }

  return true;
}

exports.getPaytrToken = onCall(
  {
    secrets: [MERCHANT_ID, MERCHANT_KEY, MERCHANT_SALT],
    enforceAppCheck: false,
  },
  async (request) => {
    try {
      const data = request.data;
      console.log("1. Gelen istek verisi:", JSON.stringify(data, null, 2));

      // PayTR bilgilerini al
      const merchant_id = MERCHANT_ID.value();
      const merchant_key = MERCHANT_KEY.value();
      const merchant_salt = MERCHANT_SALT.value();

      console.log("2. PayTR bilgileri:", {
        merchant_id,
        merchant_key: merchant_key ? "Mevcut" : "Eksik",
        merchant_salt: merchant_salt ? "Mevcut" : "Eksik",
      });

      // Zorunlu alanları kontrol et
      if (!data.user_ip || !data.order_id || !data.email || !data.amount) {
        console.error("3. Eksik veri hatası:", {
          user_ip: !!data.user_ip,
          order_id: !!data.order_id,
          email: !!data.email,
          amount: !!data.amount,
        });
        throw new Error(
          "Zorunlu alanlar eksik: user_ip, order_id, email veya amount"
        );
      }

      // PayTR için veri hazırlığı
      const user_ip = data.user_ip;
      const merchant_oid = data.order_id;
      const email = data.email;
      const payment_amount = Math.round(parseFloat(data.amount) * 100); // TL'yi kuruşa çevir

      console.log("4. İşlenmiş veriler:", {
        user_ip,
        merchant_oid,
        email,
        payment_amount,
        original_amount: data.amount,
      });

      // Sepet bilgisini hazırla
      const basketItems = [
        [data.product_name || "UlaQ Davetiye", data.amount || "0.00", 1],
      ];
      const user_basket_str = JSON.stringify(basketItems);
      const user_basket = Buffer.from(user_basket_str).toString("base64");

      console.log("5. Sepet bilgisi:", {
        original: basketItems,
        json: user_basket_str,
        base64: user_basket,
      });

      // PayTR token string'ini oluştur (dokümanın istediği sırayla)
      const no_installment = "1"; // Taksit yapılmasın
      const max_installment = "0"; // Maksimum taksit sınırı yok
      const currency = "TL";
      const test_mode = "1";

      const paytr_token_str =
        merchant_id +
        user_ip +
        merchant_oid +
        email +
        payment_amount +
        user_basket +
        no_installment +
        max_installment +
        currency +
        test_mode +
        merchant_salt;

      console.log("6. Token string bileşenleri:", {
        merchant_id,
        user_ip,
        merchant_oid,
        email,
        payment_amount,
        user_basket: user_basket.substring(0, 30) + "...",
        no_installment,
        max_installment,
        currency,
        test_mode,
        merchant_salt: merchant_salt.substring(0, 5) + "...",
      });

      // Token'ı oluştur
      const paytr_token = crypto
        .createHmac("sha256", merchant_key)
        .update(paytr_token_str)
        .digest("base64");

      console.log("7. Oluşturulan token:", paytr_token);

      // PayTR'ye gönderilecek veriler
      const tokenData = {
        merchant_id: merchant_id,
        user_ip: user_ip,
        merchant_oid: merchant_oid,
        email: email,
        payment_amount: payment_amount,
        paytr_token: paytr_token,
        user_basket: user_basket,
        debug_on: "1",
        test_mode: "1",
        no_installment: "1",
        max_installment: "0",
        user_name: data.user_name || email.split("@")[0],
        user_address: data.user_address || "Belirtilmedi",
        user_phone: data.user_phone || "5523944319",
        merchant_ok_url: "https://ulaqdavetiye.com.tr/payment/success",
        merchant_fail_url: "https://ulaqdavetiye.com.tr/payment/fail",
        timeout_limit: "30",
        currency: "TL",
        lang: "tr",
      };

      console.log("8. PayTR'ye gönderilecek veriler:", tokenData);

      try {
        // Form verilerini düz string olarak hazırla
        const formBody = [];
        for (const key in tokenData) {
          const encodedKey = encodeURIComponent(key);
          const encodedValue = encodeURIComponent(tokenData[key]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        const formBodyString = formBody.join("&");

        const response = await axios({
          method: "post",
          url: "https://www.paytr.com/odeme/api/get-token",
          data: formBodyString,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        console.log("9. PayTR yanıtı:", response.data);

        if (response.data.status === "success") {
          return { token: response.data.token };
        } else {
          throw new Error(`PayTR Hatası: ${response.data.reason}`);
        }
      } catch (error) {
        console.error("10. Hata:", error.response?.data || error.message);
        throw error;
      }
    } catch (error) {
      console.error("11. Genel Hata:", error);
      throw new Error(error.message);
    }
  }
);

// PayTR bildirim endpoint'i
exports.paytrNotification = onRequest(
  { secrets: [MERCHANT_KEY, MERCHANT_SALT] },
  async (req, res) => {
    try {
      console.log("=== PAYTR NOTIFICATION START ===");
      console.log("Request method:", req.method);
      console.log("Request headers:", JSON.stringify(req.headers, null, 2));
      console.log("Request body:", JSON.stringify(req.body, null, 2));
      console.log("Request query:", JSON.stringify(req.query, null, 2));

      const merchant_key = MERCHANT_KEY.value();
      const merchant_salt = MERCHANT_SALT.value();
      const post = req.body;

      if (!post) {
        console.error("No request body received");
        return res.status(400).send("No request body");
      }

      if (
        !post.merchant_oid ||
        !post.status ||
        !post.total_amount ||
        !post.hash
      ) {
        console.error("Missing required fields:", {
          merchant_oid: post.merchant_oid,
          status: post.status,
          total_amount: post.total_amount,
          hash: post.hash,
        });
        return res.status(400).send("Missing required fields");
      }

      console.log("Processing notification for order:", post.merchant_oid);

      // Hash kontrolü
      const hash = crypto
        .createHmac("sha256", merchant_key)
        .update(
          post.merchant_oid + merchant_salt + post.status + post.total_amount
        )
        .digest("base64");

      console.log("Hash verification:", {
        received_hash: post.hash,
        calculated_hash: hash,
        merchant_oid: post.merchant_oid,
        status: post.status,
        total_amount: post.total_amount,
        match: hash === post.hash,
      });

      if (hash !== post.hash) {
        console.error("Hash verification failed");
        return res.status(400).send("PAYTR notification failed: bad hash");
      }

      // Sipariş durumunu güncelle
      const ordersRef = admin.firestore().collection("Orders");
      const snapshot = await ordersRef
        .where("oid", "==", post.merchant_oid)
        .get();

      if (snapshot.empty) {
        console.error("No orders found with oid:", post.merchant_oid);
        return res.status(404).send("No orders found to update");
      }

      let updateData;
      if (post.status === "success") {
        console.log("Payment successful, updating order status");
        updateData = {
          paymentStatus: true,
          orderStatus: "Order",
          orderTimestamp: admin.firestore.FieldValue.serverTimestamp(),
          paymentAmount: parseFloat(post.total_amount) / 100, // Kuruş'tan TL'ye çevir
          paymentMethod: post.payment_type || "card",
          paymentDetails: {
            transactionId: post.merchant_oid,
            paymentDate: new Date().toISOString(),
            paymentMethod: post.payment_type || "card",
            paymentStatus: "success",
            rawNotification: post, // Store the complete notification
          },
        };
      } else {
        console.log("Payment failed, updating order status");
        updateData = {
          paymentStatus: false,
          orderStatus: "ShoppingCart",
          paymentFailReason: post.failed_reason_msg,
          paymentFailCode: post.failed_reason_code,
          paymentDetails: {
            transactionId: post.merchant_oid,
            paymentDate: new Date().toISOString(),
            paymentMethod: post.payment_type || "card",
            paymentStatus: "failed",
            failReason: post.failed_reason_msg,
            failCode: post.failed_reason_code,
            rawNotification: post, // Store the complete notification
          },
        };
      }

      console.log("Update data:", JSON.stringify(updateData, null, 2));

      const batch = admin.firestore().batch();
      snapshot.forEach((doc) => {
        batch.update(doc.ref, updateData);
      });
      await batch.commit();
      console.log("All orders with oid updated:", post.merchant_oid);

      console.log("=== PAYTR NOTIFICATION END ===");
      res.send("OK");
    } catch (error) {
      console.error("=== PAYTR NOTIFICATION ERROR ===");
      console.error("Error details:", error);
      console.error("Stack trace:", error.stack);
      res.status(500).send("Internal error");
    }
  }
);

exports.getCargoCompanies = onRequest(async (req, res) => {
  logger.info("getCargoCompanies endpoint çağrıldı", {
    method: req.method,
    headers: req.headers,
    body: req.body,
  });
  try {
    const response = await fetch("https://basitkargo.com/api/handlers", {
      method: "GET",
      headers: {
        Authorization: "Bearer 5EECC914-F656-4FE5-96C4-42363E5BEEE6",
      },
    });
    logger.info("Kargo API yanıtı", {
      status: response.status,
      statusText: response.statusText,
    });
    if (!response.ok) {
      const text = await response.text();
      logger.error("Kargo firmaları alınamadı, API yanıtı:", {
        status: response.status,
        body: text,
      });
      throw new Error("Kargo firmaları alınamadı");
    }
    const companies = await response.json();
    logger.info("Kargo firmaları başarıyla alındı", { companies });
    res.status(200).json(companies);
  } catch (error) {
    logger.error("getCargoCompanies fonksiyonunda hata:", {
      error: error.message,
      stack: error.stack,
    });
    res
      .status(500)
      .json({ error: "Kargo firmaları alınırken bir hata oluştu" });
  }
});

// Fiyat listesini getiren fonksiyon (HTTPS endpoint)
exports.getPriceList = onRequest(async (req, res) => {
  logger.info("getPriceList endpoint çağrıldı", {
    method: req.method,
    headers: req.headers,
    body: req.body,
  });
  try {
    const packageInfo = req.body;
    logger.info("Fiyat listesi için gönderilen paket bilgisi", { packageInfo });
    const response = await fetch(
      "https://basitkargo.com/api/handlers/fee/packages",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer 5EECC914-F656-4FE5-96C4-42363E5BEEE6",
          "Content-Type": "application/json",
        },
        body: JSON.stringify([packageInfo]),
      }
    );
    logger.info("Fiyat API yanıtı", {
      status: response.status,
      statusText: response.statusText,
    });
    if (!response.ok) {
      const text = await response.text();
      logger.error("Fiyat listesi alınamadı, API yanıtı:", {
        status: response.status,
        body: text,
      });
      throw new Error("Fiyat listesi alınamadı");
    }
    const prices = await response.json();
    logger.info("Fiyat listesi başarıyla alındı", { prices });
    res.status(200).json(prices);
  } catch (error) {
    logger.error("getPriceList fonksiyonunda hata:", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: "Fiyat listesi alınırken bir hata oluştu" });
  }
});
