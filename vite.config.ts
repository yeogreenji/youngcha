import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// 로컬 dev/preview와 Vercel 배포 모두 루트('/') 기준으로 동작합니다.
// GitHub Pages로도 열어야 할 때는 이 파일의 base만 바꾸면 됩니다.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  server: { port: 5184, host: true },
  preview: { port: 4184, host: true },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          icons: ['lucide-react'],
        },
      },
    },
  },
});
