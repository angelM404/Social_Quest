// 1. Barra de Progresso de Scroll
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("progress-bar").style.width = scrolled + "%";
};

// 2. Sistema de Missões Dinâmico
const questData = {
    beginner: "🌱 MISSÃO NÍVEL 1: Peça uma recomendação de café para um barista hoje.",
    legendary: "👑 MISSÃO LENDÁRIA: Participe de um evento de networking e apresente-se para 3 pessoas."
};

function changeQuest(level) {
    const card = document.getElementById('quest-card');
    const text = document.getElementById('quest-text');
    
    // Pequena animação de saída
    card.style.opacity = "0";
    card.style.transform = "translateY(10px)";

    setTimeout(() => {
        text.innerText = questData[level];
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
        card.style.borderColor = level === 'legendary' ? '#fbbf24' : '#7c3aed';
    }, 300);
}

// 3. Contador de Moedas (Simulação)
function animateCounter(id, target) {
    let current = 0;
    let increment = target / 100;
    let element = document.getElementById(id);

    let timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.innerText = Math.floor(target).toLocaleString();
            clearInterval(timer);
        } else {
            element.innerText = Math.floor(current).toLocaleString();
        }
    }, 20);
}

// Iniciar contador ao carregar
window.onload = () => {
    animateCounter('coin-counter', 25480);
};