let prism = document.querySelector(".rec-prism");

function showSignup(){
  prism.style.transform = "translateZ(-100px) rotateY( -90deg)";
}
function showLogin(){
  prism.style.transform = "translateZ(-100px)";
}
function showForgotPassword(){
  prism.style.transform = "translateZ(-100px) rotateY( -180deg)";
}

function showSubscribe(){
  prism.style.transform = "translateZ(-100px) rotateX( -90deg)";
}

function showContactUs(){
  prism.style.transform = "translateZ(-100px) rotateY( 90deg)";
}

function showThankYou(){
  prism.style.transform = "translateZ(-100px) rotateX( 90deg)";
}


// functions to handle the forms data

//signup form data
const signupform = document.getElementById('signupForm');
signupform.addEventListener('submit', (e) => {
  e.preventDefault();

  // get values
  const email = signupform.email.value;
  const password = signupform.password.value;

  console.log(email, password);
});

//signin form data
const loginform = document.getElementById('loginForm');

loginform.addEventListener('submit', (e) => {
  e.preventDefault();

  // get values
  const email = loginform.email.value;
  const password = loginform.password.value;

  console.log(email, password);
});