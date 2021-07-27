/* eslint-disable no-underscore-dangle */
import { registerRoute } from 'workbox-routing';
import {
    NetworkFirst,
    StaleWhileRevalidate,
    CacheFirst,
} from 'workbox-strategies';

// Used for filtering matches based on status code, header, or both
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
// Used to limit entries in cache, remove entries after a certain period of time
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';

// Use with precache injection
// eslint-disable-next-line no-restricted-globals
precacheAndRoute(self.__WB_MANIFEST);

// Cache page navigations (html) with a Network First strategy
registerRoute(
    // Check to see if the request is a navigation to a new page
    ({ request }) => request.mode === 'navigate',
    // Use a Network First caching strategy
    new NetworkFirst({
        // Put all cached files in a cache named 'pages'
        cacheName: 'pages',
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    }),
);

// Google Fonts Cache and Fontawesome
registerRoute(
    'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Roboto:wght@400;500&display=swap',
    new CacheFirst({
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200, 201],
            }),
        ],
    }),
);

registerRoute(
    'https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap',
    new CacheFirst({
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200, 201],
            }),
        ],
    }),
);

registerRoute(
    'https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css',
    new CacheFirst({
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200, 201],
            }),
        ],
    }),
);

// registerRoute(
//     'https://use.fontawesome.com/b070c8f1df.js',
//     new CacheFirst({
//         plugins: [
//             new CacheableResponsePlugin({
//                 statuses: [0, 200, 201],
//             }),
//         ],
//     }),
// );

// registerRoute(
//     'https://use.fontawesome.com/b070c8f1df.css',
//     new CacheFirst({
//         plugins: [
//             new CacheableResponsePlugin({
//                 statuses: [0, 200, 201],
//             }),
//         ],
//     }),
// );

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
registerRoute(
    // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
    ({ request }) =>
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'worker',
    // Use a Stale While Revalidate caching strategy
    new StaleWhileRevalidate({
        // Put all cached files in a cache named 'assets'
        cacheName: 'assets',
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    }),
);

// Cache images with a Cache First strategy
registerRoute(
    // Check to see if the request's destination is style for an image
    ({ request }) => request.destination === 'image',
    // Use a Cache First caching strategy
    new CacheFirst({
        // Put all cached files in a cache named 'images'
        cacheName: 'images',
        plugins: [
            // Ensure that only requests that result in a 200 status are cached
            new CacheableResponsePlugin({
                statuses: [200],
            }),
            // Don't cache more than 50 items, and expire them after 30 days
            new ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
            }),
        ],
    }),
);

// Cache http request and api response
registerRoute(
    'https://restaurant-api.dicoding.dev',
    new CacheFirst({
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200, 201],
            }),
        ],
    }),
);

registerRoute(
    ({ url }) =>
        url.origin === 'https://restaurant-api.dicoding.dev' &&
        url.pathname.startsWith('/images/'),
    new CacheFirst({
        cacheName: 'image-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200, 201],
            }),
        ],
    }),
);

registerRoute(
    ({ url }) => url.origin === 'https://restaurant-api.dicoding.dev',
    new CacheFirst({
        cacheName: 'api-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200, 201],
            }),
        ],
    }),
);
