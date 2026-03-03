/* ============================================
   PRUEBA DIRECTA VIDEO DESDE NODE-RED
============================================ */

function initPantalla(screenId) {

  const player = document.getElementById("player");

  if (!player) return;

  // Limpiar contenido previo
  player.innerHTML = "";

  const video = document.createElement("video");

  video.src = "http://10.50.83.96:1880/videos/video1.mp4";

  video.autoplay = true;
  video.loop = true;
  video.muted = true;       // obligatorio para autoplay
  video.playsInline = true;
  video.controls = false;

  video.className = "media";

  player.appendChild(video);

  // Forzar reproducción
  video.play().catch(err => {
    console.warn("Autoplay bloqueado:", err);
  });

}