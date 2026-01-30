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

function spawnLeafVideos() {
  const leaf = document.createElement("div");
  leaf.classList.add("leaf");

  const size = 14 + Math.random() * 10;
  leaf.style.width = `${size}px`;
  leaf.style.height = `${size * 1.5}px`;

  leaf.style.left = `${Math.random() * window.innerWidth}px`;
  leaf.style.top = `-40px`;

  const fallDuration = 12 + Math.random() * 8; // slower
  const swayDuration = 4 + Math.random() * 3;
  leaf.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
  leaf.style.animationDelay = `${Math.random() * 4}s, 0s`;

  leafContainer.appendChild(leaf);

  setTimeout(() => leaf.remove(), fallDuration * 1000 + 4000);
}

// gentle continuous leaves
setInterval(spawnLeafVideos, 900);

// Hover ripple effect on video cards
document.querySelectorAll(".video-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});
