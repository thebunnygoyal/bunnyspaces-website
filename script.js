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
    // Reset form visibility
    document.getElementById('rsvpForm').style.display = 'flex';
    document.getElementById('success-message').style.display = 'none';
}

// Games Modal functions
function showGames() {
    document.getElementById('gamesModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeGames() {
    document.getElementById('gamesModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showGameHint() {
    // Show games modal when clicking the game controller icon
    showGames();
}

// Open Netlify games
function openNetlifyGame(gameType) {
    // These games are typically available during deploy preview
    // We'll open them in a new window with Netlify's deploy URL pattern
    const deployUrl = window.location.origin;
    
    if (gameType === 'bugsweeper') {
        // Try to open the Netlify Bugsweeper game
        alert('🐛 Bugsweeper will be available during your next deploy! For now, enjoy the event registration. 🎮');
        // In production, you might have: window.open(deployUrl + '/.netlify/functions/bugsweeper', '_blank');
    } else if (gameType === 'snake') {
        // Try to open the Netlify Snake game
        alert('🐍 Snake will be available during your next deploy! For now, focus on anti-networking! 🎮');
        // In production, you might have: window.open(deployUrl + '/.netlify/functions/snake', '_blank');
    }
    
    // Alternative: Create custom implementations or embed the games directly
}

// Handle Netlify form submission with AJAX
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Get selected guest count
    const guestCount = formData.get('guests');
    
    // Show loading state
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending... 🚀';
    submitButton.disabled = true;
    
    // Submit to Netlify
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
    })
    .then(() => {
        // Success! Show success message with appropriate QR code
        form.style.display = 'none';
        document.getElementById('success-message').style.display = 'block';
        
        // Show appropriate QR code based on guest count
        if (guestCount === '1') {
            document.getElementById('qr-single').style.display = 'block';
            document.getElementById('qr-double').style.display = 'none';
        } else {
            document.getElementById('qr-single').style.display = 'none';
            document.getElementById('qr-double').style.display = 'block';
        }
        
        // Reset form
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Don't auto-close - let user complete payment
    })
    .catch((error) => {
        // Error handling
        alert('Oops! Something went wrong. Please try again! 🐰');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        console.error('Error:', error);
    });
});

function joinCommunity() {
    // Open WhatsApp for community join
    window.open('https://wa.me/message/YOUR_WHATSAPP_LINK', '_blank');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const rsvpModal = document.getElementById('rsvpModal');
    const gamesModal = document.getElementById('gamesModal');
    
    if (event.target == rsvpModal) {
        closeRSVP();
    } else if (event.target == gamesModal) {
        closeGames();
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
    alert('🎉 PARTY MODE ACTIVATED! You found the secret! Want more secrets? Try clicking the 🎮 icon... 🐰');
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