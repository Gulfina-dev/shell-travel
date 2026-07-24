let selectedDate = null;
let selectedNights = null;
let adults = 2;
let children = 0;

function closeAllDropdowns() {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
}

function openDropdown(id) {
    closeAllDropdowns();
    document.getElementById(id).classList.add('active');
}

document.getElementById('from-wrapper').addEventListener('click', (e) => {
    e.stopPropagation();
    openDropdown('from-dropdown');
});
document.getElementById('to-wrapper').addEventListener('click', (e) => {
    e.stopPropagation();
    openDropdown('to-dropdown');
});
document.getElementById('date-wrapper').addEventListener('click', (e) => {
    e.stopPropagation();
    openDropdown('date-dropdown');
});
document.getElementById('nights-wrapper').addEventListener('click', (e) => {
    e.stopPropagation();
    openDropdown('nights-dropdown');
});
document.getElementById('tourists-wrapper').addEventListener('click', (e) => {
    e.stopPropagation();
    openDropdown('tourists-dropdown');
});

document.addEventListener('click', () => closeAllDropdowns());

document.querySelectorAll('.city-list li').forEach(li => {
    li.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('from-input').value = li.dataset.city;
        closeAllDropdowns();
    });
});

document.querySelectorAll('.country-list li').forEach(li => {
    li.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('to-input').value = li.dataset.country;
        closeAllDropdowns();
    });
});

let currentMonth = 3;
let currentYear = 2026;

function renderCalendar() {
    const calendarDiv = document.getElementById('calendar');
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    let html = `
        <div class="calendar-header">
            <button id="prevMonth">←</button>
            <span>Апрель 2026</span>
            <button id="nextMonth">→</button>
        </div>
        <div class="calendar-weekdays">
            <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
        </div>
        <div class="calendar-days" id="calendar-days"></div>
    `;
    calendarDiv.innerHTML = html;
    
    const daysContainer = document.getElementById('calendar-days');
    let startOffset = firstDay === 0 ? 6 : firstDay - 1;
    
    for (let i = 0; i < startOffset; i++) {
        daysContainer.appendChild(document.createElement('div'));
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        if (selectedDate === i) dayDiv.classList.add('selected');
        dayDiv.textContent = i;
        dayDiv.addEventListener('click', () => {
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
            dayDiv.classList.add('selected');
            selectedDate = i;
            document.getElementById('date-input').value = `${i}.04.2026`;
            closeAllDropdowns();
        });
        daysContainer.appendChild(dayDiv);
    }
    
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}
renderCalendar();

const nightsGrid = document.getElementById('nights-grid');
for (let i = 1; i <= 30; i++) {
    const nightDiv = document.createElement('div');
    nightDiv.className = 'night-item';
    nightDiv.textContent = i;
    nightDiv.addEventListener('click', () => {
        document.querySelectorAll('.night-item').forEach(n => n.classList.remove('selected'));
        nightDiv.classList.add('selected');
        selectedNights = i;
        document.getElementById('nights-input').value = i;
        closeAllDropdowns();
    });
    nightsGrid.appendChild(nightDiv);
}

function updateTouristsInput() {
    const adultsCount = adults;
    const childrenCount = children;
    if (adultsCount === 2 && childrenCount === 0) {
        document.getElementById('tourists-input').value = 'Туристы';
    } else {
        document.getElementById('tourists-input').value = `${adultsCount} взр, ${childrenCount} дет`;
    }
}

document.getElementById('adults-plus').addEventListener('click', () => { adults++; document.getElementById('adults-count').textContent = adults; updateTouristsInput(); });
document.getElementById('adults-minus').addEventListener('click', () => { if (adults > 1) adults--; document.getElementById('adults-count').textContent = adults; updateTouristsInput(); });
document.getElementById('children-plus').addEventListener('click', () => { children++; document.getElementById('children-count').textContent = children; updateTouristsInput(); });
document.getElementById('children-minus').addEventListener('click', () => { if (children > 0) children--; document.getElementById('children-count').textContent = children; updateTouristsInput(); });
updateTouristsInput();

document.getElementById('search-btn').addEventListener('click', () => {
    document.getElementById('from-input').value = '';
    document.getElementById('to-input').value = '';
    document.getElementById('date-input').value = '';
    document.getElementById('nights-input').value = '';
    
    adults = 2;
    children = 0;
    document.getElementById('adults-count').textContent = adults;
    document.getElementById('children-count').textContent = children;
    updateTouristsInput();
    
    selectedDate = null;
    selectedNights = null;
    
    document.querySelectorAll('.calendar-day.selected').forEach(d => d.classList.remove('selected'));
    document.querySelectorAll('.night-item.selected').forEach(n => n.classList.remove('selected'));
    
    closeAllDropdowns();
});

// ПЛАВНАЯ ПРОКРУТКА К БЛОКАМ
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
        });
    }
}

document.querySelectorAll('a[data-link]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-link');
        scrollToElement(targetId);
    });
});

document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const text = link.textContent.trim();
        if (text === 'О нас') {
            scrollToElement('about');
        } else if (text === 'Предложения') {
            scrollToElement('offers');
        } else if (text === 'Акции') {
            scrollToElement('promotions');
        } else if (text === 'Контакты') {
            scrollToElement('contacts');
        }
    });
});

// ЛОГОТИП В ШАПКЕ ВЕДЁТ К БЛОКУ "О НАС"
const headerLogo = document.querySelector('.logo-img');
if (headerLogo) {
    headerLogo.addEventListener('click', (e) => {
        e.preventDefault();
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const offset = 100;
            const elementPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    });
}

// ЛОГОТИП В ПОДВАЛЕ ВЕДЁТ К БЛОКУ "О НАС"
const footerLogo = document.querySelector('.footer-logo');
if (footerLogo) {
    footerLogo.addEventListener('click', (e) => {
        e.preventDefault();
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const offset = 100;
            const elementPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    });
}


// ПЕРЕХОД НА СТРАНИЦУ index2.html
function goToLoadingPage() {
    window.location.href = 'index2.html';
}

// Все кнопки на сайте
document.querySelectorAll('.select-tour-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        goToLoadingPage();
    });
});

document.querySelectorAll('.hotel-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        goToLoadingPage();
    });
});

document.querySelectorAll('.domestic-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        goToLoadingPage();
    });
});

document.querySelectorAll('.catalog-banner-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        goToLoadingPage();
    });
});