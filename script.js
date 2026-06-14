// ===================================
// Mobile Menu Toggle
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');
    
    // Add scrolled class on page load if there's a hash in URL or if scrolled
    if (header && (window.location.hash || window.pageYOffset > 50)) {
        header.classList.add('scrolled');
    }
    
    // Handle scroll to add/remove scrolled class
    window.addEventListener('scroll', function() {
        if (header) {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav && nav.classList.contains('active')) {
            if (!event.target.closest('.nav') && !event.target.closest('.menu-toggle')) {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Dropdown toggle — desktop only (mobile shows items always)
    document.querySelectorAll('.has-dropdown > a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (window.innerWidth > 768) {
                const li = this.closest('.has-dropdown');
                const isOpen = li.classList.contains('open');
                document.querySelectorAll('.has-dropdown.open').forEach(function(el) {
                    if (el !== li) el.classList.remove('open');
                });
                li.classList.toggle('open', !isOpen);
            }
        });
    });

    // Close dropdowns when clicking outside (desktop only)
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 768 && !e.target.closest('.has-dropdown')) {
            document.querySelectorAll('.has-dropdown.open').forEach(function(el) {
                el.classList.remove('open');
            });
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // ===================================
    // Scroll Animations for Activities
    // ===================================
    const activityShowcases = document.querySelectorAll('.activity-showcase');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    activityShowcases.forEach(showcase => {
        observer.observe(showcase);
    });
});

// ===================================
// Scrolling Texts Animation (About Section)
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const textGroups = document.querySelectorAll('.text-group');
    if (textGroups.length > 0) {
        let currentTextIndex = 0;
        
        function switchText() {
            textGroups.forEach(group => group.classList.remove('active'));
            currentTextIndex = (currentTextIndex + 1) % textGroups.length;
            textGroups[currentTextIndex].classList.add('active');
        }
        
        // Change text every 5 seconds
        setInterval(switchText, 5000);
    }
});

// ===================================
// About Section Carousel
// ===================================
let currentAboutSlide = 0;
const aboutSlides = document.querySelectorAll('.carousel-slide-about');
const aboutPrevBtn = document.getElementById('aboutPrevBtn');
const aboutNextBtn = document.getElementById('aboutNextBtn');

function showAboutSlide(n) {
    if (!aboutSlides.length) return;
    
    if (n >= aboutSlides.length) currentAboutSlide = 0;
    if (n < 0) currentAboutSlide = aboutSlides.length - 1;
    
    aboutSlides.forEach(slide => slide.classList.remove('active'));
    aboutSlides[currentAboutSlide].classList.add('active');
}

function nextAboutSlide() {
    currentAboutSlide++;
    showAboutSlide(currentAboutSlide);
}

function prevAboutSlide() {
    currentAboutSlide--;
    showAboutSlide(currentAboutSlide);
}

if (aboutPrevBtn) {
    aboutPrevBtn.addEventListener('click', prevAboutSlide);
}

if (aboutNextBtn) {
    aboutNextBtn.addEventListener('click', nextAboutSlide);
}

// Auto-advance about carousel every 5 seconds
if (aboutSlides.length > 0) {
    setInterval(() => {
        nextAboutSlide();
    }, 5000);
}

// ===================================
// Team Carousel - Dynamic Random Groups
// ===================================
let currentTeamGroup = 0;
let teamGroups = [];

