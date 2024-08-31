import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  updateDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getMessaging,
  getToken,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js";

const firebaseapp = initializeApp({
  apiKey: "AIzaSyAgAbd8gSa5cH8t8dPPkkGUV_hsrr4K_Lo",
  authDomain: "ulaq-1e47e.firebaseapp.com",
  projectId: "ulaq-1e47e",
  storageBucket: "ulaq-1e47e.appspot.com",
  messagingSenderId: "790902980229",
  appId: "1:790902980229:web:871d392c9b1aad25fb33ec",
  measurementId: "G-E0J48THPNY",
});

const auth = getAuth(firebaseapp);
const storage = getStorage(firebaseapp);
const db = getFirestore(firebaseapp);

/* const messaging = getMessaging.messaging;



// Web Push Sertifikası (VAPID Key)
getToken({ vapidKey: 'Uu36lYxzue2LuOBhz0tKLUq3YctngUQV77TLj_3zBow' }).then((currentToken) => {
  if (currentToken) {
    console.log('Current token:', currentToken);
  } else {
    console.log('No registration token available. Request permission to generate one.');
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
});

// Bildirim gönderme fonksiyonu
function sendNotification() {
  const notification = {
    'notification': {
      'title': 'Hello!',
      'body': 'This is a test notification.',
    
    }
  };

  const options = {
    method: 'POST',
    headers: new Headers({
      'Authorization': 'key=AIzaSyC8Sh_hEwk4wF7LycHLMHbC-0d0Gc_3pYY', // Server Key
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      'to': 'dTNjf6TrR4mmYNP9Q3GmZa:APA91bGQg3GJ3QeldZ2A32c2InX1Li2cQlkh88AaOzIGIINlIuYjn9SInT0UJM5P8cxoawN-tLLHx96uBrG8ofCwyFGukXy8KLvRKV-9zVz1fj1MgouLl1teZvE9Kx0tHhjgdv70B6-5', // Cihaz FCM Token'ı
      'notification': notification
    })
  };

  fetch('https://fcm.googleapis.com/fcm/send', options).then(response => {
    if (response.ok) {
      console.log('Notification sent successfully' + response.status);
    } else {
      console.log('Failed to send notification' + response.status);
    }
  }).catch(error => {
    console.log('Error sending notification:', error);
  });
}

*/

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("logged in");
  } else {
    window.location.href = "index.html";
  }
});

let updateDocumentId = String;

const btnLogout = document.getElementById("logoutButton");
const backToordersButton = document.getElementById("backToordersButton");

const orderCodeFilterInput = document.getElementById("orderCodeFilterInput");

const orderPhaseFilterFormSelect = document.getElementById(
  "orderPhaseFilterFormSelect"
);
const orderPhaseChangeFormSelect = document.getElementById(
  "orderPhaseChangeFormSelect"
);

const organisationCategoryFilterFormSelect = document.getElementById(
  "organisationCategoryFilterFormSelect"
);

const orderDetailContainer = document.getElementById("orderDetailContainer");
const orderMainContainer = document.getElementById("orderMainContainer");
const ordercodeTextView = document.getElementById("orderCodeTextInput");
const orderModelNoTextView = document.getElementById("orderModelNoTextView");
const orderPieceTextView = document.getElementById("orderPieceTextView");

const input1Title = document.getElementById("input1Title");
const input1 = document.getElementById("input1");
const input2Title = document.getElementById("input2Title");
const input2 = document.getElementById("input2");
const input3Title = document.getElementById("input3Title");
const input3 = document.getElementById("input3");
const input4Title = document.getElementById("input4Title");
const input4 = document.getElementById("input4");
const input5Title = document.getElementById("input5Title");
const input5 = document.getElementById("input5");
const input6Title = document.getElementById("input6Title");
const input6 = document.getElementById("input6");

const invWrtingText = document.getElementById("invWrtingText");
const saveTheDateVideoUrl = document.getElementById("saveTheDateVideoUrl");
const qrCodeView = document.getElementById("qrCodeView");
const digitalCodeView = document.getElementById("digitalCodeView");

const printTypeinvitation = document.getElementById("printTypeinvitation");
const printTypeEnvelope = document.getElementById("printTypeEnvelope");

const tcIdentityNoText = document.getElementById("tcIdentityNoText");
const deliveryNameSurnameText = document.getElementById("nameSurnameText");
const telNumText = document.getElementById("telNumText");
const adresInfoText = document.getElementById("adresInfoText");
const districtProvinceInfoText = document.getElementById(
  "dstrictProvinceInfoText"
);

