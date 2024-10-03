// Select all grid items
const gridItems = document.querySelectorAll('.grid-item');
let currentIndex = 0;

// Select the image and name container for the selected member
const selectedMemberImg = document.getElementById('selected-member-img');
const selectedMemberName = document.getElementById('selected-member-name');

// Select the Play button and its section
const playButton = document.getElementById('play-button');
const playSection = document.getElementById('play-section');

// Add audio for arrow key navigation and Enter key press
const arrowSound = new Audio('sounds/choose.mp3');  // Path to your sound file for Arrow keys
const enterSound = new Audio('sounds/selected.mp3');  // Path to your sound file for Enter key

// Highlight the initial selected member
gridItems[currentIndex].classList.add('selected');

// Function to update the selected grid item
function updateSelection(index) {
    // Remove the previous selection
    gridItems[currentIndex].classList.remove('selected');
    
    // Update the current index
    currentIndex = index;

    // Add the highlight to the new selection
    gridItems[currentIndex].classList.add('selected');
    
    // Update the placeholder image with the selected member's image
    const selectedMemberSrc = gridItems[currentIndex].querySelector('img').src;
    selectedMemberImg.src = selectedMemberSrc;

    // Update the selected member name
    const selectedMemberData = gridItems[currentIndex].getAttribute('data-member');
    selectedMemberName.textContent = selectedMemberData; // Display the name

    // Play sound effect for arrow navigation
    arrowSound.play();
}

// Event listener for keyboard navigation
document.addEventListener('keydown', function (event) {
    const rows = 10; // Number of columns in the grid (adjust based on your layout)
    let newIndex;

    switch (event.key) {
        case 'ArrowRight':
            newIndex = (currentIndex + 1) % gridItems.length;
            updateSelection(newIndex);
            break;
        case 'ArrowLeft':
            newIndex = (currentIndex - 1 + gridItems.length) % gridItems.length;
            updateSelection(newIndex);
            break;
        case 'ArrowDown':
            newIndex = (currentIndex + rows) % gridItems.length;
            updateSelection(newIndex);
            break;
        case 'ArrowUp':
            newIndex = (currentIndex - rows + gridItems.length) % gridItems.length;
            updateSelection(newIndex);
            break;
        case 'Enter':
            // Play the selection sound
            enterSound.play();

            // Show the Play button after selection
            playSection.classList.remove('hidden');

            // Menambahkan kelas animasi ke gambar member yang dipilih
            selectedMemberImg.classList.add('pulse-effect');

            // Menghapus animasi setelah selesai (1 detik)
            setTimeout(function() {
                selectedMemberImg.classList.remove('pulse-effect');
            }, 1000);

            break;
    }
});

// Play button action (Redirect to Level 1 page or perform an action)
playButton.addEventListener('click', function() {
    // Redirect or perform another action
    alert('Proceeding to Level 1 with ' + selectedMemberName.textContent);
});
