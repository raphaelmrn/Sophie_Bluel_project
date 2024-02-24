
export function appendImageElement(galleryContainer, item, isModalGallery) {
  const imgContainer = document.createElement('div');
  imgContainer.classList.add('modal-image');

  const imgElement = document.createElement('img');
  imgElement.src = item.imageUrl;
  imgElement.alt = item.title;
  imgElement.dataset.category = item.categoryId;

  imgContainer.appendChild(imgElement);

  if (isModalGallery) {
    const trashIconContainer = document.createElement('div');
    trashIconContainer.classList.add('delete-icon');

    const trashIcon = document.createElement('svg');
    trashIcon.classList.add('delete-icon');
    trashIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    trashIcon.setAttribute('width', '24');
    trashIcon.setAttribute('height', '24');
    trashIcon.setAttribute('viewBox', '0 0 24 24');
    trashIcon.innerHTML = '<path fill="none" d="M0 0h24v24H0z"/><path d="M17 5h-3V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v1H7V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v1H1v2h22V5h-3zM8 18v-1h8v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"/>';

    trashIconContainer.appendChild(trashIcon);
    imgContainer.appendChild(trashIconContainer);
  }

  galleryContainer.appendChild(imgContainer);
}


export function clearActiveButtons() {
  const allButtons = document.querySelectorAll('.filter-button');
  allButtons.forEach(button => button.classList.remove('active'));
}