/* eslint-disable no-undef */
const assert = require('assert');

Feature('Favorite Restaurant');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('showing empty favorited restaurant', async ({ I }) => {
    I.see('Daftar restoran favorit masih kosong', '#toasts');
    I.seeElement('.toast-container');
    I.seeElement('#toasts');

    const listFavRestoElement = locate('.list-resto');
    const listTextElement = await I.grabHTMLFrom(listFavRestoElement);

    assert.strictEqual(listTextElement, '');
});

Scenario('liking one restaurant', async ({ I }) => {
    I.see('Daftar restoran favorit masih kosong', '#toasts');

    I.amOnPage('/');

    I.seeElement('.desc-card h2 a');

    const firstResto = locate('.desc-card h2 a').first();
    const firstRestoTitle = await I.grabTextFrom(firstResto);

    I.click(firstResto);

    I.seeElement('#like-button');
    I.click('#like-button');

    I.amOnPage('/#/favorite');
    I.seeElement('.list-resto');
    I.seeElement('.card');

    const favoritedRestoTitle = await I.grabTextFrom('.card .desc-card h2 a');

    assert.strictEqual(firstRestoTitle, favoritedRestoTitle);
});

Scenario('cancel liking one restaurant', async ({ I }) => {
    I.see('Daftar restoran favorit masih kosong', '#toasts');

    I.amOnPage('/');
    I.seeElement('.desc-card h2 a');
    const firstResto = locate('.desc-card h2 a').first();
    const firstRestoTitle = await I.grabTextFrom(firstResto);
    I.click(firstResto);

    I.seeElement('#like-button');
    I.click('#like-button');

    // Favorited Page
    I.amOnPage('/#/favorite');
    I.seeElement('.list-resto');
    I.seeElement('.card');

    const firstFavResto = locate('.card .desc-card h2 a').first();
    const favoritedRestoTitle = await I.grabTextFrom(firstFavResto);
    assert.strictEqual(firstRestoTitle, favoritedRestoTitle);

    I.click(firstFavResto);

    I.seeElement('#liked-button');
    I.click('#liked-button');

    // Balik ke halaman favorite
    I.amOnPage('/#/favorite');
    I.seeElement('.list-resto');
    I.see('Daftar restoran favorit masih kosong', '#toasts');
    I.seeElement('.toast-container');
    I.seeElement('#toasts');

    const listFavRestoElement = locate('.list-resto');
    const listTextElement = await I.grabHTMLFrom(listFavRestoElement);

    assert.strictEqual(listTextElement, '');
});
