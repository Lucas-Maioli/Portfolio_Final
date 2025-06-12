document.addEventListener("DOMContentLoaded", () => {
 
  const header = `
    <header>
      <div class="logo">
        <h3 class="txt-azul">&lt;/LM&gt;</h3>
      </div>
      <nav class="desktop">
        <ul>
          <li><a href="index.html">Inicio</a></li>
          <li><a href="about.html">Sobre</a></li>
          <li><a href="projetos.html">Projetos</a></li>
          <li><a href="contato.html">Contato</a></li>
        </ul>
      </nav>
    </header>
  `;
  document.body.insertAdjacentHTML("afterbegin", header);

  const links = document.querySelectorAll("nav.desktop ul li a");
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (window.location.pathname.includes(href)) {
      link.parentElement.classList.add("ativo");
    }
  });

  // DEFINE O ESTILO DA IMAGEM (redonda ou quadrada)
  const img = document.querySelector(".foto-perfil");
  if (img) {
    const pagina = window.location.pathname;

    if (pagina.includes("index.html") || pagina === "/") {
      img.style.borderRadius = "50%"; // Redonda
    } else if (pagina.includes("about.html")) {
      img.style.borderRadius = "0"; // Quadrada
    }
  }
});

