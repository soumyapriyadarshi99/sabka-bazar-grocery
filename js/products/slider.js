let slideIndex = 1;
displayslide(slideIndex);
function changeslide(n) {
  displayslide((slideIndex += n));
}

function currentSlide(n) {
  displayslide((slideIndex = n));
}

function displayslide(n) {
  let currslider;
  let slides = [];
  slides = document.getElementsByClassName("bannerslider");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (currslider = 0; currslider < slides.length; currslider++) {
    slides[currslider].style.display = "none";
  }
  for (currslider = 0; currslider < dots.length; currslider++) {
    dots[currslider].className = dots[currslider].className.replace(
      " active",
      ""
    );
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
displayslide(n);

/**@description automatic slide show */
// let slideIndex = 0;
// displayslide();

// function displayslide() {
//   let i;
//   let slides = document.getElementsByClassName("bannerslider");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {
//     slideIndex = 1;
//   }
//   slides[slideIndex - 1].style.display = "block";
//   setTimeout(displayslide, 1000);
// }
