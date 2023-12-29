
import { appendImageElement, updateActiveButton } from './gallery.js';
export function createFilterButtons(categories) {
  const filterButtonsContainer = document.querySelector('.filter-buttons');

  const allButton = document.createElement('button');
  allButton.textContent = 'Tous';
  allButton.dataset.category = 'all';
  allButton.classList.add('filter-button', 'active');
  allButton.addEventListener('click', function () {
    galleryContainer.innerHTML = '';
    allData.forEach(item => appendImageElement(item));
    updateActiveButton(allButton);
  });
  filterButtonsContainer.appendChild(allButton);

  categories.forEach(category => {
    const button = document.createElement('button');
    button.textContent = category.name;
    button.dataset.category = category.id;
    button.classList.add('filter-button');
    button.addEventListener('click', function () {
      const categoryFilter = this.dataset.category;
      galleryContainer.innerHTML = '';

      const filteredData = categoryFilter === 'all'
        ? allData
        : allData.filter(item => item.categoryId == categoryFilter);

      filteredData.forEach(item => appendImageElement(item));
      updateActiveButton(button);
    });

    filterButtonsContainer.appendChild(button);
  });
}