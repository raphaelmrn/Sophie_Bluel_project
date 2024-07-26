import { fetchWorksData } from "./API.js";
import { fetchCategoriesData } from "./API.js";

const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filter-buttons");

//**** Récupération images ****//
async function getWorks() {
  const loadFetchWorksData = await fetchWorksData();
  return await loadFetchWorksData;
}

async function displayWorks() {
  const works = await getWorks();
  works.forEach((work) => {
    createWorks(work);
  });
}
displayWorks();

function createWorks(work) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");

  img.src = work.imageUrl;
  figcaption.textContent = work.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

//**** Récupération catégories et affichages bouttons ****//

async function getCategories() {
  const loadCategoriesData = await fetchCategoriesData();
  return loadCategoriesData;
}

async function displayCategoriesButtons() {
  const categories = await getCategories();
  const allBtn = document.createElement("button");
  allBtn.textContent = "TOUS";
  allBtn.id = "0";
  filters.appendChild(allBtn);
  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category.name.toUpperCase();
    btn.id = category.id;
    filters.appendChild(btn);
  });
}
displayCategoriesButtons();

//**** Filtrer au click sur les catégories ****//

async function categoryfilter() {
  const allWorks = await getWorks();
  console.log(allWorks);
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const btnId = e.target.id;
      gallery.innerHTML = "";
      if (btnId !== "0") {
        const worksSort = allWorks.filter((work) => {
          return work.categoryId == btnId;
        });
        worksSort.forEach((work) => {
          createWorks(work);
        });
      } else {
        displayWorks();
      }
      console.log(btnId);
    });
  });
}
categoryfilter();

//**** Quand l'utilisateur est connecté ****//

const loged = window.sessionStorage.loged;
const logout = document.querySelector("header nav .logout");
const modale = document.querySelector(".modale");
const loggedicon = document.querySelector(".fa-pen-to-square");
const editor = document.querySelector(".editor");

console.log(loged);

if (loged == "true") {
  editor.style.display = "flex";
  loggedicon.style.display = "flex";
  modale.textContent = "Modifier";
  logout.textContent = "logout";
  logout.addEventListener("click", () => {
    window.sessionStorage.loged = false;
  });
}

//**** Afficher/cacher la modale ****//
const containerModal = document.querySelector(".containerModal");
const xButton = document.querySelector(".containerModal .fa-circle-xmark");
const worksInModal = document.querySelector(".worksInModal");
modale.addEventListener("click", () => {
  containerModal.style.display = "flex";
});
xButton.addEventListener("click", () => {
  containerModal.style.display = "none";
});
containerModal.addEventListener("click", (e) => {
  if (e.target.className == "containerModal") {
    containerModal.style.display = "none";
  }
});

//**** Afficher la gallerie dans la modale ****//
async function displayWorksModal() {
  worksInModal.innerHTML = "";
  const photoWorks = await getWorks();
  photoWorks.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const span = document.createElement("span");
    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash-can");
    trash.id = work.id;
    img.src = work.imageUrl;
    span.appendChild(trash);
    figure.appendChild(span);
    figure.appendChild(img);
    worksInModal.appendChild(figure);
  });
  deleteWork();
}
displayWorksModal();

//**** supprimer une image dans la modale ****//

function deleteWork() {
  const allTrash = document.querySelectorAll(".fa-trash-can");
  allTrash.forEach((trash) =>
    trash.addEventListener("click", (e) => {
      const id = trash.id;
      const authToken = sessionStorage.getItem("authToken");

      if (!authToken) {
        console.error("Aucun jeton d'authentification trouvé");
        return;
      }

      const init = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      fetch("http://localhost:5678/api/works/" + id, init)
        .then((response) => {
          if (!response.ok) {
            console.log("Le delete n'a pas fonctionné");
            throw new Error("response n'a pas fonctionné");
          }
          return response;
        })
        .then((data) => {
          console.log("Le delete a été effectué", data);
          displayWorksModal();
          displayWorks();
        })
        .catch((error) => {
          console.error(
            "Il y a eu un problème avec l'opération fetch : ",
            error
          );
        });
    })
  );
}

//**** gestion dynamique des catégories ****//

async function displayCategoriesModal() {
  const select = document.querySelector(".addWorksModal select");
  const blankOption = document.createElement("option");
  blankOption.value = "";
  blankOption.textContent = "Sélectionnez une catégorie";
  select.appendChild(blankOption);
  const categories = await getCategories();
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    select.appendChild(option);
  });
}
displayCategoriesModal();

//**** Vérification des inputs & parametres d'image ****//
// const validButton = document.querySelector(".addWorksModal button");
// form.addEventListener("input", () => {
//   if (!title.value == "" && !category.value == "" && !previewImg.src == "") {
//     validButton.classList.add("enabled");
//     validButton.disabled = false;
//   } else {
//     validButton.classList.remove("enabled");
//     validButton.disabled = true;
//   }
// });

