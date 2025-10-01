#!/usr/bin/env node

/**
 * Sync version from package.json to manifest.json
 * This script runs during `npm version` command
 */

const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, '../package.json');
const manifestPath = path.join(__dirname, '../manifest.json');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const version = packageJson.version;

// Read manifest.json
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Update version in manifest
manifest.version = version;

// Write manifest.json
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

console.log(`✓ Updated manifest.json version to ${version}`);
