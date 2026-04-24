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

  // 2. LÓGICA DO CARROSSEL DE FOTOS (Só roda na Página Inicial)
  const carrosselFotosContainer = document.querySelector(
    ".carrossel-container",
  );
  if (carrosselFotosContainer) {
    const navDots = document.querySelectorAll(".nav-dot");
    const fotos = document.querySelectorAll(".foto-carrossel");
    let currentIndex = 0;
    let slideInterval;

    function mostrarFoto(index) {
      currentIndex = index;
      fotos.forEach((foto) => foto.classList.remove("ativa"));
      navDots.forEach((dot) => dot.classList.remove("ativa"));
      fotos[currentIndex].classList.add("ativa");
      navDots[currentIndex].classList.add("ativa");
    }

    function startSlideShow() {
      clearInterval(slideInterval);
      slideInterval = setInterval(() => {
        let proximoIndex = currentIndex + 1;
        if (proximoIndex >= fotos.length) {
          proximoIndex = 0;
        }
        mostrarFoto(proximoIndex);
      }, 5000);
    }

    navDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = parseInt(dot.getAttribute("data-index"));
        mostrarFoto(index);
        startSlideShow();
      });
    });

    mostrarFoto(0);
    startSlideShow();
  }

  // 3. LÓGICA DO CARROSSEL DE PROJETOS
  const carrosselProjetosContainer = document.querySelector(
    ".carrossel-projetos-container",
  );

  if (carrosselProjetosContainer) {
    const track = document.querySelector(".projetos-track");
    const cards = Array.from(track.children);
    const nextButton = document.querySelector("#nextBtn");
    const prevButton = document.querySelector("#prevBtn");

    if (cards.length > 0) {
      let currentProjectIndex = 0;
      let itemsPerPage = window.innerWidth > 768 ? 3 : 1;

      let touchStartX = 0;
      let touchEndX = 0;

      function getCardWidth() {
        return cards[0].getBoundingClientRect().width + 30;
      }

      function updateButtons() {
        prevButton.disabled = currentProjectIndex === 0;
        nextButton.disabled =
          currentProjectIndex >= cards.length - itemsPerPage;
      }

      function moveToCard(targetIndex) {
        const cardWidth = getCardWidth();
        track.style.transform = `translateX(-${targetIndex * cardWidth}px)`;
        currentProjectIndex = targetIndex;
        updateButtons();
      }

      nextButton.addEventListener("click", () => {
        if (currentProjectIndex < cards.length - itemsPerPage) {
          moveToCard(currentProjectIndex + 1);
        }
      });

      prevButton.addEventListener("click", () => {
        if (currentProjectIndex > 0) {
          moveToCard(currentProjectIndex - 1);
        }
      });

      window.addEventListener("resize", () => {
        itemsPerPage = window.innerWidth > 768 ? 3 : 1;

        moveToCard(currentProjectIndex);
      });

      track.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.changedTouches[0].screenX;
        },
        { passive: true },
      );

      track.addEventListener(
        "touchend",
        (e) => {
          touchEndX = e.changedTouches[0].screenX;
          handleSwipe();
        },
        { passive: true },
      );

      function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
          if (currentProjectIndex < cards.length - itemsPerPage) {
            moveToCard(currentProjectIndex + 1);
          }
        } else if (touchEndX - touchStartX > swipeThreshold) {
          if (currentProjectIndex > 0) {
            moveToCard(currentProjectIndex - 1);
          }
        }
      }

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
