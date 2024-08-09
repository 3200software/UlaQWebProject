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
  deleteObject,
} from "https://www.gstatic.com/firebasejs/10.12.2//firebase-storage.js";
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
  Timestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    user.email;

    console.log("logged in" + user.email);
  } else {
    window.location.href = "index.html";
  }
});

const btnLogout = document.getElementById("logoutButton");

btnLogout.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {});
});

const productPagesOfCanvassButton = document.getElementById("productsPages");

let mainActivityContainer = document.getElementById("mainContainer");
let addEditActivityContainer = document.getElementById("addEditContainer");

const btnProductAdd = document.getElementById("productAddButton");
const btnProductAddCancel = document.getElementById("productAddCancelButton");
const btnAddEditProductSuccess = document.getElementById(
  "productAddSuccessButton"
);
const btnDeleteProduct = document.getElementById("deleteProductButton");

let btnAddEditStatus = String;
let updateDocumentId = String;

const productModelNoTextInput = document.getElementById(
  "prodcutModelNoTextInput"
);
const productCategorySelectInput = document.getElementById(
  "productCategorySelectInput"
);
const productSizeCategorySelectInput = document.getElementById(
  "productSizeCategorySelectInput"
);
const productSizeWidthTextInput = document.getElementById(
  "productSizeWidthTextInput"
);
const productSizeHeightTextInput = document.getElementById(
  "productSizeHeightTextInput"
);
const productColorSelectInput = document.getElementById(
  "productColorSelectInput"
);
const productEnvelopeSelectInput = document.getElementById(
  "productEnvelopeSelectInput"
);
const productTradeMarkSelectInput = document.getElementById(
  "productTradeMarkSelectInput"
);
const productInvitationPrintTypeSelectInput = document.getElementById(
  "productInvitationPrintTypeSelectInput"
);
const productEnvelopePrintTypeSelectInput = document.getElementById(
  "productEnvelopePrintTypeSelectInput"
);
const productTradeMarkModelNo = document.getElementById(
  "tradeMarkModelNoTextInput"
);
const productTardeMarkSubModelSelectInput = document.getElementById(
  "tradeMarkSubModelSelectInput"
);
const productCampaignCodeTextInput = document.getElementById(
  "productCampaignCodeTextInput"
);
const stockAddInput = document.getElementById("stockAddInput");
const productPriceInput = document.getElementById("productPrice");
const productWholeSalePriceInput = document.getElementById(
  "productWholeSalePrice"
);
const productProfitRateInput = document.getElementById("productProfitRate");
const productProfitInput = document.getElementById("productProfit");
const image1Input = document.getElementById("image1Input");
const image2Input = document.getElementById("image2Input");
const image3Input = document.getElementById("image3Input");
const image4Input = document.getElementById("image4Input");
const image5Input = document.getElementById("image5Input");
const videoInput = document.getElementById("videoInput");

const productContainer = document.getElementById("productContainer");
const deleteContainer = document.getElementById("deleteContainer");
const productDeleteCanceButton = document.getElementById(
  "productDeleteCancelButton"
);
const productDeleteDeleteButon = document.getElementById(
  "productDeleteDeletButton"
);

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
const checkPlexi = document.getElementById("checkPlexi");
const checkAhsap = document.getElementById("checkAhsap");
const checkMuhurlu = document.getElementById("checkMuhurlu");
const checkKadife = document.getElementById("checkKadife");
const checkKutulu = document.getElementById("checkKutulu");
const checkIkili = document.getElementById("checkIkili");
const checkIpli = document.getElementById("checkIpli");

const themeCheckList = document.getElementById("themeCheckList");
const checkKlasik = document.getElementById("checkKlasik");
const checkModern = document.getElementById("checkModern");
const checkMinimal = document.getElementById("checkMinimal");
const checkTrend = document.getElementById("checkTrend");
const checkDoga = document.getElementById("checkDoga");
const checkDini = document.getElementById("checkDini");
const checkNostalji = document.getElementById("checkNostalji");
const checkIlginc = document.getElementById("checkIlginc");
const checkSpor = document.getElementById("checkSpor");
const checkKarikatür = document.getElementById("checkKarikatür");

const hueCheckList = document.getElementById("hueList");
const checkWhite = document.getElementById("checkWhite");
const checkRed = document.getElementById("checkRed");
const checkYellow = document.getElementById("checkYellow");
const checkBlue = document.getElementById("checkBlue");
const checkBlack = document.getElementById("checkBlack");
const checkPurple = document.getElementById("checkPurple");
const checkOrange = document.getElementById("checkOrange");
const checkGreen = document.getElementById("checkGreen");

const productStockInfo = document.getElementById("productStockInfo");
const productSalesInfo = document.getElementById("productSalesInfo");
const productFavoriInfo = document.getElementById("productFavoriInfo");

var imgUrl1 = "";
var imgUrl2 = "";
var imgUrl3 = "";
var imgUrl4 = "";
var imgUrl5 = "";
var videoUrl = "";

var imgDocId1 = "";
var imgDocId2 = "";
var imgDocId3 = "";
var imgDocId4 = "";
var imgDocId5 = "";
var videoDocId = "";

var checkProductPropertiesArrayList = [];

var checkThemeArrayList = [];

var checkHueArrayList = [];

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

  var oran = (fark * 100) / fiyat;

  console.log(oran);

  var oranYuvarla = Math.round(oran);

  productProfitRateInput.value = oranYuvarla;
};

productTradeMarkSelectInput.onchange = function () {
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
  } else if (productTradeMarkSelectInput.value == "2") {
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

  var karOranı = parseFloat(productProfitRateInput.value);

  var fark = (fiyat * karOranı) / 100;

  var toptanFiyatFinal = fiyat - fark;

  productProfitInput.value = fark;

  productWholeSalePriceInput.value = toptanFiyatFinal;

  //productProfitRateInput.value(oranString);
};

//HueList

