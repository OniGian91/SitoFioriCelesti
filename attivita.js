// ===================================
// Dynamic Activity Page Loader
// ===================================

// Definizione delle attività con i loro contenuti
const activities = {
    falegnameria: {
        title: "Falegnameria",
        icon: "fa-hammer",
        description1: "Il nostro laboratorio di falegnameria offre un'esperienza unica per tutti coloro che desiderano avvicinarsi all'arte della lavorazione del legno. Che tu sia un principiante assoluto o che tu abbia già qualche esperienza, i nostri corsi sono progettati per accompagnarti passo dopo passo nella scoperta di questa antica e affascinante disciplina.",
        description2: "Disponiamo di un laboratorio completamente attrezzato con tutti gli strumenti necessari per lavorare il legno in sicurezza. I nostri corsi sono aperti a tutti, senza limiti di età.",
        folder: "falegnameria",
        carouselImages: 7,
        galleryImages: 7,
        gallerySubtitle: "Scopri il nostro laboratorio di falegnameria attraverso le immagini"
    },
    cioccolateria: {
        title: "Cioccolateria",
        icon: "fa-candy-cane",
        description1: "Scopri il magico mondo del cioccolato attraverso i nostri laboratori di cioccolateria artigianale. I nostri corsi ti guideranno nella creazione di praline, tavolette e dolci al cioccolato, insegnandoti le tecniche professionali utilizzate dai mastri cioccolatieri.",
        description2: "Il laboratorio è dotato di attrezzature professionali per la lavorazione del cioccolato. I corsi sono aperti a tutti gli appassionati, dai bambini agli adulti.",
        folder: "cioccolateria",
        carouselImages: 6,
        galleryImages: 6,
        gallerySubtitle: "Scopri il nostro laboratorio di cioccolateria attraverso le immagini"
    },
    orticoltura: {
        title: "Orticoltura",
        icon: "fa-seedling",
        description1: "Scopri il piacere di coltivare la terra con i nostri laboratori di orticoltura biologica. Un'esperienza che unisce il contatto con la natura, l'apprendimento di tecniche agricole sostenibili e la soddisfazione di vedere crescere ciò che hai piantato con le tue mani.",
        description2: "Disponiamo di un orto biologico dove sperimentiamo metodi di coltivazione naturali e sostenibili. Le attività sono aperte a tutti, dai bambini agli adulti.",
        folder: "orticoltura",
        carouselImages: 6,
        galleryImages: 6,
        gallerySubtitle: "Scopri il nostro orto e le attività attraverso le immagini"
    },
    qigong: {
        title: "Qigong",
        icon: "fa-spa",
        description1: "Il Qigong è un'antica pratica cinese che unisce movimento, respirazione e meditazione per promuovere il benessere fisico, mentale ed emotivo. I nostri corsi offrono un'introduzione accessibile a questa disciplina millenaria, adatta a persone di tutte le età.",
        description2: "La pratica regolare migliora la flessibilità, l'equilibrio e la coordinazione, riduce lo stress e favorisce il rilassamento profondo. Aperto a tutti, senza limiti di età.",
        folder: "qigong",
        carouselImages: 4,
        galleryImages: 4,
        gallerySubtitle: "Scopri le nostre pratiche di Qigong attraverso le immagini"
    },
    gelateria: {
        title: "Gelateria",
        icon: "fa-ice-cream",
        description1: "Impara a creare il vero gelato artigianale italiano con i nostri corsi di gelateria. Guidati da maestri gelatieri esperti, scoprirai i segreti della mantecazione, del bilanciamento degli ingredienti e della creazione di gusti unici e genuini.",
        description2: "Il laboratorio è dotato di attrezzature professionali per la produzione del gelato artigianale. I corsi sono aperti a tutti, dai ragazzi agli adulti appassionati.",
        folder: "gelateria",
        carouselImages: 6,
        galleryImages: 6,
        gallerySubtitle: "Scopri il nostro laboratorio di gelateria attraverso le immagini"
    },
    ceramica: {
        title: "Ceramica",
        icon: "fa-mug-hot",
        description1: "Scopri il fascino antico della lavorazione dell'argilla con i nostri corsi di ceramica. Dalla modellazione alla decorazione, fino alla cottura in forno, imparerai tutte le fasi necessarie per creare oggetti unici in ceramica.",
        description2: "Il laboratorio è dotato di torni elettrici, forni per la cottura e una vasta gamma di smalti. I corsi sono aperti a tutti, dai bambini agli adulti.",
        folder: "ceramica",
        carouselImages: 3,
        galleryImages: 0,
        gallerySubtitle: "Scopri il nostro laboratorio di ceramica attraverso le immagini"
    },
    shodo: {
        title: "SHŌDŌ (Calligrafia Giapponese)",
        icon: "fa-brush",
        description1: "Lo Shōdō (書道, 'via della scrittura') è l'arte tradizionale giapponese della calligrafia. Non è solo tecnica, ma una pratica meditativa che unisce mente, corpo e spirito. Attraverso il pennello, l'inchiostro e la carta di riso, imparerai a tracciare i caratteri giapponesi con presenza e consapevolezza.",
        description2: "I nostri corsi sono aperti a tutti, dai principianti ai praticanti esperti. Sperimenterai come ogni tratto riveli il tuo stato d'animo, insegnandoti la bellezza dell'imperfezione e l'accettazione del momento presente. Lo Shōdō diventa così un percorso di crescita personale e scoperta interiore.",
        folder: "shodo",
        carouselImages: 6,
        galleryImages: 6,
        gallerySubtitle: "Scopri l'arte della calligrafia giapponese attraverso le immagini"
    }
};

