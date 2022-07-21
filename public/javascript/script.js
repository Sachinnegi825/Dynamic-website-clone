const article = document.querySelector("#content");
const button = document.querySelector("#read-more");

button.addEventListener("click", readMore);

function readMore() {
    if (article.className == "open") {
      // Read less
    article.className = "";
    button.innerHTML = "Show more";
  } else {
    article.className = "open";
    button.innerHTML = "Show less";
  }
}


let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.querySelectorAll(".mySlides");
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }    

  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 3000); 
}

function submitForm(){
  alert("MESSAGE SEND SUCCESFULLY");
}



