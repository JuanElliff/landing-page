import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

// ⚠️ Actualizá este valor con tu dominio real antes de hacer deploy
const SITE_URL = 'https://juancruzelliff.dev';

export default defineConfig({
  site: SITE_URL,
  output: 'hybrid',
  adapter: vercel(),
});
