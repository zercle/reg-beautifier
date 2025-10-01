# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

REG Beautifier is a Chrome browser extension (Manifest V3) that provides a modified, modern UI for the REG KKU (Khon Kaen University Registration) website. It injects custom CSS and JavaScript to beautify and enhance the user experience of the legacy registration system at reg.kku.ac.th.

## Build System

The project uses Gulp as its build system to compile SCSS to CSS and copy assets. Bun is the preferred package manager.

### Common Commands

```bash
# Install dependencies (requires gulp-cli globally)
bun install

# Development mode (default task - runs build)
bun run dev

# Production build
bun run build

# Watch mode (auto-rebuild on file changes)
bun run watch
```

## Architecture

### Extension Structure

The extension uses **content scripts** with page-specific matching to inject custom styles and behavior into different pages of the REG KKU website.

- **manifest.json**: Chrome extension manifest (v3) defining permissions, content scripts, and page-specific injections
- **src/js/background.js**: Service worker for the extension (declarative content rules)
- **src/js/main.js**: Core functionality injected on all REG KKU pages
  - Initializes sidebar (`#sidebar`)
  - Adds responsive viewport meta tag
  - Creates mobile hamburger menu toggle
  - Provides `getCurrentLanguage()` helper (Thai/English detection via cookie)
  - Provides `addTitleBar()` helper for page headers
- **src/js/pages/**: Page-specific JavaScript modules (e.g., calendar.js, login.js, teach_time.js)

### Styling Architecture

SCSS files follow a structured organization:

- **src/scss/styles.scss**: Main stylesheet injected globally
  - Imports: functions, variables, mixins, reboot, fontawesome, sidebar component
  - Defines CSS custom properties (--kku-color, --sidebar-bg-color)
  - Resets legacy table-based layout
  - Fixed header with shadow
  - Responsive sidebar (desktop: fixed, mobile: toggleable)
- **src/scss/pages/**: Page-specific stylesheets matching manifest.json content_scripts
- **src/scss/components/**: Reusable UI components (navigation, sidebar, timetable)
- **src/scss/mixins/**: Bootstrap-derived mixins for consistency

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
- **Sidebar Width**: Defined in SCSS variables as `$sidebar-width`
- **Language Detection**: Uses `CKLANG` cookie (0=Thai, 1=English)
- **Icon System**: FontAwesome Free (via node_modules)
- **Host Permissions**: reg.kku.ac.th and reg-mirror.kku.ac.th
- **Legacy Layout Override**: Uses `!important` extensively to override inline styles from the legacy system

## Development Notes

- The extension operates on a legacy ASP-based website with table layouts and inline styles
- Main strategy: DOM manipulation + aggressive CSS overrides to modernize appearance
- All changes are client-side only (no server modifications)
- Testing requires loading the extension in Chrome via chrome://extensions/ (developer mode) and pointing to the `dist/` folder
