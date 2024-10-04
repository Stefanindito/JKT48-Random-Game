const player = document.getElementById("player");
const enemies = document.querySelectorAll(".enemy");
let isJumping = false;
let isMovingRight = false;
let isMovingLeft = false;
let isFlying = false;
let playerBottom = 20; 
let currentLevel = 1; 
let enemySpeed = [3, 4]; 
let enemy3Visible = false; 

const selectedMember = localStorage.getItem('selectedMember');


if (!selectedMember) {
    alert('Pilih member dulu!');
    window.location.href = 'index.html'; 
} else {
    
    const playerImg = document.getElementById('player');
    playerImg.src = `img/${selectedMember.toLowerCase().replace(" ", "-")}/large.png`;
}


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

    
    if (parseInt(player.style.left) >= window.innerWidth - player.offsetWidth) {
        nextLevel(); 
    }
}

function jump() {
    if (!isJumping) {
        isJumping = true;
        let jumpInterval = setInterval(() => {
            playerBottom += 20;
            player.style.bottom = playerBottom + "px";
            if (playerBottom >= 300) { 
                clearInterval(jumpInterval);
                let fallInterval = setInterval(() => {
                    playerBottom -= 5;
                    player.style.bottom = playerBottom + "px";
                    if (playerBottom <= 20) { 
                        clearInterval(fallInterval);
                        isJumping = false;
                    }
                }, 20);
            }
        }, 20);
    }
}



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

    
    if (isFlying) {
        playerBottom += 5; 
        player.style.bottom = playerBottom + "px";
    } else {
        playerBottom -= 5; 
        if (playerBottom < 20) playerBottom = 20; 
        player.style.bottom = playerBottom + "px";
    }

    
    if (parseInt(player.style.left) >= window.innerWidth - player.offsetWidth) {
        nextLevel(); 
    }
}


function moveEnemy() {
    enemies.forEach((enemy, index) => {
        if (currentLevel === 1 && enemy.id === "enemy3") {
            enemy.classList.add('hidden'); 
            return;
        }

        let enemyPosition = parseInt(window.getComputedStyle(enemy).getPropertyValue("right"));
        enemy.style.right = (enemyPosition + enemySpeed[index]) + "px";

        
        if (enemyPosition >= window.innerWidth) {
            enemy.style.right = "0px";
        }
    });
}


function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    
    enemies.forEach(enemy => {
        if (currentLevel === 1 && enemy.id === "enemy3") return; 

        const enemyRect = enemy.getBoundingClientRect();
        if (
            playerRect.bottom >= enemyRect.top &&
            playerRect.top <= enemyRect.bottom &&
            playerRect.right >= enemyRect.left &&
            playerRect.left <= enemyRect.right
        ) {
            restartGame(); 
        }
    });
}


function nextLevel() {
    currentLevel += 1;
    if (currentLevel > 2) {
        window.location.href = 'victory.html'; 
    } else {
        document.getElementById("level-text").textContent = `Level ${currentLevel}`;
        document.getElementById("game-container").style.background = `url('img/bg.jpg') no-repeat center center`;
        document.getElementById("game-container").style.backgroundSize = 'cover';

        
        player.style.left = '0px';
        
        
        if (currentLevel === 2) {
            const enemy3 = document.getElementById('enemy3');
            enemy3.classList.remove('hidden'); 
            enemySpeed = [4.5, 5, 6]; 

            
            document.getElementById("enemy1").src = "img/wotazombie.png"; 
            document.getElementById("enemy2").src = "img/wotazombie.png"; 
        }

       
        enemies.forEach(enemy => {
            enemy.style.right = '0px'; 
        });
    }
}


function goBack() {
    window.history.back(); 
}


function restartGame() {
    window.location.reload(); 
}

document.addEventListener("keydown", event => {
    if (event.code === "ArrowUp") {
        if (selectedMember === "Cathleen Nixie") {
            isFlying = true; 
        } else if (!isJumping) {
            jump(); 
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
        isFlying = false; 
    }
    if (event.code === "ArrowRight") {
        isMovingRight = false;
    }
    if (event.code === "ArrowLeft") {
        isMovingLeft = false;
    }
});



if (selectedMember === "Cathleen Nixie") {
    setInterval(moveCathleenNixie, 20); 
} else {
    setInterval(movePlayer, 20); 
}
setInterval(checkCollision, 20);
setInterval(moveEnemy, 20);


document.getElementById("back-button").addEventListener("click", goBack);
