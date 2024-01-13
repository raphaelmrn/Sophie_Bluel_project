
export function appendImageElement(galleryContainer, item) {
  const imgElement = document.createElement('img');
  imgElement.src = item.imageUrl;
  imgElement.alt = item.title;
  imgElement.dataset.category = item.categoryId;
  galleryContainer.appendChild(imgElement);
}

export function clearActiveButtons() {
  const allButtons = document.querySelectorAll('.filter-button');
  allButtons.forEach(button => button.classList.remove('active'));
}