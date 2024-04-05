import { fetchWorksData, fetchCategoriesData } from "./API.js";
import { appendImageElement } from "./gallery.js";
import { displayElementsByCategory } from "./filter.js";
import { handleDeleteIcons } from "./modal.js";

const galleryContainer = document.querySelector(".gallery");

const worksData = await fetchWorksData();
const categoryData = await fetchCategoriesData();

handleWorksData(worksData);
handleCategoriesData(categoryData);

export { categoryData, worksData };

function handleWorksData(data) {
  if (data && Array.isArray(data)) {
    data.forEach((item) => {
      appendImageElement(galleryContainer, item);
    });
  } else {
    console.error("La réponse de l'API ne contient pas d'éléments.");
  }
}

function handleCategoriesData(data) {
  if (data && Array.isArray(data)) {
    displayElementsByCategory(0);
  } else {
    console.error(
      "La réponse de la deuxième API ne contient pas de catégories."
    );
  }
}

function performLogout() {
  console.log("Logging out...");
  sessionStorage.clear();
  console.log("Token and removed");
  window.location.href = "index.html";
}

const logoutElement = document.getElementById("logout-link");
const unloggedElements = document.getElementsByClassName("unlogged");
const loginElement = document.getElementById("login-link");
const isLogged = sessionStorage.getItem("authToken") !== null;
if (isLogged) {
  console.log("Logged");
  logoutElement.style.display = "block";
  loginElement.style.display = "none";
  for (let i = 0; i < unloggedElements.length; i++) {
    unloggedElements[i].style.display = "block";
  }
  logoutElement.addEventListener("click", function () {
    performLogout();
  });
} else {
  console.log("Not logged");
  logoutElement.style.display = "none";
  loginElement.style.display = "block";
  for (let i = 0; i < unloggedElements.length; i++) {
    unloggedElements[i].style.display = "none";
  }
}

let modal = document.getElementsByClassName("modal");
let editBtn = document.getElementsByClassName("editBtn");
let close = document.getElementsByClassName("close")[0];

editBtn[0].onclick = async function () {
  modal[0].style.display = "block";
  try {
    const worksData = await fetchWorksData();
    const modalGallery = document.querySelector(".modal-gallery");
    if (Array.isArray(worksData) && modalGallery) {
      modalGallery.innerHTML = "";
      worksData.forEach((item) => {
        appendImageElement(modalGallery, item, true);
      });
      handleDeleteIcons();
    } else {
      console.error("indisponible");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
};

close.onclick = function () {
  modal[0].style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal[0]) {
    modal[0].style.display = "none";
  }
};

const addButton = document.querySelector(".add-button");
const backButton = document.querySelector(".back");

const visual = document.querySelector(".visual");
const editable = document.querySelector(".editable");

function displayModalView() {
  if (this === addButton) {
    editable.style.display = "block";
    visual.style.display = "none";
  } else if (this === backButton) {
    editable.style.display = "none";
    visual.style.display = "block";
  }
}

addButton.addEventListener("click", displayModalView);

backButton.addEventListener("click", displayModalView);

async function addCategoriesSelect() {
  const selectElement = document.getElementById("categories");

  selectElement.innerHTML = "";
  try {
    const categories = await fetchCategoriesData();

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      selectElement.appendChild(option);
    });
  } catch (error) {
    console.error("Erreur sur la récup des catégories", error);
  }
}
addCategoriesSelect();

//TODO l42 a l45 tout mettre dans une fonction
//TODO .files[O]
