// Hide sidebar when footer is visible
export function setupSidebarObserver() {
    const sidebar = document.querySelector('.quick-contact-sidebar');
    const footer = document.querySelector('footer');
    if (!sidebar || !footer) return;

    // Fallback: use bounding-rect check (throttled) for reliable behavior across browsers/devices
    const triggerPercent = 0.2; // hide when footer top enters bottom 20% of viewport
    let ticking = false;

    const checkFooter = () => {
        const rect = footer.getBoundingClientRect();
        const triggerPoint = window.innerHeight * (1 - triggerPercent);
        if (rect.top <= triggerPoint) {
            if (!sidebar.classList.contains('hidden')) {
                sidebar.classList.add('hidden');
                sidebar.setAttribute('aria-hidden', 'true');
            }
        } else {
            if (sidebar.classList.contains('hidden')) {
                sidebar.classList.remove('hidden');
                sidebar.setAttribute('aria-hidden', 'false');
            }
        }
    };

    const onScrollOrResize = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                checkFooter();
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    // initial check
    checkFooter();
}
