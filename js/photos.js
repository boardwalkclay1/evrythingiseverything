// Leaf cursor
const leafCursor = document.createElement("div");
leafCursor.classList.add("leaf-cursor");
document.body.appendChild(leafCursor);

let lastX = 0;
let lastY = 0;

window.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;
  const angle = Math.atan2(clientY - lastY, clientX - lastX) * (180 / Math.PI);
  leafCursor.style.transform = `translate(${clientX - 13}px, ${clientY - 20}px) rotate(${angle}deg)`;
  lastX = clientX;
  lastY = clientY;
});

const leafContainer = document.getElementById("leaf-container");

function spawnLeafPhotos() {
  const leaf = document.createElement("div");
  leaf.classList.add("leaf");

  const size = 12 + Math.random() * 10;
  leaf.style.width = `${size}px`;
  leaf.style.height = `${size * 1.5}px`;

  leaf.style.left = `${Math.random() * window.innerWidth}px`;
  leaf.style.top = `-40px`;

  const fallDuration = 7 + Math.random() * 5; // slightly faster
  const swayDuration = 3 + Math.random() * 2;
  leaf.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
  leaf.style.animationDelay = `${Math.random() * 3}s, 0s`;

  leafContainer.appendChild(leaf);

  setTimeout(() => leaf.remove(), fallDuration * 1000 + 4000);
}

setInterval(spawnLeafPhotos, 700);

// Lightbox logic
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

document.querySelectorAll(".photo-card img").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.classList.remove("hidden");
  });
});

lightbox.addEventListener("click", () => {
  lightbox.classList.add("hidden");
  lightboxImg.src = "";
});
