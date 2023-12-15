document.addEventListener('DOMContentLoaded', function () {
  const galleryContainer = document.querySelector('.gallery');
  const filterButtons = document.querySelectorAll('.filter-button');

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
          imgElement.dataset.category = item.id;

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
      } else {
        console.error('La réponse de la deuxième API ne contient pas de catégories.');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données de la deuxième API :', error);
    });

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const categoryFilter = this.dataset.category;

      galleryContainer.innerHTML = '';

      const filteredData = categoryFilter === 'all'
        ? allData
        : allData.filter(item => item.id === categoryFilter);

      filteredData.forEach(item => {
        const imgElement = document.createElement('img');
        imgElement.src = item.imageUrl;
        imgElement.alt = item.title;
        imgElement.dataset.category = item.id;

        const categoryInfo = categoryData.find(category => category.id === item.id);
        if (categoryInfo) {
          imgElement.dataset.categoryName = categoryInfo.name;
        }

        galleryContainer.appendChild(imgElement);
      });
    });
  });
});
