
export function handleDeleteIcons() {
  var deleteIcons = document.querySelectorAll('.delete-icon');

  deleteIcons.forEach(function(icon) {
    icon.addEventListener('click', function() {
      var workId = icon.parentNode.dataset.id;

      fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',
        headers: {
          'accept': '*/*',
          Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4'}`
        }
      })
      .then(response => {
        if (response.ok) {
          icon.parentNode.remove();
          console.log('L\'élément a été supprimé avec succès.');
        } else {
          console.error('Erreur lors de la suppression de l\'élément :', response.status);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de l\'élément :', error);
      });
    });
  });
}

