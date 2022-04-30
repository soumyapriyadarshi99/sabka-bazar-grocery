import { getData } from "../utility/util.js";

/**@description Display the slider image*/
const bannerdata = async () => {
  const bannerDetails = await getData("http://localhost:3000/banners");
  let banner = "";
  var count = 0;
  for (let bannertype of bannerDetails) {
    const { bannerImageUrl, id } = bannertype;
    banner += `<div class="bannerslider">
          <img class="bannerimg" src="..${bannerImageUrl}" style="width: 100%" />
        </div>`;
    count++;
    if (count == 5) {
      banner += `<a class="prev" onclick="changeslide(-1)">PREV</a>
      <a class="next" onclick="changeslide(1)">NEXT</a>
     `;
    }
    document.querySelector(".slideshow-container").innerHTML = banner;
    document.querySelector(".bannerslider").style.display = "block";
  }
  let bannerimg = document.getElementsByClassName("bannerimg");
  let bannerimglength = bannerimg.length;
  for (let i = 0; i < bannerimglength; i++) {
    bannerimg[i].onclick = () => {
      location.href = "./plp.html";
    };
  }
};
bannerdata();

/**@description Display the bullets in banner*/
const sliderdot = async () => {
  const dots = await getData("http://localhost:3000/banners");
  let dotBox = "";
  for (let dotorder of dots) {
    const { order } = dotorder;
    dotBox += `<span class="dot" onclick="currentSlide(${order})"></span> `;
    document.querySelector(".dotSlider").innerHTML = dotBox;
  }
};
sliderdot();
/**@description Dipslay the categories of products into different sections*/

const categoryData = async () => {
  const categoryDetails = await getData("http://localhost:3000/categories");
  let categories = "";
  categoryDetails.sort((data1, data2) => {
    return data1.order - data2.order;
  });
  for (let category of categoryDetails) {
    if (category.order === -1) continue;
    const { imageUrl, name, description, key, id } = category;
    categories += `<div class="categorydisplay">
        <div class="categoryimg">
          <img src="../${imageUrl}" alt="${name}" />
        </div>
        <div class="descimg">
          <div class="descheading heading">${name}</div>
          <div class="desc">${description}</div>
          <div class="button"><button id=${id} class="categorybutton">Explore ${key}</button></div>
        </div>
      </div>`;
    document.querySelector(".categorybox").innerHTML = categories;
  }

  /**@description to load product listing page after clicking on button */
  const plprenderbtn = document.getElementsByClassName("categorybutton");

  for (let i = 0; i < plprenderbtn.length; i++) {
    const eachBtn = document.getElementById(plprenderbtn[i].id);

    eachBtn.addEventListener(
      "click",
      function () {
        renderplppage(eachBtn.id);
      }
      // false
    );
  }
};

categoryData();

/**@description for redirecting it to plp page */

function renderplppage(idd) {
  location.href = "./plp.html?" + idd;
}
