import CONFIG from '../../globals/config';

const createHeroJumbotronTemplate = () => /* html */ `
    <div class="hero-image">
        <div class="hero-text-desc">
            <h1>Selamat Datang di RestoVite</h1>
            <p>
                Layanan pesan antar untuk makanan olahan siap masak
                dan makanan cepat saji
            </p>
            <button class="hero-button" tabindex="0" id="pesan-langsung-button">
                Pesan Langsung
            </button>
        </div>
    </div>
    `;

const createRestoranItemTemplate = (restoitem) => {
    let ratingRestoClass = 'rating-card-green';
    const ratingResto = Number.parseFloat(restoitem.rating);
    if (ratingResto <= 4.5) {
        ratingRestoClass = 'rating-card-red';
    }
    // Pasang ekstensi es6 string html untuk rendering string template literal lebih jelas
    // https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html
    // <a tabindex="0" href="${`/#/detail/${restoitem.id}`}">
    return /* html */ `
    <div class="card" tabindex="0">
        <div class="image-covers">
            <img
                data-src="${CONFIG.BASE_IMAGE_URL_MEDIUM}${restoitem.pictureId}"
                alt="Gambar restoran ${restoitem.name}"
                loading="lazy"
                class="lazyload"
            />
        </div>
        <div class="desc-card">
            <h2>
                <a tabindex="0" href="${`/#/detail/${restoitem.id}`}">
                ${restoitem.name}
                </a>
            </h2>
            <span class="city-name" tabindex="0">${restoitem.city}</span>
            <p  tabindex="0">${restoitem.description}</p>
        </div>
        <div class="${ratingRestoClass}">
            <div class="stat"
            aria-label="rating restoran" aria-label="rating restoran" tabindex="0">
                <div class="value-rating" tabindex="0">${restoitem.rating}</div>
                <div class="type-rating">rating</div>
            </div>
        </div>
    </div>
    `;
};

// Khusus untuk deploy ke Github pages, karena routing URL nya berbeda
const createRestoranItemTemplateGithubPages = (restoitem) => {
    let ratingRestoClass = 'rating-card-green';
    const ratingResto = Number.parseFloat(restoitem.rating);
    if (ratingResto <= 4.5) {
        ratingRestoClass = 'rating-card-red';
    }
    // Pasang ekstensi es6 string html untuk rendering string template literal lebih jelas
    // https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html
    return /* html */ `
    <div class="card" tabindex="0">
        <div class="image-covers">
            <img
                data-src="${CONFIG.BASE_IMAGE_URL_MEDIUM}${restoitem.pictureId}"
                alt="Gambar restoran ${restoitem.name}"
                loading="lazy"
                class="lazyload"
            />
        </div>
        <div class="desc-card">
            <h2>
                <a tabindex="0" href="${`/resto-vite-demo/#/detail/${restoitem.id}`}">
                ${restoitem.name}
                </a>
            </h2>
            <span class="city-name" tabindex="0">${restoitem.city}</span>
            <p  tabindex="0">${restoitem.description}</p>
        </div>
        <div class="${ratingRestoClass}">
            <div class="stat"
            aria-label="rating restoran" aria-label="rating restoran" tabindex="0">
                <div class="value-rating" tabindex="0">${restoitem.rating}</div>
                <div class="type-rating">rating</div>
            </div>
        </div>
    </div>
    `;
};

export {
    createHeroJumbotronTemplate,
    createRestoranItemTemplate,
    createRestoranItemTemplateGithubPages,
};
