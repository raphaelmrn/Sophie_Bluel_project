document.addEventListener('DOMContentLoaded', function () {
  const loginResponse = document.querySelector('.login');
  const errorMessage = document.getElementById('error-message');
  const closeError = document.getElementById('close-error');

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
        console.log(response)
        response.json()
        showError()
      })
      .catch(error => {
        console.error('Erreur lors de la requête POST:', error);
        showError();
      });
  });
closeError.addEventListener('click', function () {
  hideError();
});

function showError() {
  errorMessage.style.display = 'block';
  setTimeout(showError, 10000);
}

function hideError() {
  errorMessage.style.display = 'none';
}
const closeBtn = document.getElementById('close-btn');
  closeBtn.addEventListener('click', closeErrorMessage);
});

// export function eventSubmit() {
//   const loginresponse = document.querySelector(".login")
//   loginresponse.addEventListener("submit", function (event){
//     event.preventDefault();

//     const login = {
//       email: event.target.querySelector("[name=email]").value, 
//       password: event.target.querySelector("[name=password]").value,
//     };
//     const logInformation = JSON.stringify(login)
//     fetch("http://localhost:5678/api/users/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: logInformation
//     })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Erreur HTTP! Statut: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.error("Erreur lors de la requête POST :", error);
//     });
// });
// }