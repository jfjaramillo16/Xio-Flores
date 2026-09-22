/* =========================================================
   4. REPRODUCTOR DE LA CANCIÓN "FLORES AMARILLAS" (PROTEGIDO)
   ========================================================= */
const btnAudio = document.getElementById('btn-audio');
const audioLabel = document.getElementById('audio-label');
const bgMusic = document.getElementById('bg-music');

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
                console.warn("Reproducción en espera o archivo no encontrado:", err);
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

// Abrir la carta e intentar reproducir la música sin bloquear si el audio falla
if (btnLetter) {
    btnLetter.addEventListener('click', (e) => {
        e.stopPropagation();
        openLetter();
        if (!isPlaying) {
            toggleMusic();
        }
    });
}