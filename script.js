// Galería de fotos automática
const gallery = document.getElementById("gallery");
const fotos = [
  "fotos/Novios_con_Dron.png",
  // Puedes agregar más fotos aquí si las añades a la carpeta
];
fotos.forEach((foto) => {
  const img = document.createElement("img");
  img.src = foto;
  img.alt = "Foto de los novios";
  img.className = "gallery-img";
  img.style.opacity = 0;
  gallery.appendChild(img);
  setTimeout(() => {
    img.style.transition = "opacity 1.2s";
    img.style.opacity = 1;
  }, 300);
});
// Animación de entrada para las imágenes
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".gallery-img").forEach((img, i) => {
    setTimeout(() => {
      img.style.opacity = 1;
    }, 400 + i * 200);
  });
});
