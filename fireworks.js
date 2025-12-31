const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor(x, y, color, power) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.alpha = 1;
    this.vx = (Math.random() - 0.5) * power;
    this.vy = (Math.random() - 0.5) * power;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.015;
  }
}

function burstAt(x, y, power = 7, count = 80, colors = null) {
  const palette = colors || ["#ffd700", "#ff4d4d", "#4dd2ff", "#ffffff"];
  for (let i = 0; i < count; i++) {
    particles.push(
      new Particle(
        x,
        y,
        palette[Math.floor(Math.random() * palette.length)],
        power
      )
    );
  }
}

function finalBurst() {
  burstAt(
    canvas.width / 2,
    canvas.height / 2,
    12,
    220,
    ["#ffd700", "#ffcc00", "#ffffff"]
  );
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.draw();
    p.update();
    if (p.alpha <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();

/* expose globally */
window.burstAt = burstAt;
window.finalBurst = finalBurst;