const cargoCompanyTe = document.getElementById("cargoCompanyText");
const cargoCodeText = document.getElementById("cargoCodeText");
const cargoUrlText = document.getElementById("cargoUrlText");
const cargoAddButton = document.getElementById("cargoAddButton");

const aproveModal = document.getElementById("aproveModal");
const aproveMessage = document.getElementById("aproveMessage");
const aproveFcmCopyButton = document.getElementById("aproveFcmCopyButton");
const aproveMessageCopyButton = document.getElementById(
  "aproveMessageCopyButton"
);
const aproveWhatsappCopyButton = document.getElementById(
  "aproveWhatsappCopyButton"
);
const aproveMessageAlert = document.getElementById("aproveMessageAlert");

const customerAproveReasonForRejectionText = document.getElementById(
  "customerAproveReasonForRejectionText"
);
const customerAproveImageInput = document.getElementById(
  "customerAproveImageInput"
);
const customerAproveImagePreview = document.getElementById(
  "customerAproveImagePreview"
);

var fcmTokenString;
var telephoneNumberString;

aproveMessageCopyButton.addEventListener("change", async function () {
  try {
    await navigator.clipboard.writeText(telephoneNumberString);
    aproveMessageCopyButton.classList.remove("btn-primary");
    aproveMessageCopyButton.classList.add("btn-danger");
    aproveMessageAlert.style.display = "";
    aproveMessageAlert.innerHTML = "Mesaj için telefon numarası kopyalandı.";
  } catch (err) {
    console.error("Metin kopyalanamadı: ", err);
  }
});

aproveFcmCopyButton.addEventListener("click", async function () {
  try {
    await navigator.clipboard.writeText(fcmTokenString);
    aproveFcmCopyButton.classList.remove("btn-primary");
    aproveFcmCopyButton.classList.add("btn-danger");
    aproveMessageAlert.style.display = "";
    aproveMessageAlert.innerHTML = "FCM Token kopyalandı.";
  } catch (err) {
    console.error("Metin kopyalanamadı: ", err);
  }
});

aproveMessageCopyButton.addEventListener("click", async function () {
  try {
    await navigator.clipboard.writeText(telephoneNumberString);
    aproveMessageCopyButton.classList.remove("btn-primary");
    aproveMessageCopyButton.classList.add("btn-danger");
    aproveMessageAlert.style.display = "";
    aproveMessageAlert.innerHTML = "Mesaj için telefon numarası kopyalandı.";
  } catch (err) {
    console.error("Metin kopyalanamadı: ", err);
  }
});

aproveWhatsappCopyButton.addEventListener("click", async function () {
  try {
    await navigator.clipboard.writeText(telephoneNumberString);
    aproveWhatsappCopyButton.classList.remove("btn-primary");
    aproveWhatsappCopyButton.classList.add("btn-danger");
    aproveMessageAlert.style.display = "";
    aproveMessageAlert.innerHTML = "WhatsApp için telefon numarası kopyalandı.";
  } catch (err) {
    console.error("Metin kopyalanamadı: ", err);
  }
});

customerAproveButton.addEventListener("click", function () {
  var customerAproveImageFiles = customerAproveImageInput.files[0];

  var customerAproveImageFileName = "asd";

  var customerAproveImageFileUrl;

  if (customerAproveImageFiles == null) {
    alert("Lütfen onay için fotoğraf ekleyin!");
  } else {
    let storageRefCustomerAprove = ref(
      storage,
      "customerAproveImage/" + customerAproveImageFileName
    );

    uploadBytes(storageRefCustomerAprove, customerAproveImageFiles).then(
      (snapshot) => {
        getDownloadURL(
          ref(storage, "customerAproveImage/" + customerAproveImageFileName)
        ).then(async (url) => {
          customerAproveImageFileUrl = url;

          var date = new Date();

          try {
            const docRef = await addDoc(
              collection(db, "Orders", updateDocumentId, "InvestmentApproval"),
              {
                imageUrl: url,
                investmentApprovalStatus: "0",
                addDate: date,
                reasonForRejection: "",
                answerDate: date,
              }
            );

            const $aproveModal = $("#aproveModal");

            // Modal'ı açma komutunu çalıştırın
            $aproveModal.modal("show");
          } catch (e) {}
        });
      }
    );
  }
});

btnLogout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {});
});

backToordersButton.addEventListener("click", () => {
  window.location.href = "ordertracking.html";
});

const products = document.querySelector(".ordersCard");

