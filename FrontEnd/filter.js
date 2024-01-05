
import { fetchCategoriesData } from './API.js';

document.addEventListener('DOMContentLoaded', async function () {
  const categories = await fetchCategoriesData();
  window.allCategories = categories;

  // displayAllElements();
});

document.getElementById('btnAll').addEventListener('click', function () {
  
  // displayAllElements();
});

document.getElementById('btnObjets').addEventListener('click', function () {
  displayElementsByCategory(1);
});


document.getElementById('btnHotels').addEventListener('click', function () {
  displayElementsByCategory(2);
});

document.getElementById('btnAppartements').addEventListener('click', function () {
  displayElementsByCategory(3);
});

export async function displayElementsByCategory(categoryId) {
  const galleryContainer = document.querySelector('.gallery');
  galleryContainer.innerHTML = '';

  if (categoryId === 0) {
      allData.forEach(item => appendImageElement(item));
  } else {
      allData.forEach(item => {
          if (item.categoryId === categoryId) {
              appendImageElement(item);
          }
      });
  }
}








// import { appendImageElement, updateActiveButton } from './gallery.js';
// export function createFilterButtons(categories) {
//   const filterButtonsContainer = document.querySelector('.filter-buttons');
//   const galleryContainer = document.querySelector('.gallery');

//   const allButton = document.createElement('button');
//   allButton.textContent = 'Tous';
//   allButton.dataset.category = 'all';
//   allButton.classList.add('filter-button', 'active');
//   allButton.addEventListener('click', function () {
//     galleryContainer.innerHTML = '';
//     worksData.forEach(item => appendImageElement(item));
//     updateActiveButton(allButton);
//   });
//   filterButtonsContainer.appendChild(allButton);

//   categories.forEach(category => {
//     const button = document.createElement('button');
//     button.textContent = category.name;
//     button.dataset.category = category.id;
//     button.classList.add('filter-button');
//     button.addEventListener('click', function () {
//       const categoryFilter = this.dataset.category;
//       galleryContainer.innerHTML = '';

//       const filteredData = categoryFilter === 'all'
//         ? allData
//         : worksData.filter(item => item.categoryId == categoryFilter);

//       filteredData.forEach(item => appendImageElement(item));
//       updateActiveButton(button);
//     });

//     filterButtonsContainer.appendChild(button);
//   });
// }