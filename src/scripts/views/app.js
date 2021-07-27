import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
    constructor({ button, drawer, content }) {
        this.button = button;
        this.drawer = drawer;
        this.content = content;

        this.initialAppShell();
    }

    initialAppShell() {
        DrawerInitiator.init({
            button: this.button,
            drawer: this.drawer,
            content: this.content,
        });
    }

    async renderPage() {
        try {
            const url = UrlParser.parseActiveUrlWithCombiner();
            const page = routes[url];
            this.content.innerHTML = await page.render();
            await page.afterRender();
        } catch (err) {
            console.log(err);
            // Tampilkan informasi disini atau arahkan ke halaman utama
            window.location.replace('/#/');
            // window.location.replace('/resto-vite-demo/#/'); // Untuk Github pages
        }
    }
}

export default App;