// Funzione per mescolare un array (Fisher-Yates shuffle)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Team slider: 4 card per pagina (2 su mobile), scorrono verso sinistra
function createTeamGroups() {
    var teamCarousel = document.getElementById('teamCarousel');
    if (!teamCarousel || typeof teamMembersData === 'undefined') return;

    var isMobile = window.innerWidth <= 600;
    var PER_PAGE = isMobile ? 2 : 4;
    var INTERVAL_MS = 4000;
    var ANIM_MS = 650;

    var members = shuffleArray(teamMembersData);

    // Divide in pagine da PER_PAGE
    var pages = [];
    for (var i = 0; i < members.length; i += PER_PAGE) {
        pages.push(members.slice(i, i + PER_PAGE));
    }

    var wrapper = document.createElement('div');
    wrapper.className = 'team-slider-wrapper';
    teamCarousel.appendChild(wrapper);

    var pageIdx = 0;
    var isAnimating = false;
    var currentSlide = null;

    function makeSlide(pageMembers, alreadyVisible) {
        var slide = document.createElement('div');
        slide.className = 'team-grid';
        pageMembers.forEach(function(member, i) {
            var card = document.createElement('div');
            card.className = 'team-card' + (alreadyVisible ? ' visible' : '');
            if (!alreadyVisible) card.style.transitionDelay = (i * 0.09) + 's';
            card.innerHTML =
                '<div class="team-photo">' +
                    '<img src="' + member.image + '" alt="' + member.alt + '" onerror="this.src=\'imgs/people/default.jpg\'">' +
                '</div>' +
                '<h4>' + member.name + '</h4>' +
                '<p>' + member.role + '</p>';
            slide.appendChild(card);
        });
        return slide;
    }

    // Prima pagina — invisibile finché non entra in viewport
    currentSlide = makeSlide(pages[0], false);
    wrapper.appendChild(currentSlide);

    // Animazione di ingresso + avvio slider
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                currentSlide.querySelectorAll('.team-card').forEach(function(card, i) {
                    setTimeout(function() { card.classList.add('visible'); }, i * 90);
                });
                observer.unobserve(wrapper);
                if (pages.length > 1) {
                    setTimeout(function() {
                        setInterval(slideToNext, INTERVAL_MS);
                    }, INTERVAL_MS);
                }
            }
        });
    }, { threshold: 0.2 });
    observer.observe(wrapper);

    function slideToNext() {
        if (isAnimating) return;
        isAnimating = true;

        var nextIdx = (pageIdx + 1) % pages.length;
        var nextSlide = makeSlide(pages[nextIdx], true);

        // Posiziona il prossimo slide fuori a destra
        nextSlide.style.position = 'absolute';
        nextSlide.style.top = '0';
        nextSlide.style.left = '100%';
        nextSlide.style.width = '100%';
        wrapper.appendChild(nextSlide);

        void wrapper.offsetWidth; // reflow

        var t = 'transform ' + ANIM_MS + 'ms cubic-bezier(0.4,0,0.2,1)';
        currentSlide.style.transition = t;
        nextSlide.style.transition = t;
        currentSlide.style.transform = 'translateX(-100%)';
        nextSlide.style.transform = 'translateX(-100%)'; // da left:100% → 0

        setTimeout(function() {
            wrapper.removeChild(currentSlide);
            nextSlide.style.position = '';
            nextSlide.style.top = '';
            nextSlide.style.left = '';
            nextSlide.style.width = '';
            nextSlide.style.transition = '';
            nextSlide.style.transform = '';
            currentSlide = nextSlide;
            pageIdx = nextIdx;
            isAnimating = false;
        }, ANIM_MS + 40);
    }
}

if (document.getElementById('teamCarousel')) {
    createTeamGroups();
}

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Contact Form Handler
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Per favore, compila tutti i campi obbligatori.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Per favore, inserisci un indirizzo email valido.');
            return;
        }
        
        // Show success message
        alert('Grazie per il tuo messaggio! Ti risponderemo al più presto.');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, phone, message });
    });
}

// ===================================
// News Stats Interaction
// ===================================
const statButtons = document.querySelectorAll('.stat-btn');
statButtons.forEach(button => {
    button.addEventListener('click', function() {
        const icon = this.querySelector('i');
        const span = this.querySelector('span');
        let count = parseInt(span.textContent);
        
        // Toggle active state
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            span.textContent = count + 1;
            this.style.color = 'var(--primary-color)';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            span.textContent = count - 1;
            this.style.color = '';
        }
    });
});

