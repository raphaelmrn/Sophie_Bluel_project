function $(Selector) {
  return document.querySelector(Selector);
}

//**** Variables globales login ****/
const email = $("form #email");
const password = document.querySelector("form #password");
const form = document.querySelector("form");
const errorMessage = document.getElementById("error-message");

async function loginUser() {
  try {
    const userEmail = email.value.trim();
    const userPassword = password.value.trim();

    const requestBody = {
      email: userEmail,
      password: userPassword,
    };

    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      window.sessionStorage.setItem("loged", true);
      window.sessionStorage.setItem("authToken", data.token);
      window.location.href = "index.html";
    } else {
      if (response.status === 401) {
        logoutUser();
      } else {
        displayLoginError("Email ou Mot de passe incorrect");
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function logoutUser() {
  window.sessionStorage.removeItem("loged");
  window.sessionStorage.removeItem("authToken");
  window.location.href = "login.html";
}

function displayLoginError(message) {
  email.classList.add("inputErrorLogin");
  password.classList.add("inputErrorLogin");
  errorMessage.textContent = message;
  setTimeout(clearError, 3000);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  await loginUser();
});

function clearError() {
  email.classList.remove("inputErrorLogin");
  password.classList.remove("inputErrorLogin");
  errorMessage.textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const closeButton = document.getElementById("close-btn");
  const errorMessage = document.getElementById("error-message");

  closeButton.addEventListener("click", () => {
    errorMessage.style.display = "none";
  });
});
