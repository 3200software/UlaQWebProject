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
} from "hhttps://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const btnLogout = document.getElementById("logoutButton");
const orderDetailContainer = document.getElementById("orderDetailContainer");
const orderMainContainer = document.getElementById("orderMainContainer");


btnLogout.addEventListener("click", () => {

  signOut(auth).then(() => {
    window.location.href = "index.html"
  }).catch((error) => {

  });


});

const products = document.querySelector(".ordersCard")

function createOrderssArray([firebaseOrdersDocId, firebaseOrdersBrideName, firebaseOrdersGroomName, firebaseOrdersOrderID, firebaseOrdersOrderPhase]) {

  let proCode = `

  <div class="d-flex justify-content-between border rounded-2 m-1"> 
        
  <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersOrderID}</h6>

  <h6 class="m-2 p-1" style="padding: 1%;">${firebaseOrdersBrideName} & ${firebaseOrdersGroomName}</h6>

  <button type="button" data-key=' " + ${firebaseOrdersDocId}+ "' class="btn btn-primary editBtn m-2">Düzenle</button>

</div>

`




  ;

  products.innerHTML += proCode;


};



$("body").on("click", ".editBtn", async function () {
  
  //var $key = $(this).data("key");

  console.log("heyyyy")

  //updateDocumentId = $key;

  //btnAddEditStatus = "EditProduct"

  if (orderDetailContainer.style.display === "none") {

    

    orderDetailContainer.style.display = ""
    orderMainContainer.style.display = "none"
    btnProductAdd.style.visibility = "hidden"

  }



  const docRef = doc(db, "Orders", $key);
  const docs = await getDoc(docRef);

  if (docs.exists()) {

    const firebaseOrdersDocId = doc.id;

    const firebaseOrdersUserEmail = doc.data().userEmail;
    const firebaseOrdersAnonymousUser = doc.data().anonymousDeviceId;
    const firebaseOrdersOrderID = doc.data().orderID;
    const firebaseOrdersInvitationCode = doc.data().invitationModelNo;
    const firebaseOrdersInvitationPiece = doc.data().invitationPiece;
    const firebaseOrdersInvitationPrice = doc.data().invitationPrice;

    const firebaseOrdersQrCode = doc.data().QRCode;
    const firebaseOrdersQrCodeImageUrl = doc.data().QRCodeImage;
    const firebaseOrdersVideoUrl = doc.data().videoUrl;
    const firebaseOrdersBrideFamily = doc.data().brideFamily;
    const firebaseOrdersBrideName = doc.data().brideName;
    const firebaseOrdersBrideSurName = doc.data().brideSurName;
    const firebaseOrdersGroomFamily = doc.data().groomFamily;
    const firebaseOrdersGroomName = doc.data().groomName;
    const firebaseOrdersGroomSurName = doc.data().groomSurName;
    const firebaseOrdersInvitationWriting = doc.data().invitationWriting;
    const firebaseOrdersOrderPhase = doc.data().orderPhase;

    const firebaseInvitationFoilPrint = doc.data().invitationFoilPrint;
    const firebaseEnvelopeFoilPrint = doc.data().envelopeFoilPrint;
    const firebaseFoilPrintType = doc.data().foilPrintType;
    const firebaseEnvelopment = doc.data().invitationEnvelopement;
    const firebaseInvitationGuestName = doc.data().invitationGuestName;



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



const getData = query(collection(db, "Orders"), );

const querySnapshot = await getDocs(getData);
querySnapshot.forEach((doc) => {

  const firebaseOrdersDocId = doc.id;
  const firebaseOrdersBrideName = doc.data().brideName;
  const firebaseOrdersGroomName = doc.data().groomName;
  const firebaseOrdersOrderID = doc.data().orderID;
  const firebaseOrdersOrderPhase = doc.data().orderPhase;


  let ordersItem = [firebaseOrdersDocId, firebaseOrdersBrideName, firebaseOrdersGroomName, firebaseOrdersOrderID, firebaseOrdersOrderPhase];

  createOrderssArray(ordersItem);



});