checkWhite.onclick = function () {
  if (checkWhite.checked == true) {
    checkHueArrayList.push("1");
  } else {
    checkHueArrayList = checkHueArrayList.filter(function (item) {
      return item !== "1";
    });
  }
};

checkRed.onclick = function () {
  if (checkRed.checked == true) {
    checkHueArrayList.push("2");
  } else {
    checkHueArrayList = checkHueArrayList.filter(function (item) {
      return item !== "2";
    });
  }
};

checkYellow.onclick = function () {
  if (checkYellow.checked == true) {
    checkHueArrayList.push("3");
  } else {
    checkHueArrayList = checkHueArrayList.filter(function (item) {
      return item !== "3";
    });
  }
};

checkBlue.onclick = function () {
  if (checkBlue.checked == true) {
    checkHueArrayList.push("4");
  } else {
    checkHueArrayList = checkHueArrayList.filter(function (item) {
      return item !== "4";
    });
  }
};

checkBlack.onclick = function () {
  if (checkBlack.checked == true) {
    checkHueArrayList.push("5");
  } else {
    checkHueArrayList = checkHueArrayList.filter(function (item) {
      return item !== "5";
    });
  }
};

checkPurple.onclick = function () {
  if (checkPurple.checked == true) {
    checkHueArrayList.push("6");
  } else {
    checkHueArrayList = checkHueArrayList.filter(function (item) {
      return item !== "6";
    });
  }
};

checkOrange.onclick = function () {
  if (checkOrange.checked == true) {
    checkHueArrayList.push("7");
  } else {
    checkHueArrayList = checkHueArrayList.filter(function (item) {
      return item !== "7";
    });
  }
};

checkGreen.onclick = function () {
  if (checkGreen.checked == true) {
    checkHueArrayList.push("8");
  } else {
    checkHueArrayList = checkHueArrayList.filter(function (item) {
      return item !== "8";
    });
  }
};

// productproPerties List
checkekonomik.onclick = function () {
  if (checkekonomik.checked == true) {
    checkProductPropertiesArrayList.push("1");
  } else {
    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(
      function (item) {
        return item !== "1";
      }
    );
  }
};

checkVip.onclick = function () {
  if (checkVip.checked == true) {
    checkProductPropertiesArrayList.push("2");
  } else {
    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(
      function (item) {
        return item !== "2";
      }
    );
  }
};

checkKraftKagit.onclick = function () {
  if (checkKraftKagit.checked == true) {
    checkProductPropertiesArrayList.push("3");
  } else {
    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(
      function (item) {
        return item !== "3";
      }
    );
  }
};

checkPlexi.onclick = function () {
  if (checkPlexi.checked == true) {
    checkProductPropertiesArrayList.push("4");
  } else {
    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(
      function (item) {
        return item !== "4";
      }
    );
  }
};

checkAhsap.onclick = function () {
  if (checkAhsap.checked == true) {
    checkProductPropertiesArrayList.push("5");
  } else {
    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(
      function (item) {
        return item !== "5";
      }
    );
  }
};

checkMuhurlu.onclick = function () {
  if (checkMuhurlu.checked == true) {
    checkProductPropertiesArrayList.push("6");
  } else {
    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(
      function (item) {
        return item !== "6";
      }
    );
  }
};

checkKadife.onclick = function () {
  if (checkKadife.checked == true) {
    checkProductPropertiesArrayList.push("7");
  } else {
    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(
      function (item) {
        return item !== "7";
      }
    );
  }
};

checkKutulu.onclick = function () {
  if (checkKutulu.checked == true) {
    checkProductPropertiesArrayList.push("8");
  } else {
    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(
      function (item) {
        return item !== "8";
      }
    );
  }
};

checkIkili.onclick = function () {
  if (checkIkili.checked == true) {
    checkProductPropertiesArrayList.push("9");
  } else {
    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(
      function (item) {
        return item !== "9";
      }
    );
  }
};

checkIpli.onclick = function () {
  if (checkIpli.checked == true) {
    checkProductPropertiesArrayList.push("10");

    console.log(checkProductPropertiesArrayList);
  } else {
    checkProductPropertiesArrayList = checkProductPropertiesArrayList.filter(
      function (item) {
        return item !== "10";
      }
    );
    console.log(checkProductPropertiesArrayList);
  }
};

checkKlasik.onclick = function () {
  if (checkKlasik.checked == true) {
    checkThemeArrayList.push("1");
  } else {
    checkThemeArrayList = checkThemeArrayList.filter(function (item) {
      return item !== "1";
    });
  }
};

checkModern.onclick = function () {
  if (checkModern.checked == true) {
    checkThemeArrayList.push("2");
  } else {
    checkThemeArrayList = checkThemeArrayList.filter(function (item) {
      return item !== "2";
    });
  }
};

checkMinimal.onclick = function () {
  if (checkMinimal.checked == true) {
    checkThemeArrayList.push("3");
  } else {
    checkThemeArrayList = checkThemeArrayList.filter(function (item) {
      return item !== "3";
    });
  }
};

checkTrend.onclick = function () {
  if (checkTrend.checked == true) {
    checkThemeArrayList.push("4");
  } else {
    checkThemeArrayList = checkThemeArrayList.filter(function (item) {
      return item !== "4";
    });
  }
};

checkDoga.onclick = function () {
  if (checkDoga.checked == true) {
    checkThemeArrayList.push("5");
  } else {
    checkThemeArrayList = checkThemeArrayList.filter(function (item) {
      return item !== "5";
    });
  }
};

checkDini.onclick = function () {
  if (checkDini.checked == true) {
    checkThemeArrayList.push("6");
  } else {
    checkThemeArrayList = checkThemeArrayList.filter(function (item) {
      return item !== "6";
    });
  }
};

checkNostalji.onclick = function () {
  if (checkNostalji.checked == true) {
    checkThemeArrayList.push("7");
  } else {
    checkThemeArrayList = checkThemeArrayList.filter(function (item) {
      return item !== "7";
    });
  }
};

