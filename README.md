# REG Beautifier

A Chrome extension that beautifies the UI of the REG KKU (Khon Kaen University Registration) website with a modern, responsive design.

[![Build Status](https://travis-ci.org/zercle/reg-beautifier.svg?branch=master)](https://travis-ci.org/zercle/reg-beautifier)

## Download

<a href="https://chrome.google.com/webstore/detail/reg-beautifier/jdccbfhggeebpboadaffcpmdclhjjmam" title="Download Google Chrome Extension">
    <img src="https://developer.chrome.com/webstore/images/ChromeWebStore_BadgeWBorder_v2_340x96.png" width="170" alt="Google Chrome Extension Logo">
</a>

## Features

- Modern, clean UI design
- Responsive layout for mobile and desktop
- Dark sidebar navigation
- Improved typography and spacing
- Font Awesome icons integration
- Optimized CSS and JavaScript

## Development

### Prerequisites

- [Bun](https://bun.sh) - Fast all-in-one JavaScript runtime

### Installation

```bash
bun install
```

### Available Scripts

```bash
# Development build with watch mode
bun run dev

# Production build (minified)
bun run build

# Development build (non-minified)
bun run build:dev

# Watch for changes
bun run watch

# Run tests
bun test

# Watch tests
bun run test:watch

# Lint JavaScript files
bun run lint

# Lint and fix JavaScript files
bun run lint:fix

# Format all source files
bun run format
```

### Project Structure

```
reg-beautifier/
├── manifest.json          # Chrome extension manifest (v3)
├── src/
│   ├── js/               # JavaScript source files
│   │   ├── main.js       # Main content script
│   │   ├── utils.js      # Shared utility functions
│   │   └── *.test.js     # Test files
│   ├── scss/             # SCSS source files
│   │   ├── styles.scss   # Main stylesheet
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── components/
│   └── images/           # Extension images
├── dist/                 # Built files (generated)
└── gulpfile.js          # Build configuration
```

### Building for Production

1. Run the production build:
   ```bash
   bun run build
   ```

2. Load the extension in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist/` folder

### Testing

Tests are written using Bun's built-in test runner with happy-dom for DOM simulation:

```bash
bun test              # Run all tests
bun run test:watch    # Watch mode
```

### Code Quality

The project uses:
- **ESLint** for JavaScript linting
- **Prettier** for code formatting
- **Stylelint** for SCSS linting

Run quality checks:
```bash
bun run lint          # Check JS
bun run format        # Format all files
```

## Technologies

- **Build System**: Gulp 4 + Bun
- **Styling**: SCSS with custom properties
- **Icons**: Font Awesome 6
- **Testing**: Bun test + happy-dom
- **Linting**: ESLint, Prettier, Stylelint

## License

MIT © Zercle Technology Co., Ltd.