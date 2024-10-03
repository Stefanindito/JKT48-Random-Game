// Select all grid items
const gridItems = document.querySelectorAll('.grid-item');
let currentIndex = 0;
let memberSelected = false; // Track if a member has been selected

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

    // Set that a member has been selected
    memberSelected = true;

    // Apply special style for certain members
    selectedMemberImg.classList.remove('large-image', 'medium-image', 'small-image', 'vsmall-image', 'xlarge-image', 'aurellia-image', 'jessi-image', 'atin-image');

    // Assign size class based on selected member
    if (selectedMemberData === "Lulu ") {
        selectedMemberImg.classList.add('xlarge-image');  // Add large image class
    } else if (selectedMemberData === 'Amanda Sukma') {
        selectedMemberImg.classList.add('medium-image'); // Add medium image class
    } else if (selectedMemberData === 'Aurhel Alana') {
        selectedMemberImg.classList.add('atin-image'); // Add medium image class
    } else if (selectedMemberData === 'Aurellia') {
        selectedMemberImg.classList.add('aurellia-image'); // Add medium image class
    } else if (selectedMemberData === 'Jesslyn Elly') {
        selectedMemberImg.classList.add('small-image'); // Add medium image class
    } else if (selectedMemberData === 'Kathrina Irene') {
        selectedMemberImg.classList.add('atin-image'); // Add medium image class
    } else if (selectedMemberData === 'Alya Amanda') {
        selectedMemberImg.classList.add('small-image'); // Add medium image class
    } else if (selectedMemberData === 'Michelle Alexandra') {
        selectedMemberImg.classList.add('vsmall-image'); // Add medium image class
    } else if (selectedMemberData === 'Fiony Alveria') {
        selectedMemberImg.classList.add('small-image'); // Add medium image class
    } else if (selectedMemberData === 'Angelina Christy') {
        selectedMemberImg.classList.add('small-image'); // Add medium image class
    } else if (selectedMemberData === 'Callista Alifia') {
        selectedMemberImg.classList.add('medium-image'); // Add medium image class
    } else if (selectedMemberData === 'Cathleen Nixie') {
        selectedMemberImg.classList.add('xlarge-image'); // Add small image class
    } else if (selectedMemberData === 'Jessica Chandra') {
        selectedMemberImg.classList.add('jessi-image'); // Add small image class
    } else if (selectedMemberData === 'Anindya Ramadhani') {
        selectedMemberImg.classList.add('vsmall-image'); // Add small image class
    } else if (selectedMemberData === 'Greesella Adhalia') {
        selectedMemberImg.classList.add('small-image'); // Add small image class
    } else if (selectedMemberData === 'Indah Cahya') {
        selectedMemberImg.classList.add('small-image'); // Add small image class
    } else if (selectedMemberData === 'Flora Shafiq') {
        selectedMemberImg.classList.add('medium-image'); // Add small image class
    } else if (selectedMemberData === 'Febriola Sinambela') {
        selectedMemberImg.classList.add('aurellia-image'); // Add small image class
    } else if (selectedMemberData === 'Abigail Rachel') {
        selectedMemberImg.classList.add('aurellia-image'); // Add small image class
    } else {
        // Default size for others
        selectedMemberImg.classList.add('default-image'); // Or any default size class
    }

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

            // Add animation class to selected member image
            selectedMemberImg.classList.add('pulse-effect');

            // Remove animation after 1 second
            setTimeout(function() {
                selectedMemberImg.classList.remove('pulse-effect');
            }, 1000);
            break;
    }
});

// Play button action (Redirect to Level 1 page or perform an action)
playButton.addEventListener('click', function() {
    const selectedMemberData = gridItems[currentIndex].getAttribute('data-member');
    
    if (!selectedMemberData) {
        alert('Pilih Member!');
    } else {
        // Save selected member to localStorage
        localStorage.setItem('selectedMember', selectedMemberData);
        
        // Redirect to level.html
        window.location.href = 'level.html';
    }
});

const audio = document.getElementById('background-audio');
audio.volume = 0.3; // Set volume to 30%

