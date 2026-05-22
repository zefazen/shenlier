audio = new Audio(linkmp3.src);
audio.loop = true;
audio.addEventListener('ended', function() {this.currentTime = 0;this.play();}, false);

// Elemen Background
const backgroundOverlay = document.querySelector('.background-overlay');
const bgImageUrl = backgroundOverlay.getAttribute('data-src');
backgroundOverlay.style.background = `url('${bgImageUrl}') no-repeat center center fixed`;
backgroundOverlay.style.backgroundSize = 'cover';

// Animasi Kelopak Bunga
function mulaiKelopak(canvasId) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const kelopak = Array.from({ length: 20 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 5 + 2,
    speed: Math.random() * 2 + 1
  }));
  function gambarKelopak() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    kelopak.forEach(petal => {
      ctx.beginPath();
      ctx.arc(petal.x, petal.y, petal.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#f87171';
      ctx.fill();
      petal.y += petal.speed;
      if (petal.y > canvas.height) petal.y = -petal.radius;
      petal.x += Math.sin(petal.y / 50) * 2
    });
    requestAnimationFrame(gambarKelopak);
  }
  gambarKelopak();
}
// Balon Terbang
let intervalHati;
function hatiJatuh() {
  const hati = document.createElement('div');
  hati.className = 'hati';
  hati.innerHTML = `<svg class='line' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'><path d='M14 8a2 2 0 0 0-2-2'/><path d='M6 8a6 6 0 1 1 12 0c0 4.97-2.686 9-6 9s-6-4.03-6-9m6 9v1a2 2 0 0 1-2 2H7a2 2 0 0 0-2 2'/></g></svg>`;
  hati.style.left = Math.random() * 100 + 'vw';
  hati.style.color = '#ffd6e8';
  hati.style.opacity = '0.1';
  hati.addEventListener('animationend', () => hati.remove());
  document.body.appendChild(hati);
}
// Buka Envelope
function bukaEnvelope() {
  document.querySelector(".reset").classList.add('hide');
  audio.play(); 
  setTimeout(() => {
    const greeting = document.getElementById('finalGreeting');
    greeting.classList.add('show');
    const greetingImage = document.getElementById('finalGreetingImage');
    if(customNo == 1){
      greetingImage.classList.add('show');
    }
    // Animasi per huruf
    const text = greeting.textContent;
    greeting.innerHTML = '';
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = `${i * 0.05}s`;
      greeting.appendChild(span);
    });
    // Durasi tampil teks sapaan sebelum pindah ke pesan utama
    setTimeout(() => {
      greeting.classList.remove('show');
      greeting.classList.add('hide');
      if(customNo == 1){
        greetingImage.classList.remove('show');
        greetingImage.classList.add('hide');
      }
      // Pindah ke Halaman 3 (Pesan Cinta)
      setTimeout(() => {
    pindahHal(3);
      }, 1000); 
    }, 2000);
  }, 780);
}

// Halaman 2: Memory Game
function mulaiHal2() {}
function selesaiGame() {setTimeout(()=>{pindahHal(3)}, 1000);}

// Tampilkan Ucapan Happy Birthday!
function showFinalBirthday() {
  const overlay = document.getElementById('finalOverlay');
  const birthdayText = document.getElementById('finalBirthday');
  const cakeImage = document.getElementById('finalCakeImage');
  overlay.style.opacity = '1';
  overlay.style.visibility = 'visible';
  birthdayText.classList.add('show');
  cakeImage.classList.add('show');
  // Animasi huruf satu per satu
  const text = birthdayText.textContent;
  birthdayText.innerHTML = '';
  text.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.animationDelay = `${i * 0.05}s`;
    birthdayText.appendChild(span);
  });
  // Hilang setelah 5 detik
  setTimeout(() => {
    birthdayText.classList.remove('show');
    birthdayText.classList.add('hide');
    cakeImage.classList.remove('show');
    cakeImage.classList.add('hide');
    setTimeout(()=>{
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      document.querySelector(".tombol").style="transform:scale(1);opacity:1;";
      setTimeout(()=>{stiker3.style = "transform:scale(0)";
      setTimeout(() => {
        stiker3a.src = stiker3b.src;
        stiker3.style = "transform:scale(1)";
      }, 300);
    }, 300);
  }, 800);
  teksLucu.innerHTML += vfinalBirthday2;
  scrollInterval = setInterval(autoScroll, 50); 
  setTimeout(()=>{clearInterval(scrollInterval);}, 3000);
  }, 3000);
}

// Halaman 3: Pesan Akhir
function mulaiHal3() {
  const stiker3 = document.getElementById('stiker3');
  const stiker3a = document.getElementById('stiker3a');
  const stiker3b = document.getElementById('stiker3b');
  stiker3.style = "transform:scale(1)";
  const mengetik = {
    speed: 65,
    cursorSpeed: 85,
    cursorChar: "│", // 🖊 🖋 | │ ┃
    lifeLike: true,
  };
  new TypeIt("#teksCinta", {
    ...mengetik,
    strings: txtDoa,
    startDelay: 500,
    afterComplete: function (instance) {
      instance.destroy();    
      new TypeIt("#pesanAkhir", {
        ...mengetik,
        strings: txtPesanAkhir,
        waitUntilVisible: true,
        afterComplete: function (instance) {
          instance.destroy();
          new TypeIt("#teksLucu", {
            ...mengetik,
            strings: txtLucu,
            waitUntilVisible: true,
            afterComplete: function (instance) {
              instance.destroy(); 
              setTimeout(() => {
                clearInterval(scrollInterval);
                intervalHati = setInterval(hatiJatuh, 200);
              }, 300);
              setTimeout(showFinalBirthday, 500);
            }
          }).go();
        }
      }).go();
    }
  }).go();
}
    
const scrollContainer = document.getElementById("containerPesan");
function autoScroll() {scrollContainer.scrollTop += 10;} 
var scrollInterval = setInterval(autoScroll, 50); 

// Navigasi Halaman
function pindahHal(hal) {for (let i = 1; i <= 3; i++) {if (hal <= 3) document.getElementById(`hal${i}`).classList.add('sembunyi');}if (hal <= 3) document.getElementById(`hal${hal}`).classList.remove('sembunyi');setTimeout(()=>{if (hal === 2) {mulaiHal2();document.getElementById(`hal${hal}`).style="transform:scale(1);transition:all .7s ease";}if (hal !== 2){document.getElementById(`hal${hal - 1}`).style = "transform:scale(0);transition:all .7s ease";setTimeout(()=>{document.getElementById(`hal${hal - 1}`).classList.add('sembunyi');document.getElementById(`hal${hal}`).classList.remove('sembunyi');setTimeout(()=>{document.getElementById(`hal${hal}`).style="width:90%;padding:.9rem;margin-top:110px;transform:scale(1);transition:all .7s ease";}, 100);setTimeout(()=>{if (hal === 3) mulaiHal3();}, 150);}, 50);}}, 50);}
// Share ke WhatsApp
function balasWa() {const url = window.location.href;const text = "Makasih banyak ya";window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');}
