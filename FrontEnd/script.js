
import { fetchWorksData, fetchCategoriesData } from './API.js';
import { appendImageElement} from './gallery.js';
import { displayElementsByCategory } from './filter.js';
import { handleDeleteIcons } from './modal.js';

  const galleryContainer = document.querySelector('.gallery');

    const worksData = await fetchWorksData();
    const categoryData = await fetchCategoriesData();

    handleWorksData(worksData);
    handleCategoriesData(categoryData);

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

  function performLogout() {
    console.log('Logging out...');
    sessionStorage.clear();
    console.log('Token and removed');
    window.location.href = 'index.html'
  }

  const logoutElement = document.getElementById('logout-link');
  const unloggedElements = document.getElementsByClassName('unlogged') 
  const loginElement = document.getElementById('login-link');
  const isLogged = localStorage.getItem('authToken') !== null;
  if (isLogged) {
    console.log('Logged');
    logoutElement.style.display = "block"
    loginElement.style.display = "none"
    for (let i = 0; i < unloggedElements.length; i++) {
      unloggedElements[i].style.display = "block";
  }
    logoutElement.addEventListener("click", function(){
      performLogout()
    })
  }else{
    console.log('Not logged');
    logoutElement.style.display = "none"
    loginElement.style.display = "block"
    for (let i = 0; i < unloggedElements.length; i++) {
      unloggedElements[i].style.display = "none";
    }
  }

  var modal = document.getElementsByClassName("modal");
  var editBtn = document.getElementsByClassName("editBtn");
  var close = document.getElementsByClassName("close")[0];

  editBtn[0].onclick = async function() {
    modal[0].style.display = "block";
    try {
      const worksData = await fetchWorksData();
      const modalGallery = document.querySelector('.modal-gallery');
      if (Array.isArray(worksData) && modalGallery) {
        modalGallery.innerHTML = '';
        worksData.forEach(item => {
          appendImageElement(modalGallery, item, true);
        });
        handleDeleteIcons();
      } else {
        console.error('indisponible');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };
  
  close.onclick = function() {
    modal[0].style.display = "none";
  };
  window.onclick = function(event) {
    if (event.target == modal[0]) {
      modal[0].style.display = "none";
    }
  };  

//TODO requete post vérification authentification
