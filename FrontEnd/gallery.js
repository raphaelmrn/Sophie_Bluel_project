export function appendImageElement(galleryContainer, item, isModalGallery) {
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
    trashIconContainer.dataset.id = item.id;

    const trashIcon = document.createElement("svg");
    trashIcon.classList.add("trash-icon");
    trashIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    trashIcon.setAttribute("width", "32");
    trashIcon.setAttribute("height", "32");
    trashIcon.setAttribute("viewBox", "0 0 24 24");
    trashIcon.innerHTML =
      '<path fill="currentColor" d="M7.615 20q-.67 0-1.143-.472Q6 19.056 6 18.385V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.152q-.463.463-1.153.463zM17 6H7v12.385q0 .269.173.442t.442.173h8.77q.23 0 .423-.192q.192-.193.192-.423zM9.808 17h1V8h-1zm3.384 0h1V8h-1zM7 6v13z"/> ';
    trashIconContainer.appendChild(trashIcon);
    imgContainer.appendChild(trashIconContainer);
  }

  galleryContainer.appendChild(imgContainer);
}

export function clearActiveButtons() {
  const allButtons = document.querySelectorAll(".filter-button");
  allButtons.forEach((button) => button.classList.remove("active"));
}
