import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";
const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir);
};
const alias: Record<string, string> = {
  "@": pathResolve("src"),
};

// https://vitejs.dev/config/
// https://vip.stock.finance.sina.com.cn
export default ({ mode }: { mode: string }) => {
  const envConfig = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias,
    },
    server: {
      proxy: {
        "/TestApi": {
          target: "https://vip.stock.finance.sina.com.cn",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/TestApi/, ""),
        },

        "/newApi": {
          target: "https://finance.sina.com.cn",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/newApi/, ""),
        },
        "/dataApi": {
          target: "https://hq.sinajs.cn",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dataApi/, ""),
        },
        "/listApi": {
          target: "https://datacenter-web.eastmoney.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/listApi/, ""),
        },
      },
    },
  });
};
