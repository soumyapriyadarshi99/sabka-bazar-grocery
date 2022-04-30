const headerPath = "../../views/header.html";
const footerPath = "../../views/footer.html";
import { headerUI } from "../utility/header.js";

const pageRender = async (path) => {
  await fetch(path)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      if (path === "../../views/header.html") {
        document.querySelector(".header").innerHTML = data;
        headerUI();
      } else if (path === "../../views/footer.html") {
        document.querySelector(".footer").innerHTML = data;
      }
    })
    .catch((error) => console.log(`file not found ${error}`));
};

pageRender(headerPath);
pageRender(footerPath);
