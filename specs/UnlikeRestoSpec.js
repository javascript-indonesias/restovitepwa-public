/* eslint-disable no-undef */
import { createDetailJumbotronTemplate } from '../src/scripts/views/templates/template-creator-detail-resto';
import CarouselDetailHeroInitiator from '../src/scripts/utils/carousel-detailhero-initiator';
import FavoriteRestoDb from '../src/scripts/data/favorite-resto-db';

describe('Unfavorite A Restaurant', () => {
    let favoriteButton = {};
    let favoritedButton = {};

    const getRestoObjectData = (
        id = '10',
        name = 'Kafe Kita',
        city = 'Bandung',
        address = 'Bandung',
    ) => ({
        id,
        name,
        city,
        address,
    });

    const createJumbotronContainer = async (objectData = {}) => {
        document.body.innerHTML = /* html */ `
        <section class="hero-jumbotron">
        </section>
        `;

        const jumbotronEl = document.querySelector('.hero-jumbotron');
        jumbotronEl.innerHTML = createDetailJumbotronTemplate(objectData);
        await CarouselDetailHeroInitiator.init(getRestoObjectData());

        favoriteButton = document.querySelector('#like-button');
        favoritedButton = document.querySelector('#liked-button');
    };

    beforeEach(async () => {
        await FavoriteRestoDb.putResto(getRestoObjectData());
        await createJumbotronContainer(getRestoObjectData());
    });

    afterEach(async () => {
        await FavoriteRestoDb.deleteResto(getRestoObjectData().id);
    });

    it('should display favorited widget when the restaurant has been liked', () => {
        // Tombol favorited show, tombol favorite hidden via css
        expect(favoriteButton.classList.contains('hide-fav-icon')).toBeTruthy();
        expect(
            favoritedButton.classList.contains('show-fav-icon'),
        ).toBeTruthy();
    });

    it('should not display favorite button when the restaurant has been liked', () => {
        expect(favoriteButton.classList.contains('show-fav-icon')).toBeFalsy();
        expect(
            favoritedButton.classList.contains('show-fav-icon'),
        ).toBeTruthy();
    });

    it('should be able to remove favorited restaurant from the list', async () => {
        favoritedButton.dispatchEvent(new Event('click'));

        const listRestoDb = await FavoriteRestoDb.getAllRestos();
        expect(listRestoDb).toEqual([]);
    });

    it('should not throw error if the unliked restaurant is not in the list', async () => {
        // Hapus data restoran yang disimpan
        await FavoriteRestoDb.deleteResto('10');

        favoritedButton.dispatchEvent(new Event('click'));

        const listRestoDb = await FavoriteRestoDb.getAllRestos();
        expect(listRestoDb).toEqual([]);
    });
});
