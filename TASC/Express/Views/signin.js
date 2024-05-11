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

//signin form data

const loginform = document.getElementById('loginForm');
const emailError2 = document.querySelector('.email.error');
const passwordError2 = document.querySelector('.password.error');


loginform.addEventListener('submit', async (e) => {
  e.preventDefault();

  // reset errors
  emailError2.textContent = '';
  passwordError2.textContent = '';

  // get values
  const email = loginform.email.value;
  const password = loginform.password.value;

  try {
    const res = await fetch('/login', { 
      method: 'POST', 
      body: JSON.stringify({ email, password }),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      emailError2.textContent = data.errors.email;
      passwordError2.textContent = data.errors.password;
    }
    if (data.user) {
      location.assign('/login');
    }

  }
  catch (err) {
    console.log(err);
  }
});


// document.getElementById('emailForm').addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const formData = new FormData(event.target);
  
//   try {
//     const response = await fetch('/forgotPass', {
//       method: 'POST',
//       body: formData
//     });
//     if (response.ok) {
//       const message = await response.text();
//       // Show a popup indicating success
//       alert(message);
//     } else {
//       throw new Error('Email sending failed');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     // Handle error
//   }
// });