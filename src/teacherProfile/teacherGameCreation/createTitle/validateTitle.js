export function validateTitle (title) {
  if (!title) {
    document.getElementsByClassName('create-game-error')[0].innerHTML = 'Title is required.';
    const titleInput = document.getElementById('title');
    titleInput.focus();
    titleInput.classList.add('error-input');
    return false;
  } else {
    return true;
  }
}