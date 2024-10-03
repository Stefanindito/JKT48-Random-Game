const playerImg = document.getElementById('player');
const membersContainer = document.getElementById('members-container');
const selectedMember = localStorage.getItem('selectedMember');

// Jika tidak ada member yang dipilih, kembali ke halaman 'choose'
if (!selectedMember) {
    alert('Please select a member!');
    window.location.href = 'choose.html';
} else {
    // Gunakan path yang sesuai untuk gambar member besar yang dipilih
    playerImg.src = `img/${selectedMember.toLowerCase().replace(/\s+/g, '-')}/large.png`;
}

// Array nama member
const memberNames = [
    'abigail-rachel', 'adeline-wijaya', 'alya-amanda', 'amanda-sukma', 'angelina-christy', 
    'anindya-ramadhani', 'aurellia', 'aurhel-alana', 'callista-alifia', 'catherina-vallencia',
    'cathleen-nixie', 'celline-thefani', 'chelsea-davina', 'cornelia-vanisa', 'cynthia-yaputera',
    'dena-natalia', 'desy-natalia', 'febriola-sinambela', 'feni-fitriyanti', 'fiony-alveria',
    'flora-shafiq', 'freya-jayawardana', 'fritzy-rosmerian', 'gabriela-abigail', 'gendis-mayrannisa',
    'gita-sekar', 'grace-octaviani', 'greesella-adhalia', 'helisma-putri', 'hillary-abigail',
    'indah-cahya', 'indira-seruni', 'jazzlyn-trisha', 'jessica-chandra', 'jesslyn-elly',
    'kathrina-irene', 'letycia-moreen', 'lulu-salsabila', 'marsha-lenathea', 'michelle-alexandra',
    'michelle-levia', 'mutiara-azzahra', 'nayla-suji', 'nina-tutachia', 'oline-manuel',
    'raisha-syifa', 'regina-wilian', 'ribka-budiman', 'shabilqis-naila', 'shania-gracia','victoria-kimberly',
];

// Buat semua member kecuali yang dipilih
memberNames.forEach((memberName) => {
    if (memberName.toLowerCase() !== selectedMember.toLowerCase()) {
        const memberImg = document.createElement('img');
        memberImg.src = `img/${memberName}/large.png`;
        memberImg.classList.add('other-member');

        // Atur posisi acak untuk setiap member
        const randomLeft = `${Math.random() * 90}vw`;
        const randomTop = `${Math.random() * 60}vh`;
        memberImg.style.left = randomLeft;
        memberImg.style.top = randomTop;

        // Tambahkan member ke dalam kontainer
        membersContainer.appendChild(memberImg);
    }
});

// Fungsi untuk mendapatkan durasi acak
function getRandomJumpDuration() {
    const durations = [1, 1.2, 1.5, 1.8, 2];
    return durations[Math.floor(Math.random() * durations.length)] + 's';
}

// Atur animasi lompatan acak untuk semua member
const allMembers = document.querySelectorAll('.other-member');
allMembers.forEach(member => {
    const randomDuration = getRandomJumpDuration();
    member.style.animationDuration = randomDuration;
});



function PlayAgain() {
    window.history.go(-3);
}

// Animasi member lain ke tengah secara smooth
setTimeout(() => {
    const allMembers = document.querySelectorAll('.other-member');
    allMembers.forEach((member) => {
        member.style.transition = 'left 2s ease-in-out, top 2s ease-in-out';
        member.style.left = `${Math.random() * 20 + 40}vw`; // Pindah ke posisi tengah dengan sedikit ruang
        member.style.top = `${Math.random() * 20 + 30}vh`;
    });

    // Setelah semua member lain berada di tengah, gerakkan member pemain
    setTimeout(() => {
        playerImg.style.position = 'absolute'; // Pastikan posisinya absolute
        playerImg.style.transition = 'left 2s ease-in-out, top 2s ease-in-out'; // Tambahkan transisi
        playerImg.style.left = `${Math.random() * 20 + 40}vw`; // Posisi acak dengan sedikit ruang
        playerImg.style.top = `${Math.random() * 20 + 30}vh`; // Posisi acak dengan sedikit ruang

        // Musik kemenangan diputar setelah semua member berada di tengah
        setTimeout(() => {
            const victoryMusic = new Audio('victory.mp3');
            victoryMusic.loop = true; // Ulangi musik jika diperlukan
            victoryMusic.play().catch(error => {
                console.log('Autoplay was prevented by the browser:', error);
            });
        }, 10); // Delay untuk memberikan waktu animasi berjalan

    }, 2000); // Delay sebelum member pemain bergerak
}, 1000); // Delay sebelum member lain bergerak

