import {
    createHeroJumbotronTemplate,
    createRestoranItemTemplate,
} from '../templates/template-creator-resto';
import RestoranNetworkSource from '../../data/restoran-netsource';
import ProgressbarInitiator from '../../utils/progressbar-initiator';
import NavbarStatusHelper from '../../utils/navbar-status-helper';
import ToastModalInitiator from '../../utils/toast-dialog-initiator';

const BerandaResto = {
    async render() {
        return /* html */ `
        <section class="hero-jumbotron">
        </section>
        <div class="subheader-title">
            <h1 tabindex="0">Jelajahi Restoran Terdekat</h1>
            <hr />
        </div>
        <section class="explore-resto" id="content-resto">
        </section>
        `;
    },
    async afterRender() {
        const heroContainer = document.querySelector('.hero-jumbotron');
        const restoContainer = document.querySelector('.explore-resto');
        this.contentSection = document.querySelector('#content-resto');

        ProgressbarInitiator.init();
        NavbarStatusHelper.init();
        ToastModalInitiator.init();

        let listRestoranTemplate = [];

        await this.showProgressBar(true);
        try {
            // Ambil data restoran
            const listRestoran = await RestoranNetworkSource.getListRestoran();

            listRestoran.forEach((item) => {
                const restoItemElement = createRestoranItemTemplate(item);
                listRestoranTemplate.push(restoItemElement);
            });
        } catch (err) {
            console.log(err);
            listRestoranTemplate = [];
            ToastModalInitiator.showToast('Gagal mengambil daftar restoran');
        }
        await this.showProgressBar(false);

        const divListResto = document.createElement('div');
        divListResto.classList.add('list-resto');
        if (listRestoranTemplate.length > 0) {
            listRestoranTemplate.forEach((element) => {
                divListResto.innerHTML += element;
            });
        }
        restoContainer.innerHTML = '';
        restoContainer.appendChild(divListResto);

        // Jumbotron element
        const heroJumbotronElement = createHeroJumbotronTemplate();
        heroContainer.innerHTML = heroJumbotronElement;

        this.pesanButtonSectionEl = document.querySelector(
            '#pesan-langsung-button',
        );
        await this.setupSkipToContent();
        await this.setupPesanMenuButton();

        this.setStatusNavbarActive();
    },
    async setupSkipToContent() {
        const hrefContent = document.querySelector('.skip-content');
        hrefContent.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            this.contentSection.scrollIntoView({ behavior: 'smooth' });
        });
    },
    async setupPesanMenuButton() {
        this.pesanButtonSectionEl.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            this.contentSection.scrollIntoView({ behavior: 'smooth' });
        });
    },
    async showProgressBar(isloading = false) {
        if (isloading === true) {
            ProgressbarInitiator.showProgressBar();
        } else {
            ProgressbarInitiator.hideProgressBar();
        }
    },
    setStatusNavbarActive() {
        NavbarStatusHelper.setActiveStatusNavbar(0);
    },
};

export default BerandaResto;
