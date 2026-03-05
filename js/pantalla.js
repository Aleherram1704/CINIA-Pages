const SERVER_IP = "10.50.85.88";

function initPantalla(screenId){

  const player = document.getElementById("player");

  const PLAYLIST_URL = `http://${SERVER_IP}:1880/${screenId}/playlist.json`;

  let playlist = [];
  let currentIndex = 0;
  let imageTimer = null;

  async function cargarPlaylist(){

    try{

      const res = await fetch(PLAYLIST_URL);
      const data = await res.json();

      playlist = data.Media;

      if(!playlist.length){
        player.innerHTML = `<p class="empty-msg">Sin contenido</p>`;
        return;
      }

      currentIndex = 0;
      playItem();

    }catch(err){

      console.error("Error cargando playlist:",err);

      player.innerHTML = `<p class="empty-msg">Error cargando contenido</p>`;

    }

  }

  function playItem(){

    clearTimeout(imageTimer);

    player.innerHTML = "";

    const file = playlist[currentIndex];

    const url = `http://${SERVER_IP}:1880/${screenId}/${file}`;

    if(file.match(/\.(jpg|jpeg|png|gif|webp)$/i)){

      const img = document.createElement("img");

      img.src = url;
      img.className = "media";

      player.appendChild(img);

      imageTimer = setTimeout(nextItem,5000);

    }

    else if(file.match(/\.(mp4|webm|mov)$/i)){

      const video = document.createElement("video");

      video.src = url;
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.className = "media";

      video.onended = nextItem;

      player.appendChild(video);

      video.play().catch(err=>{
        console.warn("Autoplay bloqueado",err);
      });

    }

  }

  function nextItem(){

    currentIndex++;

    if(currentIndex >= playlist.length){
      currentIndex = 0;
    }

    playItem();

  }

  cargarPlaylist();

}