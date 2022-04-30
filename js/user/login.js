// // user mail, password, confirm_password  and their pattern validation
// validate_inputs = () =>{
// const email = document.getElementById("user_mail");
// const password = document.getElementById("user_password");
// //mail pattern validation
// email.addEventListener('input',()=>{
//   const email_text = document.querySelector('.email_text');
//   const emailpattern =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   if(email.value.match(emailpattern)){
//     email_text.innerHTML = "";
//   }
//   else{
//     email_text.innerHTML = "You Email address is inValid";
//   }
// });
// //password pattern validation
// password.addEventListener('input',()=>{
//   const password_text = document.querySelector('.password_text');
//   const password_pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
//   if(password.value.match(password_pattern)){
//     password_text.innerHTML = "";
//   }
//   else{
//     password_text.innerHTML = "Provide strong Password";
//   }
// });
// }

// window.onload = validate_inputs();

//function to validate the login successful or unsuccessful
const loginsuccess = (event) => {
  event.preventDefault();
  let user_mail_array = ["user123@sapient.com", "admin123@sapient.com"];
  let password_array = ["User@123", "Admin@123"];
  let email = document.getElementById("user_mail").value;
  let password = document.getElementById("user_password").value;
  for (let i = 0; i <= user_mail_array.length; i++) {
    if (email === user_mail_array[i] && password === password_array[i]) {
      sessionStorage.setItem("email", email)
      alert("Login Successful!");
      window.location.href = "home.html";
      break;
    } else {
      alert("Login Unsuccessful..! provide valid details");
      break;
    }
  }
};
// to make password visible or not
const showpassword = document.getElementById("showpassword");
showpassword.addEventListener("click", () => {
  const user_password = document.getElementById("user_password");
  if (user_password.type === "password") {
    user_password.type = "text";
  } else {
    user_password.type = "password";
  }
});
