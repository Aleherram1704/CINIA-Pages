const API_URL = "http://10.50.83.96:1880/indicadores";

/* ===== Detectar pantalla automáticamente ===== */

const screenId = document.body.dataset.screen || "pantalla1";

/* ===== Cargar límites dinámicos por pantalla ===== */

function loadLimits() {
  return JSON.parse(
    localStorage.getItem("metricLimits_" + screenId)
  ) || {};
}

/* ===== Obtener datos ===== */

async function obtenerDatos() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    console.log("Datos recibidos:", data);
    actualizarUI(data);

  } catch (err) {
    console.error("Error leyendo Node-RED:", err);
  }
}

/* ===== Actualizar UI ===== */

function actualizarUI(data) {

  const limits = loadLimits();

  Object.keys(data).forEach(key => {

    const elemento = document.getElementById(key);
    if (!elemento) return;

    const valor = data[key];
    const num = Number(valor);

    elemento.textContent = valor;

    // Animación
    elemento.classList.add("update");
    setTimeout(() => elemento.classList.remove("update"), 200);

    /* ===== Aplicar reglas dinámicas ===== */

    if (!limits[key]) return;

    const config = limits[key];

    // Más alto es mejor
    if (config.type === "higher") {

      if (num >= config.green) elemento.style.color = "#00ff88";
      else if (num >= config.yellow) elemento.style.color = "#ffc107";
      else elemento.style.color = "#ff4d4d";
    }

    // Más bajo es mejor
    if (config.type === "lower") {

      if (num <= config.green) elemento.style.color = "#00ff88";
      else if (num <= config.yellow) elemento.style.color = "#ffc107";
      else elemento.style.color = "#ff4d4d";
    }

    // Rango ideal (ej mvr)
    if (config.type === "range") {

      if (num <= config.yellow && num >= config.green)
        elemento.style.color = "#00ff88";
      else
        elemento.style.color = "#ffc107";
    }
  });
}

/* ===== Refresco automático ===== */

setInterval(obtenerDatos, 5000);
obtenerDatos();