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

  // occasional extra leaf on movement
  if (Math.random() < 0.08) {
    spawnLeaf(clientX, clientY);
  }
});

// Falling leaves engine
const leafContainer = document.getElementById("leaf-container");

function spawnLeaf(x = Math.random() * window.innerWidth, yStart = -50) {
  const leaf = document.createElement("div");
  leaf.classList.add("leaf");

  const size = 14 + Math.random() * 12;
  leaf.style.width = `${size}px`;
  leaf.style.height = `${size * 1.5}px`;

  const startX = x === null ? Math.random() * window.innerWidth : x;
  leaf.style.left = `${startX}px`;
  leaf.style.top = `${yStart}px`;

  const fallDuration = 8 + Math.random() * 7;
  const swayDuration = 3 + Math.random() * 3;
  leaf.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
  leaf.style.animationDelay = `${Math.random() * 3}s, 0s`;

  // color variation
  if (Math.random() < 0.3) {
    leaf.style.background = "radial-gradient(circle at 30% 20%, #7fb7d4, #3f6b3a)";
  } else if (Math.random() < 0.6) {
    leaf.style.background = "radial-gradient(circle at 30% 20%, #c9a36b, #4a2e14)";
  }

  leafContainer.appendChild(leaf);

  setTimeout(() => {
    leaf.remove();
  }, fallDuration * 1000 + 4000);
}

// initial gentle rain
for (let i = 0; i < 25; i++) {
  setTimeout(() => spawnLeaf(null, -Math.random() * window.innerHeight), i * 200);
}

// Tree loader logic
const loader = document.getElementById("loader");

window.addEventListener("load", () => {
  // give the tree time to fully grow before fade
  setTimeout(() => {
    loader.classList.add("loader-fade-out");
    setTimeout(() => {
      loader.style.display = "none";
    }, 900);
  }, 2600);
});
