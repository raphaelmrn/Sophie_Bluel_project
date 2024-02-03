
import { fetchWorksData, fetchCategoriesData } from './API.js';
import { appendImageElement} from './gallery.js';
import { displayElementsByCategory } from './filter.js';

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
    localStorage.clear();
    console.log('Token and removed');
    window.location.href = 'index.html'
  }
  

  const logoutElement = document.getElementById('logout-link');
  const EditElement = document.getElementById('edit')
  const loginElement = document.getElementById('login-link');
  const isLogged = localStorage.getItem('token') !== null;
  if (isLogged) {
    console.log('Logged');
    logoutElement.style.display = "block"
    loginElement.style.display = "none"
    EditElement.style.display = "block"
    logoutElement.addEventListener("click", function(){
      performLogout()
    })
  }else{
    console.log('Not logged');
    logoutElement.style.display = "none"
    loginElement.style.display = "block"
    EditElement.style.display = "none"
  }

var modal = document.getElementById("modall");
var btn = document.getElementById("edit-button");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
