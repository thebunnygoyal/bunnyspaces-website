// Countdown Timer
function updateCountdown() {
    const eventDate = new Date('June 22, 2025 17:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<h3 style="color: var(--cyan);">Event is Live! 🎉</h3>';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Particle animation
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 5 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.animationDuration = Math.random() * 20 + 10 + 's';
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    
    const colors = ['var(--cyan)', 'var(--magenta)', 'var(--yellow)'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    document.getElementById('particles').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 30000);
}

// Create particles periodically
setInterval(createParticle, 300);

// Create initial particles
for (let i = 0; i < 20; i++) {
    setTimeout(createParticle, i * 100);
}

// Modal functions
function showRSVP() {
    document.getElementById('rsvpModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeRSVP() {
    document.getElementById('rsvpModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function submitRSVP(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Here you would normally send the data to your backend
    // For now, we'll just show a success message
    alert(`Thanks ${data.name}! You're on the list for June 22! 🎉\n\nWe'll send details to ${data.email}`);
    
    closeRSVP();
    event.target.reset();
}

function joinCommunity() {
    alert('Community signup coming soon! For now, RSVP for the June 22 event to get on our list! 🐰');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('rsvpModal');
    if (event.target == modal) {
        closeRSVP();
    }
}

// Add scroll-based animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-content');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover sound effects (visual feedback for now)
document.querySelectorAll('.floating-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.5)';
    });
    icon.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1)';
    });
});

// Easter egg: Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activatePartyMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activatePartyMode() {
    document.body.style.animation = 'party-mode 2s ease infinite';
    alert('🎉 PARTY MODE ACTIVATED! You found the secret! 🐰');
    setTimeout(() => {
        document.body.style.animation = '';
    }, 10000);
}

// Add party mode animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes party-mode {
        0%, 100% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
    }
`;
document.head.appendChild(style);