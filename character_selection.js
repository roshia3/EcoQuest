const characters = document.querySelectorAll('.character-option');
const continueBtn = document.getElementById('continueBtn');
let selectedCharacter = null;


// When user clicks on a character
characters.forEach(character => {
  character.addEventListener('click', () => {
    // Remove 'selected' from all characters
    characters.forEach(c => c.classList.remove('selected'));
    // Add 'selected' to the clicked one
    character.classList.add('selected');
    // Store selected character name
    selectedCharacter = character.getAttribute('data-character');
    // Save immediately to localStorage
    localStorage.setItem('selectedCharacter', selectedCharacter);
    // Enable the Continue button
    continueBtn.disabled = false;
  });
});

// When Continue button is clicked
function launchBoard() {
  window.location.href = "game_board.html";
}
