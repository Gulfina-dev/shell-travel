// Слайдер баннера
const slides = [
    {
        image: '../mediya/banner-bg.jpg',
        btnColor: '#0A505B',
        btnTextColor: 'white'
    },
    {
        image: '../mediya/banner-bg-2.jpg',
        btnColor: '#FEE6B0',
        btnTextColor: '#2F5177'
    },
    {
        image: '../mediya/banner-bg-3.jpg',
        btnColor: '#EBA867',
        btnTextColor: 'white'
    },
    {
        image: '../mediya/banner-bg-4.jpg',
        btnColor: '#CF7C74',
        btnTextColor: 'white'
    },
    {
        image: '../mediya/banner-bg-5.jpg',
        btnColor: '#1FC3A1',
        btnTextColor: 'white'
    }
];

let currentSlide = 0;
let autoSlideInterval;
let isTransitioning = false;

const banner = document.querySelector('.banner');
const oldBannerImage = document.querySelector('.banner-image');
const selectTourBtn = document.querySelector('.select-tour-btn');

// Удаляем старый баннер, если он есть
if (oldBannerImage && oldBannerImage.parentNode) {
    oldBannerImage.remove();
}

// Создаём контейнер для слайдера
let sliderContainer = document.querySelector('.banner-slider-container');
if (sliderContainer) {
    sliderContainer.remove();
}

sliderContainer = document.createElement('div');
sliderContainer.className = 'banner-slider-container';
sliderContainer.style.cssText = `
    position: relative;
    width: 100%;
    overflow: hidden;
`;

// Создаём трек для слайдов
const track = document.createElement('div');
track.className = 'banner-slider-track';
track.style.cssText = `
    display: flex;
    transition: transform 0.5s ease;
    width: 100%;
`;

// Добавляем слайды в трек (копируем массив дважды для бесконечного цикла)
const extendedSlides = [...slides, ...slides, ...slides];
extendedSlides.forEach((slide) => {
    const img = document.createElement('img');
    img.src = slide.image;
    img.alt = 'Туры';
    img.className = 'banner-slide';
    img.style.cssText = `
        width: 100%;
        flex-shrink: 0;
        display: block;
        pointer-events: none;
    `;
    track.appendChild(img);
});

sliderContainer.appendChild(track);
banner.insertBefore(sliderContainer, banner.firstChild);

// Устанавливаем начальную позицию на середине (на первый настоящий слайд)
const startPosition = slides.length;
track.style.transform = `translateX(-${startPosition * 100}%)`;

function updateButtonColor() {
    const realIndex = ((currentSlide % slides.length) + slides.length) % slides.length;
    selectTourBtn.style.backgroundColor = slides[realIndex].btnColor;
    selectTourBtn.style.color = slides[realIndex].btnTextColor;
}

function goToSlide(index, skipTransition = false) {
    if (isTransitioning && !skipTransition) return;
    isTransitioning = true;
    
    const newPosition = index * 100;
    if (skipTransition) {
        track.style.transition = 'none';
    } else {
        track.style.transition = 'transform 0.5s ease';
    }
    track.style.transform = `translateX(-${newPosition}%)`;
    
    currentSlide = index;
    updateButtonColor();
    
    setTimeout(() => {
        isTransitioning = false;
        
        // Бесконечная прокрутка: если ушли за границы, перескакиваем без анимации
        if (currentSlide >= slides.length * 2) {
            const newIndex = currentSlide - slides.length;
            goToSlide(newIndex, true);
        } else if (currentSlide < slides.length) {
            const newIndex = currentSlide + slides.length;
            goToSlide(newIndex, true);
        }
    }, skipTransition ? 0 : 500);
}

function nextSlide() {
    if (isTransitioning) return;
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    if (isTransitioning) return;
    goToSlide(currentSlide - 1);
}

function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 6000);
}

// Клик по баннеру
banner.addEventListener('click', (e) => {
    const rect = banner.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const bannerWidth = rect.width;
    
    if (clickX < bannerWidth / 2) {
        prevSlide();
    } else {
        nextSlide();
    }
    startAutoSlide();
});

// Запускаем слайдер
goToSlide(slides.length, true);
startAutoSlide();

window.slider = { nextSlide, prevSlide };