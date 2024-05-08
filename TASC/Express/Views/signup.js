
//signup form data
const signupform = document.getElementById('signupForm');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');

signupform.addEventListener('submit', async (e) => {
  e.preventDefault();

  // reset errors
  emailError.textContent = '';
  passwordError.textContent = '';

  // get values
  const email = signupform.email.value;
  const password = signupform.password.value;

  try {
    const res = await fetch('/signup', { 
      method: 'POST', 
      body: JSON.stringify({ email, password }),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      emailError.textContent = data.errors.email;
      passwordError.textContent = data.errors.password;
    }
    if (data.user) {
      location.assign('/signin');
    }

  }
  catch (err) {
    console.log(err);
  }


});
