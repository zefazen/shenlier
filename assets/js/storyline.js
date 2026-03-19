// body::scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (!targetElement) return;

      const headerOffset = document.querySelector('.header').offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
          top: offsetPosition,
          behavior: 'smooth'
      });
  });
});

function balasSurat() {
  const url = window.location.href;
  const text = "Terima kasih sayang..";
  window.open(`https://wa.me/?text=${text}`, '_blank');
}

const love_btns = document.querySelectorAll('.love-letter');

love_btns.forEach(love_btn => {
	love_btn.addEventListener('mousedown', (e) => {
		love_btn.style.background = '#fff';
		love_btn.style.color = '#d81b60';
		love_btn.querySelector('.ink-script').innerHTML = '<span class="grey-text">Sent to:</span> ShenYuan';

		createHearts(love_btn.querySelector('.heart-vault'));
	});

	love_btn.addEventListener('mouseup', (e) => {
		love_btn.style.background = '#d81b60';
		love_btn.style.color = '#fff';
		love_btn.querySelector('.ink-script').innerHTML = 'MAKASIH SAYANG <3';
	});
})

function createHearts(container) {
	// create 5 hearts
	for(let i=0; i<15; i++) {
		setTimeout(() => {
			const heart = document.createElement('span');
			heart.classList.add('heart');
			heart.innerHTML = '<i class="ph--heart-2"></i>';
			heart.style.left = Math.random() * 100 + '%';
			heart.style.top = Math.random() * 100 + '%';
			heart.style.fontSize = Math.random() * 20 + 5 + 'px';
			heart.style.animationDuration = Math.random() * 2 + 3 + 's';
			container.appendChild(heart);

			setTimeout(() => {
				heart.remove();
			}, 3000);
		}, i * 100)
	}
}

const backToTopBtn = document.getElementById('back2top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