// ===================================
// Load More News Button
// ===================================
const loadMoreBtn = document.getElementById('loadMoreBtn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        // Simulate loading more news
        const newsContainer = document.querySelector('.news-container');
        const icon = this.querySelector('i');
        
        // Add rotation animation to icon
        icon.style.animation = 'rotate 1s linear';
        
        setTimeout(() => {
            alert('Non ci sono altre news da mostrare al momento. Torna presto per nuovi aggiornamenti!');
            icon.style.animation = '';
        }, 1000);
    });
}

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.activity-card, .service-item, .news-item, .section-header, .team-member, .project-showcase, .contact-item, .map-container, .chi-siamo-image, .chi-siamo-text, .activities-intro-image, .activities-intro-text, .activity-description, .donation-card, .donation-info-box, .category-link');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// Header Scroll Effect
// ===================================
let lastScroll = 0;
let isAutoScrolling = false;
const header = document.querySelector('.header');

// Prevent header from hiding when landing on page with hash
if (window.location.hash) {
    isAutoScrolling = true;
    setTimeout(() => {
        isAutoScrolling = false;
    }, 1500); // Keep header visible for 1.5 seconds after page load with hash
}

// Track automatic scrolling (from anchor links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function() {
        isAutoScrolling = true;
        setTimeout(() => {
            isAutoScrolling = false;
        }, 1000); // Reset after 1 second
    });
});

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Don't hide header during automatic scrolling
    if (isAutoScrolling) {
        if (header) {
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
        return;
    }
    
    if (currentScroll <= 0) {
        if (header) {
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    } else if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down manually
        if (header) {
            header.style.transform = 'translateY(-100%)';
        }
    } else {
        // Scrolling up
        if (header) {
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }
    }
    
    lastScroll = currentScroll;
});

// Ensure header transition
if (header) {
    header.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
}

// ===================================
// Add CSS animation for rotate
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ===================================
// Active Navigation Link on Scroll
// ===================================
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Increased offset to 180 to account for scroll-margin-top and header
        if (pageYOffset >= (sectionTop - 180)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Image Lazy Loading Fallback
// ===================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// Photo Carousel
// ===================================
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(n) {
    if (!slides.length) return;
    
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-advance carousel every 5 seconds
if (slides.length > 0) {
    setInterval(() => {
        nextSlide();
    }, 5000);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// ===================================
// Photo Gallery Lightbox
// ===================================
let currentLightboxIndex = 0;
let galleryImages = [];

// Initialize gallery images from the page
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.photo-gallery .gallery-item img');
    galleryImages = Array.from(galleryItems).map(img => img.src);
});

function openLightbox(index) {
    // Re-collect gallery images in case they weren't loaded during DOMContentLoaded
    if (galleryImages.length === 0) {
        const galleryItems = document.querySelectorAll('.photo-gallery .gallery-item img');
        galleryImages = Array.from(galleryItems).map(img => img.src);
    }
    
    currentLightboxIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (lightbox && lightboxImg && lightboxCaption) {
        lightbox.classList.add('active');
        lightboxImg.src = galleryImages[index];
        lightboxCaption.textContent = `Foto ${index + 1} di ${galleryImages.length}`;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

function changeLightboxImage(direction) {
    currentLightboxIndex += direction;
    
    if (currentLightboxIndex >= galleryImages.length) {
        currentLightboxIndex = 0;
    }
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = galleryImages.length - 1;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    if (lightboxImg && lightboxCaption) {
        lightboxImg.src = galleryImages[currentLightboxIndex];
        lightboxCaption.textContent = `Foto ${currentLightboxIndex + 1} di ${galleryImages.length}`;
    }
}

// Close lightbox on background click
document.addEventListener('click', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeLightboxImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeLightboxImage(1);
        }
    }
});

