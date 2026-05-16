/* ==================== Menu Mobile ==================== */
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

/* ==================== Scroll Suave ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ==================== Botões de Contato (WhatsApp e Instagram) ==================== */
// Os botões são links diretos e abrem em nova aba
// Para atualizar o número do WhatsApp ou usuário do Instagram, edite os links em index.html
// WhatsApp: https://wa.me/[NUMERO_COM_CODIGO_PAIS]?text=[MENSAGEM]
// Instagram: https://instagram.com/[USUARIO]

/* ==================== Scroll Animation ==================== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos de animação
document.querySelectorAll('.servico-card, .projeto-card, .stat-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

/* ==================== Active Link na Navbar ==================== */
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

/* ==================== Contador Progressivo (Stats) ==================== */
function animateCounters() {
    const stats = document.querySelectorAll('.stat-box h3');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 20;
        let current = 0;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(counter);
            } else {
                stat.textContent = Math.ceil(current) + '+';
            }
        }, 50);
    });
}

// Verificar quando a seção "sobre" fica visível
const aboutSection = document.querySelector('.sobre');
if (aboutSection) {
    const observerStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                animateCounters();
                entry.target.dataset.animated = 'true';
                observerStats.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observerStats.observe(aboutSection);
}

console.log('✅ Website de Portfólio Carregado com Sucesso!');
