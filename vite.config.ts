import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	server: {
		proxy: {
			"/api": {
				// use hard-coded url for ghloc server in dev
				target: "http://localhost:8080/pajecawav/ghloc-cli-ui/master",
				rewrite: path => {
					const url = new URL(path, "http://localhost:3000");
					return url.search;
				},
			},
		},
	},
});
