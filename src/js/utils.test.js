import { describe, test, expect, beforeEach } from 'bun:test';
import {
  getCurrentLanguage,
  addTitleBar,
  initSidebar,
  toggleSidebar,
  initResponsive,
  createSidebarToggleButton,
} from './utils.js';

describe('getCurrentLanguage', () => {
  test('should return "th" when CKLANG cookie is 0', () => {
    document.cookie = 'CKLANG=0';
    expect(getCurrentLanguage()).toBe('th');
  });

  test('should return "en" when CKLANG cookie is 1', () => {
    document.cookie = 'CKLANG=1';
    expect(getCurrentLanguage()).toBe('en');
  });

  test('should return "th" as default when cookie not set', () => {
    document.cookie = 'CKLANG=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    expect(getCurrentLanguage()).toBe('th');
  });
});

describe('initSidebar', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('should find and set ID for sidebar element', () => {
    document.body.innerHTML = `
      <div id="wrapper">
        <table>
          <tbody>
            <tr>
              <td>Sidebar</td>
              <td>Content</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    const sidebar = initSidebar();
    expect(sidebar).toBeTruthy();
    expect(sidebar.getAttribute('id')).toBe('sidebar');
    expect(sidebar.textContent).toBe('Sidebar');
  });

  test('should return null when sidebar not found', () => {
    document.body.innerHTML = '<div></div>';
    const sidebar = initSidebar();
    expect(sidebar).toBeNull();
  });
});

describe('toggleSidebar', () => {
  test('should toggle className between empty and "opened"', () => {
    const mockSidebar = document.createElement('div');
    mockSidebar.className = '';

    toggleSidebar(mockSidebar);
    expect(mockSidebar.className).toBe('opened');

    toggleSidebar(mockSidebar);
    expect(mockSidebar.className).toBe('');
  });

  test('should handle null sidebar gracefully', () => {
    expect(() => toggleSidebar(null)).not.toThrow();
  });
});

describe('initResponsive', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    document.title = '';
  });

  test('should add viewport meta tag', () => {
    initResponsive();
    const meta = document.querySelector('meta[name="viewport"]');
    expect(meta).toBeTruthy();
    expect(meta.getAttribute('content')).toBe('width=device-width, initial-scale=1.0');
  });

  test('should set document title', () => {
    initResponsive();
    expect(document.title).toBe('ระบบบริการการศึกษา มหาวิทยาลัยขอนแก่น');
  });
});

describe('createSidebarToggleButton', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('should create button in header', () => {
    document.body.innerHTML = `
      <div id="header">
        <div class="wrapper"></div>
      </div>
    `;

    const btn = createSidebarToggleButton();
    expect(btn).toBeTruthy();
    expect(btn.getAttribute('id')).toBe('btn_sidebar_toggle');
    expect(btn.innerHTML).toContain('svg');
  });

  test('should return null when header not found', () => {
    document.body.innerHTML = '<div></div>';
    const btn = createSidebarToggleButton();
    expect(btn).toBeNull();
  });
});

describe('addTitleBar', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('should add title bar with Thai title when language is th', () => {
    document.cookie = 'CKLANG=0';
    document.body.innerHTML = `
      <div id="wrapper">
        <table>
          <tbody>
            <tr>
              <td></td>
              <td>Existing content</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    addTitleBar('ชื่อไทย', 'English Title', '\uf015', 'fas');

    const titleBar = document.querySelector('.title-bar');
    expect(titleBar).toBeTruthy();
    expect(titleBar.textContent).toContain('ชื่อไทย');
    expect(titleBar.innerHTML).toContain('fas');
  });

  test('should add title bar with English title when language is en', () => {
    document.cookie = 'CKLANG=1';
    document.body.innerHTML = `
      <div id="wrapper">
        <table>
          <tbody>
            <tr>
              <td></td>
              <td>Existing content</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    addTitleBar('ชื่อไทย', 'English Title');

    const titleBar = document.querySelector('.title-bar');
    expect(titleBar).toBeTruthy();
    expect(titleBar.textContent).toContain('English Title');
  });

  test('should not throw when content container not found', () => {
    document.body.innerHTML = '<div></div>';
    expect(() => addTitleBar('Title TH', 'Title EN')).not.toThrow();
  });
});
