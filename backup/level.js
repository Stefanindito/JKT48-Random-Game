const player = document.getElementById("player");
const enemies = document.querySelectorAll(".enemy");
let isJumping = false;
let isMovingRight = false;
let isMovingLeft = false;
let playerBottom = 20; // Initial vertical position
let currentLevel = 1; // Starting level

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

// Fungsi untuk melompat
function jump() {
    if (!isJumping) {
        isJumping = true;
        let jumpInterval = setInterval(() => {
            playerBottom += 20;
            player.style.bottom = playerBottom + "px";
            if (playerBottom >= 230) { // Maximum jump height
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

// Fungsi untuk menggerakkan musuh
function moveEnemy() {
    enemies.forEach(enemy => {
        let enemyPosition = parseInt(window.getComputedStyle(enemy).getPropertyValue("right"));
        enemy.style.right = (enemyPosition + 3) + "px";

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
        alert("Selamat! Anda telah menyelesaikan game.");
        window.location.href = 'index.html'; // Kembali ke halaman utama
    } else {
        document.getElementById("level-indicator").textContent = `Level ${currentLevel}`;
        document.getElementById("game-container").style.background = `url('img/level${currentLevel}-bg.png') no-repeat center center`;
        document.getElementById("game-container").style.backgroundSize = 'cover';
        // Reset posisi player
        player.style.left = '0px';
    }
}

// Fungsi untuk tombol "Back"
function goBack() {
    window.location.href = 'index.html'; // Kembali ke halaman pemilihan member
}

// Fungsi untuk me-restart permainan
function restartGame() {
    window.location.reload(); // Reload halaman untuk memulai ulang permainan
}

// Kontrol gerakan pemain
document.addEventListener("keydown", event => {
    if (event.code === "ArrowUp" && !isJumping) {
        jump();
    }
    if (event.code === "ArrowRight") {
        isMovingRight = true;
    }
    if (event.code === "ArrowLeft") {
        isMovingLeft = true;
    }
});

document.addEventListener("keyup", event => {
    if (event.code === "ArrowRight") {
        isMovingRight = false;
    }
    if (event.code === "ArrowLeft") {
        isMovingLeft = false;
    }
});

// Panggil fungsi untuk memeriksa tabrakan dan gerakan
setInterval(checkCollision, 20);
setInterval(movePlayer, 20);
setInterval(moveEnemy, 20);
