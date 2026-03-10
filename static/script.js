/**
 * Paddock Brasil - Dashboard Logic
 * Fetching and Rendering F1 Data
 */

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    // Route basic detection
    if (path === '/' || path === '/index.html') {
        initDashboard();
    } else if (path.includes('/pilotos')) {
        initPilotos();
    } else if (path.includes('/equipes')) {
        initEquipes();
    } else if (path.includes('/corridas')) {
        initCorridas();
    } else if (path.includes('/circuitos')) {
        initCircuitos();
    }

    animateNav();
});

// --- API FETCH HELPER ---
async function fetchData(endpoint) {
    try {
        const response = await fetch(`/api/${endpoint}`);
        if (!response.ok) throw new Error('Falha ao buscar dados');
        return await response.json();
    } catch (error) {
        console.error(`Erro na API (${endpoint}):`, error);
        return null;
    }
}

// --- UTILITIES ---
function createSkeleton(count, type = 'card') {
    let skeletons = '';
    for (let i = 0; i < count; i++) {
        skeletons += `
            <div class="card skeleton">
                <div class="skeleton-block"></div>
                <div class="skeleton-title"></div>
                <div class="skeleton-text"></div>
            </div>
        `;
    }
    return skeletons;
}

function renderError(message) {
    return `
        <div class="error-state">
            <i class="mdi mdi-alert-circle-outline"></i>
            <h3>Oops! Algo deu errado</h3>
            <p>${message}</p>
        </div>
    `;
}

// --- DASHBOARD (INDEX) ---
async function initDashboard() {
    const lastRaceContainer = document.getElementById('last-race-widget');
    const seasonSummary = document.getElementById('season-summary');

    // Show skeletons
    if (lastRaceContainer) lastRaceContainer.innerHTML = createSkeleton(1);

    const lastRaceData = await fetchData('ultima_corrida');
    
    if (lastRaceData && lastRaceData.MRData.RaceTable.Races.length > 0) {
        const race = lastRaceData.MRData.RaceTable.Races[0];
        const winner = race.Results[0];
        
        lastRaceContainer.innerHTML = `
            <div class="card interactive">
                <div class="card-header">
                    <span class="badge">Última Corrida</span>
                    <h3>${race.raceName}</h3>
                </div>
                <div class="card-body">
                    <div class="winner-info">
                        <span class="label">Vencedor</span>
                        <h2 class="highlight">${winner.Driver.givenName} ${winner.Driver.familyName}</h2>
                        <p class="team">${winner.Constructor.name}</p>
                    </div>
                    <div class="race-meta">
                        <span><i class="mdi mdi-map-marker"></i> ${race.Circuit.Location.locality}</span>
                        <span><i class="mdi mdi-calendar"></i> ${new Date(race.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                </div>
            </div>
        `;
    } else {
        lastRaceContainer.innerHTML = renderError('Não foi possível carregar os dados da última corrida.');
    }
}

// --- PILOTOS ---
async function initPilotos() {
    const container = document.getElementById('pilotos-grid');
    if (!container) return;

    container.innerHTML = createSkeleton(8);

    const data = await fetchData('pilotos');
    if (data && data.MRData.DriverTable.Drivers) {
        const drivers = data.MRData.DriverTable.Drivers;
        container.innerHTML = drivers.map(d => `
            <div class="card interactive">
                <div class="driver-number">#${d.permanentNumber}</div>
                <div class="card-content">
                    <h3>${d.givenName} ${d.familyName}</h3>
                    <p class="subtitle">${d.nationality}</p>
                    <a href="${d.url}" target="_blank" class="btn-detail">Wiki <i class="mdi mdi-arrow-right"></i></a>
                </div>
            </div>
        `).join('');
    } else {
        container.innerHTML = renderError('Erro ao carregar pilotos.');
    }
}

// --- EQUIPES ---
async function initEquipes() {
    const container = document.getElementById('equipes-grid');
    if (!container) return;

    container.innerHTML = createSkeleton(6);

    const data = await fetchData('equipes');
    if (data && data.MRData.ConstructorTable.Constructors) {
        const constructors = data.MRData.ConstructorTable.Constructors;
        container.innerHTML = constructors.map(c => `
            <div class="card interactive">
                <div class="card-content">
                    <h3 class="highlight">${c.name}</h3>
                    <p class="subtitle">${c.nationality}</p>
                    <div class="card-footer-info">
                        <i class="mdi mdi-car-sports"></i> F1 Team
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        container.innerHTML = renderError('Erro ao carregar construtores.');
    }
}

// --- CALENDÁRIO ---
async function initCorridas() {
    const container = document.getElementById('calendar-list');
    if (!container) return;

    container.innerHTML = createSkeleton(6);

    const data = await fetchData('corridas');
    if (data && data.MRData.RaceTable.Races) {
        const races = data.MRData.RaceTable.Races;
        container.innerHTML = races.map(r => `
            <div class="card flex-row">
                <div class="race-date">
                    <span class="day">${new Date(r.date).getDate()}</span>
                    <span class="month">${new Date(r.date).toLocaleString('default', { month: 'short' })}</span>
                </div>
                <div class="race-details">
                    <h3>GP de ${r.Circuit.Location.country}</h3>
                    <p>${r.raceName}</p>
                    <span class="circuit-name"><i class="mdi mdi-road-variant"></i> ${r.Circuit.circuitName}</span>
                </div>
            </div>
        `).join('');
    } else {
        container.innerHTML = renderError('Erro ao carregar calendário.');
    }
}

// --- CIRCUITOS ---
async function initCircuitos() {
    const container = document.getElementById('circuitos-grid');
    if (!container) return;

    container.innerHTML = createSkeleton(8);

    const data = await fetchData('circuitos');
    if (data && data.MRData.CircuitTable.Circuits) {
        const circuits = data.MRData.CircuitTable.Circuits;
        container.innerHTML = circuits.map(c => `
            <div class="card interactive">
                <div class="card-content">
                    <i class="mdi mdi-map-marker-radius icon-large"></i>
                    <h3>${c.circuitName}</h3>
                    <p class="subtitle">${c.Location.locality}, ${c.Location.country}</p>
                </div>
            </div>
        `).join('');
    } else {
        container.innerHTML = renderError('Erro ao carregar circuitos.');
    }
}

// --- ANIMATIONS ---
function animateNav() {
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
             // Subtle feedback logic if needed
        });
    });
}
