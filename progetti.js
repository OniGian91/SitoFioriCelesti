// ===================================
// Dynamic Project Page Loader
// ===================================

// Definizione dei progetti con i loro contenuti
const projects = {
    comunita: {
        title: "Comunità Fiori Celesti - Officina dei Talenti",
        subtitle: "DURANTE E DOPO DI NOI",
        motto: "Per aspera ad astra",
        icon: "fa-home-heart",
        description: "Il progetto di Comunità Residenziale si basa sull'idea che ogni persona è in viaggio verso la propria realizzazione umana e che può trovare nella vita comunitaria compagni di viaggio e figure di riferimento per sviluppare a pieno le proprie capacità personali e sociali.",
        folder: "comunita",
        image: "imgs/attivita/comunita/1.jpg",
        fullContent: `
            <div class="project-content">
                <h3>Il Progetto</h3>
                <p>La Comunità Fiori Celesti - Officina dei Talenti si ispira alle comunità zen, dove il lavoro è linguaggio fondamentale nel dialogo educativo, formativo e di crescita personale. Il lavoro qui è inteso come cura dei luoghi che si abitano (pulizia e piccola manutenzione) e come apprendimento e messa in pratica di un'arte o di un mestiere.</p>
                <p>Le caratteristiche e le difficoltà di ognuno messe in gioco in una comunità diventano stimolo di ricerca personale e di coesione comunitaria.</p>

                <h3>Perché "Officina dei Talenti"?</h3>
                <p><strong>Officina:</strong> come nelle officine rinascimentali, la Comunità Fiori Celesti sarà una bottega di arti e mestieri, impegnata nella creazione del bello attraverso la coltivazione della manualità e dell'intelletto nel prosieguo del percorso iniziato nella Casa Laboratorio.</p>
                <p><strong>Talenti:</strong> come nella Parabola dei Talenti, riconosciamo che ogni vita è un capitale di valore inestimabile ricevuto in dono. La nostra missione è "investirlo" nel mondo invitando ogni ragazzo a dissotterrare la propria luce, offrendo gli strumenti affinché quel talento unico possa moltiplicarsi e fiorire.</p>

                <h3>Stato del Progetto</h3>
                <ul>
                    <li>Legami con la Casa Laboratorio e con il Dojo Zen (qigong, shōdō, taiko, ecc.)</li>
                    <li>Rete di artigiani e aziende</li>
                    <li>Rapporti con altri ETS (CSV Emilia, Cooperative, Associazioni, ecc.)</li>
                    <li>Rapporti con Amministrazione Comunale, ASP, ecc.</li>
                    <li>Proposta di struttura residenziale a Tabiano (già individuata)</li>
                    <li>Individuazione della zona agricola in zona</li>
                </ul>

                <h3>Fattibilità del Progetto</h3>
                
                <h4>Gradualità del progetto</h4>
                <p>Attività istituzionale → familiarizzazione con l'ambiente → allestimento e cura della propria stanza e degli spazi comuni → scuola di autonomia → preparazione della casa famiglia e del dopo di noi</p>

                <h4>Fondi delle famiglie fondatrici</h4>
                <p>Capitale iniziale per l'avvio del progetto e garanzia di impegno (utilizzo a vita di alloggio personale con bagno privato e spazi comuni)</p>

                <h4>Sostenibilità di mantenimento e sviluppo</h4>
                <ul>
                    <li><strong>Attività Economiche:</strong> gelateria-cioccolateria, falegnameria-ceramica, pastificio, orticoltura-allevamento, corsi di formazione in arti e mestieri, turismo sociale, ecc.</li>
                    <li><strong>Accesso a bandi e finanziamenti</strong></li>
                    <li><strong>Raccolta fondi e donazioni private</strong></li>
                    <li><strong>Convenzioni ASP/ASL</strong></li>
                    <li><strong>Ente legato al Fukushi Bukkyo giapponese e all'Unione Buddhista Italiana</strong></li>
                </ul>

                <h4>Struttura</h4>
                <ul>
                    <li>Famiglia residente</li>
                    <li>Figure professionali</li>
                    <li>Massimo sei ragazzi residenti o semi-residenti</li>
                    <li>Assistenza Giuridica: CSV Emilia</li>
                </ul>

                <h3>Garanzie per le Famiglie</h3>
                <div class="guarantees-grid">
                    <div class="guarantee-item">
                        <i class="fas fa-shield-alt"></i>
                        <h4>Trasparenza</h4>
                        <p>Forma giuridica chiara: APS con l'ausilio di esperti e sostenitori.</p>
                    </div>
                    <div class="guarantee-item">
                        <i class="fas fa-gavel"></i>
                        <h4>Sicurezza Legale</h4>
                        <p>Utilizzo di strumenti giuridici per tutelare gli investimenti delle famiglie e il diritto all'alloggio a vita dei beneficiari (atti notarili).</p>
                    </div>
                    <div class="guarantee-item">
                        <i class="fas fa-users"></i>
                        <h4>Equipe Qualificata</h4>
                        <p>Famiglia residente, Responsabile struttura (psicologo o educatore professionale), educatori, maestri d'arte, volontari formati.</p>
                    </div>
                </div>
            </div>
        `
    }
};

// Funzione per ottenere il parametro dalla query string
function getProjectFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('nome');
}

// Funzione per caricare il progetto
function loadProject() {
    const projectName = getProjectFromURL();
    
    // Se non c'è un parametro o il progetto non esiste, redirect alla home
    if (!projectName || !projects[projectName]) {
        window.location.href = 'index.html#progetti';
        return;
    }
    
    const project = projects[projectName];
    
    // Aggiorna il titolo della pagina
    document.getElementById('page-title').textContent = `${project.title} - Fiori Celesti APS`;
    
    // Aggiorna il titolo principale senza icona
    document.getElementById('project-title').textContent = project.title;
    
    // Aggiorna la descrizione breve
    document.getElementById('project-description').innerHTML = `
        <strong>${project.subtitle}</strong><br>
        <em>"${project.motto}"</em><br><br>
        ${project.description}
    `;
    
    // Carica l'immagine del progetto
    if (project.image) {
        document.getElementById('project-image').src = project.image;
    }
    
    // Carica il contenuto completo
    document.getElementById('project-full-content').innerHTML = project.fullContent;
}

// Carica il progetto quando la pagina è pronta
document.addEventListener('DOMContentLoaded', loadProject);
