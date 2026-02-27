/* =====================================================
   PANEL PRINCIPAL
===================================================== */

const TOTAL_SCREENS = 15;
const grid = document.getElementById("screenGrid");

for (let i = 1; i <= TOTAL_SCREENS; i++) {

  const screenId = "pantalla" + i;
  const STORAGE_KEY = "media_" + screenId;
  const saved = localStorage.getItem(STORAGE_KEY);

  const card = document.createElement("div");
  card.className = "screen-card";

  card.innerHTML = `
    <h2>Pantalla ${i}</h2>

    <div class="status ${saved ? "active" : "empty"}">
      ${saved ? "Contenido cargado" : "Sin contenido"}
    </div>

    <div class="card-actions">
      <a href="pantalla${i}.html" class="open-btn">Abrir</a>
      <button class="clear-btn">Limpiar</button>
    </div>
  `;

  /* ===== limpiar contenido ===== */

  card.querySelector(".clear-btn").addEventListener("click", () => {

    if (!confirm("¿Borrar contenido de Pantalla " + i + "?")) return;

    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  });

  grid.appendChild(card);
}