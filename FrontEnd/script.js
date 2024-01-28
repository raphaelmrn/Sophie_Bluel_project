
import { fetchWorksData, fetchCategoriesData } from './API.js';
import { appendImageElement} from './gallery.js';
import { displayElementsByCategory } from './filter.js';

  const galleryContainer = document.querySelector('.gallery');

    const worksData = await fetchWorksData();
    const categoryData = await fetchCategoriesData();

    handleWorksData(worksData);
    handleCategoriesData(categoriesData);

  export {categoryData, worksData}

  function handleWorksData(data) {
    if (data && Array.isArray(data)) {
      data.forEach(item => {
        appendImageElement(galleryContainer, item);
      });
    } else {
      console.error('La réponse de l\'API ne contient pas d\'éléments.');
    }
  }

  function handleCategoriesData(data) {
    if (data && Array.isArray(data)) {
      displayElementsByCategory(0);
    } else {
      console.error('La réponse de la deuxième API ne contient pas de catégories.');
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    const loginLink = document.querySelector('#login-link');
    const logoutLink = document.querySelector('#logout-link');
  
    const isLoggedIn = localStorage.getItem('token') !== null;
  
    if (isLoggedIn) {
  
      loginLink.style.display = 'none'; 
      logoutLink.style.display = 'block'; 
    } else {
      loginLink.style.display = 'block';
      logoutLink.style.display = 'none';
    }
  });