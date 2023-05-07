import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, loadEnv } from 'vite';
const path = require('node:path');
const projectOptions = require('./project-options');

export default ({ mode }: { mode: string }) => {
  const envConfig = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      Components({
        dts: true,
        resolvers: [AntDesignVueResolver()],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: projectOptions.lessOptions,
      },
    },
    // base: mode === 'dev' ? '/' : '/dataplatform',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        Config: path.resolve(__dirname, 'config'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: envConfig.VITE_PROXY_HOST,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
};
