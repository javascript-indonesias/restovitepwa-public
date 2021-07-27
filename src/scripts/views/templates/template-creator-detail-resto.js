import joinArrayToString from '../../utils/string-array-helper';

const createDetailJumbotronTemplate = (detailrestoran) => /* html */ `
    <div class="hero-image">
        <div class="hero-text-desc">
            <h1 tabindex="0">${detailrestoran.name || 'Belum tersedia'}</h1>
            <p tabindex="0">${detailrestoran.address || 'Belum tersedia'}, ${
    detailrestoran.city || 'Belum tersedia'
}</p>
            <div class="carousel-button-container">
                <button
                    class="hero-button"
                    tabindex="0"
                    id="lihat-menu"
                >
                    Lihat Menu
                </button>
                <button class="fav-button" aria-label="Favoritkan restoran ini" tabindex="0" id="like-button">
                    <i
                        class="fa fa-heart-o"
                        aria-hidden="true"
                    ></i>
                </button>
                <button aria-label="Batalkan favorit restoran ini" class="fav-button" tabindex="0" id="liked-button">
                    <i
                        class="fa fa-heart"
                        aria-hidden="true"
                    ></i>
                </button>
            </div>
        </div>
    </div>
`;

const generateCommentElement = async (dataComment) => {
    const reviewElementArray = [];
    if (dataComment && dataComment.customerReviews) {
        dataComment.customerReviews.forEach((reviewitem) => {
            const templateReview = /* html */ `
            <p class="name-pengunjung">
                ${reviewitem.name}
            </p>
            <p class="komentar-pengunjung">
                ${reviewitem.review}
            </p>
            <p class="tanggal-komentar">
                ${reviewitem.date}
            </p>
            `;

            const templateItem = document.createElement('div');
            templateItem.classList.add('rating-item');
            templateItem.innerHTML += templateReview;

            reviewElementArray.push(templateItem);
        });
    }

    return reviewElementArray;
};

const createRestoDescriptionTemplate = (detailrestoran) => {
    const stringCategories = joinArrayToString(detailrestoran.categories);

    // Bagian deskripsi
    const deskripsiTemplate = /* html */ `
    <div class="description">
        <h1 tabindex="0">
            <i
                class="fa fa-sticky-note icon-header"
                aria-hidden="true"></i>
            Deskripsi
        </h1>
        <p tabindex="0">
            ${detailrestoran.description || 'Deskripsi belum tersedia'}
        </p>
        <p class="genre" tabindex="0">Jenis genre makanan : ${stringCategories}</p>
    </div>`;

    return deskripsiTemplate;
};

const createMenuMakananTemplate = (detailrestoran) => {
    // Menu makanan
    let stringMenuMakanan = '-';
    if (detailrestoran && detailrestoran.menus && detailrestoran.menus.foods) {
        stringMenuMakanan = joinArrayToString(detailrestoran.menus.foods);
    }

    const menuMakananTemplate = /* html */ `
    <div class="menu-makanan">
        <h1 tabindex="0">
            <i
                class="fa fa-cutlery icon-header"
                aria-hidden="true"
            ></i>
            Menu Makanan
        </h1>
        <p tabindex="0">
            ${stringMenuMakanan}
        </p>
    </div>
    `;

    return menuMakananTemplate;
};

const createMenuMinumanTemplate = (detailrestoran) => {
    let stringMenuMinuman = '-';
    if (detailrestoran && detailrestoran.menus && detailrestoran.menus.drinks) {
        stringMenuMinuman = joinArrayToString(detailrestoran.menus.drinks);
    }

    const menuMinumanTemplate = /* html */ `
    <div class="menu-minuman">
        <h1 tabindex="0">
            <i
                class="fa fa-coffee icon-header"
                aria-hidden="true"
            ></i>
            Menu Minuman
        </h1>
        <p tabindex="0">
            ${stringMenuMinuman}
        </p>
    </div>
    `;

    return menuMinumanTemplate;
};

const createCardDetailRestoElement = async (detailrestoran) => {
    // Bagian deskripsi
    const deskripsiTemplate = createRestoDescriptionTemplate(detailrestoran);

    // Menu makanan
    const menuMakananTemplate = createMenuMakananTemplate(detailrestoran);

    // Menu minuman
    const menuMinumanTemplate = createMenuMinumanTemplate(detailrestoran);

    // Halaman komentar
    const headerRatingTemplate = /* html */ `
    <h1 tabindex="0">
        <i
            class="fa fa-star icon-header"
            aria-hidden="true"
        ></i>
        Peringkat dan Review Restoran
    </h1>
    `;

    const ratingTemplate = /* html */ `
        <div class="box-rating" tabindex="0">${detailrestoran.rating}</div>
    `;

    const reviewElementArray = await generateCommentElement(detailrestoran);
    const reviewCommentEl = document.createElement('div');
    reviewCommentEl.classList.add('rating-comment');
    reviewCommentEl.append(...reviewElementArray);

    // Element kirim komentar
    const sendCommentTemplate = /* html */ `
    <section class="send-comment">
        <h1 tabindex="0">Kirim Review Komentar</h1>
        <input
            type="text"
            name="input-name"
            id="input-name"
            class="input-name"
            placeholder="Masukkan nama pengguna"
        />
        <textarea
            name="comment"
            id="input-comment"
            class="input-comment"
            cols="70"
            rows="6"
            placeholder="Masukkan komentar disini"
        ></textarea>
        <div class="button-action">
            <button
                class="button-comment"
                id="button-comment"
                aria-label="Tombol kirim komentar anda"
            >
                Kirim Komentar
            </button>
        </div>
    </section>
    `;

    // Gabungkan element komentar dan rating
    const commentSectionEl = document.createElement('div');
    commentSectionEl.classList.add('comment-container');
    commentSectionEl.appendChild(reviewCommentEl);
    commentSectionEl.innerHTML += sendCommentTemplate;

    const ratingDetailEl = document.createElement('div');
    ratingDetailEl.classList.add('rating-detail');
    ratingDetailEl.innerHTML += ratingTemplate;
    ratingDetailEl.appendChild(commentSectionEl);

    const reviewRestoEl = document.createElement('div');
    reviewRestoEl.classList.add('review-resto');
    reviewRestoEl.innerHTML += headerRatingTemplate;
    reviewRestoEl.appendChild(ratingDetailEl);

    // Gabungkan element deskripsi, menu makanan, menu minuman, dan komentar
    const cardDetailElement = document.createElement('div');
    cardDetailElement.classList.add('card-detail');
    cardDetailElement.innerHTML += deskripsiTemplate;
    cardDetailElement.innerHTML += menuMakananTemplate;
    cardDetailElement.innerHTML += menuMinumanTemplate;
    cardDetailElement.appendChild(reviewRestoEl);

    return cardDetailElement;
};

export {
    createDetailJumbotronTemplate,
    createCardDetailRestoElement,
    generateCommentElement,
    createMenuMakananTemplate,
    createMenuMinumanTemplate,
    createRestoDescriptionTemplate,
};
