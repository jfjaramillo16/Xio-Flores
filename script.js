/* =========================================================
   4. REPRODUCTOR DE LA CANCIÓN "FLORES AMARILLAS"
   ========================================================= */
const btnAudio = document.getElementById('btn-audio');
const audioLabel = document.getElementById('audio-label');
const bgMusic = document.getElementById('bg-music');

let isPlaying = false;

function toggleMusic() {
    if (!isPlaying) {
        bgMusic.play().then(() => {
            isPlaying = true;
            audioLabel.textContent = "Pausar Canción";
            btnAudio.style.background = "rgba(255, 202, 40, 0.35)";
            btnAudio.style.borderColor = "#ffca28";
        }).catch(err => {
            console.warn("La reproducción automática requiere interacción del usuario:", err);
        });
    } else {
        bgMusic.pause();
        isPlaying = false;
        audioLabel.textContent = "Reproducir Canción";
        btnAudio.style.background = "rgba(255, 255, 255, 0.1)";
        btnAudio.style.borderColor = "rgba(255, 255, 255, 0.2)";
    }
}

btnAudio.addEventListener('click', toggleMusic);

// Opcional: Iniciar la canción automáticamente al abrir la carta
btnLetter.addEventListener('click', () => {
    if (!isPlaying) {
        toggleMusic();
    }
});