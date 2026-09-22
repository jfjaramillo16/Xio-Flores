document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Audio y Botones ---
    const btnAudio = document.getElementById('btn-audio');
    const audioLabel = document.getElementById('audio-label');
    const bgMusic = document.getElementById('bg-music');
    const btnLetter = document.getElementById('btn-letter');
    const bouquetTrigger = document.getElementById('bouquet-trigger');
    const modal = document.getElementById('letter-modal');
    const closeModal = document.getElementById('close-modal');

    let isPlaying = false;

    function toggleMusic() {
        if (!bgMusic) return;

        if (!isPlaying) {
            bgMusic.play()
                .then(() => {
                    isPlaying = true;
                    if (audioLabel) audioLabel.textContent = "Pausar Canción";
                    if (btnAudio) {
                        btnAudio.style.background = "rgba(255, 202, 40, 0.35)";
                        btnAudio.style.borderColor = "#ffca28";
                    }
                })
                .catch(err => {
                    console.warn("Autoplay bloqueado o archivo no encontrado:", err);
                });
        } else {
            bgMusic.pause();
            isPlaying = false;
            if (audioLabel) audioLabel.textContent = "Reproducir Canción";
            if (btnAudio) {
                btnAudio.style.background = "rgba(255, 255, 255, 0.1)";
                btnAudio.style.borderColor = "rgba(255, 255, 255, 0.2)";
            }
        }
    }

    if (btnAudio) {
        btnAudio.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMusic();
        });
    }

    // --- 2. Modal de Carta ---
    function openLetter() {
        if (modal) modal.classList.add('open');
    }

    function hideLetter() {
        if (modal) modal.classList.remove('open');
    }

    if (btnLetter) {
        btnLetter.addEventListener('click', (e) => {
            e.stopPropagation();
            openLetter();
            if (!isPlaying) toggleMusic();
        });
    }

    if (bouquetTrigger) {
        bouquetTrigger.addEventListener('click', () => {
            openLetter();
            if (!isPlaying) toggleMusic();
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', hideLetter);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideLetter();
        });
    }

    // --- 3. Efecto de clic (corazones/chispas) ---
    window.addEventListener('click', (e) => {
        const icons = ['✨', '💛', '🌻', '⭐'];
        const heart = document.createElement('span');
        heart.className = 'click-heart';
        heart.innerText = icons[Math.floor(Math.random() * icons.length)];
        heart.style.left = `${e.clientX}px`;
        heart.style.top = `${e.clientY}px`;
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1200);
    });

    // --- 4. Animación Canvas: Chispas y Pétalos dorados flotantes ---
    const canvas = document.getElementById('canvas-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const count = 35;

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2.5 + 1,
                dx: (Math.random() - 0.5) * 0.6,
                dy: Math.random() * 0.7 + 0.3,
                opacity: Math.random() * 0.7 + 0.3,
                pulse: Math.random() * 0.05
            });
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 202, 40, ${p.opacity})`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#ffb300';
                ctx.fill();

                p.x += p.dx;
                p.y += p.dy;
                p.opacity += Math.sin(p.pulse) * 0.02;

                if (p.y > height) {
                    p.y = -10;
                    p.x = Math.random() * width;
                }
                if (p.x > width) p.x = 0;
                if (p.x < 0) p.x = width;
            });

            requestAnimationFrame(animate);
        }
        animate();
    }
    // Obtén la referencia al inicio junto a los otros elementos:
    const musicFlower = document.getElementById('music-flower');

    // Modifica toggleMusic para alternar la clase:
    function toggleMusic() {
        if (!bgMusic) return;

        if (!isPlaying) {
            bgMusic.play()
                .then(() => {
                    isPlaying = true;
                    if (audioLabel) audioLabel.textContent = "Pausar Canción";
                    if (btnAudio) {
                        btnAudio.style.background = "rgba(255, 202, 40, 0.35)";
                        btnAudio.style.borderColor = "#ffca28";
                    }
                    // Mostrar la flor
                    if (musicFlower) musicFlower.classList.add('active');
                })
                .catch(err => {
                    console.warn("Autoplay bloqueado o archivo no encontrado:", err);
                });
        } else {
            bgMusic.pause();
            isPlaying = false;
            if (audioLabel) audioLabel.textContent = "Reproducir Canción";
            if (btnAudio) {
                btnAudio.style.background = "rgba(255, 255, 255, 0.1)";
                btnAudio.style.borderColor = "rgba(255, 255, 255, 0.2)";
            }
            // Ocultar la flor al pausar
            if (musicFlower) musicFlower.classList.remove('active');
        }
    }
});