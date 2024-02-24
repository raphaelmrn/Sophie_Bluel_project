import { getApiDelete } from "./API.js";

export async function handleDeleteIcons() {
  var deleteIcons = document.querySelectorAll('.delete-icon');

  deleteIcons.forEach(async function(icon) {
    icon.addEventListener('click', async function() {
      var workId = icon.parentNode.dataset.id;

      try {
        const apiDelete = await getApiDelete(workId);
        const { url, headers } = apiDelete;

        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'accept': '*/*',
            ...headers
          }
        });

        if (response.ok) {
          icon.parentNode.remove();
          console.log('L\'élément a été supprimé avec succès.');
        } else {
          console.error('Erreur lors de la suppression de l\'élément :', response.status);
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'élément :', error);
      }
    });
  });
}

// TODO stocker le token bearer
