import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      src: '/src',
      components: '/src/components',
      pages: '/src/pages',
      assets: '/src/assets'
    },
  },
   base: '/bc-65-react-node-IamLoren/',
  build: {
    rollupOptions: {
      external: ['@chatscope/chat-ui-kit-styles'],
    },
  },
});
