const track = document.getElementById('explore-track');
let slides = Array.from(track.children);
const totalSlides = slides.length;

let isDragging = false;
let startX = 0;
let currentX = 0;

// Dynamisch Klone erzeugen
const cloneFirst = slides[0].cloneNode(true);
const cloneLast = slides[totalSlides - 1].cloneNode(true);

track.insertBefore(cloneLast, slides[0]); // vorne: letztes Slide klonen
track.appendChild(cloneFirst);            // hinten: erstes Slide klonen

// Slides aktualisieren
slides = Array.from(track.children);

// Starte auf erstem echten Slide (Index 1)
let currentSlide = 1;
track.style.transform = `translateX(-${currentSlide * 100}vw)`;

// Slide wechseln
function goToSlide(index, animated = true, duration = 0.3) {
    if (animated) {
        track.style.transition = `transform ${duration}s ease-in-out`;
    } else {
        track.style.transition = 'none';
    }
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}vw)`;
}

// Drag Start
track.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    track.style.transition = 'none';
});

// Drag Move
window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
    const deltaX = currentX - startX;
    const percent = deltaX / window.innerWidth;
    const percentVW = percent * 100;

    // Bewegung des Tracks
    track.style.transform = `translateX(calc(-${currentSlide * 100}vw + ${percentVW}vw))`;

    // Effekt-Geschwindigkeit: langsamer (bei 30% voll sichtbar)
    const blurStrength = Math.min(1, Math.abs(percent) / 0.5);

    const current = slides[currentSlide];
    const next = percent > 0 ? slides[currentSlide - 1] : slides[currentSlide + 1];

    if (current) {
        current.style.filter = `blur(${blurStrength * 5}px)`;
        current.style.opacity = `${1 - blurStrength}`;
    }

    if (next) {
        next.style.filter = `blur(${(1 - blurStrength) * 5}px)`;
        next.style.opacity = `${blurStrength}`;
    }
});

// Drag End
window.addEventListener('pointerup', () => {
    if (!isDragging) return;
    isDragging = false;
    const deltaX = currentX - startX;
    const threshold = window.innerWidth * 0.1;
    track.style.transition = 'transform 0.3s ease-in-out';

    if (deltaX < -threshold) {
        goToSlide(currentSlide + 1, true, 0.6);
    } else if (deltaX > threshold) {
        goToSlide(currentSlide - 1, true, 0.6);
    } else {
        goToSlide(currentSlide, true, 0.6);
    }

    // Blur/Opacity zurücksetzen
    slides.forEach(slide => {
        slide.style.filter = 'blur(0px)';
        slide.style.opacity = '1';
    });
});

// Unsichtbarer Sprung beim Übergang von/von Klon
track.addEventListener('transitionend', () => {
    if (currentSlide === 0) {
        // Von geklontem letzten Slide zurück auf echten letzten
        goToSlide(totalSlides, false);
    } else if (currentSlide === slides.length - 1) {
        // Von geklontem ersten Slide zurück auf echten ersten
        goToSlide(1, false);
    }
});


// 1. Starte Autoplay
let autoplayInterval = null;
let autoplayTimeout = null;

function startAutoplay() {
  autoplayInterval = setInterval(() => {
    goToSlide(currentSlide + 1, true, 1.2);
  }, 3000); // 3 Sekunden
}

// Sofort starten beim Laden
startAutoplay();

function pauseAutoplay() {
  clearInterval(autoplayInterval);
  clearTimeout(autoplayTimeout); // falls mehrere Pointerdown schnell passieren
}

function resumeAutoplayDelayed() {
  clearTimeout(autoplayTimeout);
  autoplayTimeout = setTimeout(() => {
    startAutoplay();
  }, 5000); // Warte 5 Sekunden bevor neu gestartet wird
}

// Events
track.addEventListener('pointerdown', pauseAutoplay);
window.addEventListener('pointerup', resumeAutoplayDelayed);