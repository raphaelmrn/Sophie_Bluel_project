import { fetchCategoriesData } from "./API.js";
import { appendImageElement, clearActiveButtons } from "./gallery.js";
import { worksData } from "./script.js";

document.addEventListener("DOMContentLoaded", async function () {
  const categories = await fetchCategoriesData();
  createFilterButtons(categories);
});

function createFilterButtons(categories) {
  const filterButtonsContainer = document.querySelector(".filter-buttons");

  const allButton = createFilterButton("Tous", "all", "active", () => {
    displayElementsByCategory(0);
  });
  filterButtonsContainer.appendChild(allButton);

  categories.forEach((category) => {
    const button = createFilterButton(category.name, category.id, "", () => {
      displayElementsByCategory(category.id);
    });
    filterButtonsContainer.appendChild(button);
  });
}

function createFilterButton(text, categoryId, className, clickHandler) {
  const button = document.createElement("button");
  button.textContent = text;
  button.dataset.category = categoryId;
  button.classList.add("filter-button");
  if (className) {
    button.classList.add(className);
  }
  button.addEventListener("click", () => {
    clearActiveButtons();
    clickHandler();
    button.classList.add("active");
  });
  return button;
}

export async function displayElementsByCategory(category) {
  const galleryContainer = document.querySelector(".gallery");
  galleryContainer.innerHTML = "";

  if (category === 0) {
    if (worksData) {
      worksData.forEach((item) => appendImageElement(galleryContainer, item));
    }
  } else {
    if (worksData) {
      worksData.forEach((item) => {
        if (item.categoryId === category) {
          appendImageElement(galleryContainer, item);
        }
      });
    }
  }
}
