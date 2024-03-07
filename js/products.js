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
  deleteDoc,
  onSnapshot,
  deleteField,
  getDoc,
  Timestamp
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
const btnDeleteProduct = document.getElementById("deleteProductButton");

let btnAddEditStatus = String;
let updateDocumentId = String;


const productModelNoTextInput = document.getElementById("prodcutModelNoTextInput");
const productCategorySelectInput = document.getElementById("productCategorySelectInput");
const productThemeSelectInput = document.getElementById("productThemeSelectInput");
const productSizeCategorySelectInput = document.getElementById("productSizeCategorySelectInput");
const productSizeWidthTextInput = document.getElementById("productSizeWidthTextInput");
const productSizeHeightTextInput = document.getElementById("productSizeHeightTextInput");
const productColorCategorySelectInput = document.getElementById("productColorCategorySelectInput");
const productEnvelopeSelectInput = document.getElementById("productEnvelopeSelectInput");
const productTradeMarkSelectInput = document.getElementById("productTradeMarkSelectInput");
const productFoilPrintInvitationSelectInput = document.getElementById("productPrintTypeInvitationSelectInput");
const productFoilPrintTagSelectInput = document.getElementById("productPrintTypeTagSelectInput");
const productTradeMarkModelNo = document.getElementById("tradeMarkModelNoTextInput");
const productTardeMarkSubModelSelectInput = document.getElementById("tradeMarkSubModelSelectInput");
const productCampaignCodeTextInput = document.getElementById("productCampaignCodeTextInput");
const stockAddInput = document.getElementById("stockAddInput");
const productPriceInput = document.getElementById("productPrice");
const productWholeSalePriceInput = document.getElementById("productWholeSalePrice");
const productProfitRateInput = document.getElementById("productProfitRate");
const productProfitInput = document.getElementById("productProfit");
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

const propertiesCheckList = document.getElementById("propertiesCheckList");
const checkekonomik = document.getElementById("checkEkonomik");
const checkVip = document.getElementById("checkVip");
const checkKraftKagit = document.getElementById("checkKraftKagit");
const checkLazerKesim = document.getElementById("checkLazerKesim");
const checkPlexi = document.getElementById("checkPlexi");
const checkAhsap = document.getElementById("checkAhsap");
const checkKabartma = document.getElementById("checkKabartma");
const checkMuhurlu = document.getElementById("checkMuhurlu");
const checkKadife = document.getElementById("checkKadife");
const checkKutulu = document.getElementById("checkKutulu");
const checkIkili = document.getElementById("checkIkili");
const checkIpli = document.getElementById("checkIpli");

const colorCheckList = document.getElementById("colorList");
const colorRed = document.getElementById("colorRed");
const colorGreen = document.getElementById("colorGreen");
const colorBlue = document.getElementById("colorBlue");
const colorYellow = document.getElementById("colorYellow");
const colorBlack = document.getElementById("colorBlack");
const colorWhite = document.getElementById("colorWhite");
const colorBrown = document.getElementById("colorBrown");
const colorBeige = document.getElementById("colorBeige");
const colorOrange = document.getElementById("colorOrange");
const colorPurple = document.getElementById("colorPurple");
const colorPink = document.getElementById("colorPink");
const colorGray = document.getElementById("colorGray");

const productStockInfo = document.getElementById("productStockInfo");
const productSalesInfo = document.getElementById("productSalesInfo");
const productFavoriInfo = document.getElementById("productFavoriInfo");


var checkProductPropertiesArrayList = [];

var productColorArrayList = [];

productProfit.disabled = true;
productStockInfo.disabled = true;
productSalesInfo.disabled = true;
productFavoriInfo.disabled = true;

let firebaseProductImgUrl1 = String;



