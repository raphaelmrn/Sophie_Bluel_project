export function appendImageElement(galleryContainer, item, isModalGallery) {
  if (!galleryContainer) {
    console.error("Gallery container is null.");
    return;
  }

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("modal-image");

  const imgElement = document.createElement("img");
  imgElement.src = item.imageUrl;
  imgElement.alt = item.title;
  imgElement.dataset.category = item.categoryId;
  imgElement.dataset.id = item.id;

  imgContainer.appendChild(imgElement);

  if (isModalGallery) {
    const trashIconContainer = document.createElement("div");
    trashIconContainer.classList.add("delete-icon");

    const trashIcon = document.createElement("svg");
    trashIcon.classList.add("delete-icon");
    trashIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="white" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>`;

    trashIconContainer.appendChild(trashIcon);

    imgContainer.appendChild(trashIconContainer);
  }

  galleryContainer.appendChild(imgContainer);
}

export function clearActiveButtons() {
  const allButtons = document.querySelectorAll(".filter-button");
  allButtons.forEach((button) => button.classList.remove("active"));
}
