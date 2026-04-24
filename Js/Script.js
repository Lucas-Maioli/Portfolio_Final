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

  // 3. LÓGICA DO CARROSSEL DE PROJETOS (Versão Corrigida e Blindada)
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

      const getCardWidth = () => cards[0].getBoundingClientRect().width + 30;

      const updateButtons = () => {
        prevButton.disabled = currentProjectIndex === 0;
        nextButton.disabled = currentProjectIndex >= cards.length - itemsPerPage;
      };

      const moveToCard = (targetIndex) => {
        // Garante que o índice não saia dos limites
        if (targetIndex < 0) targetIndex = 0;
        if (targetIndex > cards.length - itemsPerPage) targetIndex = cards.length - itemsPerPage;

        const cardWidth = getCardWidth();
        track.style.transition = "transform 0.5s ease-in-out";
        track.style.transform = `translateX(-${targetIndex * cardWidth}px)`;
        currentProjectIndex = targetIndex;
        updateButtons();
      };

      const startDrag = (e) => {
        if (window.innerWidth > 768) return; 
        isDragging = true;
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        track.style.transition = "none"; // Remove transição para o rastro seguir o dedo/mouse
      };

      const endDrag = (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        // Pega a posição final (tratando mouseup e touchend)
        const endX = e.type.includes('mouse') ? e.pageX : (e.changedTouches ? e.changedTouches[0].clientX : startX);
        const diff = startX - endX;
        const threshold = 50;

        if (diff > threshold) {
          moveToCard(currentProjectIndex + 1);
        } else if (diff < -threshold) {
          moveToCard(currentProjectIndex - 1);
        } else {
          moveToCard(currentProjectIndex); // Volta para o lugar se o movimento foi pequeno
        }
      };

      // Eventos de Botão
      nextButton.addEventListener('click', () => moveToCard(currentProjectIndex + 1));
      prevButton.addEventListener('click', () => moveToCard(currentProjectIndex - 1));

      // Eventos de Arraste
      track.addEventListener('mousedown', startDrag);
      // Eventos no 'window' evitam que o carrossel trave se soltar o mouse fora dele
      window.addEventListener('mouseup', endDrag);
      
      track.addEventListener('touchstart', startDrag, { passive: true });
      track.addEventListener('touchend', endDrag, { passive: true });

      // Ajuste de Redimensionamento
      window.addEventListener('resize', () => {
        const novoItemsPerPage = window.innerWidth > 768 ? 3 : 1;
        if (novoItemsPerPage !== itemsPerPage) {
          itemsPerPage = novoItemsPerPage;
          currentProjectIndex = 0; // Reseta para o primeiro para evitar bugs de cálculo
        }
        moveToCard(currentProjectIndex);
      });

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
