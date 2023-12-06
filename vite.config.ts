import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { VitePWA } from "vite-plugin-pwa";

// // https://vitejs.dev/config/
// export default defineConfig({
// 	plugins: [
// 		react(),
// 		VitePWA({
// 			registerType: "autoUpdate",
// 			devOptions: {
// 				enabled: true,
// 			},
// 			injectRegister: "auto",
// 			strategies: "injectManifest",
// 			srcDir: "src",
// 			filename: "sw-template.js",
// 			workbox: {
// 				runtimeCaching: [
// 					{
// 						urlPattern: /\.svg$/,
// 						handler: "CacheFirst",
// 						options: {
// 							cacheName: "svg-cache",
// 							expiration: {
// 								maxEntries: 10,
// 								maxAgeSeconds: 86400, // 1 día
// 							},
// 						},
// 					},
// 				],
// 			},
// 		}),
// 	],
// });

import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			workbox: {
				clientsClaim: true,
				skipWaiting: true,
				runtimeCaching: [
					{
						urlPattern: /\.svg$/,
						handler: "CacheFirst",
						options: {
							cacheName: "svg-cache",
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 86400, // 1 día
							},
						},
					},
				],
			},
		}),
	],
	server: {
		proxy: {
			'/.netlify/functions': {
				target: 'http://localhost:8888', // Cambia el puerto si es necesario
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/\.netlify\/functions/, ''),
			  },
		},
	}
});
