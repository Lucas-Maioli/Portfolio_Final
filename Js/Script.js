document.addEventListener("DOMContentLoaded", () => {
  // 1. LÓGICA DO MENU ATIVO (Roda em todas as páginas)
  const paginaAtual = window.location.pathname;
  const linksDoMenu = document.querySelectorAll(
    "nav.desktop ul li a, nav.mobile ul li a",
  );

  linksDoMenu.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === paginaAtual || paginaAtual.endsWith("/" + href)) {
      link.parentElement.classList.add("ativo");
    }
  });

  // 3. LÓGICA DO CARROSSEL DE PROJETOS (Híbrida Apenas em Responsivo)
  const carrosselProjetosContainer = document.querySelector('.carrossel-projetos-container');
  
  if (carrosselProjetosContainer) {
    const track = document.querySelector('.projetos-track');
    const cards = Array.from(track.children);
    const nextButton = document.querySelector('#nextBtn');
    const prevButton = document.querySelector('#prevBtn');
    
    if (cards.length > 0) {
      let currentProjectIndex = 0;
      let itemsPerPage = window.innerWidth > 768 ? 3 : 1;
      let isDragging = false;
      let startX = 0;

      function getCardWidth() {
        return cards[0].getBoundingClientRect().width + 30; 
      }

      function updateButtons() {
        prevButton.disabled = currentProjectIndex === 0;
        nextButton.disabled = currentProjectIndex >= cards.length - itemsPerPage;
      }

      function moveToCard(targetIndex) {
        const cardWidth = getCardWidth();
        track.style.transition = "transform 0.5s ease-in-out";
        track.style.transform = `translateX(-${targetIndex * cardWidth}px)`;
        currentProjectIndex = targetIndex;
        updateButtons();
      }

      // --- LÓGICA DE ARRASTAR (MOUSE E TOUCH) ---
      const startDrag = (e) => {
        
        if (window.innerWidth > 768) return; 

        isDragging = true;
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        track.style.transition = "none";
        
        
        track.style.cursor = "grabbing";
      };

      const endDrag = (e) => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = "grab";
        
        const endX = e.type.includes('mouse') ? e.pageX : e.changedTouches[0].clientX;
        const diff = startX - endX;
        const threshold = 50;

        if (diff > threshold && currentProjectIndex < cards.length - itemsPerPage) {
          moveToCard(currentProjectIndex + 1);
        } else if (diff < -threshold && currentProjectIndex > 0) {
          moveToCard(currentProjectIndex - 1);
        } else {
          moveToCard(currentProjectIndex);
        }
      };

      
      nextButton.addEventListener('click', () => {
        if (currentProjectIndex < cards.length - itemsPerPage) moveToCard(currentProjectIndex + 1);
      });

      prevButton.addEventListener('click', () => {
        if (currentProjectIndex > 0) moveToCard(currentProjectIndex - 1);
      });

      
      track.addEventListener('mousedown', startDrag);
      window.addEventListener('mouseup', endDrag);

      track.addEventListener('touchstart', startDrag, { passive: true });
      track.addEventListener('touchend', endDrag, { passive: true });

      
      window.addEventListener('resize', () => {
        itemsPerPage = window.innerWidth > 768 ? 3 : 1;
        
        
        if (window.innerWidth > 768) {
          track.style.cursor = "default";
        } else {
          track.style.cursor = "grab";
        }
        
        moveToCard(currentProjectIndex); 
      });

      
      if (window.innerWidth <= 768) track.style.cursor = "grab";
      
      updateButtons(); 
    }
  }

  // 4. LÓGICA DO MENU HAMBÚRGUER
  const hamburger = document.querySelector(".hamburger-menu");
  const navMobile = document.querySelector("nav.mobile");
  const navMobileLinks = document.querySelectorAll("nav.mobile ul li a");

  if (hamburger && navMobile) {
    hamburger.addEventListener("click", () => {
      navMobile.classList.toggle("aberto");
    });

    navMobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMobile.classList.remove("aberto");
      });
    });
  }
});
