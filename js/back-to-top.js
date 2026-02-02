// Back to Top button behavior
export function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    // Adaptive threshold: lower on small screens for faster access
    const getThreshold = () => (window.innerWidth < 768 ? 200 : 300);
    let threshold = getThreshold();

    // Debounce helper for resize events
    let resizeTimer;
    const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            threshold = getThreshold();
            toggle();
        }, 120);
    };

    const isAlways = backToTop.classList.contains('always-visible');

    // Toggle visibility and aria state based on scroll position or short pages
    const toggle = () => {
        const isShortPage = document.documentElement.scrollHeight <= window.innerHeight + 60; // show if no scrollable content
        if (isShortPage || window.scrollY > threshold || isAlways) {
            backToTop.classList.add('show');
            backToTop.setAttribute('aria-hidden', 'false');
        } else {
            backToTop.classList.remove('show');
            backToTop.setAttribute('aria-hidden', 'true');
        }
    }; 

    window.addEventListener('scroll', toggle);
    window.addEventListener('resize', onResize);
    toggle(); // ensure state on load

    const scrollToTop = () => {
        // Prefer scrolling to the `#top` anchor if present
        // Prefer scrolling to the header top if present (id="siteHeader"), then profile image, then to #top anchor
        const headerEl = document.getElementById('siteHeader');
        if (headerEl) {
            try {
                headerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Ensure header navigation is visible (some scripts hide/show it on scroll)
                const headerLinks = document.querySelector('.header-links');
                if (headerLinks) {
                    headerLinks.style.transform = 'translateY(0)';
                    headerLinks.classList.remove('compact');
                }

                // Small nudge to ensure we're actually at the top after smooth scroll completes
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 260);

                backToTop.classList.add('clicked');
                setTimeout(() => backToTop.classList.remove('clicked'), 220);
                backToTop.blur();
                return;
            } catch (e) {
                console.warn('scrollIntoView(siteHeader) failed, falling back', e);
            }
        }

        const topImage = document.getElementById('topImage');
        if (topImage) {
            try {
                topImage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                backToTop.classList.add('clicked');
                setTimeout(() => backToTop.classList.remove('clicked'), 220);
                backToTop.blur();
                return;
            } catch (e) {
                console.warn('scrollIntoView(topImage) failed, falling back', e);
            }
        }

        const topEl = document.getElementById('top');
        if (topEl) {
            try {
                topEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                backToTop.classList.add('clicked');
                setTimeout(() => backToTop.classList.remove('clicked'), 220);
                backToTop.blur();
                return;
            } catch (e) {
                // continue to other fallbacks
                console.warn('scrollIntoView failed, falling back', e);
            }
        }

        // fallback to scrolling the main viewport
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (e) {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }

        // Also find and scroll any scrollable containers (overflow: auto|scroll)
        try {
            const scrollables = Array.from(document.querySelectorAll('*')).filter(el => {
                const style = window.getComputedStyle(el);
                const oy = style.overflowY;
                return (oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight;
            });
            scrollables.forEach(el => {
                try {
                    el.scrollTo({ top: 0, behavior: 'smooth' });
                } catch (err) {
                    el.scrollTop = 0;
                }
            });
        } catch (err) {
            console.warn('backToTop: error while scrolling containers', err);
        }

        backToTop.classList.add('clicked');
        setTimeout(() => backToTop.classList.remove('clicked'), 220);
        backToTop.blur();
    };

    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToTop();
    });

    backToTop.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollToTop();
        }
    });
}
