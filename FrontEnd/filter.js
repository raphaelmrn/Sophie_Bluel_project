import { fetchCategoriesData } from './API.js';
import { appendImageElement, clearActiveButtons } from './gallery.js'

document.addEventListener('DOMContentLoaded', async function () {
  const categories = await fetchCategoriesData();
  createFilterButtons(categories);
});

function createFilterButtons(categories) {
  const filterButtonsContainer = document.querySelector('.filter-buttons');


  const allButton = createFilterButton('Tous', 'all', 'active', () => {
    displayElementsByCategory(0);
  });
  filterButtonsContainer.appendChild(allButton);

  categories.forEach(category => {
    const button = createFilterButton(category.name, category.id, '', () => {
      displayElementsByCategory(category.id);
    });
    filterButtonsContainer.appendChild(button);
  });
}

function createFilterButton(text, categoryId, className, clickHandler) {
  const button = document.createElement('button');
  button.textContent = text;
  button.dataset.category = categoryId;
  button.classList.add('filter-button');
  if (className) {
    button.classList.add(className);
  }
  button.addEventListener('click', () => {
    clearActiveButtons();
    clickHandler();
    button.classList.add('active');
  });
  return button;
}

export async function displayElementsByCategory(categoryId) {
  const galleryContainer = document.querySelector('.gallery');
  galleryContainer.innerHTML = '';

  if (categoryId === 0) {
    if (window.allData) {
      window.allData.forEach(item => appendImageElement(galleryContainer, item));
    }
  } else {
    if (window.worksData) {
      window.worksData.forEach(item => {
        if (item.categoryId === categoryId) {
          appendImageElement(galleryContainer, item);
        }
      });
    }
  }
}
























// import { fetchCategoriesData } from './API.js';
// import { appendImageElement, updateActiveButton } from './gallery.js'

// document.addEventListener('DOMContentLoaded', async function () {
//   const categories = await fetchCategoriesData();
//   window.allCategories = categories;

// });

// document.getElementById('btnAll').addEventListener('click', function () {

//   displayElementsByCategory('all');
// });

// document.getElementById('btnObjets').addEventListener('click', function () {
//   displayElementsByCategory(1);
// });


// document.getElementById('btnHotels').addEventListener('click', function () {
//   displayElementsByCategory(2);
// });

// document.getElementById('btnAppartements').addEventListener('click', function () {
//   displayElementsByCategory(3);
// });

// export async function displayElementsByCategory(categoryId) {
//   const galleryContainer = document.querySelector('.gallery');
//   galleryContainer.innerHTML = '';

//   if (categoryId === 0) {
//       allData.forEach(item => appendImageElement(item));
//   } else {
//       allData.forEach(item => {
//           if (item.categoryId === categoryId) {
//               appendImageElement(item);
//           }
//       });
//   }
// }


// export function createFilterButtons(categories) {
//   const filterButtonsContainer = document.querySelector('.filter-buttons');
//   const galleryContainer = document.querySelector('.gallery');

//   const allButton = createFilterButton('Tous', 'all', true);
//   filterButtonsContainer.appendChild(allButton);

//   categories.forEach(category => {
//     const button = createFilterButton(category.name, category.id, false);
//     filterButtonsContainer.appendChild(button);
//   });

//   function createFilterButton(text, categoryFilter, isActive) {
//     const button = document.createElement('button');
//     button.textContent = text;
//     button.dataset.category = categoryFilter;
//     button.classList.add('filter-button');

//     if (isActive) {
//       button.classList.add('active');
//     }

//     button.addEventListener('click', function () {
//       galleryContainer.innerHTML = '';

//       const filteredData = categoryFilter === 'all'
//         ? allData
//         : worksData.filter(item => item.categoryId == categoryFilter);

//       filteredData.forEach(item => appendImageElement(item));
//       updateActiveButton(button);
//     });

//     return button;
//   }
// }





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