productWholeSalePriceInput.oninput = function (event) {

  var fiyat = parseFloat(productPriceInput.value);
  var toptanFiyat = parseFloat(productWholeSalePriceInput.value);


  var fark = fiyat - toptanFiyat;

  productProfit.value = fark;

  var oran = fark * 100 / fiyat;

  console.log(oran)

  var oranYuvarla = Math.round(oran)



  productProfitRateInput.value = oranYuvarla;


};


productTradeMarkSelectInput.onchange = function () {

  if (productTradeMarkSelectInput.value == "1") {

    console.log("1")

    productTardeMarkSubModelSelectInput.innerHTML = "";

      var option0 = document.createElement("option");
      option0.text = "Marka Alt Kategori";
      option0.value = "0";
      productTardeMarkSubModelSelectInput.add(option0);

      var option1 = document.createElement("option");
      option1.text = "Wedding";
      option1.value = "1";
      productTardeMarkSubModelSelectInput.add(option1);
      
      var option2 = document.createElement("option");
      option2.text = "Alyans";
      option2.value = "2";
      productTardeMarkSubModelSelectInput.add(option2);
      
      var option3 = document.createElement("option");
      option3.text = "Fenomen";
      option3.value = "3";
      productTardeMarkSubModelSelectInput.add(option3);

      var option4 = document.createElement("option");
      option4.text = "İklim";
      option4.value = "4";
      productTardeMarkSubModelSelectInput.add(option4);

      var option5 = document.createElement("option");
      option5.text = "Sünnet";
      option5.value = "5";
      productTardeMarkSubModelSelectInput.add(option5);
    


  } else if (productTradeMarkSelectInput.value == "2"){

    productTardeMarkSubModelSelectInput.innerHTML = "";

    var option0 = document.createElement("option");
    option0.text = "Marka Alt Kategori";
    option0.value = "0";
    productTardeMarkSubModelSelectInput.add(option0);

    var option1 = document.createElement("option");
    option1.text = "Ekonom";
    option1.value = "1";
    productTardeMarkSubModelSelectInput.add(option1);
    
    var option2 = document.createElement("option");
    option2.text = "ButiQline";
    option2.value = "2";
    productTardeMarkSubModelSelectInput.add(option2);
    
    var option3 = document.createElement("option");
    option3.text = "Erdem";
    option3.value = "3";
    productTardeMarkSubModelSelectInput.add(option3);

    var option4 = document.createElement("option");
    option4.text = "Sünnet";
    option4.value = "4";
    productTardeMarkSubModelSelectInput.add(option4);

    
  }


};






productProfitRateInput.oninput = function (event) {

  var fiyat = parseFloat(productPriceInput.value);

  var karOranı = parseFloat(productProfitRateInput.value)

  var fark = fiyat * karOranı / 100;

  var toptanFiyatFinal = fiyat - fark;

  productProfitInput.value = fark;



  productWholeSalePriceInput.value = toptanFiyatFinal;


  //productProfitRateInput.value(oranString);




}




checkekonomik.onclick = function () {

  if (checkekonomik.checked == true) {

    checkProductPropertiesArrayList.push("1");

  } else {

    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(function (item) {

      return item !== "1";

    });


  }

}


checkVip.onclick = function () {

  if (checkVip.checked == true) {

    checkProductPropertiesArrayList.push("2");

  } else {

    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(function (item) {

      return item !== "2";

    });


  }

}


checkKraftKagit.onclick = function () {

  if (checkKraftKagit.checked == true) {

    checkProductPropertiesArrayList.push("3");

  } else {

    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(function (item) {

      return item !== "3";

    });

  }

}

checkLazerKesim.onclick = function () {

  if (checkLazerKesim.checked == true) {

    checkProductPropertiesArrayList.push("4");

  } else {

    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(function (item) {

      return item !== "4";

    });

  }

}

checkPlexi.onclick = function () {

  if (checkPlexi.checked == true) {

    checkProductPropertiesArrayList.push("5");

  } else {

    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(function (item) {

      return item !== "5";

    });

  }

}