checkIlginc.onclick = function () {
  if (checkIlginc.checked == true) {
    checkThemeArrayList.push("8");
  } else {
    checkThemeArrayList = checkThemeArrayList.filter(function (item) {
      return item !== "8";
    });
  }
};

checkSpor.onclick = function () {
  if (checkSpor.checked == true) {
    checkThemeArrayList.push("9");
  } else {
    checkThemeArrayList = checkThemeArrayList.filter(function (item) {
      return item !== "9";
    });
  }
};

checkKarikatür.onclick = function () {
  if (checkKarikatür.checked == true) {
    checkThemeArrayList.push("10");
  } else {
    checkThemeArrayList = checkThemeArrayList.filter(function (item) {
      return item !== "10";
    });
  }
};

productModelNoTextInput.onchange = async function () {
  const getData = query(
    collection(db, "Product"),
    where("productModelNo", "==", productModelNoTextInput.value)
  );

  var ProductsModelNo = "";
  const querySnapshot = await getDocs(getData);
  querySnapshot.forEach((doc) => {
    ProductsModelNo = doc.data().productModelNo;
    console.log(ProductsModelNo);
  });

  if (ProductsModelNo == productModelNoTextInput.value) {
    alert(
      "Bu model adı daha önce eklenmiş. Lütfen farklı bir model adı giriniz."
    );
    productModelNoTextInput.classList.add("is-invalid");
    productModelNoTextInput.value = "";
  } else {
    productModelNoTextInput.classList.remove("is-invalid");
  }
};

productTradeMarkModelNo.onchange = async function () {
  const getData = query(
    collection(db, "Product"),
    where("productTradeMark", "==", productTradeMarkSelectInput.value),
    where(
      "productTradeMarkSubModel",
      "==",
      productTardeMarkSubModelSelectInput.value
    ),
    where("productTradeMarkModelNo", "==", productTradeMarkModelNo.value)
  );

  var ProductsTradeMarkModelNo = "";
  const querySnapshot = await getDocs(getData);
  querySnapshot.forEach((doc) => {
    ProductsTradeMarkModelNo = doc.data().productTradeMarkModelNo;
    console.log(ProductsTradeMarkModelNo);
  });

  if (ProductsTradeMarkModelNo == productTradeMarkModelNo.value) {
    alert(
      "Bu model adı daha önce eklenmiş. Lütfen farklı bir model adı giriniz."
    );
    productTradeMarkModelNo.classList.add("is-invalid");
    productTradeMarkModelNo.value = "";
  } else {
    productTradeMarkModelNo.classList.remove("is-invalid");
  }
};

productTradeMarkModelNo.onclick = function () {
  if (
    productTradeMarkSelectInput.value == "0" ||
    productTardeMarkSubModelSelectInput.value == "0"
  ) {
    alert("Lütfen önce ürün markası ve alt modelini seciniz!");

    if (productTradeMarkSelectInput.value == 0) {
      productTradeMarkSelectInput.classList.add("is-invalid");
    }

    if (productTardeMarkSubModelSelectInput.value == 0) {
      productTardeMarkSubModelSelectInput.classList.add("is-invalid");
    }
  } else {
    productTradeMarkSelectInput.classList.remove("is-invalid");
    productTardeMarkSubModelSelectInput.classList.remove("is-invalid");
  }
};

const products = document.querySelector(".productCard");

function createProductsArray([proDocId, proimg, proModelNo, proCategory]) {
  let proCode = `

  <div class="card m-2 " style="width: 15rem;" >

   <img class="card-img-top" src="${proimg}" alt="Ürün Resmi"">

   <div class="card-body">
   
   <h5 class="card-title">${proModelNo}</h5>
    
   <button type="button" data-keys23=${proDocId} class="btn btn-primary editBtn" style="width : 100%">Düzenle</button>


    </div>
  
     


`;

  products.innerHTML += proCode;
}

