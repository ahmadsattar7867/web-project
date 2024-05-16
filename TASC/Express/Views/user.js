const userform = document.getElementById('userform');
userform.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const emailSelect = document.getElementById('emailSelect');
    const email = emailSelect.value;
  
    try {
      const res = await fetch('/removeUser', { 
        method: 'POST', 
        body: JSON.stringify({ email }),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      console.log(data);
      if (data.user) {
        location.assign('/user');
      }
  
    }
    catch (err) {
      console.log(err);
    }
});
