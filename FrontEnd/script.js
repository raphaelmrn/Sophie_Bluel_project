
import { fetchWorksData, fetchCategoriesData } from './API.js';
import { createFilterButtons } from './filter.js';
import { appendImageElement, updateActiveButton } from './gallery.js';

document.addEventListener('DOMContentLoaded', async function () {
  const galleryContainer = document.querySelector('.gallery');
  let allData = [];
  let categoryData = [];

  try {
    const worksData = await fetchWorksData();
    handleWorksData(worksData);

    const categoriesData = await fetchCategoriesData();
    handleCategoriesData(categoriesData);
  } catch (error) {
    handleError('Erreur lors de la récupération des données:', error);
  }

  function handleWorksData(data) {
    if (data && Array.isArray(data)) {
      allData = data;
      data.forEach(item => {
        appendImageElement(galleryContainer, item);
      });
    } else {
      console.error('La réponse de l\'API ne contient pas d\'éléments.');
    }
  }

  function handleCategoriesData(data) {
    if (data && Array.isArray(data)) {
      categoryData = data;
      createFilterButtons(galleryContainer, categoryData, allData, appendImageElement, updateActiveButton);
    } else {
      console.error('La réponse de la deuxième API ne contient pas de catégories.');
    }
  }

  function updateActiveButton(clickedButton) {
    const allButtons = document.querySelectorAll('.filter-button');
    allButtons.forEach(button => button.classList.remove('active'));
    clickedButton.classList.add('active');
  }

  function handleError(message, error) {
    console.error(message, error);
  }
});