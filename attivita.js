// ===================================
// Dynamic Activity Page Loader
// ===================================

// Definizione delle attività con i loro contenuti
const activities = {
    falegnameria: {
        title: "Falegnameria",
        icon: "fa-hammer",
        description1: "Il nostro laboratorio di falegnameria offre un'esperienza unica per tutti coloro che desiderano avvicinarsi all'<strong>arte della lavorazione del legno</strong>. Che tu sia un <strong>principiante assoluto</strong> o che tu abbia già qualche esperienza, i nostri corsi sono progettati per accompagnarti <strong>passo dopo passo</strong> nella scoperta di questa antica e affascinante disciplina.",
        description2: "Disponiamo di un <strong>laboratorio completamente attrezzato</strong> con tutti gli strumenti necessari per lavorare il legno in <strong>sicurezza</strong>. Guidati da Carmine, educatore esperto, i nostri corsi sono aperti a tutti, <strong>senza limiti di età</strong>.",
        folder: "falegnameria",
        carouselImages: 7,
        galleryImages: 7,
        gallerySubtitle: "Scopri il nostro laboratorio di falegnameria attraverso le immagini",
        schedule: [
            {
                day: "Mercoledì",
                target: "Ragazzi",
                instructor: "Carmine Shinko",
                time: "15:00 - 17:00"
            }
        ]
    },
    cioccolateria: {
        title: "Cioccolateria",
        icon: "fa-candy-cane",
        description1: "Scopri il <strong>magico mondo del cioccolato</strong> attraverso i nostri laboratori di <strong>cioccolateria artigianale</strong>. I nostri corsi ti guideranno nella creazione di praline, tavolette e dolci al cioccolato, insegnandoti le <strong>tecniche professionali</strong> utilizzate dai mastri cioccolatieri.",
        description2: "Il laboratorio è dotato di <strong>attrezzature professionali</strong> per la lavorazione del cioccolato. Sotto la <strong>guida esperta di Manuela Fiscarelli</strong>, i corsi sono aperti a tutti gli appassionati, dai bambini agli adulti.",
        folder: "cioccolateria",
        carouselImages: 8,
        galleryImages: 8,
        gallerySubtitle: "Scopri il nostro laboratorio di cioccolateria attraverso le immagini",
        schedule: [
            {
                day: "Giovedì",
                target: "Ragazzi",
                instructor: "Manuela Fiscarelli",
                time: "15:00 - 17:00"
            }
        ]
    },
    orticoltura: {
        title: "Orticoltura",
        icon: "fa-seedling",
        description1: "Scopri il piacere di <strong>coltivare la terra</strong> con i nostri laboratori di <strong>orticoltura biologica</strong>. Un'esperienza che unisce il <strong>contatto con la natura</strong>, l'apprendimento di <strong>tecniche agricole sostenibili</strong> e la soddisfazione di vedere crescere ciò che hai piantato con le tue mani.",
        description2: "Disponiamo di un <strong>orto biologico</strong> dove sperimentiamo <strong>metodi di coltivazione naturali e sostenibili</strong>. Le attività sono aperte a tutti, dai bambini agli adulti.",
        folder: "orticoltura",
        carouselImages: 9,
        galleryImages: 9,
        gallerySubtitle: "Scopri il nostro orto e le attività attraverso le immagini",
        schedule: []
    },
    qigong: {
        title: "Qigong",
        icon: "fa-spa",
        description1: "Il Qigong è un'<strong>antica pratica cinese</strong> che unisce <strong>movimento, respirazione e meditazione</strong> per promuovere il <strong>benessere fisico, mentale ed emotivo</strong>. I nostri corsi offrono un'introduzione accessibile a questa <strong>disciplina millenaria</strong>, adatta a persone di tutte le età.",
        description2: "Guidati dal <strong>monaco zen Carmine Shinko</strong>, la pratica regolare migliora la <strong>flessibilità, l'equilibrio e la coordinazione</strong>, riduce lo stress e favorisce il <strong>rilassamento profondo</strong>. Aperto a tutti, senza limiti di età.",
        folder: "qigong",
        carouselImages: 6,
        galleryImages: 6,
        gallerySubtitle: "Scopri le nostre pratiche di Qigong attraverso le immagini",
        schedule: [
            {
                day: "Martedì",
                target: "Ragazzi",
                instructor: "Carmine Shinko",
                time: "16:00 - 17:00"
            },
            {
                day: "Mercoledì",
                target: "Adulti",
                instructor: "Carmine Shinko",
                time: "18:00 - 19:00"
            }
        ]
    },
    gelateria: {
        title: "Gelateria",
        icon: "fa-ice-cream",
        description1: "Impara a creare il <strong>vero gelato artigianale italiano</strong> con i nostri corsi di gelateria. Guidato dal <strong>maestro gelatiere Giuliano Curati</strong>, scoprirai i segreti della <strong>mantecazione</strong>, del <strong>bilanciamento degli ingredienti</strong> e della creazione di <strong>gusti unici e genuini</strong>.",
        description2: "Il laboratorio è dotato di <strong>attrezzature professionali</strong> per la produzione del gelato artigianale. I corsi sono aperti a tutti, dai ragazzi agli adulti appassionati.",
        folder: "gelateria",
        carouselImages: 6,
        galleryImages: 6,
        gallerySubtitle: "Scopri il nostro laboratorio di gelateria attraverso le immagini",
        schedule: [
            {
                day: "Lunedì",
                target: "Ragazzi",
                instructor: "Giuliano Curati",
                time: "15:00 - 17:00"
            },
            {
                day: "Lunedì",
                target: "Adulti",
                instructor: "Giuliano Curati",
                time: "1 lezione serale/mese"
            },
            {
                day: "Venerdì",
                target: "Ragazzi",
                instructor: "Giuliano Curati",
                time: "15:00 - 17:00"
            }
        ]
    },
    ceramica: {
        title: "Ceramica",
        icon: "fa-mug-hot",
        description1: "Scopri il <strong>fascino antico</strong> della <strong>lavorazione dell'argilla</strong> con i nostri corsi di ceramica. Dalla <strong>modellazione alla decorazione</strong>, fino alla <strong>cottura in forno</strong>, imparerai tutte le fasi necessarie per creare <strong>oggetti unici in ceramica</strong>.",
        description2: "Il laboratorio è dotato di <strong>torni elettrici, forni per la cottura</strong> e una vasta gamma di smalti. Guidati dal <strong>ceramista Stefano Fedolfi</strong>, i corsi sono aperti a tutti, dai bambini agli adulti.",
        folder: "ceramica",
        carouselImages: 3,
        galleryImages: 3,
        gallerySubtitle: "Scopri il nostro laboratorio di ceramica attraverso le immagini",
        schedule: [
            {
                day: "Sabato",
                target: "Ragazzi",
                instructor: "Stefano Fedolfi",
                time: "10:30 - 12:00"
            }
        ]
    },
    shodo: {
        title: "SHŌDŌ (Calligrafia Giapponese)",
        icon: "fa-brush",
        description1: "Lo Shōdō (書道, '<strong>via della scrittura</strong>') è l'<strong>arte tradizionale giapponese</strong> della calligrafia. Non è solo tecnica, ma una <strong>pratica meditativa</strong> che unisce <strong>mente, corpo e spirito</strong>. Attraverso il pennello, l'inchiostro e la carta di riso, imparerai a tracciare i caratteri giapponesi con <strong>presenza e consapevolezza</strong>.",
        description2: "Guidati dall'<strong>insegnante zen Maurizio Anshu</strong>, i nostri corsi sono aperti a tutti, dai principianti ai praticanti esperti. Sperimenterai come ogni tratto riveli il tuo stato d'animo, insegnandoti la <strong>bellezza dell'imperfezione</strong> e l'<strong>accettazione del momento presente</strong>. Lo Shōdō diventa così un <strong>percorso di crescita personale</strong> e scoperta interiore.",
        folder: "shodo",
        carouselImages: 6,
        galleryImages: 6,
        gallerySubtitle: "Scopri l'arte della calligrafia giapponese attraverso le immagini",
        schedule: [
            {
                day: "Venerdì",
                target: "Adulti",
                instructor: "Maurizio Anshu",
                time: ""
            }
        ]
    },
    spaziogiovani: {
        title: "Spazio Giovani",
        icon: "fa-users",
        description1: "Lo <strong>Spazio Giovani</strong> è un luogo dedicato ai ragazzi e alle ragazze che desiderano <strong>socializzare, crescere insieme</strong> e sviluppare nuove competenze in un <strong>ambiente accogliente e stimolante</strong>. Un punto di riferimento per il tempo libero dove fare <strong>nuove amicizie</strong> e partecipare ad <strong>attività ricreative</strong>.",
        description2: "Attraverso <strong>giochi, attività creative, laboratori e momenti di condivisione</strong>, i giovani possono esprimere la propria personalità, sviluppare <strong>autonomia e senso di responsabilità</strong>. Uno spazio dove ognuno può sentirsi <strong>accolto e valorizzato</strong>.",
        folder: "spazio giovani",
        carouselImages: 6,
        galleryImages: 6,
        gallerySubtitle: "Scopri lo Spazio Giovani attraverso le immagini",
        schedule: []
    },
    gitevacanze: {
        title: "Gite e Vacanze",
        icon: "fa-van-shuttle",
        description1: "Organizziamo <strong>gite ed esperienze di vacanza</strong> pensate per offrire momenti di <strong>svago, scoperta e condivisione</strong>. Dalle <strong>escursioni giornaliere</strong> ai <strong>soggiorni residenziali</strong>, ogni esperienza è un'opportunità per <strong>creare ricordi indimenticabili</strong>.",
        description2: "Le nostre gite e vacanze uniscono il <strong>divertimento all'apprendimento</strong>, permettendo ai partecipanti di scoprire <strong>nuovi luoghi, culture e tradizioni</strong>. Momenti preziosi di <strong>crescita personale e sociale</strong> in un clima di <strong>amicizia e collaborazione</strong>.",
        folder: "gite e vacanze",
        carouselImages: 4,
        galleryImages: 4,
        gallerySubtitle: "Scopri le nostre gite e vacanze attraverso le immagini",
        schedule: []
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
    
    // Aggiorna il titolo principale senza icona
    document.getElementById('activity-title').textContent = activity.title;
    
    // Aggiorna le descrizioni
    document.getElementById('activity-description-1').innerHTML = activity.description1;
    document.getElementById('activity-description-2').innerHTML = activity.description2;
    
    // Carica le informazioni di schedule
    const scheduleContainer = document.getElementById('activity-schedule');
    if (activity.schedule && activity.schedule.length > 0) {
        let scheduleHTML = '<h3><i class="fas fa-calendar-alt"></i> Orari e Referenti</h3><div class="schedule-cards">';
        
        activity.schedule.forEach(slot => {
            scheduleHTML += `
                <div class="schedule-card">
                    <div class="schedule-day">
                        <i class="fas fa-calendar-day"></i>
                        <span>${slot.day}</span>
                    </div>
                    <div class="schedule-details">
                        <div class="schedule-badge ${slot.target.toLowerCase()}">${slot.target}</div>
                        <div class="schedule-instructor">
                            <i class="fas fa-user"></i> con ${slot.instructor}
                        </div>
                        ${slot.time ? `<div class="schedule-time"><i class="fas fa-clock"></i> ${slot.time}</div>` : ''}
                    </div>
                </div>
            `;
        });
        
        scheduleHTML += '</div>';
        scheduleContainer.innerHTML = scheduleHTML;
        scheduleContainer.style.display = 'block';
    } else {
        scheduleContainer.style.display = 'none';
    }
    
    // Carica le immagini del carosello (tutte in ordine inverso)
    const carouselTrack = document.getElementById('carousel-track');
    carouselTrack.innerHTML = '';
    
    let isFirst = true;
    for (let i = activity.carouselImages; i >= 1; i--) {
        const slide = document.createElement('div');
        slide.className = `carousel-slide-about${isFirst ? ' active' : ''}`;
        slide.innerHTML = `<img src="imgs/attivita/${activity.folder}/${i}.jpg" alt="${activity.title} ${i}">`;
        carouselTrack.appendChild(slide);
        isFirst = false;
    }
    
    // Aggiungi l'icona badge al carosello
    const carouselContainer = document.querySelector('.carousel-container-about');
    const iconBadge = document.createElement('div');
    iconBadge.className = 'activity-icon-badge';
    iconBadge.innerHTML = `<i class="fas ${activity.icon}"></i>`;
    carouselContainer.appendChild(iconBadge);
    
    // Carica le immagini fixed (prime 2 immagini)
    const img1 = activity.carouselImages >= 1 ? '1.jpg' : 'placeholder.jpg';
    const img2 = activity.carouselImages >= 2 ? '2.jpg' : '1.jpg';
    document.getElementById('fixed-img-1').src = `imgs/attivita/${activity.folder}/${img1}`;
    document.getElementById('fixed-img-2').src = `imgs/attivita/${activity.folder}/${img2}`;
    
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