$("body").on("click", ".editBtn", async function () {
  var $key = $(this).data("keys23");

  updateDocumentId = $key;

  btnAddEditStatus = "EditProduct";

  if (addEditActivityContainer.style.display === "none") {
    addEditActivityContainer.style.display = "";
    mainActivityContainer.style.display = "none";
    btnProductAdd.style.visibility = "hidden";
  }

  const docRef = doc(db, "Product", updateDocumentId);
  const docs = await getDoc(docRef);

  if (docs.exists()) {
    const firebaseDocId = docs.id;
    const firebaseProductModelNo = docs.data().productModelNo;
    const firebaseProductCategory = docs.data().productCategory;
    // const firebaseProductThemeSelect = docs.data().productTheme;
    const firebaseProductSizeCategory = docs.data().productSizeCategory;
    const firebaseProductWidth = docs.data().productWidth;
    const firebaseProductHeight = docs.data().productHeight;
    const firebaseProductColor = docs.data().productColor;
    const firebaseProductEnvelope = docs.data().productEnvelope;
    const firebaseProductTradeMark = docs.data().productTradeMark;
    const firebaseProductInvitationPrintType =
      docs.data().productInvitationPrintType;
    const firebaseProductEnvelopePrintType =
      docs.data().productEnvelopePrintType;
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

    checkThemeArrayList = docs.data().productTheme;

    checkHueArrayList = docs.data().productHue;

    const firebaseProductPrice = docs.data().productPrice;
    const firebaseProductWholeSalePrice = docs.data().productWholeSalePrice;
    const firebaseProductProfitRate = docs.data().productProfitRate;
    const firebaseProductProfit = docs.data().productProfit;
    firebaseProductImgUrl1 = docs.data().productImgUrl1;

    productModelNoTextInput.value = firebaseProductModelNo;
    productCategorySelectInput.value = firebaseProductCategory;
    productSizeCategorySelectInput.value = firebaseProductSizeCategory;
    productSizeWidthTextInput.value = firebaseProductWidth;
    productSizeHeightTextInput.value = firebaseProductHeight;
    productColorSelectInput.value = firebaseProductColor;
    productEnvelopeSelectInput.value = firebaseProductEnvelope;
    productTradeMarkSelectInput.value = firebaseProductTradeMark;
    productInvitationPrintTypeSelectInput.value =
      firebaseProductInvitationPrintType;
    productEnvelopePrintTypeSelectInput.value =
      firebaseProductEnvelopePrintType;
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
    } else if (productTradeMarkSelectInput.value == "2") {
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

    //-------

    if (checkHueArrayList.includes("1")) {
      checkWhite.checked = true;
    }

    if (checkHueArrayList.includes("2")) {
      checkRed.checked = true;
    }

    if (checkHueArrayList.includes("3")) {
      checkYellow.checked = true;
    }

    if (checkHueArrayList.includes("4")) {
      checkBlue.checked = true;
    }

    if (checkHueArrayList.includes("5")) {
      checkBlack.checked = true;
    }

    if (checkHueArrayList.includes("6")) {
      checkPurple.checked = true;
    }

    if (checkHueArrayList.includes("7")) {
      checkOrange.checked = true;
    }

    if (checkHueArrayList.includes("8")) {
      checkGreen.checked = true;
    }

    //--------

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
      checkPlexi.checked = true;
    }

    if (checkProductPropertiesArrayList.includes("5")) {
      checkAhsap.checked = true;
    }

    if (checkProductPropertiesArrayList.includes("6")) {
      checkMuhurlu.checked = true;
    }

    if (checkProductPropertiesArrayList.includes("7")) {
      checkKadife.checked = true;
    }

    if (checkProductPropertiesArrayList.includes("8")) {
      checkKutulu.checked = true;
    }

    if (checkProductPropertiesArrayList.includes("9")) {
      checkIkili.checked = true;
    }

    if (checkProductPropertiesArrayList.includes("10")) {
      checkIpli.checked = true;
    }

    if (checkThemeArrayList.includes("1")) {
      checkKlasik.checked = true;
    }

    if (checkThemeArrayList.includes("2")) {
      checkModern.checked = true;
    }

    if (checkThemeArrayList.includes("3")) {
      checkMinimal.checked = true;
    }

    if (checkThemeArrayList.includes("4")) {
      checkTrend.checked = true;
    }

    if (checkThemeArrayList.includes("5")) {
      checkDoga.checked = true;
    }

    if (checkThemeArrayList.includes("6")) {
      checkDini.checked = true;
    }

    if (checkThemeArrayList.includes("7")) {
      checkNostalji.checked = true;
    }

    if (checkThemeArrayList.includes("8")) {
      checkIlginc.checked = true;
    }

    if (checkThemeArrayList.includes("9")) {
      checkSpor.checked = true;
    }

    if (checkThemeArrayList.includes("10")) {
      checkKarikatür.checked = true;
    }
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
    imgDocId1 = doc.id;
    img1Preview.src = doc.data().productImgUrl;
    imgUrl1 = doc.data().productImgUrl;
  });

  const queryImg2 = query(
    collection(db, "Product", $key, "img"),
    where("no", "==", 2)
  );

  const snapshotimg2 = await getDocs(queryImg2);

  snapshotimg2.forEach((doc) => {
    imgDocId2 = doc.id;
    img2Preview.src = doc.data().productImgUrl;
    imgUrl2 = doc.data().productImgUrl;
  });

  const queryImg3 = query(
    collection(db, "Product", $key, "img"),
    where("no", "==", 3)
  );

  const snapshotimg3 = await getDocs(queryImg3);

  snapshotimg3.forEach((doc) => {
    imgDocId3 = doc.id;
    img3Preview.src = doc.data().productImgUrl;
    imgUrl3 = doc.data().productImgUrl;
  });

  const queryImg4 = query(
    collection(db, "Product", $key, "img"),
    where("no", "==", 4)
  );

  const snapshotimg4 = await getDocs(queryImg4);

  snapshotimg4.forEach((doc) => {
    imgDocId4 = doc.id;
    img4Preview.src = doc.data().productImgUrl;
    imgUrl4 = doc.data().productImgUrl;
  });

  const queryImg5 = query(
    collection(db, "Product", $key, "img"),
    where("no", "==", 5)
  );

  const snapshotimg5 = await getDocs(queryImg5);

  snapshotimg5.forEach((doc) => {
    imgDocId5 = doc.id;
    img5Preview.src = doc.data().productImgUrl;
    imgUrl5 = doc.data().productImgUrl;
  });

  const queryVideo = query(
    collection(db, "Product", $key, "img"),
    where("no", "==", 6)
  );

  const snapshotVideo = await getDocs(queryVideo);

  snapshotVideo.forEach((doc) => {
    videoDocId = doc.id;
    videoPreview.src = doc.data().productImgUrl;
    videoUrl = doc.data().productImgUrl;
  });
});

const getData = query(collection(db, "Product"));

const querySnapshot = await getDocs(getData);
querySnapshot.forEach((doc) => {
  const firebaseDocId = doc.id;
  const firebaseProductModelNo = doc.data().productModelNo;
  const firebaseProductCategory = doc.data().productCategory;
  const firebaseProductImgUrl1 = doc.data().productImgUrl1;

  let productItem = [
    firebaseDocId,
    firebaseProductImgUrl1,
    firebaseProductModelNo,
    firebaseProductCategory,
  ];

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
    addEditActivityContainer.style.display = "";
    mainActivityContainer.style.display = "none";
    btnProductAdd.style.visibility = "hidden";
    btnDeleteProduct.style.display = "none";

    img1Preview.style.display = "none";
    img2Preview.style.display = "none";
    img3Preview.style.display = "none";
    img4Preview.style.display = "none";
    img5Preview.style.display = "none";
    videoPreview.style.display = "none";

    btnAddEditStatus = "AddProduct";
  }
});

