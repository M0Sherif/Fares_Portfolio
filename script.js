// ===== PARTICLE BACKGROUND =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrame;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.4 + 0.1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(230, 57, 70, ${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        const opacity = (1 - dist / 150) * 0.15;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(230, 57, 70, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  animFrame = requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function handleNavScroll() {
  const scrollY = window.scrollY;
  
  // Add scrolled class
  if (scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Highlight active nav link
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', handleNavScroll);


// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('nav-toggle');
const navLinksContainer = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinksContainer.classList.toggle('open');
});

// Close mobile nav on link click
navLinksContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinksContainer.classList.remove('open');
  });
});


// ===== TYPING EFFECT =====
const typingTexts = [
  'Cybersecurity Student • Penetration Testing & Networking Enthusiast',
  'Exploring Ethical Hacking & Web Security',
  'Building AI/ML Solutions for Network Defense',
  'CCNA & CEH Certified Professional'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById('typed-text');

function typeEffect() {
  const currentText = typingTexts[textIndex];
  
  if (isDeleting) {
    typedElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 30 : 60;

  if (!isDeleting && charIndex === currentText.length) {
    speed = 2500; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
    speed = 500; // Pause before next
  }

  setTimeout(typeEffect, speed);
}

// Start typing after hero animation
setTimeout(typeEffect, 1500);


// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


// ===== DNS CHART ANIMATION =====
const dnsCanvas = document.getElementById('dns-chart');
const dnsCtx = dnsCanvas.getContext('2d');

const dnsData = [40, 42, 38, 44, 80, 150, 55, 40, 42, 38];
const dnsLabels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10'];
let chartAnimationProgress = 0;
let chartAnimated = false;

function resizeDNSChart() {
  const wrapper = dnsCanvas.parentElement;
  dnsCanvas.width = wrapper.clientWidth - 60;
  dnsCanvas.height = 250;
}

function drawDNSChart(progress) {
  resizeDNSChart();
  const w = dnsCanvas.width;
  const h = dnsCanvas.height;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartW = w - padding.left - padding.right;
  const chartH = h - padding.top - padding.bottom;
  const maxVal = 160;

  dnsCtx.clearRect(0, 0, w, h);

  // Grid lines
  const gridSteps = [0, 20, 40, 60, 80, 100, 120, 140, 160];
  gridSteps.forEach(val => {
    const y = padding.top + chartH - (val / maxVal) * chartH;
    dnsCtx.beginPath();
    dnsCtx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    dnsCtx.lineWidth = 1;
    dnsCtx.moveTo(padding.left, y);
    dnsCtx.lineTo(w - padding.right, y);
    dnsCtx.stroke();

    // Y-axis labels
    dnsCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    dnsCtx.font = '11px Inter, sans-serif';
    dnsCtx.textAlign = 'right';
    dnsCtx.fillText(val.toString(), padding.left - 8, y + 4);
  });

  // Animated data points
  const step = chartW / (dnsData.length - 1);
  const animatedData = dnsData.map(val => val * progress);

  // Draw line
  dnsCtx.beginPath();
  dnsCtx.strokeStyle = '#e63946';
  dnsCtx.lineWidth = 2.5;
  dnsCtx.lineJoin = 'round';

  animatedData.forEach((val, i) => {
    const x = padding.left + i * step;
    const y = padding.top + chartH - (val / maxVal) * chartH;
    if (i === 0) dnsCtx.moveTo(x, y);
    else dnsCtx.lineTo(x, y);
  });
  dnsCtx.stroke();

  // Draw points
  animatedData.forEach((val, i) => {
    const x = padding.left + i * step;
    const y = padding.top + chartH - (val / maxVal) * chartH;

    // Glow for anomaly point (T6, index 5)
    if (i === 5 && progress > 0.5) {
      dnsCtx.beginPath();
      dnsCtx.arc(x, y, 12, 0, Math.PI * 2);
      dnsCtx.fillStyle = 'rgba(230, 57, 70, 0.2)';
      dnsCtx.fill();
    }

    // Point
    dnsCtx.beginPath();
    dnsCtx.arc(x, y, 5, 0, Math.PI * 2);
    dnsCtx.fillStyle = i === 5 ? '#ff4d5e' : '#e63946';
    dnsCtx.fill();
    dnsCtx.beginPath();
    dnsCtx.arc(x, y, 3, 0, Math.PI * 2);
    dnsCtx.fillStyle = '#0a0a0a';
    dnsCtx.fill();

    // X-axis labels
    dnsCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    dnsCtx.font = '11px Inter, sans-serif';
    dnsCtx.textAlign = 'center';
    dnsCtx.fillText(dnsLabels[i], x, h - padding.bottom + 20);
  });
}

// Observe chart for animation trigger
const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !chartAnimated) {
      chartAnimated = true;
      animateChart();
    }
  });
}, { threshold: 0.3 });

if (dnsCanvas) {
  chartObserver.observe(dnsCanvas);
}

function animateChart() {
  const duration = 1500;
  const start = performance.now();

  function step(timestamp) {
    const elapsed = timestamp - start;
    chartAnimationProgress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const eased = 1 - Math.pow(1 - chartAnimationProgress, 3);
    
    drawDNSChart(eased);

    if (chartAnimationProgress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// Redraw on resize
window.addEventListener('resize', () => {
  if (chartAnimated) {
    drawDNSChart(1);
  }
});


// ===== BACK TO TOP =====
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});



// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
