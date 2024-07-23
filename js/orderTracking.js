import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
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
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getMessaging, onMessage } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js';

const admin = require('firebase-admin');

// Servis hesabı anahtarını buraya ekle
const serviceAccount = require('/Users/fatihkilic/Desktop/SOFTWARE/All App Privacy/UlaQ');



const firebaseapp = initializeApp({

  apiKey: "AIzaSyAgAbd8gSa5cH8t8dPPkkGUV_hsrr4K_Lo",
    authDomain: "ulaq-1e47e.firebaseapp.com",
    projectId: "ulaq-1e47e",
    storageBucket: "ulaq-1e47e.appspot.com",
    messagingSenderId: "790902980229",
    appId: "1:790902980229:web:871d392c9b1aad25fb33ec",
    measurementId: "G-E0J48THPNY"

});

const auth = getAuth(firebaseapp);
const storage = getStorage(firebaseapp);
const db = getFirestore(firebaseapp);




// Firebase Admin SDK'yı başlat
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Bildirim gönderme fonksiyonu
async function sendNotification() {
  const message = {
    notification: {
      title: 'Hello!',
      body: 'This is a test notification from Firebase Cloud Messaging.',
    },
    token: 'dTNjf6TrR4mmYNP9Q3GmZa:APA91bGQg3GJ3QeldZ2A32c2InX1Li2cQlkh88AaOzIGIINlIuYjn9SInT0UJM5P8cxoawN-tLLHx96uBrG8ofCwyFGukXy8KLvRKV-9zVz1fj1MgouLl1teZvE9Kx0tHhjgdv70B6-5', // Alıcının FCM cihaz token'ı
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

// Bildirimi gönder










onAuthStateChanged(auth, user => {

  if (user != null) {

    console.log('logged in')

  } else {

    window.location.href = "index.html"

  };


});



let updateDocumentId = String;

const btnLogout = document.getElementById("logoutButton");
const backToordersButton = document.getElementById("backToordersButton");

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



btnLogout.addEventListener("click", () => {

  signOut(auth).then(() => {
    window.location.href = "index.html"
  }).catch((error) => {

  });


});


backToordersButton.addEventListener("click", () => {

  console.log("tıklandı")

  sendNotification();


});

const products = document.querySelector(".ordersCard")

function createOrderssArray([firebaseOrdersDocId, firebaseOrderNames, firebaseOrdersOrderID, firebaseOrdersOrderPhase, firebaseOrderCategory]) {



  if (firebaseOrdersOrderPhase == "1") {

    let orderPhaseStr = "Beklemede";

    let proCode = `

    <div class="d-flex justify-content-between border rounded-2 m-1"> 
        
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>

    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrderNames}</h6>

    <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>

    <button type="button" class="btn btn-primary editBtn m-2">${orderPhaseStr}</button>


    </div>

    `
    ;

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
  
    `
    ;
  
    products.innerHTML += proCode;
  
  }  




};



$("body").on("click", ".editBtn", async function () {
  
  
    var $key = $(this).data("keys");
    
    updateDocumentId = $key;


  //btnAddEditStatus = "EditProduct"

  if (orderDetailContainer.style.display === "none") {

    
    
    orderDetailContainer.style.display = ""
    orderMainContainer.style.display = "none"
  

  } 



  const docRef = doc(db, "Orders", updateDocumentId);
  const docs = await getDoc(docRef);

  console.log(docRef.$key)

  if (docs.exists()) {

    const firebaseOrdersDocId = docs.id;

   
    const firebaseOrdersOrderID = docs.data().orderID;
    const firebaseOrdersCode = docs.data().orderModelNo;
    const firebaseOrdersPiece = docs.data().orderPiece;
    const firebaseOrdersInvitationPrice = docs.data().invitationPrice;
    const firebaseOrganisationCategory = docs.data().organisationCategory;

    if (firebaseOrganisationCategory == 1 || firebaseOrganisationCategory == 2 || firebaseOrganisationCategory == 3) {

      const firebaseBrideName = docs.data().brideName;
      const firebasebrideSurname = docs.data().brideSurName;
      const firebaseGroomName = docs.data().groomName;
      const firebaseGromSurName = docs.data().groomSurName;
      const firebaseBrideFamily = docs.data().brideFamily;
      const firebaseGroomFamily = docs.data().groomFamily;

    } else if (firebaseOrganisationCategory == 4) {

    } else if (firebaseOrganisationCategory == 5){


      var childArray = [];

      input5.style.display = 'none';
      input5Title.style.display = 'none';

      input6.style.display = 'none';
      input6Title.style.display = 'none';
   
      input1Title.innerHTML = "Çocuk İsimleri"

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

      const firebaseDigitalCode = docs.data().digitalCode;

      const firebaseQrCode = docs.data().QRCode;

      generateQRCode(firebaseQrCode);
      


      const getData = query(collection(db, "Orders",updateDocumentId,"Childs"), orderBy('childNumber', 'asc'));

      const querySnapshot = await getDocs(getData);
      querySnapshot.forEach((doc) => {

         
        const firebasechildnames = doc.data().childName;

        childArray.push(firebasechildnames)

        input1.value = childArray;
   
    

      })

      console.log(doc.id, " => ", childArray);
    

      

    }

    function generateQRCode(firebaseQrCodess) {

      console.log(firebaseQrCodess)
      const text = firebaseQrCodess;
      const qrDiv = document.getElementById("qrcode");
      qrDiv.innerHTML = "";

      const qrcode = new QRCode(qrDiv, {
        text: text,
        width: 2048,
        height: 2048
      });

      setTimeout(() => {
        const qrCanvas = qrDiv.querySelector("canvas");
        if (qrCanvas) {


          const qrImage = new Image();
          qrImage.src = qrCanvas.toDataURL("image/png");
          qrImage.style.width = "256px";  // Görüntü genişliğini ayarla
          qrImage.style.height = "256px"; // Görüntü yüksekliğini ayarla
          qrDiv.innerHTML = ""; // Mevcut içeriği temizle
          qrDiv.appendChild(qrImage); // Görüntüyü ekle

          
        }
      }, 500); // Kısa bir gecikme, QR kodunun oluşturulmasını beklemek için
    }

 

    const firebaseOrdersQrCode = docs.data().QRCode;
    const firebaseOrdersQrCodeImageUrl = docs.data().QRCodeImage;
    const firebaseOrdersVideoUrl = docs.data().videoUrl;
    const firebaseOrdersBrideFamily = docs.data().brideFamily;
    const firebaseOrdersBrideName = docs.data().brideName;
    const firebaseOrdersBrideSurName = docs.data().brideSurName;
    const firebaseOrdersGroomFamily = docs.data().groomFamily;
    const firebaseOrdersGroomName = docs.data().groomName;
    const firebaseOrdersGroomSurName = docs.data().groomSurName;
    const firebaseOrdersInvitationWriting = docs.data().invitationWriting;
    const firebaseOrdersOrderPhase = docs.data().orderPhase;

    const firebaseInvitationFoilPrint = docs.data().invitationFoilPrint;
    const firebaseEnvelopeFoilPrint = docs.data().envelopeFoilPrint;
    const firebaseFoilPrintType = docs.data().foilPrintType;
    const firebaseEnvelopment = docs.data().invitationEnvelopement;
    const firebaseInvitationGuestName = docs.data().invitationGuestName;

    
    ordercodeTextView.value = firebaseOrdersOrderID;
    orderModelNoTextView.value = firebaseOrdersCode;
    orderPieceTextView.value = firebaseOrdersPiece;

    


    /*
    productModelNoTextInput.value = firebaseProductModelNo;
    productCategorySelectInput.value = firebaseProductCategory;
    productSubCategorySelectInput.value = firebaseProductSubCategory;
    productSizeCategorySelectInput.value = firebaseProductSizeCategory;
    productSizeWidthTextInput.value = firebaseProductWidth;
    productSizeHeightTextInput.value = firebaseProductHeight;
    productColorCategorySelectInput.value = firebaseProductColorCategory;
    productEnvelopeSelectInput.value = firebaseProductEnvelope;
    productTradeMarkSelectInput.value = firebaseProductTradeMark;
    productFoilPrintInvitationSelectInput.value = firebaseProductFoilPrintInvitation;
    productFoilPrintTagSelectInput.value = firebaseProductFoilPrintTag;
    productPriceInput.value = firebaseProductPrice;
    img1Preview.src = firebaseProductImgUrl1;
    */



  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }



  const queryImg1 = query(collection(db, "Product", $key, "img"), where("no", "==", 1));

  const snapshotimg1 = await getDocs(queryImg1);

  snapshotimg1.forEach((doc) => {

    console.log(doc.data());

    img1Preview.src = doc.data().productImgUrl;


  })






});



const getData = query(collection(db, "Orders"),where("orderStatus", "==", "Order"));

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

  if (firebaseOrderCategory == 1 || firebaseOrderCategory == 2 || firebaseOrderCategory == 3) {

    firebaseOrdersBrideName = doc.data().brideName;
    firebaseOrdersGroomName = doc.data().groomName;

    firebaseOrderNames = firebaseOrdersBrideName + " & " + firebaseOrdersGroomName;

  } else if (firebaseOrderCategory == 4) {

    firebaseOrdersBrideName = doc.data().brideName;
    firebaseOrderNames = firebaseOrdersBrideName + " Gelin";

  } else if (firebaseOrderCategory == 5) {

    firebaseChildArray = doc.data().childNameArrayList;

    firebaseOrderNames = firebaseChildArray.toString();

  }




  


  let ordersItem = [firebaseOrdersDocId, firebaseOrderNames, firebaseOrdersOrderID, firebaseOrdersOrderPhase, firebaseOrderCategory];

  createOrderssArray(ordersItem);



 


});