//**** gestion des deux modales ****//

const btnAddModal = document.querySelector(".worksModal button");
const addWorksModal = document.querySelector(".addWorksModal");
const worksModal = document.querySelector(".worksModal");
const arrowLeft = document.querySelector(".fa-arrow-left");
const xMark = document.querySelector(".fa-xmark");

function displayAddWorksModal() {
  btnAddModal.addEventListener("click", () => {
    worksModal.style.display = "none";
    addWorksModal.style.display = "flex";
  });
  arrowLeft.addEventListener("click", () => {
    worksModal.style.display = "flex";
    addWorksModal.style.display = "none";
  });
  xMark.addEventListener("click", () => {
    containerModal.style.display = "none";
  });
}
displayAddWorksModal();

//**** Ajouter une image dans la modale ****//
const form = document.querySelector(".addWorksModal form");
const fileInput = document.getElementById("file");
const previewImg = document.querySelector(".fileContainer img");
const addButton = document.querySelector(".addButton");
const labelFile = document.querySelector(".fileContainer label");
const iconFile = document.querySelector(".fileContainer span i");
const pFile = document.getElementById("validOptions");

//**** Validation des formats d'image ****//

// function validateFile(file) {
//   const validFormats = ["image/jpeg", "image/jpg", "image/png"];
//   const maxSize = 4 * 1024 * 1024; // 4 Mo

//   if (!validFormats.includes(file.type)) {
//     fileError.textContent = "Le format du fichier doit être jpg ou png.";
//     previewImg.style.display = "none";
//     previewImg.src = "";
//     return false;
//   } else if (file.size > maxSize) {
//     fileError.textContent = "Le fichier ne doit pas dépasser 4 Mo.";
//     previewImg.style.display = "none";
//     previewImg.src = "";
//     return false;
//   } else {
//     console.log("ok");
//     fileError.textContent = "";
//     const reader = new FileReader();
//     reader.onload = function (e) {
//       previewImg.src = e.target.result;
//       previewImg.style.display = "flex";
//       labelFile.style.display = "none";
//       iconFile.style.display = "none";
//       pFile.style.display = "none";
//       fileInput.style.display = "none";
//     };
//     reader.readAsDataURL(file);
//     return true;
//   }
// }

// ajoute d'une déco forcée si authtoken est périmé redirect login
//**** Validation du formulaire ****//

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const authToken = sessionStorage.getItem("authToken");
  const formData = new FormData(form);
  const errors = [];

  const title = form.elements.title.value.trim();
  const category = form.elements.category.value.trim();
  const file = fileInput.files[0];

  if (title === "") {
    errors.push("Le titre doit être renseigné");
  }
  if (title.length < 2) {
    errors.push("Un minimum de 2 caractères est attendu");
  }
  if (category === "") {
    errors.push("La catégorie doit être renseignée");
  }
  if (!file) {
    errors.push("Une image doit être ajoutée");
  } else {
    const acceptedFormats = ["image/jpeg", "image/jpg", "image/png"];
    if (!acceptedFormats.includes(file.type)) {
      errors.push("Les formats acceptés sont jpeg, jpg, png");
    }
    if (file.size > 4 * 1024 * 1024) {
      errors.push("Le fichier ne doit pas dépasser 4 Mo");
    }
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  try {
    formData.append("file", file);

    const response = await fetch("http://localhost:5678/api/works/", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, details: ${errorText}`
      );
    }

    const data = await response.json();
    console.log("ajouté", data);
    form.reset();
    addButton.disabled = true;
    addButton.classList.remove("enabled");
    previewImg.style.display = "none";
    previewImg.src = "";
    addWorksModal.style.display = "none";
    worksModal.style.display = "flex";
    displayWorksModal();
    displayWorks();
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error);
  }
});

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const acceptedFormats = ["image/jpeg", "image/jpg", "image/png"];
  const maxSize = 4 * 1024 * 1024; // 4 Mo
  let isValid = true;

  if (file) {
    if (!acceptedFormats.includes(file.type) || file.size > maxSize) {
      isValid = false;
    }

    if (!isValid) {
      console.log("pas valide");
      addButton.disabled = true;
      addButton.classList.remove("enabled");
    } else {
      console.log("image ok", file);
      previewImg.style.display = "block";
      previewImg.src = URL.createObjectURL(file);
      previewImg.style.display = "flex";
      labelFile.style.display = "none";
      iconFile.style.display = "none";
      pFile.style.display = "none";
      fileInput.style.display = "none";
      addButton.disabled = false;
      addButton.classList.add("enabled");
    }
  } else {
    previewImg.style.display = "none";
    previewImg.src = "";
    addButton.disabled = true;
    addButton.classList.remove("enabled");
  }
});
