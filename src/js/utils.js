// Shared utility functions for REG Beautifier

export function getCurrentLanguage() {
  const languages = ['th', 'en'];
  const lang = document.cookie.replace(
    /(?:(?:^|.*;\s*)CKLANG\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
  return languages[lang] || languages[0];
}

export function addTitleBar(title_th, title_en, icon = null, icon_class = 'fas') {
  const contentContainer = document.querySelector(
    '#wrapper > table > tbody > tr > td:nth-of-type(2)'
  );
  if (!contentContainer) return;

  contentContainer.setAttribute('id', 'main_content_container');

  const title = getCurrentLanguage() === 'th' ? title_th : title_en;
  const titleBar = document.createElement('header');
  titleBar.className = 'title-bar';
  titleBar.innerHTML = `<i class="${icon_class}">${icon || ''}</i><h1>${title}</h1>`;

  contentContainer.insertBefore(titleBar, contentContainer.firstChild);
}

export function initSidebar() {
  const sidebar = document.querySelector(
    '#wrapper > table > tbody > tr > td:nth-of-type(1)'
  );
  if (sidebar) {
    sidebar.setAttribute('id', 'sidebar');
    sidebar.setAttribute('role', 'navigation');
    sidebar.setAttribute('aria-label', 'Main navigation');
    return sidebar;
  }
  return null;
}

export function toggleSidebar(sidebar) {
  if (!sidebar) return;
  const isOpen = sidebar.className === 'opened';
  sidebar.className = isOpen ? '' : 'opened';

  // Update aria-expanded on toggle button
  const toggleBtn = document.getElementById('btn_sidebar_toggle');
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  }
}

export function initResponsive() {
  const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.setAttribute('content', 'width=device-width, initial-scale=1.0');
  document.getElementsByTagName('head')[0].appendChild(meta);
  document.title = 'ระบบบริการการศึกษา มหาวิทยาลัยขอนแก่น';
}

export function createSidebarToggleButton() {
  const header = document.querySelector('#header > .wrapper');
  if (!header) return null;

  const btn = document.createElement('button');
  btn.setAttribute('id', 'btn_sidebar_toggle');
  btn.setAttribute('type', 'button');
  btn.setAttribute('aria-label', 'Toggle sidebar menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30" focusable="false" aria-hidden="true">
    <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" d="M4 7h22M4 15h22M4 23h22"></path>
  </svg>`;

  header.appendChild(btn);
  return btn;
}
