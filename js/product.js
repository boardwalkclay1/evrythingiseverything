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

function spawnLeafProducts() {
  const leaf = document.createElement("div");
  leaf.classList.add("leaf");

  const size = 14 + Math.random() * 10;
  leaf.style.width = `${size}px`;
  leaf.style.height = `${size * 1.5}px`;

  leaf.style.left = `${Math.random() * window.innerWidth}px`;
  leaf.style.top = `-40px`;

  const fallDuration = 9 + Math.random() * 6;
  const swayDuration = 3 + Math.random() * 2;
  leaf.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
  leaf.style.animationDelay = `${Math.random() * 3}s, 0s`;

  leafContainer.appendChild(leaf);

  setTimeout(() => leaf.remove(), fallDuration * 1000 + 4000);
}

setInterval(spawnLeafProducts, 800);

// Simple "cart" feedback
document.querySelectorAll(".add-to-cart").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.textContent = "Added";
    btn.disabled = true;
    btn.style.opacity = "0.7";

    // burst of leaves near button
    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    for (let i = 0; i < 5; i++) {
      setTimeout(() => spawnLeafProducts(centerX, centerY), i * 80);
    }
  });
});

// allow spawnLeafProducts to accept coordinates if passed
function spawnLeafProducts(x = Math.random() * window.innerWidth, yStart = -40) {
  const leaf = document.createElement("div");
  leaf.classList.add("leaf");

  const size = 14 + Math.random() * 10;
  leaf.style.width = `${size}px`;
  leaf.style.height = `${size * 1.5}px`;

  leaf.style.left = `${x}px`;
  leaf.style.top = `${yStart}px`;

  const fallDuration = 9 + Math.random() * 6;
  const swayDuration = 3 + Math.random() * 2;
  leaf.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
  leaf.style.animationDelay = `${Math.random() * 3}s, 0s`;

  leafContainer.appendChild(leaf);

  setTimeout(() => leaf.remove(), fallDuration * 1000 + 4000);
}
