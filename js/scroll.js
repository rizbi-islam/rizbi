// Smooth scrolling for anchor links
export function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerNav = document.querySelector('.header-links');
                const headerHeight = headerNav ? Math.ceil(headerNav.getBoundingClientRect().height) + 8 : 80;
                const top = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}
