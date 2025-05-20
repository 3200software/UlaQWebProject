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

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyAgAbd8gSa5cH8t8dPPkkGUV_hsrr4K_Lo",
  authDomain: "ulaq-1e47e.firebaseapp.com",
  projectId: "ulaq-1e47e",
  storageBucket: "ulaq-1e47e.appspot.com",
  messagingSenderId: "790902980229",
  appId: "1:790902980229:web:871d392c9b1aad25fb33ec",
  measurementId: "G-E0J48THPNY",
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

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

// Oturum durumunu kontrol et
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Kullanıcı giriş yaptı:", user.email);
  } else {
    console.log("Kullanıcı giriş yapmadı");
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

const arPhotoImageInput = document.getElementById("arPhotoImageInput");
const arPhotoImagePreview = document.getElementById("arPhotoImagePreview");
const arphotobutton = document.getElementById("arphotobutton");

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

const designAproveReasonForRejectionText = document.getElementById(
  "designAproveReasonForRejectionText"
);
const designAproveImageInput = document.getElementById(
  "designAproveImageInput"
);
const designAproveImagePreview = document.getElementById(
  "designAproveImagePreview"
);

const designAproveButton = document.getElementById("designAproveButton");

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

designAproveButton.addEventListener("click", function () {
  var designAproveImageFiles = designAproveImageInput.files[0];

  let randomFourDigit = Math.floor(1000 + Math.random() * 9000);

  var designAproveImageFileName =
    ordercodeTextView.value + " - " + randomFourDigit;

  var designAproveImageFileUrl;

  if (designAproveImageFiles == null) {
    alert("Lütfen onay için fotoğraf ekleyin!");
  } else {
    let storageRefDesignAprove = ref(
      storage,
      "designAproveImage/" + designAproveImageFileName
    );

    uploadBytes(storageRefDesignAprove, designAproveImageFiles).then(
      (snapshot) => {
        getDownloadURL(
          ref(storage, "designAproveImage/" + designAproveImageFileName)
        ).then(async (url) => {
          designAproveImageFileUrl = url;

          var date = new Date();

          try {
            const docRef = await addDoc(
              collection(db, "Orders", updateDocumentId, "DesignApproval"),
              {
                imageUrl: url,
                aproveStatus: "1",
                addDate: date,
                reasonForRejection: "",
                answerDate: date,
              }
            );

            const $aproveModal = $("#aproveModal");

            $aproveModal.modal("show");
          } catch (e) {}
        });
      }
    );
  }
});

arphotobutton.addEventListener("click", async function () {
  var arImageFiles = arPhotoImageInput.files[0];
  var folderName = ordercodeTextView.value + "/";

  var arImageFileName = ordercodeTextView.value + "- arPhoto";

  if (arImageFiles == null) {
    alert("Lütfen AR fotografı ekleyin!");
  }

  let storageRefArphoto = ref(storage, folderName + arImageFileName);

  uploadBytes(storageRefArphoto, arImageFiles).then((snapshot) => {
    getDownloadURL(ref(storage, folderName + arImageFileName)).then(
      async (url) => {
        console.log("url " + url);
        try {
          const updateRef = doc(db, "Orders", updateDocumentId);

          await updateDoc(updateRef, {
            invitationImageUrl: url,
          });

          alert("Ar fotoğrafı eklendi!");
        } catch (error) {
          alert("Ar fotoğrafı eklenmedi!");
        }
      }
    );
  });
});

btnLogout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("Kullanıcı çıkış yaptı");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Çıkış yapma hatası:", error);
    });
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



    <button type="button" class="btn btn-primary editBtn m-2">${orderPhaseStr}</button>

        <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>


    </div>

    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "2") {
    let orderPhaseStr = "Onaylandı";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  
  
  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>

      <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
  
    </div>
  
    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "3") {
    let orderPhaseStr = "Tasarlandı";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>
    
    <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
  
    </div>
  
    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "4") {
    let orderPhaseStr = "TOB";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>
  
    <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
    </div>
  
    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "5") {
    let orderPhaseStr = "Tasarım Onaylandı";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  
   
  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>

     <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
  
    </div>
  
    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "6") {
    let orderPhaseStr = "Baskıda";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  
   
  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>

     <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
  
    </div>
  
    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "7") {
    let orderPhaseStr = "Üretimde";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  

  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>

        <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
  
    </div>
  
    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "8") {
    let orderPhaseStr = "Sevkiyat Bekliyor";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  
  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>


    <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
  
    </div>
  
    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "9") {
    let orderPhaseStr = "Kargolandı";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  
  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>


    <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
  
    </div>
  
    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "10") {
    let orderPhaseStr = "Teslim Edildi";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  
  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>


    <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
  
    </div>
  
    `;
    products.innerHTML += proCode;
  } else if (firebaseOrdersOrderPhase == "11") {
    let orderPhaseStr = "İptal";

    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>
  
   
  
    <button type="button" class="btn btn-danger editBtn m-2">${orderPhaseStr}</button>

     <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>
  
  
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
    collection(db, "Orders", updateDocumentId, "DesignApproval"),
    orderBy("addDate", "desc"),
    limit(1)
  );

  const querySnapshot = await getDocs(docRefIA);
  querySnapshot.forEach((docIa) => {
    const latestDoc = querySnapshot.docs[0];

    const firebaseInvAprovalImg = latestDoc.data().imageUrl;
    const firebaseDesignAprovalStatus = latestDoc.data().aproveStatus;
    const firebaseInvestmentAprovalAddDate = latestDoc.data().addDate;
    const firebaseDesignApprovalReasonForRejection =
      latestDoc.data().reasonForRejection;
    const firebaseInvetmentApprovalAnswerDate = latestDoc.data().answerDate;

    designAproveImagePreview.src = firebaseInvAprovalImg;

    console.log(firebaseDesignAprovalStatus + "  sas");

    if (firebaseDesignAprovalStatus == "0") {
    } else if (firebaseDesignAprovalStatus == "1") {
      designAproveReasonForRejectionText.style.display = "";
      designAproveReasonForRejectionText.classList.remove("text-bg-primary");
      designAproveReasonForRejectionText.classList.add("text-bg-warning");
      designAproveReasonForRejectionText.innerHTML = "Onay Bekleniyor";
      designAproveReasonForRejectionText.style.color = "black";
    } else if (firebaseDesignAprovalStatus == "2") {
      designAproveReasonForRejectionText.style.display = "";
      designAproveReasonForRejectionText.classList.remove("text-bg-primary");
      designAproveReasonForRejectionText.classList.add("text-bg-danger");
      designAproveReasonForRejectionText.innerHTML =
        "Red - " + firebaseDesignApprovalReasonForRejection;
      designAproveReasonForRejectionText.style.color = "white";
    } else if (firebaseDesignAprovalStatus == "3") {
      designAproveReasonForRejectionText.style.display = "";
      designAproveReasonForRejectionText.classList.remove("text-bg-primary");
      designAproveReasonForRejectionText.classList.add("text-bg-success");
      designAproveReasonForRejectionText.innerHTML = "Onaylandı";
      designAproveReasonForRejectionText.style.color = "white";
      designAproveReasonForRejectionText.disabled = true;

      designAproveButton.style.display = "none";
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

    const firebaseinvitationImageUrl = docs.data().invitationImageUrl;

    arPhotoImagePreview.src = firebaseinvitationImageUrl;

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

      input1.value = firebaseBrideName;
      input2.value = firebasebrideSurname;
      input3.value = firebaseGroomName;
      input4.value = firebaseGromSurName;
      input5.value = firebaseBrideFamily;
      input6.value = firebaseGroomFamily;
    } else if (firebaseOrganisationCategory == 4) {
      const firebaseBrideName = docs.data().brideName;
      input1.value = firebaseBrideName;

      input2.style.display = "none";
      input2Title.style.display = "none";
      input3.style.display = "none";
      input3Title.style.display = "none";
      input4.style.display = "none";
      input4Title.style.display = "none";

      input5.style.display = "none";
      input5Title.style.display = "none";

      input6.style.display = "none";
      input6Title.style.display = "none";
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
    const firebasechildrenInfo = docs.data().childrenInfo;

    if (firebasechildrenInfo == true) {
      $("#childrenInfotext").css("display", "");
    } else {
      $("#childrenInfotext").css("display", "none");
    }

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

const shippingBoxModal = new bootstrap.Modal(
  document.getElementById("shippingBoxModal")
);
const listPricesButton = document.getElementById("listPricesButton");
const closeModalButton = document.querySelector('[data-bs-dismiss="modal"]');

// Modal'ı açmak için event listener
cargoAddButton.addEventListener("click", () => {
  shippingBoxModal.show();
});

// Kapat düğmesi için event listener
closeModalButton.addEventListener("click", () => {
  shippingBoxModal.hide();
});

// Kargo firmalarını getiren fonksiyon (Firebase Functions üzerinden)
async function getCargoCompanies() {
  try {
    const response = await fetch("/__/functions/getCargoCompanies");
    if (!response.ok) {
      throw new Error("Kargo firmaları alınamadı");
    }
    const companies = await response.json();
    return companies;
  } catch (error) {
    console.error("Hata:", error);
    alert("Kargo firmaları alınırken bir hata oluştu");
    return [];
  }
}

// Fiyat listesini getiren fonksiyon (Firebase Functions üzerinden)
async function getPriceList(packageInfo) {
  try {
    const response = await fetch("/__/functions/getPriceList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(packageInfo),
    });
    if (!response.ok) {
      throw new Error("Fiyat listesi alınamadı");
    }
    const prices = await response.json();
    return prices;
  } catch (error) {
    console.error("Hata:", error);
    alert("Fiyat listesi alınırken bir hata oluştu");
    return [];
  }
}

// Fiyat listesini gösteren fonksiyon
function displayPriceList(prices, companies) {
  const modalBody = document.querySelector("#shippingBoxModal .modal-body");
  const priceListDiv = document.createElement("div");
  priceListDiv.className = "mt-3";
  priceListDiv.innerHTML = '<h6 class="text-primary">Kargo Fiyatları:</h6>';

  const priceTable = document.createElement("table");
  priceTable.className = "table table-striped";
  priceTable.innerHTML = `
    <thead>
      <tr>
        <th>Kargo Firması</th>
        <th>Desi/Kg</th>
        <th>Fiyat (TL)</th>
      </tr>
    </thead>
    <tbody>
  `;

  prices.forEach((price) => {
    const company = companies.find((c) => c.code === price.handlerCode);
    priceTable.innerHTML += `
      <tr>
        <td>${company ? company.name : price.handlerCode}</td>
        <td>${price.desiKg}</td>
        <td>${price.price.toFixed(2)}</td>
      </tr>
    `;
  });

  priceTable.innerHTML += "</tbody>";
  priceListDiv.appendChild(priceTable);

  // Eğer önceki bir fiyat listesi varsa kaldır
  const existingPriceList = modalBody.querySelector(".mt-3");
  if (existingPriceList) {
    existingPriceList.remove();
  }

  modalBody.appendChild(priceListDiv);
}

// ListPricesButton için event listener
listPricesButton.addEventListener("click", async () => {
  const height = document.getElementById("boxHeight").value;
  const width = document.getElementById("boxWidth").value;
  const depth = document.getElementById("boxDepth").value;
  const weight = document.getElementById("boxWeight").value;

  if (!height || !width || !depth || !weight) {
    alert("Lütfen tüm kargo koli bilgilerini giriniz");
    return;
  }

  // Kargo firmalarını al
  const companies = await getCargoCompanies();

  // Paket bilgilerini hazırla
  const packageInfo = {
    height: height,
    width: width,
    depth: depth,
    weight: weight,
  };

  // Fiyat listesini al
  const prices = await getPriceList(packageInfo);

  // Fiyat listesini göster
  displayPriceList(prices, companies);
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
