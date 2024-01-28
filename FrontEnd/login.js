document.addEventListener('DOMContentLoaded', function () {
  const loginResponse = document.querySelector('.login');

  loginResponse.addEventListener('submit', function (event) {
    event.preventDefault()

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
      email: email,
      password: password
    };
    console.log(loginData);

    fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then(response => {
        console.warn("response")
        return response.json()
      })
      .then(data => {
            console.log(data);
            
            if (data.token){
            localStorage.setItem('token', data.token);

            window.location.href = 'index.html';
            
            } else {
              console.error('Absence token');
            }
          })
      .catch(error => {
        console.error('Erreur lors de la requête POST:', error);
      });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const userStatus = document.getElementById('user-status');

  const isLoggedIn = localStorage.getItem('token') !== null;

  if (isLoggedIn) {

    const username = localStorage.getItem('username');
    userStatus.innerHTML = `Connecté en tant que ${username}`;
  }
});