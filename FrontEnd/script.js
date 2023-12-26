document.addEventListener('DOMContentLoaded', function () {
  const galleryContainer = document.querySelector('.gallery');

  let allData = [];
  let categoryData = [];

  fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
      if (data && Array.isArray(data)) {
        allData = data;
        data.forEach(item => {
          const imgElement = document.createElement('img');
          imgElement.src = item.imageUrl;
          imgElement.alt = item.title;
          imgElement.dataset.category = item.categoryId;

          galleryContainer.appendChild(imgElement);
        });
      } else {
        console.error('La réponse de l\'API ne contient pas d\'éléments.');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données de l\'API :', error);
    });

  fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
      if (data && Array.isArray(data)) {
        categoryData = data;
        createFilterButtons(categoryData);
      } else {
        console.error('La réponse de la deuxième API ne contient pas de catégories.');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données de la deuxième API :', error);
    });

    function createFilterButtons(categories) {
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
  
    function appendImageElement(item) {
      const imgElement = document.createElement('img');
      imgElement.src = item.imageUrl;
      imgElement.alt = item.title;
      imgElement.dataset.category = item.id;
      galleryContainer.appendChild(imgElement);
    }
  
    function updateActiveButton(clickedButton) {
      const allButtons = document.querySelectorAll('.filter-button');
      allButtons.forEach(button => button.classList.remove('active'));
      clickedButton.classList.add('active');
    }
  });