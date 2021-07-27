import FavoriteRestoDb from '../../data/favorite-resto-db';
import { createRestoranItemTemplate } from '../templates/template-creator-resto';
import NavbarStatusHelper from '../../utils/navbar-status-helper';
import ToastModalInitiator from '../../utils/toast-dialog-initiator';

const FavoriteResto = {
    async render() {
        return /* html */ `
        <div class="subheader-title favorite-resto-header">
            <h1 tabindex="0">Restoran Favorit</h1>
            <hr />
        </div>
        <section class="explore-resto" id="content-resto">
        </section>
    `;
    },
    async afterRender() {
        const restoContainer = document.querySelector('.explore-resto');
        this.contentSection = document.querySelector('#content-resto');

        NavbarStatusHelper.init();
        ToastModalInitiator.init();

        const listRestoranTemplate = [];
        const listFavorites = await FavoriteRestoDb.getAllRestos();
        listFavorites.forEach((item) => {
            const restoItemElement = createRestoranItemTemplate(item);
            listRestoranTemplate.push(restoItemElement);
        });

        const divListResto = document.createElement('div');
        divListResto.classList.add('list-resto');
        if (listRestoranTemplate.length > 0) {
            listRestoranTemplate.forEach((element) => {
                divListResto.innerHTML += element;
            });
        }
        restoContainer.innerHTML = '';
        restoContainer.appendChild(divListResto);

        if (!listFavorites || listFavorites.length === 0) {
            ToastModalInitiator.showToast(
                'Daftar restoran favorit masih kosong',
            );
        }

        this.setStatusNavbarActive();
        this.setupSkipToContent();
    },
    setStatusNavbarActive() {
        NavbarStatusHelper.setActiveStatusNavbar(1);
    },
    setupSkipToContent() {
        const hrefContent = document.querySelector('.skip-content');
        hrefContent.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            this.contentSection.scrollIntoView({ behavior: 'smooth' });
        });
    },
};

export default FavoriteResto;