productPagesOfCanvassButton.addEventListener("click", async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user != null) {
      const queryUser = query(
        collection(db, "Users"),
        where("email", "==", user.email)
      );

      const UsersInfo = await getDocs(queryUser);

      UsersInfo.forEach((doc) => {
        const usersInfo = doc.data().userStatus;

        if (usersInfo == "1") {
          deleteContainer.style.display = "none";
          productContainer.style.display = "";
        } else {
          deleteContainer.style.display = "";
          productContainer.style.display = "none";
        }
      });
    } else {
      window.location.href = "index.html";
    }
  });
});

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
  var videoFileName1 = productModelNoTextInput.value + "-video1";

  var image1Url;
  var image2Url;
  var image3Url;
  var image4Url;
  var image5Url;
  var videoUrl1;

  if (btnAddEditStatus == "AddProduct") {
    if (
      productModelNoTextInput.value == "" ||
      productCategorySelectInput.value == "0" ||
      productSizeCategorySelectInput.value == "0" ||
      productEnvelopeSelectInput.value == "0" ||
      productTradeMarkSelectInput.value == "0" ||
      productInvitationPrintTypeSelectInput.value == "0" ||
      productEnvelopePrintTypeSelectInput.value == "0" ||
      productPriceInput.value == "" ||
      productTardeMarkSubModelSelectInput.value == "" ||
      productTradeMarkModelNo.value == "" ||
      productProfitRateInput.value == "" ||
      productWholeSalePriceInput.value == "" ||
      stockAddInput.value == "" ||
      productColorSelectInput.value == ""
    ) {
      alert(
        "Lütfen bütün kutucukları doldurunuz! Boyut kutucukları boş kalabilir!"
      );

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

      if (productTardeMarkSubModelSelectInput.value == "0") {
        productTardeMarkSubModelSelectInput.classList.add("is-invalid");
      } else {
        productTardeMarkSubModelSelectInput.classList.remove("is-invalid");
      }

      if (productTradeMarkModelNo.value == "") {
        productTradeMarkModelNo.classList.add("is-invalid");
      } else {
        productTradeMarkModelNo.classList.remove("is-invalid");
      }

      if (productSizeCategorySelectInput.value == "0") {
        productSizeCategorySelectInput.classList.add("is-invalid");
      } else {
        productSizeCategorySelectInput.classList.remove("is-invalid");
      }

      if (productColorSelectInput.value == "0") {
        productColorSelectInput.classList.add("is-invalid");
      } else {
        productColorSelectInput.classList.remove("is-invalid");
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

      if (productInvitationPrintTypeSelectInput.value == "0") {
        productInvitationPrintTypeSelectInput.classList.add("is-invalid");
      } else {
        productInvitationPrintTypeSelectInput.classList.remove("is-invalid");
      }

      if (productEnvelopePrintTypeSelectInput.value == "0") {
        productEnvelopePrintTypeSelectInput.classList.add("is-invalid");
      } else {
        productEnvelopePrintTypeSelectInput.classList.remove("is-invalid");
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
      productSizeCategorySelectInput.classList.remove("is-invalid");
      productColorSelectInput.classList.remove("is-invalid");
      productEnvelopeSelectInput.classList.remove("is-invalid");
      productTradeMarkSelectInput.classList.remove("is-invalid");
      productInvitationPrintTypeSelectInput.classList.remove("is-invalid");
      productEnvelopePrintTypeSelectInput.classList.remove("is-invalid");
      productPriceInput.classList.remove("is-invalid");
      productTardeMarkSubModelSelectInput.classList.remove("is-invalid");
      productTradeMarkModelNo.classList.remove("is-invalid");
      stockAddInput.classList.remove("is-invalid");
      productWholeSalePriceInput.classList.remove("is-invalid");

      if (
        checkekonomik.checked == true ||
        checkVip.checked == true ||
        checkKraftKagit.checked == true ||
        checkPlexi.checked == true ||
        checkAhsap.checked == true ||
        checkMuhurlu.checked == true ||
        checkKadife.checked == true ||
        checkKutulu.checked == true ||
        checkIkili.checked == true ||
        checkIpli.checked == true
      ) {
        propertiesCheckList.classList.remove("border-danger");

        if (
          checkKlasik.checked == true ||
          checkModern.checked == true ||
          checkMinimal.checked == true ||
          checkTrend.checked == true ||
          checkDoga.checked == true ||
          checkDini.checked == true ||
          checkNostalji.checked == true ||
          checkIlginc.checked == true ||
          checkSpor.checked == true ||
          checkKarikatür == true
        ) {
          themeCheckList.classList.remove("border-danger");

          if (
            checkWhite.checked == true ||
            checkRed.checked == true ||
            checkYellow.checked == true ||
            checkBlue.checked == true ||
            checkBlack.checked == true ||
            checkPurple.checked == true ||
            checkOrange.checked == true ||
            checkGreen.checked == true
          ) {
            hueCheckList.classList.remove("border-danger");
            if (imageFiles1 == null || imageFiles2 == null) {
              alert(
                "Lütfen vitrin fotoğrafını ve ürüne ait en az 1 fotoğraf ekleyin. Tek fotograf varsa vitrin fotoğrafı ve 1. Fotografa aynı fotografı ekleyin!"
              );
            } else {
              let storageRef1 = ref(storage, "productImages/" + imageFileName1);

              uploadBytes(storageRef1, imageFiles1).then((snapshot) => {
                getDownloadURL(
                  ref(storage, "productImages/" + imageFileName1)
                ).then(async (url) => {
                  image1Url = url;

                  var date = new Date();

                  var stockAddInteger = parseInt(stockAddInput.value);

                  try {
                    const docRef = await addDoc(collection(db, "Product"), {
                      productDocumentId: "",

                      productModelNo: productModelNoTextInput.value,
                      productTradeMark: productTradeMarkSelectInput.value,
                      productTradeMarkSubModel:
                        productTardeMarkSubModelSelectInput.value,
                      productTradeMarkModelNo: productTradeMarkModelNo.value,
                      productCategory: parseInt(
                        productCategorySelectInput.value
                      ),
                      productTheme: checkThemeArrayList,
                      productCampaignCode: productCampaignCodeTextInput.value,
                      productSizeCategory: productSizeCategorySelectInput.value,
                      productWidth: productSizeWidthTextInput.value,
                      productHeight: productSizeHeightTextInput.value,
                      productColor: productColorSelectInput.value,
                      productHue: checkHueArrayList,
                      productEnvelope: productEnvelopeSelectInput.value,
                      productInvitationPrintType:
                        productInvitationPrintTypeSelectInput.value,
                      productEnvelopePrintType:
                        productEnvelopePrintTypeSelectInput.value,
                      productSalesQuantity: 0,
                      productStock: stockAddInteger,
                      productFavorites: 0,
                      productProperties: checkProductPropertiesArrayList,
                      productAddDate: Timestamp.fromDate(new Date(date)),
                      productUpdateDate: Timestamp.fromDate(new Date(date)),
                      productAddUser: auth.currentUser.email,

                      productPrice: parseFloat(productPriceInput.value),
                      productWholeSalePrice: parseFloat(
                        productWholeSalePriceInput.value
                      ),
                      productProfitRate: parseFloat(
                        productProfitRateInput.value
                      ),
                      productProfit: parseFloat(productProfitInput.value),

                      productImgUrl1: image1Url,
                    });

                    try {
                      const updateRef = doc(db, "Product", docRef.id);

                      await updateDoc(updateRef, {
                        productDocumentId: docRef.id,
                      });
                    } catch (error) {}

                    try {
                      await addDoc(
                        collection(db, "Product/" + docRef.id + "/img"),
                        {
                          productImgUrl: image1Url,
                          no: 1,
                        }
                      );

                      console.log("Document written with ID: ", imageFileName1);

                      let storageRef2 = ref(
                        storage,
                        "productImages/" + imageFileName2
                      );
                      uploadBytes(storageRef2, imageFiles2).then((snapshot) => {
                        getDownloadURL(
                          ref(storage, "productImages/" + imageFileName2)
                        ).then(async (url) => {
                          image2Url = url;

                          try {
                            await addDoc(
                              collection(db, "Product/" + docRef.id + "/img"),
                              {
                                productImgUrl: image2Url,
                                no: 2,
                              }
                            );

                            console.log(
                              "Document written with ID: ",
                              imageFileName2
                            );

                            if (imageFiles3 == null) {
                              image3Url = "";
                              image4Url = "";
                              image5Url = "";
                              videoUrl1 = "";

                              try {
                                await addDoc(
                                  collection(
                                    db,
                                    "Product/" + docRef.id + "/img"
                                  ),
                                  {
                                    productImgUrl: image3Url,
                                    no: 3,
                                  }
                                );

                                await addDoc(
                                  collection(
                                    db,
                                    "Product/" + docRef.id + "/img"
                                  ),
                                  {
                                    productImgUrl: image4Url,
                                    no: 4,
                                  }
                                );

                                await addDoc(
                                  collection(
                                    db,
                                    "Product/" + docRef.id + "/img"
                                  ),
                                  {
                                    productImgUrl: image5Url,
                                    no: 5,
                                  }
                                );

                                await addDoc(
                                  collection(
                                    db,
                                    "Product/" + docRef.id + "/img"
                                  ),
                                  {
                                    productImgUrl: videoUrl1,
                                    no: 6,
                                  }
                                );

                                alert("Ürün başarı ile eklendi");

                                window.location.href = "products.html";
                              } catch {}
                            } else {
                              let storageRef3 = ref(
                                storage,
                                "productImages/" + imageFileName3
                              );
                              uploadBytes(storageRef3, imageFiles3).then(
                                (snapshot) => {
                                  getDownloadURL(
                                    ref(
                                      storage,
                                      "productImages/" + imageFileName3
                                    )
                                  ).then(async (url) => {
                                    image3Url = url;

                                    try {
                                      await addDoc(
                                        collection(
                                          db,
                                          "Product/" + docRef.id + "/img"
                                        ),
                                        {
                                          productImgUrl: image3Url,
                                          no: 3,
                                        }
                                      );

                                      console.log(
                                        "Document written with ID: ",
                                        imageFileName3
                                      );

                                      if (imageFiles4 == null) {
                                        image4Url = "";
                                        image5Url = "";
                                        videoUrl1 = "";

                                        try {
                                          await addDoc(
                                            collection(
                                              db,
                                              "Product/" + docRef.id + "/img"
                                            ),
                                            {
                                              productImgUrl: image4Url,
                                              no: 4,
                                            }
                                          );

                                          await addDoc(
                                            collection(
                                              db,
                                              "Product/" + docRef.id + "/img"
                                            ),
                                            {
                                              productImgUrl: image5Url,
                                              no: 5,
                                            }
                                          );

                                          await addDoc(
                                            collection(
                                              db,
                                              "Product/" + docRef.id + "/img"
                                            ),
                                            {
                                              productImgUrl: videoUrl1,
                                              no: 6,
                                            }
                                          );

                                          alert("Ürün başarı ile eklendi");

                                          window.location.href =
                                            "products.html";
                                        } catch {}
                                      } else {
                                        let storageRef4 = ref(
                                          storage,
                                          "productImages/" + imageFileName4
                                        );
                                        uploadBytes(
                                          storageRef4,
                                          imageFiles4
                                        ).then((snapshot) => {
                                          getDownloadURL(
                                            ref(
                                              storage,
                                              "productImages/" + imageFileName4
                                            )
                                          ).then(async (url) => {
                                            image4Url = url;

                                            try {
                                              await addDoc(
                                                collection(
                                                  db,
                                                  "Product/" +
                                                    docRef.id +
                                                    "/img"
                                                ),
                                                {
                                                  productImgUrl: image4Url,
                                                  no: 4,
                                                }
                                              );

                                              console.log(
                                                "Document written with ID: ",
                                                imageFileName4
                                              );

                                              if (imageFiles5 == null) {
                                                image5Url = "";
                                                videoUrl1 = "";

                                                try {
                                                  await addDoc(
                                                    collection(
                                                      db,
                                                      "Product/" +
                                                        docRef.id +
                                                        "/img"
                                                    ),
                                                    {
                                                      productImgUrl: image5Url,
                                                      no: 5,
                                                    }
                                                  );

                                                  await addDoc(
                                                    collection(
                                                      db,
                                                      "Product/" +
                                                        docRef.id +
                                                        "/img"
                                                    ),
                                                    {
                                                      productImgUrl: videoUrl1,
                                                      no: 6,
                                                    }
                                                  );

                                                  alert(
                                                    "Ürün başarı ile eklendi"
                                                  );

                                                  window.location.href =
                                                    "products.html";
                                                } catch {}
                                              } else {
                                                let storageRef5 = ref(
                                                  storage,
                                                  "productImages/" +
                                                    imageFileName5
                                                );
                                                uploadBytes(
                                                  storageRef5,
                                                  imageFiles5
                                                ).then((snapshot) => {
                                                  getDownloadURL(
                                                    ref(
                                                      storage,
                                                      "productImages/" +
                                                        imageFileName5
                                                    )
                                                  ).then(async (url) => {
                                                    image5Url = url;

                                                    try {
                                                      await addDoc(
                                                        collection(
                                                          db,
                                                          "Product/" +
                                                            docRef.id +
                                                            "/img"
                                                        ),
                                                        {
                                                          productImgUrl:
                                                            image5Url,
                                                          no: 5,
                                                        }
                                                      );

                                                      console.log(
                                                        "Document written with ID: ",
                                                        imageFileName5
                                                      );

                                                      if (videoFiles1 == null) {
                                                        videoUrl1 = "";

                                                        try {
                                                          await addDoc(
                                                            collection(
                                                              db,
                                                              "Product/" +
                                                                docRef.id +
                                                                "/img"
                                                            ),
                                                            {
                                                              productImgUrl:
                                                                videoUrl1,
                                                              no: 6,
                                                            }
                                                          );

                                                          alert(
                                                            "Ürün başarı ile eklendi"
                                                          );

                                                          window.location.href =
                                                            "products.html";
                                                        } catch {}
                                                      } else {
                                                        let storageRef6 = ref(
                                                          storage,
                                                          "productImages/" +
                                                            videoFileName1
                                                        );
                                                        uploadBytes(
                                                          storageRef6,
                                                          videoFiles1
                                                        ).then((snapshot) => {
                                                          getDownloadURL(
                                                            ref(
                                                              storage,
                                                              "productImages/" +
                                                                videoFileName1
                                                            )
                                                          ).then(
                                                            async (url) => {
                                                              videoUrl1 = url;

                                                              try {
                                                                await addDoc(
                                                                  collection(
                                                                    db,
                                                                    "Product/" +
                                                                      docRef.id +
                                                                      "/img"
                                                                  ),
                                                                  {
                                                                    productImgUrl:
                                                                      videoUrl1,
                                                                    no: 6,
                                                                  }
                                                                );

                                                                console.log(
                                                                  "Document written with ID: ",
                                                                  videoFileName1
                                                                );

                                                                alert(
                                                                  "Ürün başarı ile eklendi"
                                                                );

                                                                window.location.href =
                                                                  "products.html";
                                                              } catch (e) {
                                                                console.error(
                                                                  "Error adding document: ",
                                                                  e
                                                                );
                                                              }
                                                            }
                                                          );
                                                        });
                                                      }
                                                    } catch (e) {
                                                      console.error(
                                                        "Error adding document: ",
                                                        e
                                                      );
                                                    }
                                                  });
                                                });
                                              }
                                            } catch (e) {
                                              console.error(
                                                "Error adding document: ",
                                                e
                                              );
                                            }
                                          });
                                        });
                                      }
                                    } catch (e) {
                                      console.error(
                                        "Error adding document: ",
                                        e
                                      );
                                    }
                                  });
                                }
                              );
                            }
                          } catch (e) {
                            console.error("Error adding document: ", e);
                          }
                        });
                      });
                    } catch (e) {
                      console.error("Error adding document: ", e);
                    }
                  } catch (e) {
                    console.error("Error adding document: ", e);
                  }
                });
              });
            }
          } else {
            alert("Lütfen renk tonu seçiniz!");
            hueCheckList.classList.add("border-danger");
          }
        } else {
          alert("Lütfen tema ekleyin!");
          themeCheckList.classList.add("border-danger");
        }
      } else {
        alert(
          "Ne yani bu davetiyenin hiç özelliği yok mu! Lütfen özellik Ekleyin"
        );
        propertiesCheckList.classList.add("border-danger");
      }
    }
  } else if (btnAddEditStatus == "EditProduct") {
    let imgUrl = String;

    if (stockAddInput.value != "") {
      var newStock =
        parseInt(stockAddInput.value) + parseInt(productStockInfo.value);
    } else {
      var newStock = parseInt(productStockInfo.value);
    }

    var date = new Date();

    if (imageFiles1 == null) {
      imgUrl = firebaseProductImgUrl1;
    } else {
      let storageRef1 = ref(storage, "productImages/" + imageFileName1);
      uploadBytes(storageRef1, imageFiles1).then((snapshot) => {
        getDownloadURL(ref(storage, "productImages/" + imageFileName1)).then(
          async (url) => {
            imgUrl = url;
          }
        );
      });
    }

    try {
      const updateRef = doc(db, "Product", updateDocumentId);

      await updateDoc(updateRef, {
        productModelNo: productModelNoTextInput.value,
        productTradeMarkModelNo: productTradeMarkModelNo.value,
        productCategory: parseInt(productCategorySelectInput.value),
        productTheme: checkThemeArrayList,
        productSizeCategory: productSizeCategorySelectInput.value,
        productTradeMarkSubModel: productTardeMarkSubModelSelectInput.value,
        productCampaignCode: productCampaignCodeTextInput.value,
        productWidth: productSizeWidthTextInput.value,
        productHeight: productSizeHeightTextInput.value,
        productColor: productColorSelectInput.value,
        productHue: checkHueArrayList,
        productEnvelope: productEnvelopeSelectInput.value,
        productTradeMark: productTradeMarkSelectInput.value,
        productInvitationPrintType: productInvitationPrintTypeSelectInput.value,
        productEnvelopePrintType: productEnvelopePrintTypeSelectInput.value,
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
          getDownloadURL(ref(storage, "productImages/" + imageFileName1)).then(
            async (url) => {
              image1Url = url;

              try {
                const updateRef = doc(
                  collection(db, "Product", updateDocumentId, "img"),
                  where("no", "==", 4)
                );

                await updateDoc(updateRef, {
                  productImgUrl: image1Url,
                });

                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            }
          );
        });
      }

      if (imageFiles2 != null) {
        let storageRef2 = ref(storage, "productImages/" + imageFileName2);
        uploadBytes(storageRef2, imageFiles2).then((snapshot) => {
          getDownloadURL(ref(storage, "productImages/" + imageFileName2)).then(
            async (url) => {
              image2Url = url;

              try {
                const updateRef = doc(
                  db,
                  "Product",
                  updateDocumentId,
                  "img",
                  where("no", "==", 2)
                );

                await updateDoc(updateRef, {
                  productImgUrl: image2Url,
                });

                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            }
          );
        });
      }

      if (imageFiles3 != null) {
        let storageRef3 = ref(storage, "productImages/" + imageFileName3);
        uploadBytes(storageRef3, imageFiles3).then((snapshot) => {
          getDownloadURL(ref(storage, "productImages/" + imageFileName3)).then(
            async (url) => {
              image3Url = url;

              try {
                const updateRef = doc(
                  db,
                  "Product",
                  updateDocumentId,
                  "img",
                  where("no", "==", 3)
                );

                await updateDoc(updateRef, {
                  productImgUrl: image3Url,
                });

                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            }
          );
        });
      }

      if (imageFiles4 != null) {
        let storageRef4 = ref(storage, "productImages/" + imageFileName4);
        uploadBytes(storageRef4, imageFiles4).then((snapshot) => {
          getDownloadURL(ref(storage, "productImages/" + imageFileName4)).then(
            async (url) => {
              image4Url = url;

              try {
                const updateRef = doc(
                  collection(db, "Product", updateDocumentId, "img"),
                  where("no", "==", 4)
                );

                await updateDoc(updateRef, {
                  productImgUrl: image4Url,
                });

                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            }
          );
        });
      }

      if (imageFiles5 != null) {
        let storageRef5 = ref(storage, "productImages/" + imageFileName5);
        uploadBytes(storageRef5, imageFiles5).then((snapshot) => {
          getDownloadURL(ref(storage, "productImages/" + imageFileName5)).then(
            async (url) => {
              image5Url = url;

              try {
                const updateRef = doc(
                  db,
                  "Product",
                  updateDocumentId,
                  "img",
                  where("no", "==", 5)
                );

                await updateDoc(updateRef, {
                  productImgUrl: image5Url,
                });

                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            }
          );
        });
      }

      if (videoFiles1 != null) {
        let storageRef6 = ref(storage, "productImages/" + videoFileName1);
        uploadBytes(storageRef6, videoFiles1).then((snapshot) => {
          getDownloadURL(ref(storage, "productImages/" + videoFileName1)).then(
            async (url) => {
              videoUrl1 = url;

              try {
                const updateRef = doc(
                  db,
                  "Product",
                  updateDocumentId,
                  "img",
                  where("no", "==", 1)
                );

                await updateDoc(updateRef, {
                  productImgUrl: videoUrl1,
                });

                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            }
          );
        });
      }

      window.location.reload();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
});

btnDeleteProduct.addEventListener("click", () => {
  deleteContainer.style.display = "";
  productContainer.style.display = "none";
});

productDeleteCanceButton.addEventListener("click", () => {
  deleteContainer.style.display = "none";
  productContainer.style.display = "";
});

productDeleteDeleteButon.addEventListener("click", async () => {
  deleteFileByURL(imgUrl1);
  deleteFileByURL(imgUrl2);
  deleteFileByURL(imgUrl3);
  deleteFileByURL(imgUrl4);
  deleteFileByURL(imgUrl5);
  deleteFileByURL(videoUrl);

  await deleteDoc(doc(db, "Product", updateDocumentId, "img", imgDocId1));
  await deleteDoc(doc(db, "Product", updateDocumentId, "img", imgDocId2));
  await deleteDoc(doc(db, "Product", updateDocumentId, "img", imgDocId3));
  await deleteDoc(doc(db, "Product", updateDocumentId, "img", imgDocId4));
  await deleteDoc(doc(db, "Product", updateDocumentId, "img", imgDocId5));
  await deleteDoc(doc(db, "Product", updateDocumentId, "img", videoDocId));

  await deleteDoc(doc(db, "Product", updateDocumentId));

  window.location.reload();
});

async function deleteFileByURL(fileURL) {
  try {
    const storage = getStorage();
    const fileRef = ref(storage, fileURL);

    // Dosyayı silme
    await deleteObject(fileRef);
    console.log("Dosya başarıyla silindi.");
  } catch (error) {
    console.error("Dosya silinirken bir hata oluştu:", error);
  }
}

btnProductAddCancel.addEventListener("click", () => {
  if (addEditActivityContainer.style.display != "none") {
    addEditActivityContainer.style.display = "none";
    btnProductAdd.style.visibility = "visible";
    window.location.reload();
  }
});

btnLogout.addEventListener("click", () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      // An error happened.
    });
});
