const player = document.getElementById("player");
const enemies = document.querySelectorAll(".enemy");
let isJumping = false;
let isMovingRight = false;
let isMovingLeft = false;
let isFlying = false;
let playerBottom = 20; // Initial vertical position
let currentLevel = 1; // Starting level
let enemySpeed = [3, 4]; // Speed for enemies in level 1
let enemy3Visible = false; // Flag to control enemy 3 visibility

const selectedMember = localStorage.getItem('selectedMember');

// Jika tidak ada member yang dipilih, redirect kembali ke halaman pemilihan
if (!selectedMember) {
    alert('Pilih member dulu!');
    window.location.href = 'index.html'; // Ganti dengan halaman pemilihan yang sesuai
} else {
    // Tampilkan member yang dipilih di game
    const playerImg = document.getElementById('player');
    playerImg.src = `img/${selectedMember.toLowerCase().replace(" ", "-")}/large.png`;
}

// Fungsi untuk menggerakkan pemain
function movePlayer() {
    if (isMovingRight) {
        let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
        player.style.left = (playerLeft + 7) + "px";
    }
    if (isMovingLeft) {
        let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
        if (playerLeft > 0) {
            player.style.left = (playerLeft - 7) + "px";
        }
    }

    // Cek apakah pemain sudah sampai di ujung layar untuk lanjut level
    if (parseInt(player.style.left) >= window.innerWidth - player.offsetWidth) {
        nextLevel(); // Panggil fungsi untuk lanjut ke level berikutnya
    }
}

function jump() {
    if (!isJumping) {
        isJumping = true;
        let jumpInterval = setInterval(() => {
            playerBottom += 20;
            player.style.bottom = playerBottom + "px";
            if (playerBottom >= 300) { // Maximum jump height
                clearInterval(jumpInterval);
                let fallInterval = setInterval(() => {
                    playerBottom -= 5;
                    player.style.bottom = playerBottom + "px";
                    if (playerBottom <= 20) { // Back to ground level
                        clearInterval(fallInterval);
                        isJumping = false;
                    }
                }, 20);
            }
        }, 20);
    }
}


// Fungsi khusus untuk Cathleen Nixie yang bisa terbang
function moveCathleenNixie() {
    if (isMovingRight) {
        let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
        player.style.left = (playerLeft + 7) + "px";
    }
    if (isMovingLeft) {
        let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
        if (playerLeft > 0) {
            player.style.left = (playerLeft - 7) + "px";
        }
    }

    // Jika tombol ArrowUp ditekan terus menerus, Cathleen Nixie akan terbang
    if (isFlying) {
        playerBottom += 5; // Tinggi terbang
        player.style.bottom = playerBottom + "px";
    } else {
        playerBottom -= 5; // Turun saat tombol dilepas
        if (playerBottom < 20) playerBottom = 20; // Batas bawah
        player.style.bottom = playerBottom + "px";
    }

    // Cek apakah pemain sudah sampai di ujung layar untuk lanjut level
    if (parseInt(player.style.left) >= window.innerWidth - player.offsetWidth) {
        nextLevel(); // Panggil fungsi untuk lanjut ke level berikutnya
    }
}

// Fungsi untuk menggerakkan musuh
function moveEnemy() {
    enemies.forEach((enemy, index) => {
        if (currentLevel === 1 && enemy.id === "enemy3") {
            enemy.classList.add('hidden'); // Pastikan enemy3 tetap tersembunyi di level 1
            return;
        }

        let enemyPosition = parseInt(window.getComputedStyle(enemy).getPropertyValue("right"));
        enemy.style.right = (enemyPosition + enemySpeed[index]) + "px";

        // Jika musuh keluar dari layar, kembalikan ke posisi awal
        if (enemyPosition >= window.innerWidth) {
            enemy.style.right = "0px";
        }
    });
}

// Fungsi untuk memeriksa tabrakan
function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    
    enemies.forEach(enemy => {
        if (currentLevel === 1 && enemy.id === "enemy3") return; // Jangan cek collision dengan enemy3 di level 1

        const enemyRect = enemy.getBoundingClientRect();
        if (
            playerRect.bottom >= enemyRect.top &&
            playerRect.top <= enemyRect.bottom &&
            playerRect.right >= enemyRect.left &&
            playerRect.left <= enemyRect.right
        ) {
            restartGame(); // Ulangi permainan jika menyentuh musuh
        }
    });
}

// Fungsi untuk ke level berikutnya
function nextLevel() {
    currentLevel += 1;
    if (currentLevel > 2) {
        window.location.href = 'victory.html'; // Kembali ke halaman utama
    } else {
        document.getElementById("level-text").textContent = `Level ${currentLevel}`;
        document.getElementById("game-container").style.background = `url('img/bg.jpg') no-repeat center center`;
        document.getElementById("game-container").style.backgroundSize = 'cover';

        // Reset posisi player
        player.style.left = '0px';
        
        // Tambahkan enemy 3 pada level 2 dan atur kecepatan musuh yang berbeda
        if (currentLevel === 2) {
            const enemy3 = document.getElementById('enemy3');
            enemy3.classList.remove('hidden'); // Tampilkan musuh 3
            enemySpeed = [4.5, 5, 6]; // Kecepatan musuh untuk level 2

            // Ganti PNG wotamap dan wotabul menjadi wotazombie
            document.getElementById("enemy1").src = "img/wotazombie.png"; // Ganti wotabul
            document.getElementById("enemy2").src = "img/wotazombie.png"; // Ganti wotamap
        }

        // Reset posisi musuh
        enemies.forEach(enemy => {
            enemy.style.right = '0px'; // Set musuh kembali ke posisi awal
        });
    }
}

// Fungsi untuk tombol "Back"
function goBack() {
    window.history.back(); // Kembali ke halaman sebelumnya
}

// Fungsi untuk me-restart permainan
function restartGame() {
    window.location.reload(); // Reload halaman untuk memulai ulang permainan
}

// Kontrol gerakan pemain
// Kontrol gerakan pemain
document.addEventListener("keydown", event => {
    if (event.code === "ArrowUp") {
        if (selectedMember === "Cathleen Nixie") {
            isFlying = true; // Cathleen Nixie terbang
        } else if (!isJumping) {
            jump(); // Member lain lompat
        }
    }
    if (event.code === "ArrowRight") {
        isMovingRight = true;
    }
    if (event.code === "ArrowLeft") {
        isMovingLeft = true;
    }
});

document.addEventListener("keyup", event => {
    if (event.code === "ArrowUp" && selectedMember === "Cathleen Nixie") {
        isFlying = false; // Cathleen Nixie berhenti terbang
    }
    if (event.code === "ArrowRight") {
        isMovingRight = false;
    }
    if (event.code === "ArrowLeft") {
        isMovingLeft = false;
    }
});


// Panggil fungsi untuk memeriksa tabrakan dan gerakan
if (selectedMember === "Cathleen Nixie") {
    setInterval(moveCathleenNixie, 20); // Hanya Cathleen Nixie yang bisa terbang
} else {
    setInterval(movePlayer, 20); // Semua member selain Cathleen Nixie menggunakan gerakan normal
}
setInterval(checkCollision, 20);
setInterval(moveEnemy, 20);

// Event listener untuk tombol "Back"
document.getElementById("back-button").addEventListener("click", goBack);
