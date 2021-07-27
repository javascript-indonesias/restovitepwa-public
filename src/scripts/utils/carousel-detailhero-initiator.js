import FavoriteRestoDb from '../data/favorite-resto-db';
import API_ENDPOINT from '../globals/api-endpoint';

const CarouselDetailHeroInitiator = {
    async init(restoItem) {
        this.favoritedButtonEl = document.querySelector('#liked-button');
        this.favoriteButtonEl = document.querySelector('#like-button');
        this.showMenuButtonEl = document.querySelector('#lihat-menu');
        this.heroImageContainer = document.querySelector('.hero-image');

        this.menuSectionEl = document.querySelector('#content-resto');

        // Inisialisasi awal, sembunyikan tombol fav
        this.favoritedButtonEl.classList.add('hide-fav-icon');
        this.favoriteButtonEl.classList.add('show-fav-icon');

        this.restoItem = restoItem;

        this.setBackgroundCarousel();

        await this.checkFavoriteDbState();
        await this.setListenerButton();
    },
    async checkFavoriteDbState() {
        const { id } = this.restoItem;
        const restoDb = await FavoriteRestoDb.getResto(id);
        const restoDbIsExist = !!restoDb;

        if (restoDbIsExist) {
            this.showButtonFavorited();
        } else {
            this.hideButtonFavorited();
        }
    },
    async setListenerButton() {
        // Tombol favorite true ditekan, maka hapus data dari database
        this.favoritedButtonEl.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            this.removeDataResto();
        });

        // Tombol unfavorite ditekan, tambahkan data ke database
        this.favoriteButtonEl.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            this.saveDataResto();
        });

        // Tombol ke daftar menu
        this.showMenuButtonEl.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            this.menuSectionEl.scrollIntoView({ behavior: 'smooth' });
        });
    },
    showButtonFavorited() {
        // Tampilkan tombol favorite
        this.favoritedButtonEl.classList.remove('hide-fav-icon');
        this.favoritedButtonEl.classList.add('show-fav-icon');

        // Sembunyikan tombol unfavorite
        this.favoriteButtonEl.classList.add('hide-fav-icon');
        this.favoriteButtonEl.classList.remove('show-fav-icon');
    },
    hideButtonFavorited() {
        // Sembuyinkan tombol favorite
        this.favoritedButtonEl.classList.remove('show-fav-icon');
        this.favoritedButtonEl.classList.add('hide-fav-icon');

        // Tampilkan tombol unfavorite
        this.favoriteButtonEl.classList.add('show-fav-icon');
        this.favoriteButtonEl.classList.remove('hide-fav-icon');
    },
    async saveDataResto() {
        try {
            if (this.restoItem.id) {
                await FavoriteRestoDb.putResto(this.restoItem);
                await this.checkFavoriteDbState();
            }
        } catch (err) {
            console.log(err);
        }
    },
    async removeDataResto() {
        try {
            await FavoriteRestoDb.deleteResto(this.restoItem.id);
            await this.checkFavoriteDbState();
        } catch (err) {
            console.log(err);
        }
    },
    setBackgroundCarousel() {
        const imageUrlLarge = API_ENDPOINT.LARGEIMAGE(this.restoItem.pictureId);
        this.heroImageContainer.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)),
        url('${imageUrlLarge}')`;
    },
};

export default CarouselDetailHeroInitiator;
