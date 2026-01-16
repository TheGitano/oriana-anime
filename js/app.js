const grid = document.getElementById("grid");
const iframe = document.getElementById("player");
const titulo = document.getElementById("tituloActual");
const btnSeguir = document.getElementById("btnSeguir");
const seguirViendoSection = document.getElementById("seguirViendo");

// Cargar último visto desde localStorage
let ultimoVisto = JSON.parse(localStorage.getItem("ultimoVisto")) || null;

// Si hay algo guardado, mostrar botón de "Seguir viendo"
if (ultimoVisto) {
  mostrarBotonSeguirViendo(ultimoVisto);
}

// Crear tarjetas del catálogo con animación escalonada
catalogo.forEach((item, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.animationDelay = `${index * 0.05}s`;
  
  card.innerHTML = `
    <img src="${item.imagen}" alt="${item.titulo}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x400/667eea/ffffff?text=Anime'">
    <span>${item.titulo}</span>
  `;
  
  card.onclick = () => reproducir(item);
  grid.appendChild(card);
});

// Función para reproducir un video/playlist
function reproducir(item) {
  // Actualizar título
  titulo.textContent = "▶️ " + item.titulo;
  
  // Scroll suave al visor
  document.getElementById("visor").scrollIntoView({ 
    behavior: 'smooth', 
    block: 'center' 
  });

  // Guardar lo último visto
  localStorage.setItem("ultimoVisto", JSON.stringify(item));
  
  // Mostrar botón de seguir viendo
  mostrarBotonSeguirViendo(item);

  // Detectar tipo de enlace y construir URL
  let embedURL = construirEmbedURL(item.link);
  
  // Cargar en iframe
  iframe.src = embedURL;
  
  // Animación de carga
  iframe.style.opacity = "0.5";
  setTimeout(() => {
    iframe.style.opacity = "1";
  }, 500);
}

// Función para construir URL de embed
function construirEmbedURL(link) {
  let embedURL = "";
  
  // Si es una playlist de YouTube
  if (link.includes("playlist")) {
    const playlistId = link.split("list=")[1];
    embedURL = `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1`;
  }
  // Si es un video individual de YouTube
  else if (link.includes("youtube.com/watch")) {
    const videoId = link.split("v=")[1]?.split("&")[0];
    embedURL = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  // Si es un enlace corto de YouTube (youtu.be)
  else if (link.includes("youtu.be/")) {
    const videoId = link.split("youtu.be/")[1]?.split("?")[0];
    embedURL = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  // Si es un canal de YouTube
  else if (link.includes("youtube.com/@") || link.includes("youtube.com/c/")) {
    // Abrir en nueva pestaña
    window.open(link, "_blank");
    embedURL = ""; // No cargar en iframe
  }
  // Cualquier otro enlace
  else {
    embedURL = link;
  }
  
  return embedURL;
}

// Función para mostrar el botón "Seguir viendo"
function mostrarBotonSeguirViendo(item) {
  if (btnSeguir && item) {
    btnSeguir.textContent = "🔄 Seguir viendo: " + item.titulo;
    btnSeguir.onclick = () => reproducir(item);
    seguirViendoSection.classList.remove("oculto");
    
    // Animación de entrada
    seguirViendoSection.style.animation = "fadeInDown 0.5s ease";
  }
}

// Agregar efecto de partículas al fondo (opcional pero bonito)
function crearParticulas() {
  const particlesContainer = document.createElement('div');
  particlesContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  `;
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    particlesContainer.appendChild(particle);
  }
  
  document.body.appendChild(particlesContainer);
}

// Activar partículas de fondo
crearParticulas();

// Mensaje de bienvenida especial
console.log("%c💖 Hecho con amor para Oriana 💖", "color: #f5576c; font-size: 20px; font-weight: bold;");
console.log("%c¡Disfruta viendo tus animes favoritos!", "color: #667eea; font-size: 16px;");