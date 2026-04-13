import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';

const W = 1200;
const H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F0F4FF"/>
      <stop offset="100%" stop-color="#F5F0FF"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="#7C3AED"/>
    </linearGradient>
    <linearGradient id="pill" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2563EB" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#7C3AED" stop-opacity="0.08"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Subtle grid -->
  ${Array.from({length: 21}, (_, i) => `<line x1="${i*60}" y1="0" x2="${i*60}" y2="${H}" stroke="#2563EB" stroke-width="0.5" stroke-opacity="0.06"/>`).join('')}
  ${Array.from({length: 11}, (_, i) => `<line x1="0" y1="${i*63}" x2="${W}" y2="${i*63}" stroke="#2563EB" stroke-width="0.5" stroke-opacity="0.06"/>`).join('')}

  <!-- Accent circles (decorative) -->
  <circle cx="1080" cy="80" r="180" fill="#2563EB" fill-opacity="0.05"/>
  <circle cx="120" cy="560" r="140" fill="#7C3AED" fill-opacity="0.05"/>

  <!-- Left accent bar -->
  <rect x="80" y="180" width="5" height="120" rx="3" fill="url(#accent)"/>

  <!-- Avatar / initials badge -->
  <rect x="80" y="80" width="72" height="72" rx="16" fill="url(#accent)"/>
  <text x="116" y="128" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="700" fill="white" text-anchor="middle">JC</text>

  <!-- Name -->
  <text x="172" y="110" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="600" fill="#4B5563">Juan Cruz Elliff</text>
  <text x="172" y="136" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#9CA3AF">Buenos Aires · Freelance Dev</text>

  <!-- Main headline -->
  <text x="95" y="240" font-family="system-ui, -apple-system, sans-serif" font-size="58" font-weight="800" fill="#0B0B0B">Construyo webs,</text>
  <text x="95" y="310" font-family="system-ui, -apple-system, sans-serif" font-size="58" font-weight="800" fill="url(#accent)">automatizaciones</text>
  <text x="95" y="380" font-family="system-ui, -apple-system, sans-serif" font-size="58" font-weight="800" fill="#0B0B0B">y agentes AI.</text>

  <!-- Subline -->
  <text x="95" y="440" font-family="system-ui, -apple-system, sans-serif" font-size="22" fill="#6B7280">Rápido, sin vueltas. Entrega en 48 hs.</text>

  <!-- Pills -->
  <rect x="95" y="490" width="130" height="38" rx="19" fill="url(#pill)"/>
  <text x="160" y="514" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#2563EB" text-anchor="middle">Web &amp; Landing</text>

  <rect x="240" y="490" width="148" height="38" rx="19" fill="url(#pill)"/>
  <text x="314" y="514" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#7C3AED" text-anchor="middle">Automatizaciones</text>

  <rect x="403" y="490" width="122" height="38" rx="19" fill="url(#pill)"/>
  <text x="464" y="514" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#2563EB" text-anchor="middle">Agentes AI</text>

  <!-- Bottom border accent -->
  <rect x="0" y="${H - 5}" width="${W}" height="5" fill="url(#accent)"/>
</svg>`;

const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync('public/og.png', pngBuffer);
console.log('✓ public/og.png generado (1200×630)');
