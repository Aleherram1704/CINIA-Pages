/* ============================================
   CONEXIÓN A NODE-RED
============================================ */

const API_URL = "http://TU-IP:1880/produccion";
// Ejemplo:
// const API_URL = "http://10.50.85.79:1880/indicadores";

async function obtenerDatos() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    actualizarUI(data);

  } catch (err) {
    console.error("Error leyendo Node-RED:", err);
  }
}

/* ============================================
   ACTUALIZA CONTADORES EN PANTALLA
============================================ */

function actualizarUI(data) {

  const prod = document.getElementById("contador-produccion");
  const meta = document.getElementById("contador-meta");

  if (prod) prod.textContent = data.produccion;
  if (meta) meta.textContent = data.meta;
}

/* ============================================
   REFRESCO AUTOMÁTICO
============================================ */

// cada 5 segundos
setInterval(obtenerDatos, 5000);

// primera carga inmediata
obtenerDatos();