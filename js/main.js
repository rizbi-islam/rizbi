// Main entry point - initialize all scripts
import { setupSmoothScroll } from './scroll.js';
import { setupHeaderScroll } from './header-scroll.js';
import { setupSkillTags } from './skills.js';
import { setupBackToTop } from './back-to-top.js';
import { setupSidebarObserver } from './sidebar.js';

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setupSmoothScroll();
    setupHeaderScroll();
    setupSkillTags();
    setupBackToTop();
    setupSidebarObserver();
});
