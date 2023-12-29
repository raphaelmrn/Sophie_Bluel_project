
export function appendImageElement(galleryContainer, item) {
  const imgElement = document.createElement('img');
  imgElement.src = item.imageUrl;
  imgElement.alt = item.title;
  imgElement.dataset.category = item.id;
  galleryContainer.appendChild(imgElement);
}

export function updateActiveButton(clickedButton) {
  const allButtons = document.querySelectorAll('.filter-button');
  allButtons.forEach(button => button.classList.remove('active'));
  clickedButton.classList.add('active');
}