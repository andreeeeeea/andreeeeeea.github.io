// Set current date
document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).toUpperCase();

    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = currentDate;
    }

    // Initialize animations
    animateOnScroll();
});

// Project carousel
let currentProjectIndex = 0;
const totalProjects = 6;

function updateProjectDisplay() {
    const carousel = document.getElementById('projectCarousel');
    const currentNum = document.getElementById('currentProjectNumber');
    const dots = document.querySelectorAll('.project-dot');

    if (carousel) {
        carousel.style.transform = `translateX(-${currentProjectIndex * 100}%)`;
    }

    if (currentNum) {
        currentNum.textContent = currentProjectIndex + 1;
    }

    // Update dots
    dots.forEach((dot, index) => {
        if (index === currentProjectIndex) {
            dot.classList.add('bg-[#1a1c1a]');
            dot.classList.remove('bg-transparent');
        } else {
            dot.classList.remove('bg-[#1a1c1a]');
            dot.classList.add('bg-transparent');
        }
    });
}

function nextProject() {
    currentProjectIndex = (currentProjectIndex + 1) % totalProjects;
    updateProjectDisplay();
}

function previousProject() {
    currentProjectIndex = (currentProjectIndex - 1 + totalProjects) % totalProjects;
    updateProjectDisplay();
}

function goToProject(index) {
    currentProjectIndex = index;
    updateProjectDisplay();
}

// Scroll progress and back to top
window.addEventListener('scroll', function() {
    // Update scroll progress
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }

    // Show/hide back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        if (scrollTop > 300) {
            backToTopBtn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
            backToTopBtn.classList.add('opacity-100', 'translate-y-0');
        } else {
            backToTopBtn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
            backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
        }
    }

    // Trigger animations
    animateOnScroll();
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.scroll-animate');

    elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if element is in viewport
        if (rect.top < windowHeight * 0.9 && rect.bottom > 0) {
            if (!element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        }
    });
}

// Smooth scrolling for navigation links
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