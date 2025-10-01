import { initSidebar, toggleSidebar, initResponsive, createSidebarToggleButton, getCurrentLanguage, addTitleBar } from './utils.js';
import { initPerformanceMonitoring, mark } from './performance.js';

// Start performance monitoring
mark('main-start');
initPerformanceMonitoring();

// Init sidebar
mark('sidebar-init-start');
const sidebar = initSidebar();
mark('sidebar-init-end');

// Init responsive for mobile site
mark('responsive-init-start');
initResponsive();
mark('responsive-init-end');

// Create sidebar toggle button
mark('toggle-button-start');
const btn = createSidebarToggleButton();
if (btn && sidebar) {
  btn.addEventListener('click', () => toggleSidebar(sidebar));
}
mark('toggle-button-end');

mark('main-end');

// Export utility functions for other scripts to use
export { getCurrentLanguage, addTitleBar };
