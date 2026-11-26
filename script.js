document.addEventListener('DOMContentLoaded', () => {
  /* responsive n nav menu */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navItems.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* abour 3d carousel interaction*/
  const cards = Array.from(document.querySelectorAll('.carousel-card'));
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const carouselContainer = document.querySelector('.about-carousel');
  let currentIndex = 1;

  function updateCarousel() {
    const total = cards.length;
    if (!total) return;

    cards.forEach((card, index) => {
      card.classList.remove('active', 'side-left', 'side-right');

      if (index === currentIndex) {
        card.classList.add('active');
      } else if (index === (currentIndex - 1 + total) % total) {
        card.classList.add('side-left');
      } else {
        card.classList.add('side-right');
      }
    });
  }

  function goPrev() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  }

  function goNext() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  }

  if (prevBtn && nextBtn && cards.length) {
    prevBtn.addEventListener('click', goPrev);
    nextBtn.addEventListener('click', goNext);

    cards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        if (idx !== currentIndex) {
          currentIndex = idx;
          updateCarousel();
        }
      });
    });

    if (carouselContainer) {
      let touchStartX = 0;
      carouselContainer.addEventListener(
        'touchstart',
        (e) => {
          touchStartX = e.changedTouches[0].screenX;
        },
        { passive: true }
      );

      carouselContainer.addEventListener(
        'touchend',
        (e) => {
          const touchEndX = e.changedTouches[0].screenX;
          const diff = touchStartX - touchEndX;
          if (Math.abs(diff) > 40) {
            diff > 0 ? goNext() : goPrev();
          }
        },
        { passive: true }
      );
    }
  }

  /* route stage interaction */
  const tabs = document.querySelectorAll('.route-tab');
  const stagePanels = document.querySelectorAll('.stage-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetStage = tab.dataset.stage;

      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      stagePanels.forEach((panel) => {
        panel.classList.toggle('active', panel.dataset.stagePanel === targetStage);
      });
    });
  });

  /* gallery lightbox */
  const galleryImages = document.querySelectorAll('.gallery-item img');

  if (galleryImages.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox';

    const lightboxImg = document.createElement('img');
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    galleryImages.forEach((img) => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
      });
    });

    lightbox.addEventListener('click', () => {
      lightbox.classList.remove('open');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        lightbox.classList.remove('open');
      }
    });
  }

  /* faq interaction */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isAlreadyOpen = item.classList.contains('open');

      faqItems.forEach((otherItem) => otherItem.classList.remove('open'));

      if (!isAlreadyOpen) {
        item.classList.add('open');
      }
    });
  });

  /* form */
  const registerForm = document.querySelector('.register-form');
  const fileInput = document.getElementById('comprobante');
  const sinpePlaceholder = document.querySelector('.sinpe-placeholder');

  if (fileInput && sinpePlaceholder) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) {
        sinpePlaceholder.textContent = `Adjunto: ${fileInput.files[0].name}`;
        sinpePlaceholder.classList.add('file-attached');
      } else {
        sinpePlaceholder.textContent = 'SINPE: 8987-0653';
        sinpePlaceholder.classList.remove('file-attached');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('nombre')?.value.trim() || 'Ciclista';
      const modalidad = document.getElementById('modalidad')?.value.toUpperCase() || '';

      let feedback = registerForm.querySelector('.form-feedback');
      if (!feedback) {
        feedback = document.createElement('p');
        feedback.className = 'form-feedback';
        registerForm.appendChild(feedback);
      }

      feedback.textContent = `¡Gracias, ${nombre}! Tu solicitud de inscripción (${modalidad}) y comprobante SINPE fueron recibidos correctamente.`;
      registerForm.reset();

      if (sinpePlaceholder) {
        sinpePlaceholder.textContent = 'SINPE: 8987-0653';
        sinpePlaceholder.classList.remove('file-attached');
      }
    });
  }
});