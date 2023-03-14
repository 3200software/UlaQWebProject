import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
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
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseapp = initializeApp({

  apiKey: "AIzaSyAEFTx1TpA0o_cdTpFAviUEO4r2sDS1_Bc",
  authDomain: "ulaq-4be8f.firebaseapp.com",
  projectId: "ulaq-4be8f",
  storageBucket: "ulaq-4be8f.appspot.com",
  messagingSenderId: "4744659662",
  appId: "1:4744659662:web:8d191334a226fbe2f3469f",
  measurementId: "G-MT0PK7J59D"

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


btnLogout.addEventListener("click", () => {

  signOut(auth).then(() => {
    window.location.href = "index.html"
  }).catch((error) => {

  });


});


let mainActivityContainer = document.getElementById("mainContainer");
let addEditActivityContainer = document.getElementById('addEditContainer');

const btnProductAdd = document.getElementById("productAddButton");
const btnProductAddCancel = document.getElementById("productAddCancelButton");
const btnAddProductSuccess = document.getElementById("productAddSuccessButton");


const productModelNoTextInput = document.getElementById("prodcutModelNoTextInput");
const productCategorySelectInput = document.getElementById("productCategorySelectInput");
const productSubCategorySelectInput = document.getElementById("productSubCategorySelectInput");
const productSizeCategorySelectInput = document.getElementById("productSizeCategorySelectInput");
const productSizeWidthTextInput = document.getElementById("productSizeWidthTextInput");
const productSizeHeightTextInput = document.getElementById("productSizeHeightTextInput");
const productColorCategorySelectInput = document.getElementById("productColorCategorySelectInput");
const productEnvelopeSelectInput = document.getElementById("productEnvelopeSelectInput");
const productTradeMarkSelectInput = document.getElementById("productTradeMarkSelectInput");
const productFoilPrintInvitationSelectInput = document.getElementById("productFoilPrintInvitationSelectInput");
const productFoilPrintTagSelectInput = document.getElementById("productFoilPrintTagSelectInput");
const productPriceInput = document.getElementById("productInvitationPrice");
const image1Input = document.getElementById("image1Input");
const image2Input = document.getElementById("image2Input");
const image3Input = document.getElementById("image3Input");
const image4Input = document.getElementById("image4Input");
const image5Input = document.getElementById("image5Input");
const videoInput = document.getElementById("videoInput");

const img1Preview = document.getElementById("img1Preview");
const img2Preview = document.getElementById("img2Prewiev");




const products = document.querySelector(".productCard")

function createProductsArray([proDocId, proimg, proModelNo, proCategory, ]) {

  let proCode = `
  <div class="card m-2 d-flex" id="productCardMain" style="width: 10rem;">
  <img class="card-img-top" src=${proimg} alt="${proModelNo}">
  <div class="card-body">
   <h6 class="card-title">${proModelNo}</h5>
   <p class="card-text">${proCategory}</p>
   <a data-key="${proDocId}" href="#" class="btn btn-danger editBtn" id="producEditBtn">Düzenle</a>
 </div>
</div>

`




  ;

  products.innerHTML += proCode;


};


$("body").on("click", ".editBtn", async function () {


  var $key = $(this).data("key");

  if (addEditActivityContainer.style.display === "none") {

    addEditActivityContainer.style.display = ""
    mainActivityContainer.style.display = "none"
    btnProductAdd.style.visibility = "hidden"

  }

  const docRef = doc(db, "Product", $key);
  const docs = await getDoc(docRef);

  if (docs.exists()) {

    const firebaseDocId = docs.id;
    const firebaseProductModelNo = docs.data().productModelNo;
    const firebaseProductCategory = docs.data().productCategory;
    const firebaseProductSubCategory = docs.data().productSubCategory;
    const firebaseProductSizeCategory = docs.data().productSizeCategory;
    const firebaseProductWidth = docs.data().productWidth;
    const firebaseProductHeight = docs.data().productHeight;
    const firebaseProductColorCategory = docs.data().productColorCategory;
    const firebaseProductEnvelope = docs.data().productEnvelope;
    const firebaseProductTradeMark = docs.data().productTradeMark;
    const firebaseProductFoilPrintInvitation = docs.data().productFoilPrintInvitation;
    const firebaseProductFoilPrintTag = docs.data().productFoilPrintTag;
    const firebaseProductSalesQuantity = docs.data().productSalesQuantity;
    const firebaseProductDeliveryTime = docs.data().productDeliveryTime;
    const firebaseProductStock = docs.data().productStock;
    const firebaseProductFavorites = docs.data().productFavorites;
    const firebaseProductAddDate = docs.data().productAddDate;
    const firebaseProductAddUser = docs.data().productAddUser;

    const firebaseProductPrice = docs.data().productPrice;
    const firebaseProductImgUrl1 = docs.data().productImgUrl1;

    

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



  const queryImg1 = query(collection(db,"Product" , $key , "img") ,  where("no", "==", 2));

  const snapshotimg1 = await getDocs(queryImg1);

  snapshotimg1.forEach((doc) => {

    console.log(doc.data());

    img2Preview.src = doc.data().productImgUrl;


  })

 
 



})




const getData = query(collection(db, "Product"), );

const querySnapshot = await getDocs(getData);
querySnapshot.forEach((doc) => {

  const firebaseDocId = doc.id;
  const firebaseProductModelNo = doc.data().productModelNo;
  const firebaseProductCategory = doc.data().productCategory;
  const firebaseProductImgUrl1 = doc.data().productImgUrl1;

  let productItem = [firebaseDocId, firebaseProductImgUrl1, firebaseProductModelNo, firebaseProductCategory, ];


  createProductsArray(productItem);



});

















/*

activityCategoryFormSelect.onchange = function(){



};

activityTicketFormSelect.onchange = function(){

  var ticketValue = activityTicketFormSelect.value;


};

activityProtocolCheckBox.addEventListener("change", (event) => {





});


*/



btnProductAdd.addEventListener("click", () => {

  if (addEditActivityContainer.style.display === "none") {


    addEditActivityContainer.style.display = ""
    mainActivityContainer.style.display = "none"
    btnProductAdd.style.visibility = "hidden"



  }
})

btnAddProductSuccess.addEventListener("click", async () => {

  var imageFiles1 = image1Input.files[0];
  var imageFiles2 = image2Input.files[0];
  var imageFiles3 = image3Input.files[0];
  var imageFiles4 = image4Input.files[0];
  var imageFiles5 = image5Input.files[0];
  var videoFiles1 = videoInput.files[0];

  var imageFileName1 = productModelNoTextInput.value + "-image1";
  var imageFileName2 = productModelNoTextInput.value + "-image2";
  var imageFileName3 = productModelNoTextInput.value + "-image3";
  var imageFileName4 = productModelNoTextInput.value + "-image4";
  var imageFileName5 = productModelNoTextInput.value + "-image5";
  var videoFileName1 = productModelNoTextInput.value + "-video1"

  var image1Url;
  var image2Url;
  var image3Url;
  var image4Url;
  var image5Url;
  var videoUrl1;


  console.log(productModelNoTextInput.value, productCategorySelectInput.value, productEnvelopeSelectInput.value)

  if (productModelNoTextInput.value == "" || productCategorySelectInput.value == "0" || productSubCategorySelectInput.value == "0" ||
    productSizeCategorySelectInput.value == "0" || productColorCategorySelectInput == "0" || productEnvelopeSelectInput.value == 0 ||
    productTradeMarkSelectInput.value == 0 || productFoilPrintInvitationSelectInput.value == 0 || productFoilPrintTagSelectInput.value == 0 ||
    productPriceInput.value == 0) {

    alert("Lütfen bütün kutucukları doldurunuz! Boyut kutucukları boş kalabilir!")


  } else {


    if (imageFiles1 == null || imageFiles2 == null) {

      alert("Lütfen vitrin fotoğrafını ve ürüne ait en az 1 fotoğraf ekleyin.");

    } else {

      let storageRef1 = ref(storage, "productImages/" + imageFileName1);
      uploadBytes(storageRef1, imageFiles1).then((snapshot) => {

        getDownloadURL(ref(storage, "productImages/" + imageFileName1)).then(async (url) => {

          image1Url = url;

          try {

            const docRef = await addDoc(collection(db, "Product"), {

              productModelNo: productModelNoTextInput.value,
              productCategory: productCategorySelectInput.value,
              productSubCategory: productSubCategorySelectInput.value,
              productSizeCategory: productSizeCategorySelectInput.value,
              productWidth: productSizeWidthTextInput.value,
              productHeight: productSizeHeightTextInput.value,
              productColorCategory: productColorCategorySelectInput.value,
              productEnvelope: productEnvelopeSelectInput.value,
              productTradeMark: productTradeMarkSelectInput.value,
              productFoilPrintInvitation: productFoilPrintInvitationSelectInput.value,
              productFoilPrintTag: productFoilPrintTagSelectInput.value,
              productSalesQuantity: 0,
              productDeliveryTime: 0,
              productStock: 0,
              productFavorites: 0,
              productAddDate: new Date(),
              productAddUser: auth.currentUser.email,

              productPrice: productPriceInput.value,

              productImgUrl1: image1Url,



            });

            console.log("Document written with ID: ", docRef.id);

            try {

              await addDoc(collection(db, "Product/" + docRef.id + "/img"), {

                productImgUrl: image1Url,
                no: 1,

              });

              console.log("Document written with ID: ", docRef.id);


            } catch (e) {

              console.error("Error adding document: ", e);


            }


            let storageRef2 = ref(storage, "productImages/" + imageFileName2);
            uploadBytes(storageRef2, imageFiles2).then((snapshot) => {

              getDownloadURL(ref(storage, "productImages/" + imageFileName2)).then(async (url) => {

                image2Url = url;

                try {

                  await addDoc(collection(db, "Product/" + docRef.id + "/img"), {

                    productImgUrl: image2Url,
                    no: 2,


                  });

                  console.log("Document written with ID: ", docRef.id);


                } catch (e) {

                  console.error("Error adding document: ", e);


                }


              })

            });



            let storageRef3 = ref(storage, "productImages/" + imageFileName3);
            uploadBytes(storageRef3, imageFiles3).then((snapshot) => {

              getDownloadURL(ref(storage, "productImages/" + imageFileName3)).then(async (url) => {

                image3Url = url;

                try {

                  await addDoc(collection(db, "Product/" + docRef.id + "/img"), {

                    productImgUrl: image3Url,
                    no: 3,

                  });

                  console.log("Document written with ID: ", docRef.id);


                } catch (e) {

                  console.error("Error adding document: ", e);


                }



              })

            });




            let storageRef4 = ref(storage, "productImages/" + imageFileName4);
            uploadBytes(storageRef4, imageFiles4).then((snapshot) => {

              getDownloadURL(ref(storage, "productImages/" + imageFileName4)).then(async (url) => {

                image4Url = url;

                try {

                  await addDoc(collection(db, "Product/" + docRef.id + "/img"), {


                    productImgUrl: image4Url,
                    no: 4,

                  });

                  console.log("Document written with ID: ", docRef.id);


                } catch (e) {

                  console.error("Error adding document: ", e);


                }



              })

            });




            let storageRef5 = ref(storage, "productImages/" + imageFileName5);
            uploadBytes(storageRef5, imageFiles5).then((snapshot) => {

              getDownloadURL(ref(storage, "productImages/" + imageFileName5)).then(async (url) => {

                image5Url = url;


                try {

                  await addDoc(collection(db, "Product/" + docRef.id + "/img"), {


                    productImgUrl: image5Url,
                    no: 5,


                  });

                  console.log("Document written with ID: ", docRef.id);


                } catch (e) {

                  console.error("Error adding document: ", e);


                }



              })

            });





            let storageRef6 = ref(storage, "productImages/" + videoFileName1);
            uploadBytes(storageRef6, videoFiles1).then((snapshot) => {

              getDownloadURL(ref(storage, "productImages/" + videoFileName1)).then(async (url) => {

                videoUrl1 = url;

                try {

                  await addDoc(collection(db, "Product/" + docRef.id + "/img"), {

                    productImgUrl: videoUrl1,
                    no: 6,

                  });

                  console.log("Document written with ID: ", docRef.id);


                } catch (e) {

                  console.error("Error adding document: ", e);


                }

              })

            });








          } catch (e) {

            console.error("Error adding document: ", e);

          }



        })

      });

    }


  }

});



btnProductAddCancel.addEventListener("click", () => {

  if (addEditActivityContainer.style.display != "none") {

    addEditActivityContainer.style.display = "none"
    btnProductAdd.style.visibility = "visible"
    window.location.reload();


  }

})


btnLogout.addEventListener("click", () => {

  const auth = getAuth();
  signOut(auth).then(() => {
    window.location.href = "index.html"
  }).catch((error) => {
    // An error happened.
  });


});