// user mail, password, confirm_password  and their pattern validation
const validate_inputs = () => {
  const email = document.getElementById("user_mail");
  const password = document.getElementById("user_password");
  const confirm_password = document.getElementById("confirm_password");
  //mail pattern validation
  email.addEventListener("input", () => {
    const email_text = document.querySelector(".email_text");
    const emailpattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value.match(emailpattern)) {
      email_text.innerHTML = "";
    } else {
      email_text.innerHTML = "You Email address is inValid";
    }
  });
  //password pattern validation
  password.addEventListener("input", () => {
    const password_text = document.querySelector(".password_text");
    const password_pattern =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (password.value.match(password_pattern)) {
      password_text.innerHTML = "";
    } else {
      password_text.innerHTML = "Provide strong Password";
    }
  });
  // password and confirm_password combination check
  confirm_password.addEventListener("keyup", () => {
    const password = document.getElementById("user_password").value;
    const cpassword = document.getElementById("confirm_password").value;
    const confirm_password_text = document.querySelector(
      ".confirm_password_text"
    );

    if (cpassword < 1) {
      confirm_password_text.innerHTML = "Re-enter Password";
    } else if (password != cpassword) {
      confirm_password_text.innerHTML = "Password did not match";
    } else confirm_password_text.innerHTML = "Confirm password matched";
  });
};

window.onload = validate_inputs();
// to make password visible or not
const showpassword = document.getElementById("showpassword");
showpassword.addEventListener("click", () => {
  const x = document.getElementById("user_password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
});

//function to validate the signup successful or unsuccessful
const signup_success = document.getElementById("signup");
signup_success.addEventListener("click", (click) => {
  click.preventDefault();
  const emailpattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const password_pattern =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const email = document.getElementById("user_mail").value;
  const password = document.getElementById("user_password").value;
  const cpassword = document.getElementById("confirm_password").value;

  if (
    email.match(emailpattern) &&
    password.match(password_pattern) &&
    cpassword === password
  ) {
    alert("Signup Successful!");
    window.location.href = "./login.html";
  } else {
    alert("Please check your input details");
  }
});
