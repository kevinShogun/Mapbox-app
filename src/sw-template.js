importScripts(
	"https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute } from 'workbox-routing'

// declare let self: ServiceWorkerGlobalScope

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),
  { denylist: [/^\/backoffice/] },
))


const { registerRoute } = workbox.routing;
const { CacheFirst } = workbox.strategies;

registerRoute(
	// Route
	({ request }) => request.url.endsWith(".css"),
	// Strategy
	new CacheFirst({
		cacheName: "dynamic-css",
		plugins: [
			new ExpirationPlugin({
				maxAgeSeconds: 24 * 60,
			}),
		],
	})
);

registerRoute(
	({ request }) => {
		return request.destination === "image";
	},
	new CacheFirst({
		cacheName: "image-assets",
		plugins: [
			new ExpirationPlugin({
				maxAgeSeconds: 24 * 60,
			}),
		],
	})
);

registerRoute(
	({ request }) => {
		request.url.includes("svg");
	},
	new CacheFirst({
		cacheName: "svg-assets",
		plugins: [
			new ExpirationPlugin({
				maxAgeSeconds: 24 * 60,
			}),
		],
	})
);
