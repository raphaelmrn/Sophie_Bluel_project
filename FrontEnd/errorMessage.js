document.addEventListener('DOMContentLoaded', function () {
  const errorMessage = document.getElementById('error-message');
  const closeBtn = document.getElementById('close-btn');

  function closeErrorMessage() {
    errorMessage.style.display = 'none';
  }

  function displayErrorMessage() {
    errorMessage.style.display = 'block';
    setTimeout(closeErrorMessage, 10000); 
  }

  displayErrorMessage();

  closeBtn.addEventListener('click', closeErrorMessage);
});