// ===================================
// News Carousel
// ===================================
// News 1 Carousel (27 novembre)
let news1CurrentSlide = 0;
const news1Slides = document.querySelectorAll('#news1CarouselTrack .carousel-slide');
const news1Dots = document.querySelectorAll('#news1CarouselDots .dot');
const news1PrevBtn = document.getElementById('news1CarouselPrev');
const news1NextBtn = document.getElementById('news1CarouselNext');

function showNews1Slide(n) {
    if (!news1Slides.length) return;
    
    if (n >= news1Slides.length) news1CurrentSlide = 0;
    if (n < 0) news1CurrentSlide = news1Slides.length - 1;
    
    news1Slides.forEach(slide => slide.classList.remove('active'));
    news1Dots.forEach(dot => dot.classList.remove('active'));
    
    news1Slides[news1CurrentSlide].classList.add('active');
    if (news1Dots[news1CurrentSlide]) {
        news1Dots[news1CurrentSlide].classList.add('active');
    }
}

function nextNews1Slide() {
    news1CurrentSlide++;
    showNews1Slide(news1CurrentSlide);
}

function prevNews1Slide() {
    news1CurrentSlide--;
    showNews1Slide(news1CurrentSlide);
}

if (news1PrevBtn) {
    news1PrevBtn.addEventListener('click', prevNews1Slide);
}

if (news1NextBtn) {
    news1NextBtn.addEventListener('click', nextNews1Slide);
}

news1Dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        news1CurrentSlide = index;
        showNews1Slide(news1CurrentSlide);
    });
});

// Auto-advance news1 carousel every 5 seconds
if (news1Slides.length > 0) {
    setInterval(() => {
        nextNews1Slide();
    }, 5000);
}

// News 2 Carousel (10 novembre)
let news2CurrentSlide = 0;
const news2Slides = document.querySelectorAll('#news2CarouselTrack .carousel-slide');
const news2Dots = document.querySelectorAll('#news2CarouselDots .dot');
const news2PrevBtn = document.getElementById('news2CarouselPrev');
const news2NextBtn = document.getElementById('news2CarouselNext');

function showNews2Slide(n) {
    if (!news2Slides.length) return;
    
    if (n >= news2Slides.length) news2CurrentSlide = 0;
    if (n < 0) news2CurrentSlide = news2Slides.length - 1;
    
    news2Slides.forEach(slide => slide.classList.remove('active'));
    news2Dots.forEach(dot => dot.classList.remove('active'));
    
    news2Slides[news2CurrentSlide].classList.add('active');
    if (news2Dots[news2CurrentSlide]) {
        news2Dots[news2CurrentSlide].classList.add('active');
    }
}

function nextNews2Slide() {
    news2CurrentSlide++;
    showNews2Slide(news2CurrentSlide);
}

function prevNews2Slide() {
    news2CurrentSlide--;
    showNews2Slide(news2CurrentSlide);
}

if (news2PrevBtn) {
    news2PrevBtn.addEventListener('click', prevNews2Slide);
}

if (news2NextBtn) {
    news2NextBtn.addEventListener('click', nextNews2Slide);
}

news2Dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        news2CurrentSlide = index;
        showNews2Slide(news2CurrentSlide);
    });
});

// Auto-advance news2 carousel every 5 seconds
if (news2Slides.length > 0) {
    setInterval(() => {
        nextNews2Slide();
    }, 5000);
}

// News 3 Carousel (8 ottobre)
let news3CurrentSlide = 0;
const news3Slides = document.querySelectorAll('#news3CarouselTrack .carousel-slide');
const news3Dots = document.querySelectorAll('#news3CarouselDots .dot');
const news3PrevBtn = document.getElementById('news3CarouselPrev');
const news3NextBtn = document.getElementById('news3CarouselNext');

function showNews3Slide(n) {
    if (!news3Slides.length) return;
    
    if (n >= news3Slides.length) news3CurrentSlide = 0;
    if (n < 0) news3CurrentSlide = news3Slides.length - 1;
    
    news3Slides.forEach(slide => slide.classList.remove('active'));
    news3Dots.forEach(dot => dot.classList.remove('active'));
    
    news3Slides[news3CurrentSlide].classList.add('active');
    if (news3Dots[news3CurrentSlide]) {
        news3Dots[news3CurrentSlide].classList.add('active');
    }
}

