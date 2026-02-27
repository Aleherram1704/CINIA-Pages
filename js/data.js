/* ============================================
CONEXIÓN A NODE-RED
============================================ */

const API_URL = "http://10.50.85.79:1880/indicadores";
// 👆 PON TU IP REAL DE NODE-RED

async function obtenerDatos() {
try {
const res = await fetch(API_URL);
const data = await res.json();

```
console.log("Datos recibidos:", data); // ← debug

actualizarUI(data);
```

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

if (prod) prod.textContent = data.produccion ?? "--";
if (meta) meta.textContent = data.meta ?? "--";
}

/* ============================================
REFRESCO AUTOMÁTICO
============================================ */

// cada 5 segundos
setInterval(obtenerDatos, 5000);

// primera carga inmediata
obtenerDatos();
