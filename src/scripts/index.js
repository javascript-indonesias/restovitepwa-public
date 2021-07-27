import 'regenerator-runtime';
import '../styles/main-page.css';
import '../styles/explore-resto.css';
import '../styles/carousel-hero.css';
import '../styles/detail-resto.css';
import '../styles/snackbar-toast.css';
import '../styles/progress-loading.css';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import App from './views/app';

const app = new App({
    button: document.querySelector('.toggle-menus'),
    drawer: document.querySelector('.menu'),
    content: document.querySelector('.content'),
});

window.addEventListener('hashchange', () => {
    try {
        app.renderPage();
    } catch (err) {
        console.log(err);
    }
});

window.addEventListener('load', () => {
    try {
        if (window.location.hash && window.location.hash.length > 0) {
            app.renderPage();
        } else {
            window.location.replace('/#/');
            // window.location.replace('/resto-vite-demo/#/'); // Untuk Github pages
        }
    } catch (err) {
        console.log(err);
    }
});

// Check that service workers are supported
if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        try {
            navigator.serviceWorker.register('/sw-worker.js'); // Untuk debug dan deploy biasa
            // navigator.serviceWorker.register('/resto-vite-demo/sw-worker.js'); // Deploy ke Github pages
        } catch (err) {
            console.log(err);
        }
    });
}

export default app;
