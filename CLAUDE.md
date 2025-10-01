# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

REG Beautifier is a Chrome browser extension (Manifest V3) that provides a modified, modern UI for the REG KKU (Khon Kaen University Registration) website. It injects custom CSS and JavaScript to beautify and enhance the user experience of the legacy registration system at reg.kku.ac.th.

## Build System

The project uses **Gulp 4** as its build system with **Bun** as the package manager. The build process compiles SCSS to CSS, minifies assets for production, and copies fonts/images.

### Common Commands

```bash
# Install dependencies
bun install

# Development mode (build with watch, non-minified, sourcemaps)
bun run dev

# Production build (minified CSS/JS, no sourcemaps)
bun run build

# Development build (non-minified, with sourcemaps)
bun run build:dev

# Watch mode (auto-rebuild on file changes)
bun run watch

# Run tests
bun test

# Watch tests
bun run test:watch

# Code quality
bun run lint          # Lint JavaScript
bun run lint:fix      # Lint and auto-fix
bun run format        # Format all source files
```

### Build Configuration

The build system supports two modes controlled by `NODE_ENV`:
- **Development** (`NODE_ENV != production`): Includes sourcemaps, no minification
- **Production** (`NODE_ENV=production`): Minified CSS (cssnano) and JS (terser), no sourcemaps

## Architecture

### Extension Structure

The extension uses **content scripts** with page-specific matching to inject custom styles and behavior into different pages of the REG KKU website.

- **manifest.json**: Chrome extension manifest (v3) defining permissions, content scripts, and page-specific injections
- **src/js/background.js**: Service worker for the extension (declarative content rules)
- **src/js/main.js**: Core functionality injected on all REG KKU pages
  - Initializes sidebar (`#sidebar`)
  - Adds responsive viewport meta tag
  - Creates mobile hamburger menu toggle
  - Imports shared utilities from utils.js
- **src/js/utils.js**: Shared utility module (ES6 exports)
  - `getCurrentLanguage()`: Thai/English detection via CKLANG cookie
  - `addTitleBar()`: Add page header with localized title
  - `initSidebar()`: Find and initialize sidebar element
  - `toggleSidebar()`: Toggle sidebar open/close state
  - `initResponsive()`: Add viewport meta tag and set title
  - `createSidebarToggleButton()`: Create hamburger menu button
- **src/js/pages/**: Page-specific JavaScript modules (e.g., calendar.js, login.js, teach_time.js)
- **src/js/*.test.js**: Test files using Bun test + happy-dom

### Styling Architecture

SCSS files follow a structured organization:

- **src/scss/styles.scss**: Main stylesheet injected globally
  - Imports: functions, variables, mixins, reboot, fontawesome, sidebar component
  - Defines extensive CSS custom properties in :root (colors, layout, spacing, typography, effects)
  - Resets legacy table-based layout
  - Fixed header with shadow
  - Responsive sidebar (desktop: fixed, mobile: toggleable)
- **src/scss/_variables.scss**: SCSS variables and Bootstrap lean imports
- **src/scss/_bootstrap-lean.scss**: Minimal Bootstrap variables (only used values, ~30 lines vs 971)
- **src/scss/_mixins.scss**: Bootstrap-derived mixins for consistency
- **src/scss/pages/**: Page-specific stylesheets matching manifest.json content_scripts
- **src/scss/components/**: Reusable UI components (navigation, sidebar, timetable)

### Page Matching Pattern

Each REG KKU page (e.g., calendar.asp, login.asp, teach_time.asp) has:
1. A match pattern in manifest.json
2. A corresponding CSS file in src/scss/pages/
3. A corresponding JS file in src/js/pages/ (if interactive behavior needed)

### Build Output

The gulpfile.js compiles everything to the `dist/` directory:
- `dist/css/`: Compiled CSS with sourcemaps
- `dist/js/`: Copied JavaScript files
- `dist/images/`: Extension icons and assets
- `dist/webfonts/`: FontAwesome fonts
- `dist/manifest.json`: Extension manifest

## Key Technical Details

- **Responsive Design**: Mobile-first with breakpoints at 767.98px and 1180px
- **Sidebar Width**: Defined in SCSS variables as `$sidebar-width` (220px)
- **Language Detection**: Uses `CKLANG` cookie (0=Thai, 1=English)
- **Icon System**: FontAwesome Free 6 (via node_modules)
- **Host Permissions**: reg.kku.ac.th and reg-mirror.kku.ac.th
- **Legacy Layout Override**: Uses `!important` extensively to override inline styles from the legacy system
- **Code Quality**: ESLint, Prettier, Stylelint with configs
- **Testing**: Bun test + happy-dom (DOM simulation for content scripts)

## Development Notes

- The extension operates on a legacy ASP-based website with table layouts and inline styles
- Main strategy: DOM manipulation + aggressive CSS overrides to modernize appearance
- All changes are client-side only (no server modifications)
- Testing requires loading the extension in Chrome via chrome://extensions/ (developer mode) and pointing to the `dist/` folder
