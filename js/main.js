const SERVER_IP = "10.50.85.88";

const METRIC_KEYS = [
  "rendimiento",
  "ppm",
  "disponibilidad",
  "tds",
  "mvr",
  "cd",
  "hph"
];

const DEFAULT_LIMITS = {
  rendimiento: { green: 90, yellow: 75, type: "higher" },
  ppm: { green: 500, yellow: 1500, type: "lower" },
  disponibilidad: { green: 90, yellow: 75, type: "higher" },
  tds: { green: 90, yellow: 75, type: "higher" },
  mvr: { green: 100, yellow: 95, type: "range" },
  cd: { green: 90, yellow: 75, type: "higher" },
  hph: { green: 10, yellow: 8, type: "higher" }
};

const TOTAL_SCREENS = 15;

let currentScreen = "pantalla1";

const grid = document.getElementById("screenSelectorGrid");
const editor = document.getElementById("limitsEditor");
const saveBtn = document.getElementById("saveLimits");

/* ===== Detectar contenido en Node-RED ===== */

async function checkScreenContent(screenId) {

  const url = `http://${SERVER_IP}:1880/${screenId}/playlist.json`;

  try {

    const res = await fetch(url);

    if (!res.ok) throw new Error("playlist no encontrada");

    const data = await res.json();

    if (data.Media && data.Media.length > 0) {
      return true;
    }

    return false;

  } catch (err) {

    console.warn("No se pudo leer playlist de", screenId);
    return false;

  }

}

/* ===== Render selector visual ===== */

async function renderScreenSelector() {

  grid.innerHTML = "";

  for (let i = 1; i <= TOTAL_SCREENS; i++) {

    const screenId = "pantalla" + i;

    const hasMedia = await checkScreenContent(screenId);

    const card = document.createElement("div");
    card.className = "screen-card";

    if (screenId === currentScreen) card.classList.add("active");

    card.innerHTML = `
      <strong>P${i}</strong>
      <span class="status ${hasMedia ? "ok" : "empty"}">
        ${hasMedia ? "SI" : "NO"}
      </span>
    `;

    card.onclick = () => {
      currentScreen = screenId;
      renderScreenSelector();
      loadLimits();
      renderEditor();
    };

    grid.appendChild(card);
  }
}

/* ===== Límites ===== */

let limits = {};

function loadLimits() {

  const saved = JSON.parse(
    localStorage.getItem("metricLimits_" + currentScreen)
  );

  if (!saved) {
    limits = JSON.parse(JSON.stringify(DEFAULT_LIMITS));
  } else {
    limits = { ...DEFAULT_LIMITS, ...saved };
  }
}

function renderEditor() {

  editor.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "limits-grid";

  METRIC_KEYS.forEach(key => {

    const config = limits[key] || DEFAULT_LIMITS[key];

    const card = document.createElement("div");
    card.className = "limit-card";

    card.innerHTML = `
      <h3>${key}</h3>

      <div class="limit-input-row">
        <label>🟢 Verde</label>
        <input type="number" data-key="${key}" data-type="green" value="${config.green}">
      </div>

      <div class="limit-input-row">
        <label>🟡 Amarillo</label>
        <input type="number" data-key="${key}" data-type="yellow" value="${config.yellow}">
      </div>
    `;

    grid.appendChild(card);
  });

  editor.appendChild(grid);
}

saveBtn.addEventListener("click", () => {

  const inputs = document.querySelectorAll("#limitsEditor input");

  inputs.forEach(input => {
    const key = input.dataset.key;
    const type = input.dataset.type;
    limits[key][type] = Number(input.value);
  });

  localStorage.setItem("metricLimits_" + currentScreen, JSON.stringify(limits));

  alert("Límites guardados para " + currentScreen);
});

/* ===== Inicializar ===== */

loadLimits();
renderEditor();
renderScreenSelector();