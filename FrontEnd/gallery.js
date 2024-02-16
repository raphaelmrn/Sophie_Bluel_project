
export function appendImageElement(galleryContainer, item, isModalGallery) {
  const imgElement = document.createElement('img');
  imgElement.src = item.imageUrl;
  imgElement.alt = item.title;
  imgElement.dataset.category = item.categoryId;
  galleryContainer.appendChild(imgElement);

  if (isModalGallery) {
    const deleteIcon = document.createElement('div');
    deleteIcon.classList.add('delete-icon');
    deleteIcon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L18 20H6L4 6H20ZM16 8H8L9 18H15L16 8ZM10 10H12V16H10V10ZM14 10H16V16H14V10Z" fill="black"/></svg>`;
    galleryContainer.appendChild(deleteIcon);
  }
}

export function clearActiveButtons() {
  const allButtons = document.querySelectorAll('.filter-button');
  allButtons.forEach(button => button.classList.remove('active'));
}