function initPantalla(screenId) {

  const STORAGE_KEY = "media_" + screenId;
  const player = document.getElementById("player");
  const input = document.getElementById("fileInput");
  const deleteBtn = document.getElementById("deleteContent");

  if (!player || !input) {
    console.warn("Pantalla no inicializada correctamente");
    return;
  }

  /* ===== Cargar contenido guardado ===== */

  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    try {
      const data = JSON.parse(saved);
      renderMedia(data.type, data.src);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  /* ===== Subir nuevo archivo ===== */

  input.addEventListener("change", e => {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      const payload = {
        type: file.type,
        src: reader.result
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      renderMedia(file.type, reader.result);
    };

    reader.readAsDataURL(file);
  });

  /* ===== BOTÓN ELIMINAR ===== */

  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {

      localStorage.removeItem(STORAGE_KEY);

      player.innerHTML = `
        <p class="empty-msg">Esperando contenido...</p>
      `;

      input.value = ""; // reset input file
    });
  }

  /* ===== Renderizar contenido ===== */

  function renderMedia(type, src) {

    player.innerHTML = "";

    let mediaElement;

    if (type.startsWith("image")) {

      mediaElement = document.createElement("img");
      mediaElement.src = src;

    } else if (type.startsWith("video")) {

      mediaElement = document.createElement("video");
      mediaElement.src = src;
      mediaElement.autoplay = true;
      mediaElement.loop = true;
      mediaElement.muted = true;
      mediaElement.playsInline = true;

      mediaElement.addEventListener("loadeddata", () => {
        mediaElement.play().catch(() => {});
      });

    } else {
      return;
    }

    mediaElement.classList.add("media");
    player.appendChild(mediaElement);
  }
}