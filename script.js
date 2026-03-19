document.addEventListener('DOMContentLoaded', () => {
    // 1. Progress Bar
    window.addEventListener('scroll', () => {
        const progressBar = document.getElementById("progress-bar");
        if (progressBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            progressBar.style.width = (winScroll / height) * 100 + "%";
        }
    });

    // 2. Scroll Reveal Observer
    const revealElements = document.querySelectorAll('.reveal-hidden');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Counter Animation
    const coinElement = document.getElementById('coin-counter');
    if (coinElement) {
        animateCounter(coinElement, 25480, 2000);
    }

    // 4. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply initial theme
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeToggle) themeToggle.textContent = '🌞';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.textContent = newTheme === 'light' ? '🌞' : '🌗';
        });
    }

    // 5. FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            const answer = question.nextElementSibling;

            if (isActive) {
                // Close
                item.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                // Open (without closing others)
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});

// Counter Logic
function animateCounter(element, target, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerText = Math.floor(progress * target).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Quest Widget Logic
const questData = {
    beginner: "🌱 MISSÃO NÍVEL 1: Peça uma recomendação de café para um barista hoje.",
    legendary: "👑 MISSÃO LENDÁRIA: Participe de um evento de networking e apresente-se para 3 pessoas."
};

function changeQuest(level, btnElement) {
    // Update active tab styling
    document.querySelectorAll('.quest-tab').forEach(tab => tab.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');

    const card = document.getElementById('quest-card');
    const text = document.getElementById('quest-text');
    
    if (!card || !text) return;

    card.style.opacity = "0";
    card.style.transform = "translateY(10px) scale(0.98)";

    setTimeout(() => {
        text.innerText = questData[level];
        card.style.opacity = "1";
        card.style.transform = "translateY(0) scale(1)";
        
        if (level === 'legendary') {
            card.style.borderColor = '#fbbf24';
            card.style.boxShadow = '0 0 30px rgba(251, 191, 36, 0.2)';
        } else {
            card.style.borderColor = '';
            card.style.boxShadow = '';
        }
    }, 200);
}