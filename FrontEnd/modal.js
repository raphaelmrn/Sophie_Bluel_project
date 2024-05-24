import { deleteElement } from "./API.js";

export async function handleDeleteIcons() {
  const deleteIcons = document.querySelectorAll(".delete-icon");

  deleteIcons.forEach(async function (icon) {
    icon.addEventListener("click", async function (e) {
      e.preventDefault();
      const imgElement = icon.closest(".modal-image").querySelector("img");
      if (!imgElement) {
        console.error("Image introuvable.");
        return;
      }

      const workId = imgElement.dataset.id;

      try {
        const authToken = sessionStorage.getItem("authToken");
        if (!authToken) {
          console.error("Utilisateur non authentifié.");
          return;
        }
        const response = await deleteElement(workId, authToken);

        if (response.status === 204) {
          imgElement.closest(".modal-image").remove();
          console.log("L'élément a été supprimé avec succès.");

          const galleryItem = document.querySelector(
            `img[data-id="${workId}"]`
          );
          if (galleryItem) {
            galleryItem.closest(".modal-image").remove();
          }
        } else {
          console.error(
            "Erreur lors de la suppression de l'élément :",
            response.status
          );
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de l'élément :", error);
      }
    });
  });
}
