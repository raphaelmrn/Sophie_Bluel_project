import { deleteElement } from "./API.js";
export async function handleDeleteIcons() {
  const deleteIcons = document.querySelectorAll(".delete-icon");

  deleteIcons.forEach(async function (icon) {
    icon.addEventListener("click", async function () {
      const workId = icon.parentNode.dataset.id;

      try {
        const authToken = sessionStorage.getItem("authToken");
        if (!authToken) {
          console.error(
            "Erreur lors de la suppression de l'élément : Utilisateur non authentifié"
          );
          return;
        }
        const response = await deleteElement(workId, authToken);

        if (response.status === 204) {
          icon.parentNode.remove();
          console.log("L'élément a été supprimé avec succès.");
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
