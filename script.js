// ===================================
// Wedding Invitation – M & M
// Authentic · Vintage · With Music
// ===================================

document.addEventListener('DOMContentLoaded', () => {

    const envelopeScreen = document.getElementById('envelope-screen');
    const envelope       = document.getElementById('envelope');
    const invitation     = document.getElementById('invitation');
    const sparkles       = document.getElementById('sparkles');
    const bgMusic        = document.getElementById('bg-music');
    const musicToggle    = document.getElementById('music-toggle');
    const musicIconOn    = document.getElementById('music-icon-on');
    const musicIconOff   = document.getElementById('music-icon-off');

    let musicPlaying = false;

    // --- Sparkle colours matching palette ---
    const colors = ['#C4A55A', '#CDD8CA', '#D4BC7E', '#A8B8A2', '#D1C4AD'];

    for (let i = 0; i < 22; i++) {
        const s = document.createElement('div');
        s.className = 'sparkle';
        const angle = (Math.PI * 2 * i) / 22;
        const r = 120 + Math.random() * 60;
        s.style.left = `${50 + Math.cos(angle) * r / 4}%`;
        s.style.top  = `${50 + Math.sin(angle) * r / 4}%`;
        s.style.animationDelay    = `${Math.random() * 2.5}s`;
        s.style.animationDuration = `${1.8 + Math.random() * 1.5}s`;
        const size = 2 + Math.random() * 4;
        s.style.width = s.style.height = `${size}px`;
        s.style.background = colors[Math.floor(Math.random() * colors.length)];
        sparkles.appendChild(s);
    }

    // --- Floating particles ---
    function createParticles() {
        for (let i = 0; i < 14; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = `${Math.random() * 100}%`;
            p.style.animationDelay    = `${Math.random() * 12}s`;
            p.style.animationDuration = `${8 + Math.random() * 7}s`;
            const size = 2 + Math.random() * 3;
            p.style.width = p.style.height = `${size}px`;
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            document.body.appendChild(p);
        }
    }

    // --- Start music ---
    function startMusic() {
        if (bgMusic && !musicPlaying) {
            bgMusic.volume = 0.35;
            bgMusic.play().then(() => {
                musicPlaying = true;
                musicToggle.classList.remove('hidden-btn');
                musicIconOn.classList.remove('hidden-icon');
                musicIconOff.classList.add('hidden-icon');
            }).catch(() => {
                // Autoplay blocked — show toggle for manual start
                musicToggle.classList.remove('hidden-btn');
                musicIconOff.classList.remove('hidden-icon');
                musicIconOn.classList.add('hidden-icon');
            });
        }
    }

    // --- Music toggle ---
    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (bgMusic.paused) {
            bgMusic.volume = 0.35;
            bgMusic.play();
            musicPlaying = true;
            musicIconOn.classList.remove('hidden-icon');
            musicIconOff.classList.add('hidden-icon');
        } else {
            bgMusic.pause();
            musicPlaying = false;
            musicIconOff.classList.remove('hidden-icon');
            musicIconOn.classList.add('hidden-icon');
        }
    });

    // --- Envelope open ---
    let opened = false;

    envelopeScreen.addEventListener('click', () => {
        if (opened) return;
        opened = true;

        // Start music on user interaction
        startMusic();

        envelope.classList.add('opening');

        setTimeout(() => {
            envelopeScreen.classList.add('opened');
            invitation.classList.remove('hidden');

            setTimeout(() => {
                invitation.classList.add('visible');
                createParticles();
                revealElements();
                setTimeout(() => { envelopeScreen.style.display = 'none'; }, 800);
            }, 100);
        }, 1300);
    });

    // --- Staggered fade-in ---
    function revealElements() {
        document.querySelectorAll('.fade-el').forEach((el, i) => {
            setTimeout(() => el.classList.add('show'), 200 + i * 130);
        });
    }

});
