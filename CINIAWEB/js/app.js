const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");

fileInput.addEventListener("change", function () {
  const file = this.files[0];
  preview.innerHTML = "";

  if (!file) return;

  const url = URL.createObjectURL(file);

  if (file.type.startsWith("image")) {
    const img = document.createElement("img");
    img.src = url;
    preview.appendChild(img);
  }

  if (file.type.startsWith("video")) {
    const video = document.createElement("video");
    video.src = url;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    preview.appendChild(video);
  }
});