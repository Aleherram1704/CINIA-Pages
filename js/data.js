
/* ===== Detectar pantalla automáticamente ===== */

const screenId = document.body.dataset.screen || "pantalla1";

/* ===== Endpoint dinámico ===== */

const API_URL = `http://${SERVER_IP}:1880/${screenId}`;


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

    if (!res.ok) throw new Error("API no disponible");

    const data = await res.json();

    console.log("Datos recibidos:", data);

    actualizarUI(data);

  } catch (err) {

    console.warn("Error leyendo Node-RED:", err);

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

    elemento.classList.add("update");
    setTimeout(() => elemento.classList.remove("update"), 200);

    if (!limits[key]) return;

    const config = limits[key];

    if (config.type === "higher") {

      if (num >= config.green) elemento.style.color = "#00ff88";
      else if (num >= config.yellow) elemento.style.color = "#ffc107";
      else elemento.style.color = "#ff4d4d";
    }

    if (config.type === "lower") {

      if (num <= config.green) elemento.style.color = "#00ff88";
      else if (num <= config.yellow) elemento.style.color = "#ffc107";
      else elemento.style.color = "#ff4d4d";
    }

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