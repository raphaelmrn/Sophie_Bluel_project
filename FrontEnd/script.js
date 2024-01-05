
import { fetchWorksData, fetchCategoriesData } from './API.js';
import { appendImageElement} from './gallery.js';
import { handleError } from './utils.js';
import { displayElementsByCategory } from './filter.js';

  let worksData = [];
  let categoryData = [];
  const galleryContainer = document.querySelector('.gallery');

  try {
    let worksData = await fetchWorksData();
    let categoriesData = await fetchCategoriesData();

    handleWorksData(worksData);
    handleCategoriesData(categoriesData);

  } catch (error) {
    handleError('Erreur lors de la récupération des données:', error);
  }

  function handleWorksData(data) {
    if (data && Array.isArray(data)) {
      worksData = data;
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
      displayElementsByCategory(categoryData);
    } else {
      console.error('La réponse de la deuxième API ne contient pas de catégories.');
    }
  };
