const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];

class Particle {
  constructor(x, y, power) {
    this.x = x;
    this.y = y;
    this.alpha = 1;
    this.vx = (Math.random() - 0.5) * power;
    this.vy = (Math.random() - 0.5) * power;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "#ffd700";
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

function burstAt(x, y, power = 8, count = 90) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, power));
  }
}

function finalBurst() {
  burstAt(canvas.width / 2, canvas.height / 2, 14, 260);
}

function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.draw();
    p.update();
    if (p.alpha <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(animate);
}

animate();
window.burstAt = burstAt;
window.finalBurst = finalBurst;