checkAhsap.onclick = function () {

  if (checkAhsap.checked == true) {

    checkProductPropertiesArrayList.push("6");

  } else {

    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(function (item) {

      return item !== "6";

    });

  }

}

checkKabartma.onclick = function () {

  if (checkKabartma.checked == true) {

    checkProductPropertiesArrayList.push("7");

  } else {

    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(function (item) {

      return item !== "7";

    });

  }

}

checkMuhurlu.onclick = function () {

  if (checkMuhurlu.checked == true) {

    checkProductPropertiesArrayList.push("8");

  } else {

    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(function (item) {

      return item !== "8";

    });

  }

}

checkKadife.onclick = function () {

  if (checkKadife.checked == true) {

    checkProductPropertiesArrayList.push("9");

  } else {

    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(function (item) {

      return item !== "9";

    });

  }

}



checkKutulu.onclick = function () {

  if (checkKutulu.checked == true) {

    checkProductPropertiesArrayList.push("10");

  } else {

    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(function (item) {

      return item !== "10";

    });


  }

}

checkIkili.onclick = function () {

  if (checkIkili.checked == true) {

    checkProductPropertiesArrayList.push("11");

  } else {

    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(function (item) {

      return item !== "11";

    });

  }

}

checkIpli.onclick = function () {

  if (checkIpli.checked == true) {

    checkProductPropertiesArrayList.push("12");

    console.log(checkProductPropertiesArrayList)

  } else {

    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(function (item) {

      return item !== "12";

    });
    console.log(checkProductPropertiesArrayList)

  }

}




const products = document.querySelector(".productCard")

