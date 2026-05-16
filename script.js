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
    threshold: 0.12,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.closest('.sobre') && !entry.target.dataset.statsAnimated) {
                animateCounters();
                entry.target.dataset.statsAnimated = 'true';
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos de animação
const animatedElements = document.querySelectorAll(
    '.servico-card, .projeto-card, .stat-box, .galeria-grid, .galeria-item, .video-destaque, .btn-link, .info-box, .contato-form, .contato-buttons, .sobre-text, .hero-content'
);

animatedElements.forEach(el => {
    el.classList.add('animate-on-scroll');
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

/* ==================== Lightbox para Galeria de Fotos ==================== */
const lightboxGallery = document.createElement('div');
lightboxGallery.id = 'lightbox-gallery';
lightboxGallery.style.cssText = `
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    z-index: 2000;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
`;

lightboxGallery.innerHTML = `
    <button id="close-lightbox" style="position: absolute; top: 20px; right: 30px; background: none; border: none; color: white; font-size: 40px; cursor: pointer; padding: 0;">✕</button>
    <button id="prev-photo" style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.2); border: none; color: white; font-size: 30px; cursor: pointer; padding: 10px 15px; border-radius: 4px;">❮</button>
    <div id="lightbox-image-container" style="position: relative; width: 90%; max-width: 900px; max-height: 80vh;">
        <img id="lightbox-image" src="" alt="Galeria" style="width: 100%; height: auto; border-radius: 8px; object-fit: contain;">
    </div>
    <button id="next-photo" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.2); border: none; color: white; font-size: 30px; cursor: pointer; padding: 10px 15px; border-radius: 4px;">❯</button>
`;

document.body.appendChild(lightboxGallery);

let currentPhotoIndex = 0;
let galleryPhotos = [];

function openGalleryLightbox(btn) {
    const galleryItems = document.querySelectorAll('.galeria-item img');
    galleryPhotos = Array.from(galleryItems).map(img => img.src);
    
    const clickedImage = btn.closest('.galeria-item').querySelector('img').src;
    currentPhotoIndex = galleryPhotos.indexOf(clickedImage);
    
    const lightbox = document.getElementById('lightbox-gallery');
    lightbox.style.display = 'flex';
    
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    updateLightboxImage();
    document.body.style.overflow = 'hidden';
}

function updateLightboxImage() {
    document.getElementById('lightbox-image').src = galleryPhotos[currentPhotoIndex];
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox-gallery');
    lightbox.style.opacity = '0';
    
    setTimeout(() => {
        lightbox.style.display = 'none';
    }, 300);
    
    document.body.style.overflow = 'auto';
}

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % galleryPhotos.length;
    updateLightboxImage();
}

function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
    updateLightboxImage();
}

// Event listeners do lightbox
document.getElementById('close-lightbox').addEventListener('click', closeLightbox);
document.getElementById('next-photo').addEventListener('click', nextPhoto);
document.getElementById('prev-photo').addEventListener('click', prevPhoto);
document.getElementById('lightbox-gallery').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox-gallery') {
        closeLightbox();
    }
});

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox-gallery');
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowRight') nextPhoto();
        if (e.key === 'ArrowLeft') prevPhoto();
        if (e.key === 'Escape') closeLightbox();
    }
});


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
