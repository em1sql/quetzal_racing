document.addEventListener('DOMContentLoaded', () => {
  /* =========================================================
     1. MENÚ MÓVIL RESPONSIVE (Navbar)
  ========================================================= */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Cerrar menú al seleccionar una sección
    navItems.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* =========================================================
     2. CARRUSEL "NUESTRA ESENCIA" (Página 5)
  ========================================================= */
  const cards = Array.from(document.querySelectorAll('.carousel-card'));
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const carouselContainer = document.querySelector('.about-carousel');
  let currentIndex = 1; // Tarjeta central activa por defecto

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

    // Permitir clic directo en las tarjetas laterales
    cards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        if (idx !== currentIndex) {
          currentIndex = idx;
          updateCarousel();
        }
      });
    });

    // Soporte para deslizar (swipe) en pantallas táctiles
    if (carouselContainer) {
      let touchStartX = 0;
      carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      carouselContainer.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
          diff > 0 ? goNext() : goPrev();
        }
      }, { passive: true });
    }
  }

  /* =========================================================
     3. TABS INTERACTIVOS DE "LA RUTA" (Páginas 7, 8 y 9)
  ========================================================= */
  const stagesData = [
    {
      title: 'ETAPA 1: El Juicio',
      desc: 'Es el valle dorado custodiado por la sombra imponente del Cerro Chirripó, la tierra donde nacen las leyendas y se forjan los verdaderos titanes del ciclismo. Partiendo desde el calor vibrante del Valle de El General, los ciclistas deberán abrirse paso hacia las faldas del coloso, enfrentando un terreno indomable de ríos caudalosos, piedras sueltas y ascensos interminables donde el clima cambia del fuego al hielo en cuestión de kilómetros. Cruzar este valle hacia las alturas es enfrentar el juicio final de la montaña, el escenario definitivo donde solo los más fuertes logran tocar el cielo.',
      distance: '105 km (Desnivel positivo: +3,850 m)',
      start: 'San Gerardo de Rivas (Base del Chirripó)',
      end: 'Parque Central de San Isidro de El General',
      time: '5:00 AM',
      img: 'assets/etapa-1-pz.jpg',
      alt: 'Ciclista en Etapa 1 Pérez Zeledón',
      gpx: 'assets/rutas/etapa-1-perez-zeledon.gpx',
    },
    {
      title: 'ETAPA 2: La Conquista del Reino del Quetzal',
      desc: 'Es un suspiro frío en las alturas, un reino místico de bosques nubosos y robles centenarios donde el tiempo parece haberse detenido. Sus senderos técnicos y escaladas implacables atraviesan el hogar del quetzal, exigiendo no solo piernas de acero, sino un espíritu inquebrantable frente al viento helado y la altura. Pedalar por Dota es sumergirse en la naturaleza más salvaje y poética del país, donde cada curva revela un paisaje que quita el aliento, literalmente.',
      distance: '75 km (Desnivel positivo: +3,400 m)',
      start: 'Plaza de Deportes de Santa María de Dota',
      end: 'Providencia de Dota (Sector El Brujo)',
      time: '5:00 AM',
      img: 'assets/etapa-2-dota.jpg',
      alt: 'Ciclista en Etapa 2 Dota',
      gpx: 'assets/rutas/etapa-2-dota.gpx',
    },
    {
      title: 'ETAPA 3: El Despertar entre Cafetales',
      desc: 'Es el santuario donde la montaña abraza las nubes y el aroma del café más fino del mundo despierta el alma de los valientes. Sus caminos son un laberinto esmeralda de pendientes infinitas que ponen a prueba el corazón desde la primera pedalada. Aquí, el silencio de los valles profundos solo se rompe por el rugido de las llantas sobre el lastre, recordándole a cada ciclista que en esta tierra la gloria se gana gota a gota, entre la neblina matinal y el esfuerzo puro.',
      distance: '82 km (Desnivel positivo: +3,100 m)',
      start: 'Parque Central de San Marcos de Tarrazú',
      end: 'Mirador Cerro La Cruz, San Lorenzo',
      time: '5:00 AM',
      img: 'assets/etapa-3-tarrazu.jpg',
      alt: 'Ciclista en Etapa 3 Tarrazú',
      gpx: 'assets/rutas/etapa-3-tarrazu.gpx',
    },
  ];

  const tabs = document.querySelectorAll('.route-tab');
  const routeGrid = document.querySelector('.route-content-grid');
  const stageTitle = document.getElementById('stage-title');
  const stageDesc = document.getElementById('stage-desc');
  const stageDistance = document.getElementById('stage-distance');
  const stageStart = document.getElementById('stage-start');
  const stageEnd = document.getElementById('stage-end');
  const stageTime = document.getElementById('stage-time');
  const stageImg = document.getElementById('stage-img');
  const stageGpx = document.getElementById('stage-gpx');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('active')) return;

      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const data = stagesData[Number(tab.dataset.stage)];
      if (!data) return;

      // Transición suave de opacidad al cambiar de etapa
      if (routeGrid) {
        routeGrid.style.opacity = '0.25';
        routeGrid.style.transition = 'opacity 0.2s ease';
      }

      setTimeout(() => {
        stageTitle.textContent = data.title;
        stageDesc.textContent = data.desc;
        stageDistance.textContent = data.distance;
        stageStart.textContent = data.start;
        stageEnd.textContent = data.end;
        stageTime.textContent = data.time;
        stageImg.src = data.img;
        stageImg.alt = data.alt;
        stageGpx.href = data.gpx;

        if (routeGrid) {
          routeGrid.style.opacity = '1';
        }
      }, 180);
    });
  });

  /* =========================================================
     4. LIGHTBOX PARA LA GALERÍA (Página 10)
  ========================================================= */
  const galleryImages = document.querySelectorAll('.gallery-item img');

  if (galleryImages.length) {
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
      position: fixed; inset: 0; background: rgba(0, 0, 0, 0.88);
      display: none; align-items: center; justify-content: center;
      z-index: 9999; padding: 1.5rem; cursor: zoom-out;
    `;

    const lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = `
      max-width: 92%; max-height: 88vh; border-radius: 10px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6); object-fit: contain;
    `;

    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    galleryImages.forEach((img) => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.style.display = 'flex';
      });
    });

    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        lightbox.style.display = 'none';
      }
    });
  }

  /* =========================================================
     5. ACORDEÓN DE PREGUNTAS FRECUENTES - FAQ (Página 15)
  ========================================================= */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isAlreadyOpen = item.classList.contains('open');

      // Cierra las demás preguntas para mantener limpio el acordeón
      faqItems.forEach((otherItem) => otherItem.classList.remove('open'));

      if (!isAlreadyOpen) {
        item.classList.add('open');
      }
    });
  });

  /* =========================================================
     6. FORMULARIO DE INSCRIPCIÓN & COMPROBANTE SINPE (Página 16)
  ========================================================= */
  const registerForm = document.querySelector('.register-form');
  const fileInput = document.getElementById('comprobante');
  const sinpePlaceholder = document.querySelector('.sinpe-placeholder');

  if (fileInput && sinpePlaceholder) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) {
        sinpePlaceholder.textContent = `Adjunto: ${fileInput.files[0].name}`;
        sinpePlaceholder.style.color = '#006b12';
        sinpePlaceholder.style.fontWeight = '700';
      } else {
        sinpePlaceholder.textContent = 'SINPE: 8987-0653';
        sinpePlaceholder.style.color = '#555';
        sinpePlaceholder.style.fontWeight = '400';
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('nombre')?.value.trim() || 'Ciclista';
      const modalidad = document.getElementById('modalidad')?.value.toUpperCase() || '';

      // Mensaje de confirmación visual en pantalla
      let feedback = registerForm.querySelector('.form-feedback');
      if (!feedback) {
        feedback = document.createElement('p');
        feedback.className = 'form-feedback';
        feedback.style.cssText = `
          margin-top: 1.2rem; padding: 0.9rem 1.2rem; border-radius: 8px;
          background: #00b11f; color: #fff; font-weight: 600;
          text-align: center; box-shadow: 0 6px 16px rgba(0, 177, 31, 0.25);
        `;
        registerForm.appendChild(feedback);
      }

      feedback.textContent = `¡Gracias, ${nombre}! Tu solicitud de inscripción (${modalidad}) y comprobante SINPE fueron recibidos correctamente.`;
      registerForm.reset();

      if (sinpePlaceholder) {
        sinpePlaceholder.textContent = 'SINPE: 8987-0653';
        sinpePlaceholder.style.color = '#555';
        sinpePlaceholder.style.fontWeight = '400';
      }
    });
  }
});