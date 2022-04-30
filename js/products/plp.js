// import Toastify from "toastify-js";
import { getData } from "../utility/util.js";
import { renderCartCount } from "../utility/header.js";

var queryString = location.search.substring(1);

const dataFetch = async (typeVal) => {
  let plp = "";
  const productDetails = await getData("http://localhost:3000/products");

  for (let products of productDetails) {
    const { imageURL, name, description, price, category, id } = products;
    if (typeVal == "NA" || category == typeVal) {
      plp += `<div class="plpcontainer">
          <div class="productname heading">
            <h1>${name}</h1>
          </div>
          <div class="prodimg">
          <div class="productimage">
            <img src="../${imageURL}" alt="productimage">
          </div>
          <div class="imagedescription">
          <div class="productdescription">
            <p>${description}</p>
          </div>
          <div class="priceandbutton">
            <div class="price">
              <h2>MRP.${price}</h2>
            </div>
            <div class="btn">
              <button id="${id}" class="renderbutton" >Buy Now</button>
            </div>
          </div>
          </div>
          </div>
        </div>`;
    }

    document.querySelector(".plpbox").innerHTML = plp;
  }
  let renderButton = document.getElementsByClassName("renderbutton");
  let renderButtonLength = renderButton.length;
  for (let i = 0; i < renderButtonLength; i++) {
    renderButton[i].addEventListener("click", getButtonId);
  }
};
if (queryString === null || queryString === "") {
  dataFetch("NA");
} else {
  dataFetch(queryString);
}

document.querySelector("#allproducts").addEventListener(
  "click",
  () => {
    dataFetch("NA");
  },
  false
);
document.querySelector("#fruits").addEventListener(
  "click",
  () => {
    dataFetch("5b6899953d1a866534f516e2");
  },
  false
);
document.querySelector("#babyCare").addEventListener(
  "click",
  () => {
    dataFetch("5b6899683d1a866534f516e0");
  },
  false
);
document.querySelector("#beauty").addEventListener(
  "click",
  () => {
    dataFetch("5b68994e3d1a866534f516df");
  },
  false
);
document.querySelector("#beverages").addEventListener(
  "click",
  () => {
    dataFetch("5b675e5e5936635728f9fc30");
  },
  false
);
document.querySelector("#bakery").addEventListener(
  "click",
  () => {
    dataFetch("5b6899123d1a866534f516de");
  },
  false
);

/**@description storing data in local storage for cart */
const getButtonId = (e) => {
  // alert("product added to cart");
  Toastify({
    text: "ITEM ADDED TO CART",
    duration: 2000,
    className: "success",
    position: "center",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();

  let prodid = e.target.id;
  let flag = 0;
  for (
    let localstorageindex = 0;
    localstorageindex < localStorage.length;
    localstorageindex++
  ) {
    if (localStorage.key(localstorageindex) === prodid) {
      flag = 0;
      let item = parseInt(localStorage.getItem(prodid));
      item = item + 1;
      localStorage.setItem(prodid, item);
      flag = 1;
    }
  }
  if (flag === 0) {
    localStorage.setItem(prodid, 1);
  }
  renderCartCount();
};
