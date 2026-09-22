/* =========================================================
   1. SISTEMA DE PÉTALOS Y CHISPAS CAYENDO (HTML5 CANVAS)
   ========================================================= */
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset(true);
    }

    reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -20;
        this.size = Math.random() * 8 + 5;
        this.speedY = Math.random() * 1.2 + 0.6;
        this.speedX = Math.random() * 1.4 - 0.7;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.03;
        this.opacity = Math.random() * 0.6 + 0.3;

        // Tipo: 75% pétalos amarillos, 25% chispas doradas pequeñas
        this.isPetal = Math.random() > 0.25;
    }

    update() {
        this.y += this.speedY;
        this.x += Math.sin(this.angle) * 0.8 + this.speedX;
        this.angle += this.rotationSpeed;

        if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = this.opacity;

        if (this.isPetal) {
            // Dibujar forma de pétalo de girasol
            ctx.fillStyle = '#ffc837';
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(this.size / 2, -this.size, this.size, 0);
            ctx.quadraticCurveTo(this.size / 2, this.size, 0, 0);
            ctx.fill();
        } else {
            // Chispa dorada resplandeciente
            ctx.fillStyle = '#ffe082';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#ffb300';
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 0.25, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
}

// Crear conjunto inicial de partículas
const PARTICLE_COUNT = 38;
for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

/* =========================================================
   2. INTERACTIVIDAD DEL MODAL (CARTA PARA XIO)
   ========================================================= */
const btnLetter = document.getElementById('btn-letter');
const modal = document.getElementById('letter-modal');
const btnClose = document.getElementById('close-modal');
const bouquet = document.getElementById('bouquet-trigger');

function openLetter() {
    modal.classList.add('open');
}

function closeLetter() {
    modal.classList.remove('open');
}

btnLetter.addEventListener('click', openLetter);
btnClose.addEventListener('click', closeLetter);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLetter();
});

// Al tocar el ramo, salta un efecto y abre la carta
bouquet.addEventListener('click', (e) => {
    createHeartSpark(e.clientX || (window.innerWidth / 2), e.clientY || (window.innerHeight / 2));
    setTimeout(openLetter, 300);
});

/* =========================================================
   3. EFECTOS AL HACER CLIC EN CUALQUIER LUGAR (CORAZONES/FLORES)
   ========================================================= */
function createHeartSpark(x, y) {
    const heart = document.createElement('div');
    heart.className = 'click-heart';
    const symbols = ['🌻', '💛', '✨', '💛', '☀️'];
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1200);
}

window.addEventListener('pointerdown', (e) => {
    // Evitar disparar si se hace clic en botones del modal
    if (e.target.closest('#letter-modal')) return;
    createHeartSpark(e.clientX, e.clientY);
});

/* =========================================================
   4. MÚSICA AMBIENTAL RELAJANTE (WEB AUDIO API - SIN EXTERNOS)
   ========================================================= */
const btnAudio = document.getElementById('btn-audio');
const audioLabel = document.getElementById('audio-label');

let audioCtx = null;
let isPlaying = false;
let audioTimer = null;

// Acordes cálidos estilo Pop/Balada acústica (G - D - Em - C)
const chordProgression = [
    [196.00, 246.94, 293.66, 392.00], // G
    [146.83, 220.00, 293.66, 369.99], // D
    [164.81, 196.00, 246.94, 329.63], // Em
    [130.81, 196.00, 261.63, 329.63]  // C
];

let chordIdx = 0;

function playAmbientTone(freq, duration = 3.5, delay = 0) {
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + delay);

    // Envolvente de sonido suave
    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + delay + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + delay + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(audioCtx.currentTime + delay);
    osc.stop(audioCtx.currentTime + delay + duration);
}

function playNextChord() {
    if (!isPlaying) return;
    const currentChord = chordProgression[chordIdx];

    // Arpegio suave con cada nota
    currentChord.forEach((note, index) => {
        playAmbientTone(note, 3.8, index * 0.22);
    });

    chordIdx = (chordIdx + 1) % chordProgression.length;
    audioTimer = setTimeout(playNextChord, 2600);
}

function toggleAudio() {
    if (!isPlaying) {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        isPlaying = true;
        audioLabel.textContent = "Pausar";
        btnAudio.style.background = "rgba(255, 202, 40, 0.3)";
        playNextChord();
    } else {
        isPlaying = false;
        clearTimeout(audioTimer);
        audioLabel.textContent = "Música";
        btnAudio.style.background = "rgba(255, 255, 255, 0.1)";
    }
}

btnAudio.addEventListener('click', toggleAudio);