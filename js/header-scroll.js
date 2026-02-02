// Header compact behavior on scroll
export function setupHeaderScroll() {
    const header = document.querySelector('.header-links');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function update() {
        const scY = window.scrollY;

        // compact when scrolled down beyond threshold
        if (scY > 80) {
            header.classList.add('compact');
        } else {
            header.classList.remove('compact');
        }

        // small hide-on-scroll-down, show-on-scroll-up behavior
        if (Math.abs(scY - lastScrollY) > 20) {
            if (scY > lastScrollY && scY > 120) {
                header.style.transform = 'translateY(-110%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }

        lastScrollY = scY;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });

    // initial state
    update();
}