function createProductsArray([proDocId, proimg, proModelNo, proCategory, ]) {

  let proCode = `


  <div class="p-2 g-col-6 border rounded-2 m-1 justify-content-between d-flex align-items-center"> 
  
     <img class="m-2 rounded" src="${proimg}" alt="Ürün Resmi" style="width: 150px; height: 100px;">
  
     <h6 class="m-2 p-1" style="padding: 1%; align-items:center;">${proModelNo}</h6>

     <button type="button" data-key=${proDocId} class="btn btn-primary editBtn m-2" style="width: 150px; height: 50px;">Düzenle</button>

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






  const docRef = doc(db, "Product", updateDocumentId);
  const docs = await getDoc(docRef);

  if (docs.exists()) {



    const firebaseDocId = docs.id;
    const firebaseProductModelNo = docs.data().productModelNo;
    const firebaseProductCategory = docs.data().productCategory;
    const firebaseProductThemeSelect = docs.data().productTheme;
    const firebaseProductSizeCategory = docs.data().productSizeCategory;
    const firebaseProductWidth = docs.data().productWidth;
    const firebaseProductHeight = docs.data().productHeight;
    const firebaseProductColorCategory = docs.data().productColorCategory;
    const firebaseProductEnvelope = docs.data().productEnvelope;
    const firebaseProductTradeMark = docs.data().productTradeMark;
    const firebaseProductFoilPrintInvitation = docs.data().productFoilPrintInvitation;
    const firebaseProductFoilPrintTag = docs.data().productFoilPrintTag;
    const firebaseProductTrademarkModelNo = docs.data().productTradeMarkModelNo;
    const firebaseTradeMarkSubModel = docs.data().productTradeMarkSubModel;
    const firebaseProductCampaignCode = docs.data().productCampaignCode;
    const firebaseProductSalesQuantity = docs.data().productSalesQuantity;
    const firebaseProductDeliveryTime = docs.data().productDeliveryTime;
    const firebaseProductStock = docs.data().productStock;
    const firebaseProductFavorites = docs.data().productFavorites;
    const firebaseProductAddDate = docs.data().productAddDate;
    const firebaseProductAddUser = docs.data().productAddUser;

    checkProductPropertiesArrayList = docs.data().productProperties;

    productColorArrayList = docs.data().productColors;

    const firebaseProductPrice = docs.data().productPrice;
    const firebaseProductWholeSalePrice = docs.data().productWholeSalePrice;
    const firebaseProductProfitRate = docs.data().productProfitRate;
    const firebaseProductProfit = docs.data().productProfit;
    firebaseProductImgUrl1 = docs.data().productImgUrl1;


    productModelNoTextInput.value = firebaseProductModelNo;
    productCategorySelectInput.value = firebaseProductCategory;
    productThemeSelectInput.value = firebaseProductThemeSelect;
    productColorArrayList.value = firebaseProductSizeCategory;
    productSizeWidthTextInput.value = firebaseProductWidth;
    productSizeHeightTextInput.value = firebaseProductHeight;
    productColorCategorySelectInput.value = firebaseProductColorCategory;
    productEnvelopeSelectInput.value = firebaseProductEnvelope;
    productTradeMarkSelectInput.value = firebaseProductTradeMark;
    productFoilPrintInvitationSelectInput.value = firebaseProductFoilPrintInvitation;
    productFoilPrintTagSelectInput.value = firebaseProductFoilPrintTag;
    productPriceInput.value = firebaseProductPrice;
    img1Preview.src = firebaseProductImgUrl1;
    productTradeMarkModelNo.value = firebaseProductTrademarkModelNo;
    
    productCampaignCodeTextInput.value = firebaseProductCampaignCode;
    productWholeSalePriceInput.value = firebaseProductWholeSalePrice;
    productProfitRateInput.value = firebaseProductProfitRate;
    productProfitInput.value = firebaseProductProfit;

    productStockInfo.value = parseInt(firebaseProductStock);
    productSalesInfo.value = parseInt(firebaseProductSalesQuantity);
    productFavoriInfo.value = parseInt(firebaseProductFavorites);


    if (productTradeMarkSelectInput.value == "1") {

      productTardeMarkSubModelSelectInput.innerHTML = "";
  
        var option0 = document.createElement("option");
        option0.text = "Marka Alt Kategori";
        option0.value = "0";
        productTardeMarkSubModelSelectInput.add(option0);
  
        var option1 = document.createElement("option");
        option1.text = "Wedding";
        option1.value = "1";
        productTardeMarkSubModelSelectInput.add(option1);
        
        var option2 = document.createElement("option");
        option2.text = "Alyans";
        option2.value = "2";
        productTardeMarkSubModelSelectInput.add(option2);
        
        var option3 = document.createElement("option");
        option3.text = "Fenomen";
        option3.value = "3";
        productTardeMarkSubModelSelectInput.add(option3);
  
        var option4 = document.createElement("option");
        option4.text = "İklim";
        option4.value = "4";
        productTardeMarkSubModelSelectInput.add(option4);
  
        var option5 = document.createElement("option");
        option5.text = "Sünnet";
        option5.value = "5";
        productTardeMarkSubModelSelectInput.add(option5);
      
  
  
    } else if (productTradeMarkSelectInput.value == "2"){
  
      productTardeMarkSubModelSelectInput.innerHTML = "";
  
      var option0 = document.createElement("option");
      option0.text = "Marka Alt Kategori";
      option0.value = "0";
      productTardeMarkSubModelSelectInput.add(option0);
  
      var option1 = document.createElement("option");
      option1.text = "Ekonom";
      option1.value = "1";
      productTardeMarkSubModelSelectInput.add(option1);
      
      var option2 = document.createElement("option");
      option2.text = "ButiQline";
      option2.value = "2";
      productTardeMarkSubModelSelectInput.add(option2);
      
      var option3 = document.createElement("option");
      option3.text = "Erdem";
      option3.value = "3";
      productTardeMarkSubModelSelectInput.add(option3);
  
      var option4 = document.createElement("option");
      option4.text = "Sünnet";
      option4.value = "4";
      productTardeMarkSubModelSelectInput.add(option4);
  
      
    }

    productTardeMarkSubModelSelectInput.value = firebaseTradeMarkSubModel;

    if (checkProductPropertiesArrayList.includes("1")) {

      checkekonomik.checked = true;

    }

    if (checkProductPropertiesArrayList.includes("2")) {

      checkVip.checked = true;

    }

    if (checkProductPropertiesArrayList.includes("3")) {

      checkKraftKagit.checked = true;

    }

    if (checkProductPropertiesArrayList.includes("4")) {

      checkLazerKesim.checked = true;

    }

    if (checkProductPropertiesArrayList.includes("5")) {

      checkPlexi.checked = true;

    }

    if (checkProductPropertiesArrayList.includes("6")) {

      checkAhsap.checked = true;

    }

    if (checkProductPropertiesArrayList.includes("7")) {

      checkKabartma.checked = true;

    }

    if (checkProductPropertiesArrayList.includes("8")) {

      checkMuhurlu.checked = true;

    }

    if (checkProductPropertiesArrayList.includes("9")) {

      checkKadife.checked = true;

    }

    if (checkProductPropertiesArrayList.includes("10")) {

      checkKutulu.checked = true;

    }

    if (checkProductPropertiesArrayList.includes("11")) {

      checkIkili.checked = true;

    }

    if (checkProductPropertiesArrayList.includes("12")) {

      checkIpli.checked = true;

    }


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
    btnDeleteProduct.style.display = "none"

   

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

     if (productModelNoTextInput.value == "" || productCategorySelectInput.value == "0" || productThemeSelectInput.value == "0" ||
      productSizeCategorySelectInput.value == "0" || productEnvelopeSelectInput.value == "0" ||
      productTradeMarkSelectInput.value == "0" || productFoilPrintInvitationSelectInput.value == "0" || productFoilPrintTagSelectInput.value == "0" ||
      productPriceInput.value == "" || productTardeMarkSubModelSelectInput.value == "" || productTradeMarkModelNo.value == "" ||
      productProfitRateInput.value == "" || productWholeSalePriceInput.value == "" || stockAddInput.value == "" || productColorCategorySelectInput.value == "") {


        alert("Lütfen bütün kutucukları doldurunuz! Boyut kutucukları boş kalabilir!")

        if (productModelNoTextInput.value == "") {

          productModelNoTextInput.classList.add("is-invalid");

        } else {

          productModelNoTextInput.classList.remove("is-invalid");

        }

        if (productCategorySelectInput.value == "0") {

          productCategorySelectInput.classList.add("is-invalid");

        } else {

          productCategorySelectInput.classList.remove("is-invalid");

        }

        if (productThemeSelectInput.value == "0") {

          productThemeSelectInput.classList.add("is-invalid");

        } else {

          productThemeSelectInput.classList.remove("is-invalid");

        }

        if (productSizeCategorySelectInput.value == "0") {

          productSizeCategorySelectInput.classList.add("is-invalid");

        } else {

          productSizeCategorySelectInput.classList.remove("is-invalid");

        }

        if (productEnvelopeSelectInput.value == "0") {

          productEnvelopeSelectInput.classList.add("is-invalid");

        } else {

          productEnvelopeSelectInput.classList.remove("is-invalid");

        }

        if (productTradeMarkSelectInput.value == "0") {

          productTradeMarkSelectInput.classList.add("is-invalid");

        } else {

          productTradeMarkSelectInput.classList.remove("is-invalid");

        }

        if (productFoilPrintInvitationSelectInput.value == "0") {

          productFoilPrintInvitationSelectInput.classList.add("is-invalid");

        } else {

          productFoilPrintInvitationSelectInput.classList.remove("is-invalid");

        }

        if (productFoilPrintTagSelectInput.value == "0") {

          productFoilPrintTagSelectInput.classList.add("is-invalid");

        } else {

          productFoilPrintTagSelectInput.classList.remove("is-invalid");

        }

        
        if (productPriceInput.value == "") {

          productPriceInput.classList.add("is-invalid");

        } else {

          productPriceInput.classList.remove("is-invalid");

        }

        
        if (productTardeMarkSubModelSelectInput.value == "") {

          productTardeMarkSubModelSelectInput.classList.add("is-invalid");

        } else {

          productTardeMarkSubModelSelectInput.classList.remove("is-invalid");

        }
      

        if (productTradeMarkModelNo.value == "") {

          productTradeMarkModelNo.classList.add("is-invalid");

        } else {

          productTradeMarkModelNo.classList.remove("is-invalid");

        }

        if (stockAddInput.value == "") {

          stockAddInput.classList.add("is-invalid");

        } else {

          stockAddInput.classList.remove("is-invalid");

        }

        if (productWholeSalePriceInput.value == "") {

          productWholeSalePriceInput.classList.add("is-invalid");

        } else {

          productWholeSalePriceInput.classList.remove("is-invalid");

        }



      } else {

        productModelNoTextInput.classList.remove("is-invalid");
        productCategorySelectInput.classList.remove("is-invalid");
        productThemeSelectInput.classList.remove("is-invalid");
        // silinecek productSizeCategorySelectInput.classList.remove("is-invalid");
        productColorCategorySelectInput.classList.remove("is-invalid");
        productEnvelopeSelectInput.classList.remove("is-invalid");
        productTradeMarkSelectInput.classList.remove("is-invalid");
        productFoilPrintInvitationSelectInput.classList.remove("is-invalid");
        productFoilPrintTagSelectInput.classList.remove("is-invalid");
        productPriceInput.classList.remove("is-invalid");
        productTardeMarkSubModelSelectInput.classList.remove("is-invalid");
        productTradeMarkModelNo.classList.remove("is-invalid");
        stockAddInput.classList.remove("is-invalid");
        productWholeSalePriceInput.classList.remove("is-invalid");


        if (checkekonomik.checked == true || checkVip.checked == true || checkKraftKagit.checked == true || checkLazerKesim.checked == true ||
          checkPlexi.checked == true || checkAhsap.checked == true || checkKabartma.checked == true || checkMuhurlu.checked == true || checkKadife.checked == true ||
          checkKutulu.checked == true || checkIkili.checked == true || checkIpli.checked == true ) {

            propertiesCheckList.classList.remove("border-danger");

                if (imageFiles1 == null || imageFiles2 == null) {
              

                  alert("Lütfen vitrin fotoğrafını ve ürüne ait en az 1 fotoğraf ekleyin.");
          
             
    
                   } else {
          
                  let storageRef1 = ref(storage, "productImages/" + imageFileName1);
                  uploadBytes(storageRef1, imageFiles1).then((snapshot) => {
          
                    getDownloadURL(ref(storage, "productImages/" + imageFileName1)).then(async (url) => {
          
                      image1Url = url;
          
                      var date = new Date();
          
                      var stockAddInteger = parseInt(stockAddInput.value);
          
                      try {
          
                        const docRef = await addDoc(collection(db, "Product"), {
          
                          productModelNo: productModelNoTextInput.value,
                          productTradeMark: productTradeMarkSelectInput.value,
                          productTradeMarkSubModel: productTardeMarkSubModelSelectInput.value,
                          productTradeMarkModelNo: productTradeMarkModelNo.value,
                          productCategory: parseInt(productCategorySelectInput.value),
                          productTheme: productThemeSelectInput.value,
                          productCampaignCode: productCampaignCodeTextInput.value,
                          productSizeCategory: productSizeCategorySelectInput.value,
                          productWidth: productSizeWidthTextInput.value,
                          productHeight: productSizeHeightTextInput.value,
                          productColorCategory: productColorCategorySelectInput.value,
                          productEnvelope: productEnvelopeSelectInput.value,
                          productFoilPrintInvitation: productFoilPrintInvitationSelectInput.value,
                          productFoilPrintTag: productFoilPrintTagSelectInput.value,
                          productSalesQuantity: 0,
                          productStock: stockAddInteger,
                          productFavorites: 0,
                          productProperties: checkProductPropertiesArrayList,
                          productAddDate: Timestamp.fromDate(new Date(date)),
                          productUpdateDate: Timestamp.fromDate(new Date(date)),
                          productAddUser: auth.currentUser.email,
          
                          productPrice: parseFloat(productPriceInput.value),
                          productWholeSalePrice: parseFloat(productWholeSalePriceInput.value),
                          productProfitRate: parseFloat(productProfitRateInput.value),
                          productProfit: parseFloat(productProfitInput.value),
          
                          productImgUrl1: image1Url,
          
          
          
                        });
          
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
          
                                    if (imageFiles3 == null) {
          
                                      image3Url = "";
          
                                    } else {
          
                                      image3Url = url;
          
                                    }
          
                                    try {
          
                                      await addDoc(collection(db, "Product/" + docRef.id + "/img"), {
          
                                        productImgUrl: image3Url,
                                        no: 3,
          
                                      });
          
                                      console.log("Document written with ID: ", imageFileName3);
          
                                      let storageRef4 = ref(storage, "productImages/" + imageFileName4);
                                      uploadBytes(storageRef4, imageFiles4).then((snapshot) => {
          
                                        getDownloadURL(ref(storage, "productImages/" + imageFileName4)).then(async (url) => {
          
                                          if (imageFiles4 == null) {
          
                                            image4Url = "";
          
                                          } else {
          
                                            image4Url = url;
          
                                          }
          
                                          try {
          
                                            await addDoc(collection(db, "Product/" + docRef.id + "/img"), {
          
          
                                              productImgUrl: image4Url,
                                              no: 4,
          
                                            });
          
                                            console.log("Document written with ID: ", imageFileName4);
          
          
                                            let storageRef5 = ref(storage, "productImages/" + imageFileName5);
                                            uploadBytes(storageRef5, imageFiles5).then((snapshot) => {
          
                                              getDownloadURL(ref(storage, "productImages/" + imageFileName5)).then(async (url) => {
          
          
                                                if (imageFiles5 == null) {
          
                                                  image5Url = "";
          
                                                } else {
          
                                                  image5Url = url;
          
                                                }
          
                                                try {
          
                                                  await addDoc(collection(db, "Product/" + docRef.id + "/img"), {
          
          
                                                    productImgUrl: image5Url,
                                                    no: 5,
          
          
                                                  });
          
                                                  console.log("Document written with ID: ", imageFileName5);
          
                                                  let storageRef6 = ref(storage, "productImages/" + videoFileName1);
                                                  uploadBytes(storageRef6, videoFiles1).then((snapshot) => {
          
                                                    getDownloadURL(ref(storage, "productImages/" + videoFileName1)).then(async (url) => {
          
                                                      if (videoFiles1 == null) {
          
                                                        videoUrl1 = "";
          
                                                      } else {
          
                                                        videoUrl1 = url;
          
                                                      }
          
                                                      try {
          
                                                        await addDoc(collection(db, "Product/" + docRef.id + "/img"), {
          
                                                          productImgUrl: videoUrl1,
                                                          no: 6,
          
                                                        });
          
                                                        console.log("Document written with ID: ", videoFileName1);
          
                                                        window.location.href = "products.html"
          
          
          
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

              } else {

                alert("Ne yani bu davetiye renksiz mi? Lütfen renk ekleyin!");
                 colorCheckList.classList.add("border-danger");

                } 
    
      }

  
  } else if (btnAddEditStatus == "EditProduct") {

    let imgUrl = String;

    if (stockAddInput.value != "") {

      var newStock = parseInt(stockAddInput.value) + parseInt(productStockInfo.value);

    } else {

      var newStock = parseInt(productStockInfo.value);

    }

    var date = new Date();

    

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

      await updateDoc(updateRef, {

        productModelNo: productModelNoTextInput.value,
        productTradeMarkModelNo: productTradeMarkModelNo.value,
        productCategory: parseInt(productCategorySelectInput.value),
        productThemeSelectInput: productThemeSelectInput.value,
        productSizeCategory: productSizeCategorySelectInput.value,
        productTradeMarkSubModel: productTardeMarkSubModelSelectInput.value,
        productCampaignCode: productCampaignCodeTextInput.value,
        productWidth: productSizeWidthTextInput.value,
        productHeight: productSizeHeightTextInput.value,
        productColorCategory: productColorCategorySelectInput.value,
        productEnvelope: productEnvelopeSelectInput.value,
        productTradeMark: productTradeMarkSelectInput.value,
        productFoilPrintInvitation: productFoilPrintInvitationSelectInput.value,
        productFoilPrintTag: productFoilPrintTagSelectInput.value,
        productProperties: checkProductPropertiesArrayList,
        productUpdateDate: Timestamp.fromDate(new Date(date)),
        productStock: newStock,

        productPrice: parseFloat(productPriceInput.value),
        productWholeSalePrice: parseFloat(productWholeSalePriceInput.value),
        productProfitRate: parseFloat(productProfitRateInput.value),
        productProfit: parseFloat(productProfitInput.value),
        productSalesQuantity: 0,

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

      window.location.reload();



    } catch (e) {

      console.error("Error adding document: ", e);


    }






  }

});


btnDeleteProduct.addEventListener("click", async () => {

  await deleteDoc(doc(db, "Product", updateDocumentId));
  window.location.reload();

})



btnProductAddCancel.addEventListener("click", () => {

  if (addEditActivityContainer.style.display != "none") {

    addEditActivityContainer.style.display = "none"
    btnProductAdd.style.visibility = "visible"
    window.location.reload();


  }

})


productModelNoTextInput.onchange = function () {

  const q = query(collection(db, "Product"), where("productModelNo", "==", productModelNoTextInput.value));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const ProductsModelNoArray = [];
    querySnapshot.forEach((doc) => {
      ProductsModelNoArray.push(doc.data().productModelNo);

     });

     if(ProductsModelNoArray.length != 0) {
      

      alert("Bu model adı daha önce eklenmiş. Lütfen farklı bir model adı giriniz.")
      productModelNoTextInput.classList.add("is-invalid")
      productModelNoTextInput.value = ""


    } else {

      productModelNoTextInput.classList.remove("is-invalid")
      

    }

    

  });

}

productTradeMarkModelNo.onchange = function () {

  const q = query(collection(db, "Product"), where("productModelNo", "==", productModelNoTextInput.value), where("productTradeMark", "==", productTradeMarkSelectInput.value),  where("productTradeMarkSubModel", "==", productTardeMarkSubModelSelectInput.value) );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const TaradeMarkModelNoArray = [];
    querySnapshot.forEach((doc) => {
      TaradeMarkModelNoArray.push(doc.data().productModelNo);

     });

     if(TaradeMarkModelNoArray.length != 0) {

      alert("Bu ürün daha önce eklenmiş. Lütfen farklı bir ürün giriniz.")
      productTradeMarkModelNo.classList.add("is-invalid")
      productTradeMarkModelNo.value = ""


    
      

    } else {

      productTradeMarkModelNo.classList.remove("is-invalid")
      
     

    }

    

  });

}


btnLogout.addEventListener("click", () => {

  const auth = getAuth();
  signOut(auth).then(() => {
    window.location.href = "index.html"
  }).catch((error) => {
    // An error happened.
  });


});