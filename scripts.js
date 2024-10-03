// Array of all file paths to be preloaded
const filePaths = [
    'img/index.jpg',
    'img/fx.jpg',
    'img/play.png',
    'img/FX.webp',
    'img/main-banner.webp',
    'img/cursor1.png',
    'img/cursor.png',
    'img/bg.jpg',
    'img/bg.png',
    'img/wotazombie.png'
    'img/wotamap.png'
    'img/wotabul.png'
    'img/choose.png',
    'img/abigail-rachel/large.png',
    'img/adeline-wijaya/large.png',
    'img/alya-amanda/large.png',
    'img/amanda-sukma/large.png',
    'img/angelina-christy/large.png',
    'img/anindya-ramadhani/large.png',
    'img/aurellia/large.png',
    'img/aurhel-alana/large.png',
    'img/callista-alifia/large.png',
    'img/catherina-vallencia/large.png',
    'img/cathleen-nixie/large.png',
    'img/celline-thefani/large.png',
    'img/chelsea-davina/large.png',
    'img/cornelia-vanisa/large.png',
    'img/cynthia-yaputera/large.png',
    'img/dena-natalia/large.png',
    'img/desy-natalia/large.png',
    'img/febriola-sinambela/large.png',
    'img/feni-fitriyanti/large.png',
    'img/fiony-alveria/large.png',
    'img/flora-shafiq/large.png',
    'img/freya-jayawardana/large.png',
    'img/fritzy-rosmerian/large.png',
    'img/gabriela-abigail/large.png',
    'img/gendis-mayrannisa/large.png',
    'img/gita-sekar/large.png',
    'img/grace-octaviani/large.png',
    'img/greesella-adhalia/large.png',
    'img/helisma-putri/large.png',
    'img/hillary-abigail/large.png',
    'img/indah-cahya/large.png',
    'img/indira-seruni/large.png',
    'img/jazzlyn-trisha/large.png',
    'img/jessica-chandra/large.png',
    'img/jesslyn-elly/large.png',
    'img/kathrina-irene/large.png',
    'img/letycia-moreen/large.png',
    'img/lulu-salsabila/large.png',
    'img/marsha-lenathea/large.png',
    'img/michelle-alexandra/large.png',
    'img/michelle-levia/large.png',
    'img/mutiara-azzahra/large.png',
    'img/nayla-suji/large.png',
    'img/nina-tutachia/large.png',
    'img/oline-manuel/large.png',
    'img/raisha-syifa/large.png',
    'img/regina-wilian/large.png',
    'img/ribka-budiman/large.png',
    'img/shabilqis-naila/large.png',
    'img/shania-gracia/large.png',
    'img/victoria-kimberly/large.png',
    'sounds/bgchoose.mp3',
    'sounds/victory.mp3',
    'sounds/selected.mp3',
    'sounds/choose.mp3',
];

let loadedFiles = 0; // Counter for loaded files
const totalFiles = filePaths.length; // Total number of files to load

// Update loading percentage on the screen
function updateLoadingPercentage() {
    const percentage = Math.floor((loadedFiles / totalFiles) * 100);
    document.getElementById('loading-percentage').innerText = `${percentage}%`;
}

// Load an image or other file using a Promise
function loadFile(path) {
    return new Promise((resolve, reject) => {
        if (path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.webp') || path.endsWith('.ico')) {
            const img = new Image();
            img.src = path;
            img.onload = () => {
                loadedFiles++;
                updateLoadingPercentage();
                resolve();
            };
            img.onerror = () => {
                console.error(`Failed to load image: ${path}`);
                reject();
            };
        } else if (path.endsWith('.otf') || path.endsWith('.ttf')) {
            // For fonts, just preload using fetch
            fetch(path)
                .then((response) => {
                    if (response.ok) {
                        loadedFiles++;
                        updateLoadingPercentage();
                        resolve();
                    } else {
                        console.error(`Failed to load font: ${path}`);
                        reject();
                    }
                })
                .catch((error) => {
                    console.error(`Error fetching font: ${path}`, error);
                    reject();
                });
        } else if (path.endsWith('.mp3')) {
            // For audio files
            const audio = new Audio();
            audio.src = path;
            audio.oncanplaythrough = () => {
                loadedFiles++;
                updateLoadingPercentage();
                resolve();
            };
            audio.onerror = () => {
                console.error(`Failed to load audio: ${path}`);
                reject();
            };
        } else {
            // Fallback for other file types
            fetch(path)
                .then((response) => {
                    if (response.ok) {
                        loadedFiles++;
                        updateLoadingPercentage();
                        resolve();
                    } else {
                        console.error(`Failed to load file: ${path}`);
                        reject();
                    }
                })
                .catch((error) => {
                    console.error(`Error fetching file: ${path}`, error);
                    reject();
                });
        }
    });
}



// Preload all files
function preloadFiles() {
    return Promise.all(filePaths.map(loadFile));
}

// When the window is loaded, start preloading files
window.onload = function () {
    preloadFiles().then(() => {
        // Once all files are loaded, hide the loading text and show the "Play" button
        document.querySelector('.loading-text').style.display = 'none';
        document.getElementById('play-btn').style.display = 'block';
    }).catch((error) => {
        console.error('Error loading files:', error);
    });
};

// Function to start the game
function startGame() {
    window.location.href = 'choose.html';
}
