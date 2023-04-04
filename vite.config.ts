import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx';
import eslintPlugin from "vite-plugin-eslint";
import { resolve } from "path";
const pathResolve = (dir: string): any => {
	return resolve(__dirname, ".", dir);
};
const alias: Record<string, string> = {
	"@": pathResolve("src"),
	"~": pathResolve("public")
};

// https://vitejs.dev/config/
// https://vip.stock.finance.sina.com.cn
export default ({ mode }: { mode: string }) => {
	const envConfig = loadEnv(mode, process.cwd());
	return defineConfig({
		plugins: [
			vue(),
			vueJsx(),
			eslintPlugin({
				include: ["src/**/*.ts", "src/**/*.vue", "src/*.ts", "src/*.vue"],
			}),
		],
		resolve: {
			alias,
		},
	});
};