// Funzione per ottenere il parametro dalla query string
function getActivityFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('nome');
}

// Funzione per caricare l'attività
function loadActivity() {
    const activityName = getActivityFromURL();
    
    // Se non c'è un parametro o l'attività non esiste, redirect alla home
    if (!activityName || !activities[activityName]) {
        window.location.href = 'index.html#attivita';
        return;
    }
    
    const activity = activities[activityName];
    
    // Aggiorna il titolo della pagina
    document.getElementById('page-title').textContent = `${activity.title} - Fiori Celesti APS`;
    
    // Aggiorna il titolo principale con l'icona
    document.getElementById('activity-title').innerHTML = `<i class="fas ${activity.icon}"></i> ${activity.title}`;
    
    // Aggiorna le descrizioni
    document.getElementById('activity-description-1').textContent = activity.description1;
    document.getElementById('activity-description-2').textContent = activity.description2;
    
    // Carica le immagini del carosello
    const carouselTrack = document.getElementById('carousel-track');
    carouselTrack.innerHTML = '';
    
    for (let i = 1; i <= activity.carouselImages; i++) {
        const slide = document.createElement('div');
        slide.className = `carousel-slide-about${i === 1 ? ' active' : ''}`;
        slide.innerHTML = `<img src="imgs/attivita/${activity.folder}/${i}.jpg" alt="${activity.title} ${i}">`;
        carouselTrack.appendChild(slide);
    }
    
    // Carica le immagini fixed (ultime 2 del carosello)
    const fixedIndex1 = Math.max(1, activity.carouselImages - 1);
    const fixedIndex2 = activity.carouselImages;
    document.getElementById('fixed-img-1').src = `imgs/attivita/${activity.folder}/${fixedIndex1}.jpg`;
    document.getElementById('fixed-img-2').src = `imgs/attivita/${activity.folder}/${fixedIndex2}.jpg`;
    
    // Inizializza il carosello dopo aver caricato le immagini
    initAboutCarousel();
}

// Funzione per inizializzare il carosello
function initAboutCarousel() {
    let currentAboutSlide = 0;
    const aboutSlides = document.querySelectorAll('.carousel-slide-about');
    
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
    
    // Auto-avanzamento ogni 5 secondi
    if (aboutSlides.length > 1) {
        setInterval(nextAboutSlide, 5000);
    }
}

// Carica l'attività quando la pagina è pronta
document.addEventListener('DOMContentLoaded', loadActivity);
