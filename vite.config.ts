import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import viteEslint from 'vite-plugin-eslint';
import { visualizer } from 'rollup-plugin-visualizer';

const baseSrc = fileURLToPath(new URL('./src', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  console.log('🚀 ~ file: vite.config.ts:6 ~ command:', command);
  console.log('🚀 ~ file: vite.config.ts:6 ~ mode:', mode);

  const env = loadEnv(mode, process.cwd());
  const alias = {
    '@': baseSrc
  };

  return {
    plugins: [
      react(),
      viteEslint({
        // failOnError: false,
        include: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
        exclue: ['./node_modules/**'],
        cache: false
      }),
      visualizer({
        emitFile: false,
        filename: 'analysis-chart.html',
        open: true
      })
    ],
    resolve: {
      alias
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          ws: false,
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
      }
    }
  };
});
