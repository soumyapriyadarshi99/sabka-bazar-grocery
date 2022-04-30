export const headerUI = () => {
  const hamburger = document.getElementById("hamburger");

  const navUL = document.getElementById("nav-ul");

  hamburger.addEventListener("click", () => {
    navUL.classList.toggle("show");
  });
  renderCartCount();
  logoutRender();
};

/**@description to display nummber of elements present in cart-icon */
export const renderCartCount = () => {
  let count = 0;
  const cartcount = document.getElementById("cartcount");
  for (let i = 0; i < localStorage.length; i++) {
    count += parseInt(localStorage.getItem(localStorage.key(i)));
  }
  cartcount.innerHTML = `${count} ITEMS`;
  cartcount.style = "font-weight:bold";
};

/**@description to display logout button after login */
const logoutRender = () => {
  const signin = document.getElementById("signin");
  const register = document.getElementById("register");
  const logout = document.getElementById("logout");
  const useremail = document.getElementById("useremail");
  if (sessionStorage.length > 1) {
    useremail.innerHTML = sessionStorage.getItem("email")
    signin.style.display = "none";
    register.style.display = "none";
    logout.style.display = "block"
  }
  if (sessionStorage.length <= 1) {
    signin.style.display = "block";
    register.style.display = "block";
    logout.style.display = "none"
    useremail.style.display = "none"
  }
  logout.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "./home.html"
    logoutRender();
  })
}