function initPantalla(screenId) {

  const player = document.getElementById("player");
  const SERVER_IP = "10.50.83.96"; // cambiar según red

  const PLAYLIST_URL = `http://${SERVER_IP}:1880/playlist/${screenId}`;

  let playlist = [];
  let currentIndex = 0;
  let imageTimer = null;

  async function cargarPlaylist() {
    try {
      const res = await fetch(PLAYLIST_URL);
      playlist = await res.json();

      if (!playlist.length) {
        player.innerHTML = `<p class="empty-msg">Sin contenido</p>`;
        return;
      }

      currentIndex = 0;
      playItem();

    } catch (err) {
      console.error("Error cargando playlist:", err);
      player.innerHTML = `<p class="empty-msg">Servidor no disponible</p>`;
    }
  }

  function playItem() {

    clearTimeout(imageTimer);
    player.innerHTML = "";

    const item = playlist[currentIndex];
    if (!item) return;

    if (item.type === "image") {

      const img = document.createElement("img");
      img.src = item.src;
      img.className = "media";
      player.appendChild(img);

      imageTimer = setTimeout(nextItem, 5000);
    }

    else if (item.type === "video") {

      const video = document.createElement("video");
      video.src = item.src;
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.className = "media";

      video.onended = nextItem;

      player.appendChild(video);

      video.play().catch(err => {
        console.warn("Autoplay bloqueado:", err);
      });
    }
  }

  function nextItem() {
    currentIndex++;
    if (currentIndex >= playlist.length) currentIndex = 0;
    playItem();
  }

  cargarPlaylist();
  setInterval(cargarPlaylist, 30000);
}