function nextNews3Slide() {
    news3CurrentSlide++;
    showNews3Slide(news3CurrentSlide);
}

function prevNews3Slide() {
    news3CurrentSlide--;
    showNews3Slide(news3CurrentSlide);
}

if (news3PrevBtn) {
    news3PrevBtn.addEventListener('click', prevNews3Slide);
}

if (news3NextBtn) {
    news3NextBtn.addEventListener('click', nextNews3Slide);
}

news3Dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        news3CurrentSlide = index;
        showNews3Slide(news3CurrentSlide);
    });
});

// Auto-advance news3 carousel every 5 seconds
if (news3Slides.length > 0) {
    setInterval(() => {
        nextNews3Slide();
    }, 5000);
}

// News 4 Carousel (Peschici 2026)
let news4CurrentSlide = 0;
const news4Slides = document.querySelectorAll('#news4CarouselTrack .carousel-slide');
const news4Dots = document.querySelectorAll('#news4CarouselDots .dot');
const news4PrevBtn = document.getElementById('news4CarouselPrev');
const news4NextBtn = document.getElementById('news4CarouselNext');

function showNews4Slide(n) {
    if (!news4Slides.length) return;

    if (n >= news4Slides.length) news4CurrentSlide = 0;
    if (n < 0) news4CurrentSlide = news4Slides.length - 1;

    news4Slides.forEach(slide => slide.classList.remove('active'));
    news4Dots.forEach(dot => dot.classList.remove('active'));

    news4Slides[news4CurrentSlide].classList.add('active');
    if (news4Dots[news4CurrentSlide]) {
        news4Dots[news4CurrentSlide].classList.add('active');
    }
}

function nextNews4Slide() {
    news4CurrentSlide++;
    showNews4Slide(news4CurrentSlide);
}

function prevNews4Slide() {
    news4CurrentSlide--;
    showNews4Slide(news4CurrentSlide);
}

if (news4PrevBtn) {
    news4PrevBtn.addEventListener('click', prevNews4Slide);
}

if (news4NextBtn) {
    news4NextBtn.addEventListener('click', nextNews4Slide);
}

news4Dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        news4CurrentSlide = index;
        showNews4Slide(news4CurrentSlide);
    });
});

if (news4Slides.length > 0) {
    setInterval(() => {
        nextNews4Slide();
    }, 5000);
}

// ===================================
// Share News Function
// ===================================
function shareNews(newsId) {
    const newsUrl = `${window.location.origin}${window.location.pathname.replace(/\/[^\/]*$/, '')}/news.html#${newsId}`;
    const newsTitle = 'Fiori Celesti APS - News';
    
    // Try to use the Web Share API (available on mobile)
    if (navigator.share) {
        navigator.share({
            title: newsTitle,
            text: 'Scopri questa news da Fiori Celesti APS',
            url: newsUrl
        }).then(() => {
            console.log('Condivisione riuscita');
        }).catch((error) => {
            // User cancelled or error occurred, fallback to clipboard
            if (error.name !== 'AbortError') {
                copyToClipboard(newsUrl);
            }
        });
    } else {
        // Fallback to clipboard for desktop
        copyToClipboard(newsUrl);
    }
}

function copyToClipboard(newsUrl) {
    // Try to use the Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(newsUrl).then(() => {
            showShareNotification('Link copiato negli appunti!');
        }).catch(() => {
            // Fallback to manual copy
            fallbackCopyTextToClipboard(newsUrl);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(newsUrl);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showShareNotification('Link copiato negli appunti!');
    } catch (err) {
        showShareNotification('Errore nella copia del link', true);
    }
    
    document.body.removeChild(textArea);
}

