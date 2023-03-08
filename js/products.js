import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword,signOut } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
import { getStorage, ref, uploadBytes, getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";
import { getFirestore, collection, addDoc, doc, query, where, orderBy, limit, getDocs, updateDoc   } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseapp = initializeApp ({

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
  
        window.location.href ="index.html"
  
    };
  
    
  } );

const btnLogout = document.getElementById("logoutButton");


btnLogout.addEventListener("click",()=> {

  signOut(auth).then(() => {
  window.location.href ="index.html"
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




const products = document.querySelector(".productCard") 

function createProductsArray([ds, proimg, proModelNo, proCategory]) {

  let proCode = `
  <div class="card m-2 d-flex" id="productCardMain" style="width: 15rem;">
  <img class="card-img-top" src=${proimg} alt="${proModelNo}">
  <div class="card-body">
   <h5 class="card-title">${proModelNo}</h5>
   <p class="card-text">${proCategory}</p>
   <a data-key="${ds}" href="#" class="btn btn-danger editBtn" id="producEditBtn">Düzenle</a>
 </div>
</div>

`


  
;

products.innerHTML += proCode;

};


$("body").on("click", ".editBtn", function () {


  var $key = $(this).data("key");

  alert($key + "sad");





})




const q = query(collection(db, "Product"),);

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  
  const firebaseDocId = doc.id;
  const firebaseimg = doc.data().productImgUrl1;
  const firebaseModelNo = doc.data().productModelNo;
  const firebaseCategory = doc.data().productCategory;

  let productItem = [firebaseDocId, firebaseimg,firebaseModelNo,firebaseCategory];



  createProductsArray(productItem);



});

















/*

activityCategoryFormSelect.onchange = function(){

  var categoryValue = activityCategoryFormSelect.value;

   if (categoryValue === "1" || categoryValue === "2") {

    console.log(categoryValue);

    activityDateContainer.style.display = "";
    activityBeginDateContainer.style.display = "none";
    activityEndDateContainer.style.display = "none";
  
  } else if (categoryValue === "3") {
  
    activityDateContainer.style.display = "none";
    activityBeginDateContainer.style.display = "";
    activityEndDateContainer.style.display = "";
  
  }

};

activityTicketFormSelect.onchange = function(){

  var ticketValue = activityTicketFormSelect.value;

   if (ticketValue === "1") {

    console.log("asasda");
    activtyTicketName1TextView.style.display = "none";
    activityTicketPrice1TextView.style.display = "none"; 
    activtyTicketName2TextView.style.display = "none";
    activityTicketPrice2TextView.style.display = "none";
    activtyTicketName3TextView.style.display = "none";
    activityTicketPrice3TextView.style.display = "none";
    activtyTicketName4TextView.style.display = "none";
    activityTicketPrice4TextView.style.display = "none";
   
  
  } else if (ticketValue === "2") {
  
    console.log("tyty");
    ticketContainer1.style.display = "none"  
    activtyTicketName2TextView.style.display = "none";
    activityTicketPrice2TextView.style.display = "none";
    activtyTicketName3TextView.style.display = "none";
    activityTicketPrice3TextView.style.display = "none";
    activtyTicketName4TextView.style.display = "none";
    activityTicketPrice4TextView.style.display = "none";
    
  
  } else if (ticketValue === "3") {
  
    console.log("qwqwq");
    activtyTicketName1TextView.style.display = "";
    activityTicketPrice1TextView.style.display = ""; 
    activtyTicketName2TextView.style.display = "";
    activityTicketPrice2TextView.style.display = "";
    activtyTicketName3TextView.style.display = "none";
    activityTicketPrice3TextView.style.display = "none";
    activtyTicketName4TextView.style.display = "none";
    activityTicketPrice4TextView.style.display = "none";

    activtyTicketName1TextView.value =  "Tam Bilet";
    activtyTicketName1TextView.disabled = true;

    activtyTicketName2TextView.value = "Öğrenci Bilet";
    activtyTicketName2TextView.disabled= true;

    
    
  
  } else if (ticketValue === "4") {
  
    console.log("qwqwq");
    activtyTicketName1TextView.style.display = "";
    activityTicketPrice1TextView.style.display = ""; 
    activtyTicketName2TextView.style.display = "none";
    activityTicketPrice2TextView.style.display = "none";
    activtyTicketName3TextView.style.display = "none";
    activityTicketPrice3TextView.style.display = "none";
    activtyTicketName4TextView.style.display = "none";
    activityTicketPrice4TextView.style.display = "none";

    activtyTicketName1TextView.value = "";
    activtyTicketName1TextView.disabled = false;
    activtyTicketName1TextView.placeholder =  "Bilet Adı";
    
  } else if (ticketValue === "5") {
  
    console.log("qwqwq");
    activtyTicketName1TextView.style.display = "";
    activityTicketPrice1TextView.style.display = ""; 
    activtyTicketName2TextView.style.display = "";
    activityTicketPrice2TextView.style.display = "";
    activtyTicketName3TextView.style.display = "none";
    activityTicketPrice3TextView.style.display = "none";
    activtyTicketName4TextView.style.display = "none";
    activityTicketPrice4TextView.style.display = "none";

    activtyTicketName1TextView.value = "";
    activtyTicketName1TextView.disabled = false;

    activtyTicketName2TextView.value = "";
    activtyTicketName2TextView.disabled = false;

    activtyTicketName1TextView.placeholder =  "Bilet Adı";
    activtyTicketName2TextView.placeholder =  "Bilet Adı";

    
  } else if (ticketValue === "6") {
  
    console.log("qwqwq");
    activtyTicketName1TextView.style.display = "";
    activityTicketPrice1TextView.style.display = ""; 
    activtyTicketName2TextView.style.display = "";
    activityTicketPrice2TextView.style.display = "";
    activtyTicketName3TextView.style.display = "";
    activityTicketPrice3TextView.style.display = "";
    activtyTicketName4TextView.style.display = "none";
    activityTicketPrice4TextView.style.display = "none";

    activtyTicketName1TextView.value = "";
    activtyTicketName1TextView.disabled = false;

    activtyTicketName2TextView.value = "";
    activtyTicketName2TextView.disabled = false;
    activtyTicketName1TextView.placeholder =  "Bilet Adı";
    activtyTicketName2TextView.placeholder =  "Bilet Adı";
    activtyTicketName3TextView.placeholder =  "Bilet Adı";
    
  } else if (ticketValue === "7") {
  
    console.log("qwqwq");
    activtyTicketName1TextView.style.display = "";
    activityTicketPrice1TextView.style.display = ""; 
    activtyTicketName2TextView.style.display = "";
    activityTicketPrice2TextView.style.display = "";
    activtyTicketName3TextView.style.display = "";
    activityTicketPrice3TextView.style.display = "";
    activtyTicketName4TextView.style.display = "";
    activityTicketPrice4TextView.style.display = "";

    activtyTicketName1TextView.value = "";
    activtyTicketName1TextView.disabled = false;

    activtyTicketName2TextView.value = "";
    activtyTicketName2TextView.disabled = false;
    activtyTicketName1TextView.placeholder =  "Bilet Adı";
    activtyTicketName2TextView.placeholder =  "Bilet Adı";
    activtyTicketName3TextView.placeholder =  "Bilet Adı";
    activtyTicketName4TextView.placeholder =  "Bilet Adı";
    
  }

};

activityProtocolCheckBox.addEventListener("change", (event) => {

  if (event.currentTarget.checked) {

  
    activityProtocolSeatTextView.style.display = "";


  } else {

    activityProtocolSeatTextView.style.display = "none";


  }



});


*/



btnProductAdd.addEventListener("click",()=> {

    if (addEditActivityContainer.style.display === "none") {

        
        addEditActivityContainer.style.display = ""
        btnProductAdd.style.visibility ="hidden"

      
        
    } 
})

btnAddProductSuccess.addEventListener("click", async ()=> {

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

  var image1Url; var image2Url; var image3Url; var image4Url; var image5Url; var videoUrl1;


 console.log(productModelNoTextInput.value, productCategorySelectInput.value, productEnvelopeSelectInput.value)
  
if (productModelNoTextInput.value  == "" || productCategorySelectInput.value == "0" || productSubCategorySelectInput.value == "0" || 
productSizeCategorySelectInput.value == "0" || productColorCategorySelectInput == "0" || productEnvelopeSelectInput.value == 0 ||
productTradeMarkSelectInput.value == 0 || productFoilPrintInvitationSelectInput.value == 0 || productFoilPrintTagSelectInput.value == 0 || 
productPriceInput.value == 0) {

    alert("Lütfen bütün kutucukları doldurunuz! Boyut kutucukları boş kalabilir!")


} else {


  if (imageFiles1 == null || imageFiles2 == null) {

  alert("Lütfen vitrin fotoğrafını ve ürüne ait en az 1 fotoğraf ekleyin.");

  } else {

  let storageRef1 = ref(storage, "productImages/" + imageFileName1);
  uploadBytes(storageRef1,imageFiles1).then((snapshot) => {

    getDownloadURL(ref(storage, "productImages/" + imageFileName1 )).then(async (url) =>{

      image1Url = url;

      try {

        const docRef = await addDoc(collection(db,"Product"), {
    
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
          productAddDate: Date.date,
          productAddUser: auth.currentUser.email,
    
          productPrice: productPriceInput.value,
    
          productImgUrl1: image1Url,
          
          
          
        });
    
        console.log("Document written with ID: ", docRef.id);

        try {

          await addDoc(collection(db,"Product/" + docRef.id + "/img"), {

            productImgUrl1: image1Url,
            no : 1,
            
          });
      
          console.log("Document written with ID: ", docRef.id);

          
        } catch (e) {
  
         console.error("Error adding document: ", e);

    
        }


        let storageRef2 = ref(storage, "productImages/" + imageFileName2);
        uploadBytes(storageRef2,imageFiles2).then((snapshot) => {
      
          getDownloadURL(ref(storage, "productImages/" + imageFileName2 )).then(async (url) =>{
      
            image2Url = url;
  
            try {

              await addDoc(collection(db,"Product/" + docRef.id + "/img"), {

                productImgUrl2: image2Url,
                no : 2,
             
         
              });
          
              console.log("Document written with ID: ", docRef.id);
  
              
            } catch (e) {
      
             console.error("Error adding document: ", e);
    
        
            }
          
  
          })
      
        });



        let storageRef3 = ref(storage, "productImages/" + imageFileName3);
        uploadBytes(storageRef3,imageFiles3).then((snapshot) => {
      
          getDownloadURL(ref(storage, "productImages/" + imageFileName3 )).then(async (url) =>{
      
            image3Url = url;

            try {

              await addDoc(collection(db,"Product/" + docRef.id + "/img"), {

               productImgUrl3: image3Url,
               no : 3,
                
              });
          
              console.log("Document written with ID: ", docRef.id);
  
              
            } catch (e) {
      
             console.error("Error adding document: ", e);
    
        
            }

        
          
          })
      
        });


        

        let storageRef4 = ref(storage, "productImages/" + imageFileName4);
        uploadBytes(storageRef4,imageFiles4).then((snapshot) => {
      
          getDownloadURL(ref(storage, "productImages/" + imageFileName4 )).then(async (url) =>{
      
            image4Url = url;

            try {

              await addDoc(collection(db,"Product/" + docRef.id + "/img"), {

                
                productImgUrl4: image4Url,
                no : 4,
                
              });
          
              console.log("Document written with ID: ", docRef.id);
  
              
            } catch (e) {
      
             console.error("Error adding document: ", e);
    
        
            }

           
          
          })
      
        });
        
        
        
        
        let storageRef5 = ref(storage, "productImages/" + imageFileName5);
        uploadBytes(storageRef5,imageFiles5).then((snapshot) => {
      
          getDownloadURL(ref(storage, "productImages/" + imageFileName5 )).then(async (url) =>{
      
            image5Url = url;
            

            try {

              await addDoc(collection(db,"Product/" + docRef.id + "/img"), {

             
                productImgUrl5: image5Url,
                no : 5,
               
         
              });
          
              console.log("Document written with ID: ", docRef.id);
  
              
            } catch (e) {
      
             console.error("Error adding document: ", e);
    
        
            }

         
            
          })
      
        });
        
        
        
        
        
        let storageRef6 = ref(storage, "productImages/" + videoFileName1);
        uploadBytes(storageRef6,videoFiles1).then((snapshot) => {
      
          getDownloadURL(ref(storage, "productImages/" + videoFileName1 )).then(async (url) =>{
      
            videoUrl1 = url;

            try {

              await addDoc(collection(db,"Product/" + docRef.id + "/img"), {

                productvideoUrl1: videoUrl1,
                no : 6,
         
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



btnProductAddCancel.addEventListener("click",()=> {



  
    if (addEditActivityContainer.style.display != "none") {

        addEditActivityContainer.style.display = "none"
        btnProductAdd.style.visibility ="visible"
        window.location.reload();
        
        
    } 


})


btnLogout.addEventListener("click",()=> {

  const auth = getAuth();
signOut(auth).then(() => {
window.location.href ="index.html"
}).catch((error) => {
// An error happened.
});


});
