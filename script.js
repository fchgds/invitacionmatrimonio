// Galería de fotos automática
const gallery = document.getElementById("gallery");
const fotos = [
  "fotos/novios.png",
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

// Folding animation on scroll
function handleScrollAnimation() {
  const foldingSection = document.getElementById('foldingSection');
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Calculate scroll percentage
  const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
  
  // Remove all animation classes first
  foldingSection.classList.remove('folding');
  
  // Panels start open and fold when scrolling
  if (scrollPercent >= 10) {
    // 10%+: Panels should fold to hide photos
    foldingSection.classList.add('folding');
  }
  // 0-10%: Panels remain open (default state)
}

// Add scroll event listener with throttling for performance
let ticking = false;
function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      handleScrollAnimation();
      ticking = false;
    });
    ticking = true;
  }
}

// Initialize on page load and set up listeners
window.addEventListener('DOMContentLoaded', handleScrollAnimation);
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScrollAnimation);

// Countdown to wedding fixed to America/La_Paz (Bolivia) timezone
function startCountdown() {
  // Bolivia is UTC-4 year-round (no DST). Build a UTC timestamp for 2025-11-22 17:00 in America/La_Paz
  const year = 2025, month = 10, day = 22, hour = 17, minute = 0, second = 0; // month 10 -> November
  // Create a Date in UTC corresponding to the Bolivian local time by adding 4 hours
  // targetUTC = new Date(Date.UTC(year, month, day, hour + 4, minute, second))
  const targetUTC = Date.UTC(year, month, day, hour + 4, minute, second);

  const el = document.getElementById('countdown');
  if (!el) return;

  function update() {
    const now = new Date();
    const nowUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    let diff = targetUTC - nowUTC;
    if (diff <= 0) {
      el.textContent = '¡Ya comenzó!';
      clearInterval(timer);
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));

    el.textContent = `${days} días ${hours} horas ${minutes} minutos`;
  }

  update();
  const timer = setInterval(update, 1000 * 60); // update each minute
}

window.addEventListener('DOMContentLoaded', startCountdown);