function showShareNotification(message, isError = false) {
    // Remove any existing notification
    const existingNotification = document.querySelector('.share-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'share-notification';
    notification.textContent = message;
    if (isError) {
        notification.style.background = 'var(--secondary-color)';
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide and remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===================================
// Accordion Toggle
// ===================================
function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const isActive = header.classList.contains('active');
    
    // Close all other accordions in the same section
    const section = header.closest('.activities-list, .schedule-section');
    if (section) {
        const allHeaders = section.querySelectorAll('.accordion-header');
        const allContents = section.querySelectorAll('.accordion-content');
        
        allHeaders.forEach(h => h.classList.remove('active'));
        allContents.forEach(c => c.classList.remove('active'));
    }
    
    // Toggle current accordion
    if (!isActive) {
        header.classList.add('active');
        content.classList.add('active');
    }
}

// ===================================
// Inner Page Animations (hero, stats, reveal, gallery)
// ===================================
(function () {
    var ioOpts = { threshold: 0.15 };

    /* Scroll reveal: .g-reveal / .g-reveal-l / .g-reveal-r */
    var revealEls = document.querySelectorAll('.g-reveal, .g-reveal-l, .g-reveal-r');
    if (revealEls.length) {
        var revealObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); }
            });
        }, ioOpts);
        revealEls.forEach(function (el) { revealObs.observe(el); });
    }

    /* Photo underline */
    var pu = document.querySelector('.page-photo-underline');
    if (pu) {
        new IntersectionObserver(function (entries, obs) {
            if (entries[0].isIntersecting) { pu.classList.add('in'); obs.disconnect(); }
        }, { threshold: 0.5 }).observe(pu);
    }

    /* Photo grid stagger */
    var photoItems = document.querySelectorAll('.page-photo-item');
    if (photoItems.length) {
        var photoObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    var i = Array.prototype.indexOf.call(photoItems, e.target);
                    setTimeout(function () { e.target.classList.add('in'); }, i * 100);
                    photoObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });
        photoItems.forEach(function (el) { photoObs.observe(el); });
    }

    /* Stats counters */
    var statsSection = document.querySelector('.page-stats');
    var statItems = document.querySelectorAll('.page-stat-item');
    if (statsSection && statItems.length) {
        new IntersectionObserver(function (entries, obs) {
            if (!entries[0].isIntersecting) return;
            obs.disconnect();
            statItems.forEach(function (item, i) {
                setTimeout(function () {
                    item.classList.add('in');
                    var numEl = item.querySelector('.page-stat-num');
                    if (!numEl) return;
                    var target = parseInt(numEl.dataset.count, 10);
                    if (!target) return;
                    var start = null, duration = 1400;
                    requestAnimationFrame(function step(ts) {
                        if (!start) start = ts;
                        var p = Math.min((ts - start) / duration, 1);
                        numEl.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
                        if (p < 1) requestAnimationFrame(step);
                    });
                }, i * 130);
            });
        }, { threshold: 0.25 }).observe(statsSection);
    }

    /* Hero parallax */
    var heroBg = document.querySelector('.page-hero-bg img');
    if (heroBg) {
        window.addEventListener('scroll', function () {
            var s = window.pageYOffset;
            if (s < window.innerHeight) {
                heroBg.style.transform = 'scale(1.04) translateY(' + (s * 0.22) + 'px)';
            }
        }, { passive: true });
    }
})();

// ===================================
// Section-hero entrance animation
// ===================================
(function () {
    var heroes = document.querySelectorAll('.section-hero');
    if (!heroes.length) return;
    var heroObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                heroObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });
    heroes.forEach(function (el) { heroObs.observe(el); });
})();

// ===================================
// Console Welcome Message
// ===================================
console.log(
    '%cBenvenuto sul sito di Fiori Celesti APS! 🌸',
    'color: #6B4BA1; font-size: 20px; font-weight: bold;'
);
console.log(
    '%cSe stai cercando opportunità di collaborazione o hai domande tecniche, contattaci!',
    'color: #9B7BBF; font-size: 14px;'
);
