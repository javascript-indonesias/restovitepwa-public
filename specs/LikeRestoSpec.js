/* eslint-disable no-undef */
import { createDetailJumbotronTemplate } from '../src/scripts/views/templates/template-creator-detail-resto';
import CarouselDetailHeroInitiator from '../src/scripts/utils/carousel-detailhero-initiator';
import FavoriteRestoDb from '../src/scripts/data/favorite-resto-db';

describe('Favorite A Restaurant', () => {
    const objectDataResto = {
        id: '10',
        name: 'Kafe Kita',
        city: 'Bandung',
        address: 'Bandung',
    };

    const createJumbotronContainer = (objectdata = {}) => {
        document.body.innerHTML = /* html */ `
        <section class="hero-jumbotron">
        </section>
        `;

        const jumbotronEl = document.querySelector('.hero-jumbotron');

        jumbotronEl.innerHTML = createDetailJumbotronTemplate(objectdata);
    };

    // Test menampilkan tombol like
    it('should show favorite button when restaurant has not been favorited before', async () => {
        createJumbotronContainer(objectDataResto);

        await CarouselDetailHeroInitiator.init(objectDataResto);

        const favoriteButton = document.querySelector('#like-button');
        const favoritedButton = document.querySelector('#liked-button');
        expect(favoriteButton.classList.contains('show-fav-icon')).toBeTruthy();
        expect(
            favoritedButton.classList.contains('hide-fav-icon'),
        ).toBeTruthy();
    });

    // Test tidak menampilkan tombol like tapi tombol liked yang sudah disukai
    it('should not show favorited button when restaurant has not been favorited before', async () => {
        createJumbotronContainer(objectDataResto);

        await CarouselDetailHeroInitiator.init(objectDataResto);

        const favoriteButton = document.querySelector('#like-button');
        const favoritedButton = document.querySelector('#liked-button');

        expect(favoriteButton.classList.contains('show-fav-icon')).toBeTruthy();
        expect(favoritedButton.classList.contains('show-fav-icon')).toBeFalsy();
    });

    // Dapat menyukai sebuah restoran
    it('should be able to favorite a restaurant', async () => {
        createJumbotronContainer(objectDataResto);

        await CarouselDetailHeroInitiator.init(objectDataResto);

        const favoriteButton = document.querySelector('#like-button');
        favoriteButton.dispatchEvent(new Event('click'));

        const restoDb = await FavoriteRestoDb.getResto('10');
        expect(restoDb).toEqual(objectDataResto);

        await FavoriteRestoDb.deleteResto('10');
    });

    // Tidak menambahkan restoran jika telah di like sebelumnya
    it('should not add a restaurant again when its already favorited', async () => {
        createJumbotronContainer(objectDataResto);

        // Insert restaurant
        await FavoriteRestoDb.putResto(objectDataResto);

        CarouselDetailHeroInitiator.init(objectDataResto);

        const favoriteButton = document.querySelector('#like-button');
        favoriteButton.dispatchEvent(new Event('click'));

        const listRestoDb = await FavoriteRestoDb.getAllRestos();
        expect(listRestoDb).toEqual([{ ...objectDataResto }]);

        await FavoriteRestoDb.deleteResto('10');
    });

    // Tidak menambahkan restoran jika tidak ada ID
    it('should not add a restaurant when it has no id', async () => {
        createJumbotronContainer();

        await CarouselDetailHeroInitiator.init({});

        const favoriteButton = document.querySelector('#like-button');
        favoriteButton.dispatchEvent(new Event('click'));

        const listRestoDb = await FavoriteRestoDb.getAllRestos();
        expect(listRestoDb).toEqual([]);
    });
});
