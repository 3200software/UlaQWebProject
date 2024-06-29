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

onAuthStateChanged(auth, user => {

  if (user != null) {

    console.log('logged in')

  } else {

    window.location.href = "index.html"

  };


});

let updateDocumentId = String;

const btnLogout = document.getElementById("logoutButton");
const orderDetailContainer = document.getElementById("orderDetailContainer");
const orderMainContainer = document.getElementById("orderMainContainer");
const ordercodeTextView = document.getElementById("orderCodeTextInput");
const orderModelNoTextView = document.getElementById("orderModelNoTextView"); 
const orderPieceTextView = document.getElementById("orderPieceTextView");


btnLogout.addEventListener("click", () => {

  signOut(auth).then(() => {
    window.location.href = "index.html"
  }).catch((error) => {

  });


});

const products = document.querySelector(".ordersCard")

function createOrderssArray([firebaseOrdersDocId, firebaseOrdersBrideName, firebaseOrdersGroomName, firebaseOrdersOrderID, orderPhaseStr]) {


  if (orderPhaseStr == "Beklemede") {



  let proCode = `

  <div class="d-flex justify-content-between border rounded-2 m-1"> 
        
  <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>

  <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersBrideName} & ${firebaseOrdersGroomName}</h6>

  <button type="button" data-keys=${firebaseOrdersDocId} class="btn btn-primary editBtn m-2">Düzenle</button>

  <button type="button" class="btn btn-primary editBtn m-2">${orderPhaseStr}</button>


</div>

`
 ;

 products.innerHTML += proCode;

  } if (orderPhaseStr == "") {



    let proCode = `
  
    <div class="d-flex justify-content-between border rounded-2 m-1"> 
          
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>
  
    <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersBrideName} & ${firebaseOrdersGroomName}</h6>
  
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






})

let orderPhaseStr = "";

const getData = query(collection(db, "Orders"),where("orderStatus", "==", "Order"));

const querySnapshot = await getDocs(getData);
querySnapshot.forEach((doc) => {
  

  const firebaseOrdersDocId = doc.id;
  const firebaseOrdersBrideName = doc.data().brideName;
  const firebaseOrdersGroomName = doc.data().groomName;
  const firebaseOrdersOrderID = doc.data().orderID;
  const firebaseOrdersOrderPhase = doc.data().orderPhase;

  

  if (firebaseOrdersOrderPhase == 1 ) {

    orderPhaseStr = "Beklemede";
    console.log("order" + orderPhaseStr)

  }


  


  let ordersItem = [firebaseOrdersDocId, firebaseOrdersBrideName, firebaseOrdersGroomName, firebaseOrdersOrderID, orderPhaseStr];

  createOrderssArray(ordersItem);



});