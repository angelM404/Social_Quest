document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. BARRA DE PROGRESSO DE LEITURA ---
    // Cria um feedback visual conforme o usuário desce a página
    window.onscroll = () => {
        const progressBar = document.getElementById("progress-bar");
        if (progressBar) {
            let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        }
    };

    // --- 2. SISTEMA DE REVELAÇÃO AO SCROLL (Intersection Observer) ---
    // Faz as seções e cards aparecerem suavemente conforme entram na tela
    const observerOptions = {
        threshold: 0.15, // Gatilho quando 15% do elemento estiver visível
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Para de observar após revelar para otimizar performance
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleciona elementos para animar (da Home e do About)
    const elementsToReveal = document.querySelectorAll('.mission, .member-card, .features, .stat-item');
    
    elementsToReveal.forEach(el => {
        // Estado inicial via JS para evitar "pulos" caso o CSS demore a carregar
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        revealObserver.observe(el);
    });

    // --- 3. CONTADOR DE MOEDAS ANIMADO ---
    // Simula o acúmulo de moedas da comunidade
    const coinElement = document.getElementById('coin-counter');
    if (coinElement) {
        animateCounter('coin-counter', 25480, 2000); // ID, Alvo, Duração em ms
    }

});

// --- 4. SISTEMA DE MISSÕES (INTERATIVIDADE) ---
// Função global para ser chamada via HTML (onclick)
const questData = {
    beginner: "🌱 MISSÃO NÍVEL 1: Peça uma recomendação de café para um barista hoje.",
    legendary: "👑 MISSÃO LENDÁRIA: Participe de um evento de networking e apresente-se para 3 pessoas."
};

function changeQuest(level) {
    const card = document.getElementById('quest-card');
    const text = document.getElementById('quest-text');
    
    if (!card || !text) return;

    // Animação de transição rápida
    card.style.opacity = "0";
    card.style.transform = "scale(0.95)";

    setTimeout(() => {
        text.innerText = questData[level];
        card.style.opacity = "1";
        card.style.transform = "scale(1)";
        // Muda a borda baseado na raridade
        card.style.borderColor = level === 'legendary' ? '#fbbf24' : '#7c3aed';
        card.style.boxShadow = level === 'legendary' ? '0 0 20px rgba(251, 191, 36, 0.2)' : 'none';
    }, 300);
}

// --- 5. LÓGICA DO CONTADOR ---
function animateCounter(id, target, duration) {
    const element = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentCount = Math.floor(progress * target);
        element.innerText = currentCount.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// --- 6. INJEÇÃO DE CLASSE CSS AUXILIAR ---
// Adiciona a classe que finaliza a animação de revelação
const styleSheet = document.createElement('style');
styleSheet.innerHTML = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(styleSheet);