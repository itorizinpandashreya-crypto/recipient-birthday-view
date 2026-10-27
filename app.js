/**
 * ATELIER PRATYAK — 27th Birthday Interactive Greeting Card
 * Pure Recipient Presentation: 3D Flip Physics & Celebratory Confetti Engine
 */

let isBookOpen = false;

document.addEventListener('DOMContentLoaded', () => {
  // Listen for Spacebar or Enter to flip card
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      toggleBookFold();
    }
  });
});

// 3D Flipcard Folding Toggle
function toggleBookFold() {
  const book = document.getElementById('card-3d-book');
  const hintLabel = document.getElementById('flip-hint-label');

  if (!book) return;

  isBookOpen = !isBookOpen;

  if (isBookOpen) {
    book.classList.add('open');
    if (hintLabel) hintLabel.textContent = 'Click anywhere on card to CLOSE';
    // Celebrate with luxurious confetti burst!
    triggerCelebrationConfetti();
  } else {
    book.classList.remove('open');
    if (hintLabel) hintLabel.textContent = 'Click anywhere on card to OPEN';
  }
}

// Romantic celebratory confetti engine (Gold foil flakes, ruby hearts, ivory petals)
function triggerCelebrationConfetti() {
  const canvas = document.getElementById('celebration-confetti');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#C5A059', '#DAB368', '#7D1D2C', '#FAF7F2', '#E8D5B5', '#A33346'];
  const particles = [];
  const count = 85;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: canvas.width * (0.3 + Math.random() * 0.4),
      y: canvas.height * (0.35 + Math.random() * 0.2),
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 11 - 5,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      gravity: 0.28,
      decay: 0.985,
      isHeart: Math.random() > 0.65
    });
  }

  let animationFrame;
  let opacity = 1.0;

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = 0;

    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.decay;
      p.rotation += p.rotSpeed;

      if (p.y < canvas.height + 20) {
        active++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, opacity);

        if (p.isHeart) {
          // Draw tiny heart
          ctx.beginPath();
          const s = p.size * 0.6;
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s, -s * 0.6, -s * 1.4, s * 0.4, 0, s * 1.4);
          ctx.bezierCurveTo(s * 1.4, s * 0.4, s, -s * 0.6, 0, s * 0.3);
          ctx.fill();
        } else {
          // Draw luxury foil petal / rectangle
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
        }
        ctx.restore();
      }
    }

    if (active > 0) {
      opacity -= 0.004;
      animationFrame = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  render();
}
