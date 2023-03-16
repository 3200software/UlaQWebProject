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
const btnAddEditProductSuccess = document.getElementById("productAddSuccessButton");

let btnAddEditStatus = String;
let updateDocumentId = String;


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
const img2Preview = document.getElementById("img2Preview");
const img3Preview = document.getElementById("img3Preview");
const img4Preview = document.getElementById("img4Preview");
const img5Preview = document.getElementById("img5Preview");
const videoPreview = document.getElementById("videoPreview");

let firebaseProductImgUrl1 = String;




const products = document.querySelector(".productCard")

function createProductsArray([proDocId, proimg, proModelNo, proCategory, ]) {

  let proCode = `

  <div class="d-flex justify-content-between border rounded-2 m-1"> 
        
  <h6 class="m-2 p-1" style="padding: 1%;">${proModelNo}</h6>

  <button type="button" class="btn btn-primary editBtn m-2">Düzenle</button>

</div>

`




  ;

  products.innerHTML += proCode;


};




$("body").on("click", ".editBtn", async function () {


  var $key = $(this).data("key");

  updateDocumentId = $key;

  btnAddEditStatus = "EditProduct"

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
    firebaseProductImgUrl1 = docs.data().productImgUrl1;



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


  const queryImg2 = query(collection(db, "Product", $key, "img"), where("no", "==", 2));

  const snapshotimg2 = await getDocs(queryImg2);

  snapshotimg2.forEach((doc) => {

    console.log(doc.data());

    img2Preview.src = doc.data().productImgUrl;


  })

  const queryImg3 = query(collection(db, "Product", $key, "img"), where("no", "==", 3));

  const snapshotimg3 = await getDocs(queryImg3);

  snapshotimg3.forEach((doc) => {

    console.log(doc.data());

    img3Preview.src = doc.data().productImgUrl;


  })


  const queryImg4 = query(collection(db, "Product", $key, "img"), where("no", "==", 4));

  const snapshotimg4 = await getDocs(queryImg4);

  snapshotimg4.forEach((doc) => {

    console.log(doc.data());

    img4Preview.src = doc.data().productImgUrl;


  })

  const queryImg5 = query(collection(db, "Product", $key, "img"), where("no", "==", 5));

  const snapshotimg5 = await getDocs(queryImg5);

  snapshotimg5.forEach((doc) => {

    console.log(doc.data());

    img5Preview.src = doc.data().productImgUrl;


  })

  const queryVideo = query(collection(db, "Product", $key, "img"), where("no", "==", 6));

  const snapshotVideo = await getDocs(queryVideo);

  snapshotVideo.forEach((doc) => {

    console.log(doc.data());

    videoPreview.src = doc.data().productImgUrl;


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

    img1Preview.style.display = "none"
    img2Preview.style.display = "none"
    img3Preview.style.display = "none"
    img4Preview.style.display = "none"
    img5Preview.style.display = "none"
    videoPreview.style.display = "none"

    btnAddEditStatus = "AddProduct"



  }
})

btnAddEditProductSuccess.addEventListener("click", async () => {

  console.log(btnAddEditStatus);

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


  if (btnAddEditStatus == "AddProduct") {



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

                console.log("Document written with ID: ", imageFileName1);

                let storageRef2 = ref(storage, "productImages/" + imageFileName2);
                uploadBytes(storageRef2, imageFiles2).then((snapshot) => {

                  getDownloadURL(ref(storage, "productImages/" + imageFileName2)).then(async (url) => {

                    image2Url = url;

                    try {

                      await addDoc(collection(db, "Product/" + docRef.id + "/img"), {

                        productImgUrl: image2Url,
                        no: 2,


                      });

                      console.log("Document written with ID: ", imageFileName2);

                      let storageRef3 = ref(storage, "productImages/" + imageFileName3);
                      uploadBytes(storageRef3, imageFiles3).then((snapshot) => {

                        getDownloadURL(ref(storage, "productImages/" + imageFileName3)).then(async (url) => {

                          image3Url = url;

                          try {

                            await addDoc(collection(db, "Product/" + docRef.id + "/img"), {

                              productImgUrl: image3Url,
                              no: 3,

                            });

                            console.log("Document written with ID: ", imageFileName3);

                            let storageRef4 = ref(storage, "productImages/" + imageFileName4);
                            uploadBytes(storageRef4, imageFiles4).then((snapshot) => {

                              getDownloadURL(ref(storage, "productImages/" + imageFileName4)).then(async (url) => {

                                image4Url = url;

                                try {

                                  await addDoc(collection(db, "Product/" + docRef.id + "/img"), {


                                    productImgUrl: image4Url,
                                    no: 4,

                                  });

                                  console.log("Document written with ID: ", imageFileName4);


                                  let storageRef5 = ref(storage, "productImages/" + imageFileName5);
                                  uploadBytes(storageRef5, imageFiles5).then((snapshot) => {

                                    getDownloadURL(ref(storage, "productImages/" + imageFileName5)).then(async (url) => {

                                      image5Url = url;


                                      try {

                                        await addDoc(collection(db, "Product/" + docRef.id + "/img"), {


                                          productImgUrl: image5Url,
                                          no: 5,


                                        });

                                        console.log("Document written with ID: ", imageFileName5);

                                        let storageRef6 = ref(storage, "productImages/" + videoFileName1);
                                        uploadBytes(storageRef6, videoFiles1).then((snapshot) => {
                          
                                          getDownloadURL(ref(storage, "productImages/" + videoFileName1)).then(async (url) => {
                          
                                            videoUrl1 = url;
                          
                                            try {
                          
                                              await addDoc(collection(db, "Product/" + docRef.id + "/img"), {
                          
                                                productImgUrl: videoUrl1,
                                                no: 6,
                          
                                              });
                          
                                              console.log("Document written with ID: ", videoFileName1);

                                              window.location.href ="products.html"
                                              
                                              
                          
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


                    } catch (e) {

                      console.error("Error adding document: ", e);


                    }


                  })

                });


              } catch (e) {

                console.error("Error adding document: ", e);


              }




















        








            } catch (e) {

              console.error("Error adding document: ", e);

            }



          })

        });

      }


    }




  } else if (btnAddEditStatus == "EditProduct") {

    let imgUrl = String;

    if (imageFiles1 == null) {

      imgUrl = firebaseProductImgUrl1;

    } else {

      let storageRef1 = ref(storage, "productImages/" + imageFileName1);
      uploadBytes(storageRef1, imageFiles1).then((snapshot) => {

        getDownloadURL(ref(storage, "productImages/" + imageFileName1)).then(async (url) => {

          imgUrl = url;

        })

      });

    }

    try {

      const updateRef = doc(db, "Product", updateDocumentId);

      // Set the "capital" field of the city 'DC'
      await updateDoc(updateRef, {

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

        productPrice: productPriceInput.value,

        productImgUrl1: imgUrl,

      });

      if (imageFiles1 != null) {

        let storageRef1 = ref(storage, "productImages/" + imageFileName1);
        uploadBytes(storageRef1, imageFiles1).then((snapshot) => {

          getDownloadURL(ref(storage, "productImages/" + imageFileName1)).then(async (url) => {

            image1Url = url;


            try {

              const updateRef = doc(collection(db, "Product", updateDocumentId, "img"), where("no", "==", 4));

              await updateDoc(updateRef, {


                productImgUrl: image1Url,



              });

              console.log("Document written with ID: ", docRef.id);


            } catch (e) {

              console.error("Error adding document: ", e);


            }



          })

        });

      }


      if (imageFiles2 != null) {

        let storageRef2 = ref(storage, "productImages/" + imageFileName2);
        uploadBytes(storageRef2, imageFiles2).then((snapshot) => {

          getDownloadURL(ref(storage, "productImages/" + imageFileName2)).then(async (url) => {

            image2Url = url;


            try {

              const updateRef = doc(db, "Product", updateDocumentId, "img", where("no", "==", 2));

              await updateDoc(updateRef, {


                productImgUrl: image2Url,



              });

              console.log("Document written with ID: ", docRef.id);


            } catch (e) {

              console.error("Error adding document: ", e);


            }



          })

        });

      }

      if (imageFiles3 != null) {

        let storageRef3 = ref(storage, "productImages/" + imageFileName3);
        uploadBytes(storageRef3, imageFiles3).then((snapshot) => {

          getDownloadURL(ref(storage, "productImages/" + imageFileName3)).then(async (url) => {

            image3Url = url;


            try {

              const updateRef = doc(db, "Product", updateDocumentId, "img", where("no", "==", 3));

              await updateDoc(updateRef, {


                productImgUrl: image3Url,



              });

              console.log("Document written with ID: ", docRef.id);


            } catch (e) {

              console.error("Error adding document: ", e);


            }



          })

        });

      }

      if (imageFiles4 != null) {

        let storageRef4 = ref(storage, "productImages/" + imageFileName4);
        uploadBytes(storageRef4, imageFiles4).then((snapshot) => {

          getDownloadURL(ref(storage, "productImages/" + imageFileName4)).then(async (url) => {

            image4Url = url;


            try {

              const updateRef = doc(collection(db, "Product", updateDocumentId, "img"), where("no", "==", 4));

              await updateDoc(updateRef, {


                productImgUrl: image4Url,



              });

              console.log("Document written with ID: ", docRef.id);


            } catch (e) {

              console.error("Error adding document: ", e);


            }



          })

        });

      }

      if (imageFiles5 != null) {

        let storageRef5 = ref(storage, "productImages/" + imageFileName5);
        uploadBytes(storageRef5, imageFiles5).then((snapshot) => {

          getDownloadURL(ref(storage, "productImages/" + imageFileName5)).then(async (url) => {

            image5Url = url;


            try {

              const updateRef = doc(db, "Product", updateDocumentId, "img", where("no", "==", 5));

              await updateDoc(updateRef, {


                productImgUrl: image5Url,



              });

              console.log("Document written with ID: ", docRef.id);


            } catch (e) {

              console.error("Error adding document: ", e);


            }



          })

        });

      }

      if (videoFiles1 != null) {

        let storageRef6 = ref(storage, "productImages/" + videoFileName1);
        uploadBytes(storageRef6, videoFiles1).then((snapshot) => {

          getDownloadURL(ref(storage, "productImages/" + videoFileName1)).then(async (url) => {

            videoUrl1 = url;


            try {

              const updateRef = doc(db, "Product", updateDocumentId, "img", where("no", "==", 1));

              await updateDoc(updateRef, {


                productImgUrl: videoUrl1,



              });

              console.log("Document written with ID: ", docRef.id);


            } catch (e) {

              console.error("Error adding document: ", e);


            }



          })

        });

      }




    } catch (e) {

      console.error("Error adding document: ", e);


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