function createOrderssArray([
  firebaseOrdersDocId,
  firebaseOrderNames,
  firebaseOrdersOrderID,
  firebaseOrdersOrderPhase,
  firebaseOrderCategory,
]) {
  if (firebaseOrdersOrderPhase == "1") {
    let orderPhaseStr = "Beklemede";

    let proCode = `

    <div class="d-flex justify-content-between border rounded-2 m-1"> 
        
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>

    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>

    <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>

    <button type="button" class="btn btn-primary editBtn m-2">${orderPhaseStr}</button>


    </div>

    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "2") {
    let orderPhaseStr = "Onaylandı";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  
    <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>
  
  
    </div>
  
    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "3") {
    let orderPhaseStr = "Tasarlandı";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  
    <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>
  
  
    </div>
  
    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "4") {
    let orderPhaseStr = "TOB";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  
    <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>
  
  
    </div>
  
    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "5") {
    let orderPhaseStr = "Tasarım Onaylandı";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  
    <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>
  
  
    </div>
  
    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "6") {
    let orderPhaseStr = "Baskıda";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  
    <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>
  
  
    </div>
  
    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "7") {
    let orderPhaseStr = "Üretimde";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  
    <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>
  
  
    </div>
  
    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "8") {
    let orderPhaseStr = "Sevkiyat Bekliyor";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  
    <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>
  
  
    </div>
  
    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "9") {
    let orderPhaseStr = "Kargolandı";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  
    <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>
  
  
    </div>
  
    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "10") {
    let orderPhaseStr = "Teslim Edildi";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  
    <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>
  
  
    </div>
  
    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "11") {
    let orderPhaseStr = "İptal";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  
    <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>
  
  
    </div>
  
    `;
    products.innerHTML += proCode;
  }
}

