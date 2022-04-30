import { getData } from "../utility/util.js";
import { renderCartCount } from "../utility/header.js";

const productDetails = await getData("http://localhost:3000/products");

const renderCart = async () => {
  const cartlength = localStorage.length;
  let cart = "";

  /**@description store all the ids of product */
  let productid = [];
  let totalcart = 0;
  for (
    let storageindex = 0;
    storageindex < localStorage.length;
    storageindex++
  ) {
    productid.push(localStorage.key(storageindex));
    totalcart += parseInt(localStorage.getItem(localStorage.key(storageindex))); //updating the total item in cart
  }

  document.getElementById("cartcountheading").innerHTML =
    "My Cart " + totalcart + " Items";

  if (totalcart === 0 || productid.length === 0) {
    document.querySelector(".cartpagecontainer").innerHTML =
      "You dont have anything in your cart";

    /**@description to handle if there is no element in cart */
    let nullcart = document.querySelectorAll(".nullcart");
    for (
      let nullcartindex = 0;
      nullcartindex < nullcart.length;
      nullcartindex++
    ) {
      nullcart[nullcartindex].style.display = "none";
    }
    return;
  }

  /**@description to render produc page */
  for (let len = 0; len < cartlength; len++) {
    for (let products of productDetails) {
      const { name, imageURL, price, id } = products;
      if (productid[len] === id) {
        /**@description calculation of total price */
        let productprice = parseInt(price);
        let productcount = parseInt(localStorage.getItem(id));
        let producttotalprice = productprice * productcount;

        cart += `<div class="productimage">
      <img
        class="productimg"
        src="${imageURL}"
        alt="image-photo"
      />
    </div>
    <div class="imagedescription">
      <div class="imgdes">${name}</div>
      <div class="iclass">
        <div class="calculation">
        <button class="delbutton" data-id="${id}" ><i class="fa fa-minus" data-id="${id}"></i></button>
          <div class="count">${localStorage.getItem(id)}</div>
          <button class="addbutton" data-id="${id}" ><i class="fa fa-plus" data-id="${id}"></i></button>
          <button class="multiply">X</button>
          <div class="price">${price}</div>
        </div>
        <div class="totalprice">${producttotalprice}</div>
        <button class="deletebutton" data-id="${id}">Remove</button>
      </div>
    </div>`;
      }
    }
  }
  document.querySelector(".cartpagecontainer").innerHTML = cart;
  totalCartPrice(localStorage.length);
};
renderCart();

let parentElement = document.querySelector(".cartpagecontainer");
parentElement.addEventListener("click", (e) => {
  const plusbutton = e.target.classList.contains("fa-plus");
  const plusbuttonsquare = e.target.classList.contains("addbutton");
  const minusbutton = e.target.classList.contains("fa-minus");
  const minusbuttonsquare = e.target.classList.contains("delbutton");
  const deletebutton = e.target.classList.contains("deletebutton");

  for (
    let localstorageindex = 0;
    localstorageindex < localStorage.length;
    localstorageindex++
  ) {
    if (plusbutton || plusbuttonsquare) {
      if (localStorage.key(localstorageindex) === e.target.dataset.id) {
        let value = parseInt(
          localStorage.getItem(localStorage.key(localstorageindex))
        );
        value = value + 1;

        if (value > 50) {
          Toastify({
            text: "OUT OF STOCK",
            duration: 2000,
            position: "center",
            style: {
              background: "linear-gradient(to right,#eb3349 ,#f45c43)",
            },
          }).showToast();
          return;
        }
        localStorage.setItem(e.target.dataset.id, value);
      }
    }
    if (minusbutton || minusbuttonsquare) {
      if (localStorage.key(localstorageindex) === e.target.dataset.id) {
        let value = parseInt(
          localStorage.getItem(localStorage.key(localstorageindex))
        );
        value = value - 1;
        if (value == 0) {
          localStorage.removeItem(e.target.dataset.id);
          Toastify({
            text: "ITEM REMOVED FROM CART",
            duration: 2000,
            position: "center",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
          renderCart();
          renderCartCount();
          totalCartPrice(localStorage.length);
          return;
        }
        localStorage.setItem(e.target.dataset.id, value);
      }
    } else if (deletebutton) {
      localStorage.removeItem(e.target.dataset.id);

      Toastify({
        text: "ITEM REMOVED FROM CART",
        duration: 2000,
        className: "success",
        position: "center",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();

      renderCart();
      renderCartCount();
      totalCartPrice(localStorage.length);
      return;
    }
  }
  renderCart();
  renderCartCount();
});

/**@description calculate total price of cart */
const totalCartPrice = async (cartlength) => {
  products = productDetails;
  let totalproductprice = 0;
  if (cartlength > 0) {
    for (let productindex = 0; productindex < products.length; productindex++) {
      for (let cartindex = 0; cartindex < cartlength; cartindex++) {
        let id = localStorage.key(cartindex);
        let value = localStorage.getItem(id);

        if (id === products[productindex].id) {
          totalproductprice +=
            parseFloat(products[productindex].price) * parseFloat(value);
        }
      }
    }
  }
  document.querySelector(
    ".checkout"
  ).innerHTML = `Proceed to Checkout Rs.${totalproductprice}`;
};
