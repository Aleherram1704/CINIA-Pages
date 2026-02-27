document.addEventListener("DOMContentLoaded", () => {

  const header = document.createElement("header");
  header.className = "main-header";

  header.innerHTML = `
  <div class="header-left">
    <a href="index.html" class="logo nav-item" data-page="index.html">
      <span class="logo-dot"></span>
      MAIN
    </a>
  </div>

  <nav class="nav-center">
    <a href="pantalla1.html" class="nav-item" data-page="pantalla1.html">Pantalla 1</a>
    <a href="pantalla2.html" class="nav-item" data-page="pantalla2.html">Pantalla 2</a>
    <a href="construccion.html" class="nav-item" data-page="construccion.html">Pantalla 3</a>
    <a href="construccion.html" class="nav-item" data-page="construccion.html">Pantalla 4</a>
    <a href="construccion.html" class="nav-item" data-page="construccion.html">Pantalla 5</a>
    <a href="construccion.html" class="nav-item" data-page="construccion.html">Pantalla 6</a>
    <a href="construccion.html" class="nav-item" data-page="construccion.html">Pantalla 7</a>
    <a href="construccion.html" class="nav-item" data-page="construccion.html">Pantalla 8</a>
    <a href="construccion.html" class="nav-item" data-page="construccion.html">Pantalla 9</a>
    <a href="construccion.html" class="nav-item" data-page="construccion.html">Pantalla 10</a>
    <a href="construccion.html" class="nav-item" data-page="construccion.html">Pantalla 11</a>
    <a href="construccion.html" class="nav-item" data-page="construccion.html">Pantalla 12</a>
    <a href="construccion.html" class="nav-item" data-page="construccion.html">Pantalla 13</a>
    <a href="construccion.html" class="nav-item" data-page="construccion.html">Pantalla 14</a>
    <a href="construccion.html" class="nav-item" data-page="construccion.html">Pantalla 15</a>
  </nav>

  <div class="header-right"></div>
`;

  document.body.prepend(header);

  /* ===== detectar página actual ===== */

  let currentPage = window.location.pathname.split("/").pop();

  // cuando entras a "/" queda vacío → es index
  if (currentPage === "" || currentPage === "/") {
    currentPage = "index.html";
  }

  const items = document.querySelectorAll(".nav-item");

  items.forEach(item => {
    if (item.dataset.page === currentPage) {
      item.classList.add("active");
    }
  });

});