$("body").on("click", ".editBtn", async function () {
  var $key = $(this).data("keys");

  updateDocumentId = $key;

  if (orderDetailContainer.style.display === "none") {
    orderDetailContainer.style.display = "";
    orderMainContainer.style.display = "none";
  }

  const docRefIA = query(
    collection(db, "Orders", updateDocumentId, "InvestmentApproval"),
    orderBy("addDate", "asc"),
    limit(1)
  );

  const querySnapshot = await getDocs(docRefIA);
  querySnapshot.forEach((docIa) => {
    const latestDoc = querySnapshot.docs[0];

    const firebaseInvAprovalImg = latestDoc.data().imageUrl;
    const firebaseInvestmentAprovalStatus =
      latestDoc.data().investmentApprovalStatus;
    const firebaseInvestmentAprovalAddDate = latestDoc.data().addDate;
    const firebaseInvestmentApprovalReasonForRejection =
      latestDoc.data().reasonForRejection;
    const firebaseInvetmentApprovalAnswerDate = latestDoc.data().answerDate;

    customerAproveImagePreview.src = firebaseInvAprovalImg;
    customerAproveReasonForRejectionText.innerHTML =
      firebaseInvestmentApprovalReasonForRejection;

    console.log(firebaseInvestmentAprovalStatus);

    if (firebaseInvestmentAprovalStatus == "0") {
      customerAproveReasonForRejectionText.style.display = "none";
    } else if (firebaseInvestmentAprovalStatus == "1") {
      customerAproveReasonForRejectionText.style.display = "";
      customerAproveReasonForRejectionText.classList.remove("text-bg-primary");
      customerAproveReasonForRejectionText.classList.add("text-bg-warning");
      customerAproveReasonForRejectionText.innerHTML = "Onay Bekleniyor";
      customerAproveReasonForRejectionText.style.color = "black";
    } else if (firebaseInvestmentAprovalStatus == "2") {
      customerAproveReasonForRejectionText.classList.remove("text-bg-primary");
      customerAproveReasonForRejectionText.classList.add("text-bg-danger");
      customerAproveReasonForRejectionText.innerHTML =
        "Red - " + firebaseInvestmentApprovalReasonForRejection;
      customerAproveReasonForRejectionText.style.color = "white";
    } else if (firebaseInvestmentAprovalStatus == "3") {
      customerAproveReasonForRejectionText.classList.remove("text-bg-primary");
      customerAproveReasonForRejectionText.classList.add("text-bg-success");
      customerAproveReasonForRejectionText.innerHTML = "Onaylandı";
      customerAproveReasonForRejectionText.style.color = "white";
      customerAproveButton.disabled = true;
      customerAproveButton.style.display = "none";
    }
  });

  const docRef = doc(db, "Orders", updateDocumentId);
  const docs = await getDoc(docRef);

  if (docs.exists()) {
    const firebaseOrdersDocId = docs.id;

    const firebaseOrdersOrderID = docs.data().orderID;
    const firebaseOrdersModelNo = docs.data().orderModelNo;
    const firebaseOrdersPiece = docs.data().orderPiece;
    const firebaseOrderPhase = docs.data().orderPhase;

    orderPhaseChangeFormSelect.value = firebaseOrderPhase;

    //skajhdaksda

    const getProduct = query(
      collection(db, "Product"),
      where("productModelNo", "==", firebaseOrdersModelNo)
    );

    const querySnapshotProduct = await getDocs(getProduct);
    querySnapshotProduct.forEach((doc) => {
      const productCompany = doc.data().productTradeMark;

      const productSubModel = doc.data().productTradeMarkSubModel;

      const productModelNo = doc.data().productTradeMarkModelNo;

      var companyName;
      var subModelName;

      if (productCompany == "1") {
        companyName = "İklim";

        if (productSubModel == "1") {
          subModelName = "Wedding";
        } else if (productSubModel == "2") {
          subModelName = "Alyans";
        } else if (productSubModel == "3") {
          subModelName = "Fenomen";
        } else if (productSubModel == "4") {
          subModelName = "İklim";
        } else if (productSubModel == "5") {
          subModelName = "Sünnet";
        }
      } else if (productCompany == "2") {
        companyName = "Erdem";

        if (productSubModel == "1") {
          subModelName = "Ekonom";
        } else if (productSubModel == "2") {
          subModelName = "ButiQline";
        } else if (productSubModel == "3") {
          subModelName = "Erdem";
        } else if (productSubModel == "4") {
          subModelName = "Sünnet";
        }
      }

      orderModelNoTextView.value =
        firebaseOrdersModelNo +
        " -> " +
        companyName +
        " / " +
        subModelName +
        " / " +
        productModelNo;
    });

    ordercodeTextView.value = firebaseOrdersOrderID;

    orderPieceTextView.value = firebaseOrdersPiece;

    const firebaseOrdersInvitationPrice = docs.data().invitationPrice;
    const firebaseOrganisationCategory = docs.data().organisationCategory;

    if (
      firebaseOrganisationCategory == 1 ||
      firebaseOrganisationCategory == 2 ||
      firebaseOrganisationCategory == 3
    ) {
      const firebaseBrideName = docs.data().brideName;
      const firebasebrideSurname = docs.data().brideSurName;
      const firebaseGroomName = docs.data().groomName;
      const firebaseGromSurName = docs.data().groomSurName;
      const firebaseBrideFamily = docs.data().brideFamily;
      const firebaseGroomFamily = docs.data().groomFamily;
      const firebasechildrenInfo = docs.data().childrenInfo;

      if (firebasechildrenInfo == true) {
        $("#childrenInfotext").css("display", "none");
      } else {
        $("#childrenInfotext").css("display", "");
      }
    } else if (firebaseOrganisationCategory == 4) {
      const firebaseBrideName = docs.data().brideName;
      if (firebasechildrenInfo == true) {
        $("#childrenInfotext").css("display", "none");
      } else {
        $("#childrenInfotext").css("display", "");
      }
    } else if (firebaseOrganisationCategory == 5) {
      var childArray = [];

      input5.style.display = "none";
      input5Title.style.display = "none";

      input6.style.display = "none";
      input6Title.style.display = "none";

      input1Title.innerHTML = "Çocuk İsimleri";

      const firebaseMotherName = docs.data().childMotherName;
      input2Title.innerHTML = "Anne Adı";
      input2.value = firebaseMotherName;

      const firebaseFatherName = docs.data().childFatherName;
      input3Title.innerHTML = "Baba Adı";
      input3.value = firebaseFatherName;

      const firebasesurname = docs.data().childSurName;
      input4Title.innerHTML = "Soyadı";
      input4.value = firebasesurname;

      const firebaseInvwriting = docs.data().invitationWriting;
      invWrtingText.value = firebaseInvwriting;

      const firebaseSaveThedateUrl = docs.data().saveTheDateVideoUrl;
      saveTheDateVideoUrl.value = firebaseSaveThedateUrl;

      const invPrintType = docs.data().orderInvitationPrintType;
      const envPrintType = docs.data().orderEnvelopePrintType;
      const foilprintType = docs.data().orderFoilPrintType;

      if (invPrintType == "1") {
        printTypeinvitation.innerHTML = "Davetiye - Ofset Baskı";
      } else if (invPrintType == "2") {
        if (foilprintType == "Gold") {
          printTypeinvitation.innerHTML = "Davetiye - Varak Baskı(Altın)";
        } else if (foilprintType == "Silver") {
          printTypeinvitation.innerHTML = "Davetiye - Varak Baskı(Gümüş)";
        }
      } else if (invPrintType == "") {
        printTypeinvitation.innerHTML = "Davetiye - Baskı Yok";
      }

      if (envPrintType == "1") {
        printTypeEnvelope.innerHTML = "Zarf - Ofset Baskı";
      } else if (envPrintType == "2") {
        if (foilprintType == "Gold") {
          printTypeEnvelope.innerHTML = "Zarf - Varak Baskı(Altın)";
        } else if (foilprintType == "Silver") {
          printTypeEnvelope.innerHTML = "Zarf - Varak Baskı(Gümüş)";
        }
      } else if (envPrintType == "") {
        printTypeEnvelope.innerHTML = "Zarf - Baskı Yok";
      }

      const firebaseDigitalCode = docs.data().digitalCode;
      digitalCodeView.value = firebaseDigitalCode;

      const firebaseQrCode = docs.data().QRCode;
      qrCodeView.value = firebaseQrCode;

      generateQRCode(firebaseQrCode);

      const getData = query(
        collection(db, "Orders", updateDocumentId, "Childs"),
        orderBy("childNumber", "asc")
      );

      const querySnapshot = await getDocs(getData);
      querySnapshot.forEach((doc) => {
        const firebasechildnames = doc.data().childName;

        childArray.push(firebasechildnames);

        input1.value = childArray;
      });

      console.log(doc.id, " => ", childArray);
    }

    function generateQRCode(firebaseQrCodess) {
      console.log(firebaseQrCodess);
      const text = firebaseQrCodess;
      const qrDiv = document.getElementById("qrcode");
      qrDiv.innerHTML = "";

      qrDiv.style.display = "none";

      const qrcode = new QRCode(qrDiv, {
        text: text,
        width: 2048,
        height: 2048,
      });

      setTimeout(() => {
        const qrCanvas = qrDiv.querySelector("canvas");
        if (qrCanvas) {
          const qrImage = new Image();
          qrImage.src = qrCanvas.toDataURL("image/png");

          qrImage.style.width = "256px"; // Görüntü genişliğini ayarla
          qrImage.style.height = "256px"; // Görüntü yüksekliğini ayarla
          qrDiv.style.display = "";
          qrDiv.innerHTML = ""; // Mevcut içeriği temizle
          qrDiv.appendChild(qrImage); // Görüntüyü ekle
        }
      }, 500); // Kısa bir gecikme, QR kodunun oluşturulmasını beklemek için
    }

    const orderUserEmail = docs.data().userEmail;

    const getUser = query(
      collection(db, "Users"),
      where("email", "==", orderUserEmail)
    );

    const querySnapshot = await getDocs(getUser);
    querySnapshot.forEach((doc) => {
      fcmTokenString = doc.data().fcmToken;
      telephoneNumberString = doc.data().telephoneNumber;
      telNumText.innerHTML = "Telefon : " + telephoneNumberString;
    });

    const getDelivery = query(
      collection(db, "Orders", updateDocumentId, "DeliveryAddress")
    );

    const querySnapshotDelivery = await getDocs(getDelivery);
    querySnapshotDelivery.forEach((doc) => {
      const name = doc.data().name;
      const surname = doc.data().surName;

      console.log(name);

      deliveryNameSurnameText.innerHTML = "Ad Soyad : " + name + " " + surname;

      const adress = doc.data().address;
      const district = doc.data().district;
      const province = doc.data().province;

      const taxAgecy = doc.data().taxAgency;

      const identityNo = doc.data().identityNo;

      if (taxAgecy == "") {
        tcIdentityNoText.innerText = "TC : " + identityNo;
      } else {
        tcIdentityNoText.innerText = "VD : " + taxAgecy + "VN : " + identityNo;
      }

      adresInfoText.innerHTML = "Adres : " + adress;
      districtProvinceInfoText.innerHTML =
        "İlçe/İl : " + district + " - " + province;
    });
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

  const queryImg1 = query(
    collection(db, "Product", $key, "img"),
    where("no", "==", 1)
  );

  const snapshotimg1 = await getDocs(queryImg1);

  snapshotimg1.forEach((doc) => {
    console.log(doc.data());

    img1Preview.src = doc.data().productImgUrl;
  });
});

const getData = query(
  collection(db, "Orders"),
  where("orderStatus", "==", "Order")
);

const querySnapshot = await getDocs(getData);
querySnapshot.forEach((doc) => {
  var firebaseOrdersBrideName = "";
  var firebaseOrdersGroomName = "";
  var firebaseOrderNames = "";

  var firebaseChildArray = [];

  const firebaseOrdersDocId = doc.id;

  const firebaseOrdersOrderID = doc.data().orderID;
  const firebaseOrdersOrderPhase = doc.data().orderPhase;

  const firebaseOrderCategory = doc.data().organisationCategory;

  if (
    firebaseOrderCategory == 1 ||
    firebaseOrderCategory == 2 ||
    firebaseOrderCategory == 3
  ) {
    firebaseOrdersBrideName = doc.data().brideName;
    firebaseOrdersGroomName = doc.data().groomName;

    firebaseOrderNames =
      firebaseOrdersBrideName + " & " + firebaseOrdersGroomName;
  } else if (firebaseOrderCategory == 4) {
    firebaseOrdersBrideName = doc.data().brideName;
    firebaseOrderNames = firebaseOrdersBrideName + " Gelin";
  } else if (firebaseOrderCategory == 5) {
    firebaseChildArray = doc.data().childNameArrayList;

    firebaseOrderNames = firebaseChildArray.toString();
  }

  let ordersItem = [
    firebaseOrdersDocId,
    firebaseOrderNames,
    firebaseOrdersOrderID,
    firebaseOrdersOrderPhase,
    firebaseOrderCategory,
  ];

  createOrderssArray(ordersItem);
});

cargoAddButton.addEventListener("click", async () => {
  if (
    cargoCompanyTe.value == "" ||
    cargoCodeText.value == "" ||
    cargoUrlText.value == ""
  ) {
    alert("Lütfen Kargo bilgilerinin tamamını giriniz");
  } else {
    try {
      const updateRef = doc(db, "Orders", updateDocumentId);

      await updateDoc(updateRef, {
        orderCargoCompany: cargoCompanyTe.value,
        orderCargoNumber: cargoCodeText.value,
        orderCargoTrackUrl: cargoUrlText.value,
      });
    } catch (error) {}
  }
});

orderCodeFilterInput.addEventListener("change", async () => {
  products.innerHTML = "";

  var orderIdInput = parseInt(orderCodeFilterInput.value);

  orderPhaseFilterFormSelect.value = "0";
  organisationCategoryFilterFormSelect.value = "0";

  if (orderCodeFilterInput.value != "") {
    const getDatas = query(
      collection(db, "Orders"),
      where("orderStatus", "==", "Order"),
      where("orderID", "==", orderIdInput)
    );
    const querySnapshot = await getDocs(getDatas);
    querySnapshot.forEach((doc) => {
      var firebaseOrdersBrideName = "";
      var firebaseOrdersGroomName = "";
      var firebaseOrderNames = "";

      var firebaseChildArray = [];

      const firebaseOrdersDocId = doc.id;

      const firebaseOrdersOrderID = doc.data().orderID;
      const firebaseOrdersOrderPhase = doc.data().orderPhase;

      const firebaseOrderCategory = doc.data().organisationCategory;

      if (
        firebaseOrderCategory == 1 ||
        firebaseOrderCategory == 2 ||
        firebaseOrderCategory == 3
      ) {
        firebaseOrdersBrideName = doc.data().brideName;
        firebaseOrdersGroomName = doc.data().groomName;

        firebaseOrderNames =
          firebaseOrdersBrideName + " & " + firebaseOrdersGroomName;
      } else if (firebaseOrderCategory == 4) {
        firebaseOrdersBrideName = doc.data().brideName;
        firebaseOrderNames = firebaseOrdersBrideName + " Gelin";
      } else if (firebaseOrderCategory == 5) {
        firebaseChildArray = doc.data().childNameArrayList;

        firebaseOrderNames = firebaseChildArray.toString();
      }

      let ordersItem = [
        firebaseOrdersDocId,
        firebaseOrderNames,
        firebaseOrdersOrderID,
        firebaseOrdersOrderPhase,
        firebaseOrderCategory,
      ];

      createOrderssArray(ordersItem);
    });
  } else {
    const getDatas = query(
      collection(db, "Orders"),
      where("orderStatus", "==", "Order")
    );
    const querySnapshot = await getDocs(getDatas);
    querySnapshot.forEach((doc) => {
      var firebaseOrdersBrideName = "";
      var firebaseOrdersGroomName = "";
      var firebaseOrderNames = "";

      var firebaseChildArray = [];

      const firebaseOrdersDocId = doc.id;

      const firebaseOrdersOrderID = doc.data().orderID;
      const firebaseOrdersOrderPhase = doc.data().orderPhase;

      const firebaseOrderCategory = doc.data().organisationCategory;

      if (
        firebaseOrderCategory == 1 ||
        firebaseOrderCategory == 2 ||
        firebaseOrderCategory == 3
      ) {
        firebaseOrdersBrideName = doc.data().brideName;
        firebaseOrdersGroomName = doc.data().groomName;

        firebaseOrderNames =
          firebaseOrdersBrideName + " & " + firebaseOrdersGroomName;
      } else if (firebaseOrderCategory == 4) {
        firebaseOrdersBrideName = doc.data().brideName;
        firebaseOrderNames = firebaseOrdersBrideName + " Gelin";
      } else if (firebaseOrderCategory == 5) {
        firebaseChildArray = doc.data().childNameArrayList;

        firebaseOrderNames = firebaseChildArray.toString();
      }

      let ordersItem = [
        firebaseOrdersDocId,
        firebaseOrderNames,
        firebaseOrdersOrderID,
        firebaseOrdersOrderPhase,
        firebaseOrderCategory,
      ];

      createOrderssArray(ordersItem);
    });
  }
});

orderPhaseFilterFormSelect.addEventListener("change", async () => {
  var selectedPhase = parseInt(orderPhaseFilterFormSelect.value);

  products.innerHTML = "";

  if (organisationCategoryFilterFormSelect.value == "0") {
    const getDatas = query(
      collection(db, "Orders"),
      where("orderStatus", "==", "Order"),
      where("orderPhase", "==", selectedPhase)
    );
    const querySnapshot = await getDocs(getDatas);
    querySnapshot.forEach((doc) => {
      var firebaseOrdersBrideName = "";
      var firebaseOrdersGroomName = "";
      var firebaseOrderNames = "";

      var firebaseChildArray = [];

      const firebaseOrdersDocId = doc.id;

      const firebaseOrdersOrderID = doc.data().orderID;
      const firebaseOrdersOrderPhase = doc.data().orderPhase;

      const firebaseOrderCategory = doc.data().organisationCategory;

      if (
        firebaseOrderCategory == 1 ||
        firebaseOrderCategory == 2 ||
        firebaseOrderCategory == 3
      ) {
        firebaseOrdersBrideName = doc.data().brideName;
        firebaseOrdersGroomName = doc.data().groomName;

        firebaseOrderNames =
          firebaseOrdersBrideName + " & " + firebaseOrdersGroomName;
      } else if (firebaseOrderCategory == 4) {
        firebaseOrdersBrideName = doc.data().brideName;
        firebaseOrderNames = firebaseOrdersBrideName + " Gelin";
      } else if (firebaseOrderCategory == 5) {
        firebaseChildArray = doc.data().childNameArrayList;

        firebaseOrderNames = firebaseChildArray.toString();
      }

      let ordersItem = [
        firebaseOrdersDocId,
        firebaseOrderNames,
        firebaseOrdersOrderID,
        firebaseOrdersOrderPhase,
        firebaseOrderCategory,
      ];

      createOrderssArray(ordersItem);
    });
  } else {
    const getDatas = query(
      collection(db, "Orders"),
      where("orderStatus", "==", "Order"),
      where("orderPhase", "==", selectedPhase),
      where(
        "organisationCategory",
        "==",
        parseInt(organisationCategoryFilterFormSelect.value)
      )
    );
    const querySnapshot = await getDocs(getDatas);
    querySnapshot.forEach((doc) => {
      var firebaseOrdersBrideName = "";
      var firebaseOrdersGroomName = "";
      var firebaseOrderNames = "";

      var firebaseChildArray = [];

      const firebaseOrdersDocId = doc.id;

      const firebaseOrdersOrderID = doc.data().orderID;
      const firebaseOrdersOrderPhase = doc.data().orderPhase;

      const firebaseOrderCategory = doc.data().organisationCategory;

      if (
        firebaseOrderCategory == 1 ||
        firebaseOrderCategory == 2 ||
        firebaseOrderCategory == 3
      ) {
        firebaseOrdersBrideName = doc.data().brideName;
        firebaseOrdersGroomName = doc.data().groomName;

        firebaseOrderNames =
          firebaseOrdersBrideName + " & " + firebaseOrdersGroomName;
      } else if (firebaseOrderCategory == 4) {
        firebaseOrdersBrideName = doc.data().brideName;
        firebaseOrderNames = firebaseOrdersBrideName + " Gelin";
      } else if (firebaseOrderCategory == 5) {
        firebaseChildArray = doc.data().childNameArrayList;

        firebaseOrderNames = firebaseChildArray.toString();
      }

      let ordersItem = [
        firebaseOrdersDocId,
        firebaseOrderNames,
        firebaseOrdersOrderID,
        firebaseOrdersOrderPhase,
        firebaseOrderCategory,
      ];

      createOrderssArray(ordersItem);
    });
  }
});

organisationCategoryFilterFormSelect.addEventListener("change", async () => {
  var selectedOrganisation = parseInt(
    organisationCategoryFilterFormSelect.value
  );

  products.innerHTML = "";

  if (orderPhaseFilterFormSelect.value == "0") {
    const getDatas = query(
      collection(db, "Orders"),
      where("orderStatus", "==", "Order"),
      where("organisationCategory", "==", selectedOrganisation)
    );
    const querySnapshot = await getDocs(getDatas);
    querySnapshot.forEach((doc) => {
      var firebaseOrdersBrideName = "";
      var firebaseOrdersGroomName = "";
      var firebaseOrderNames = "";

      var firebaseChildArray = [];

      const firebaseOrdersDocId = doc.id;

      const firebaseOrdersOrderID = doc.data().orderID;
      const firebaseOrdersOrderPhase = doc.data().orderPhase;

      const firebaseOrderCategory = doc.data().organisationCategory;

      if (
        firebaseOrderCategory == 1 ||
        firebaseOrderCategory == 2 ||
        firebaseOrderCategory == 3
      ) {
        firebaseOrdersBrideName = doc.data().brideName;
        firebaseOrdersGroomName = doc.data().groomName;

        firebaseOrderNames =
          firebaseOrdersBrideName + " & " + firebaseOrdersGroomName;
      } else if (firebaseOrderCategory == 4) {
        firebaseOrdersBrideName = doc.data().brideName;
        firebaseOrderNames = firebaseOrdersBrideName + " Gelin";
      } else if (firebaseOrderCategory == 5) {
        firebaseChildArray = doc.data().childNameArrayList;

        firebaseOrderNames = firebaseChildArray.toString();
      }

      let ordersItem = [
        firebaseOrdersDocId,
        firebaseOrderNames,
        firebaseOrdersOrderID,
        firebaseOrdersOrderPhase,
        firebaseOrderCategory,
      ];

      createOrderssArray(ordersItem);
    });
  } else {
    const getDatas = query(
      collection(db, "Orders"),
      where("orderStatus", "==", "Order"),
      where("organisationCategory", "==", selectedOrganisation),
      where("orderPhase", "==", parseInt(orderPhaseFilterFormSelect.value))
    );
    const querySnapshot = await getDocs(getDatas);
    querySnapshot.forEach((doc) => {
      var firebaseOrdersBrideName = "";
      var firebaseOrdersGroomName = "";
      var firebaseOrderNames = "";

      var firebaseChildArray = [];

      const firebaseOrdersDocId = doc.id;

      const firebaseOrdersOrderID = doc.data().orderID;
      const firebaseOrdersOrderPhase = doc.data().orderPhase;

      const firebaseOrderCategory = doc.data().organisationCategory;

      if (
        firebaseOrderCategory == 1 ||
        firebaseOrderCategory == 2 ||
        firebaseOrderCategory == 3
      ) {
        firebaseOrdersBrideName = doc.data().brideName;
        firebaseOrdersGroomName = doc.data().groomName;

        firebaseOrderNames =
          firebaseOrdersBrideName + " & " + firebaseOrdersGroomName;
      } else if (firebaseOrderCategory == 4) {
        firebaseOrdersBrideName = doc.data().brideName;
        firebaseOrderNames = firebaseOrdersBrideName + " Gelin";
      } else if (firebaseOrderCategory == 5) {
        firebaseChildArray = doc.data().childNameArrayList;

        firebaseOrderNames = firebaseChildArray.toString();
      }

      let ordersItem = [
        firebaseOrdersDocId,
        firebaseOrderNames,
        firebaseOrdersOrderID,
        firebaseOrdersOrderPhase,
        firebaseOrderCategory,
      ];

      createOrderssArray(ordersItem);
    });
  }
});

var orderphaseOld;

orderPhaseChangeFormSelect.addEventListener("click", async () => {
  orderphaseOld = orderPhaseChangeFormSelect.value;
});

orderPhaseChangeFormSelect.addEventListener("change", async () => {
  var orderPhaseNew = orderPhaseChangeFormSelect.value;

  if (orderPhaseNew < orderphaseOld) {
    alert(
      "Bir önceki aşamaya dönmek yönetici izni gerektirir. Lütfen yönetici ile iletişime geçin!"
    );

    orderPhaseChangeFormSelect.value = orderphaseOld;
  } else {
    const date = new Date();

    try {
      const updateRef = doc(db, "Orders", updateDocumentId);

      await updateDoc(updateRef, {
        orderPhase: parseInt(orderPhaseNew),
      });
    } catch (error) {}
  }
});
