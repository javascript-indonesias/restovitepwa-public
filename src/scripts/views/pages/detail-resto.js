import UrlParser from '../../routes/url-parser';
import RestoranNetworkSource from '../../data/restoran-netsource';
import {
    createDetailJumbotronTemplate,
    createCardDetailRestoElement,
    generateCommentElement,
} from '../templates/template-creator-detail-resto';
import CommentButtonInitiator from '../../utils/comment-button-initiator';
import ToastModalInitiator from '../../utils/toast-dialog-initiator';
import CarouselDetailHeroInitiator from '../../utils/carousel-detailhero-initiator';
import ProgressbarInitiator from '../../utils/progressbar-initiator';

const DetailResto = {
    async render() {
        return /* html */ `
        <section class="hero-jumbotron">
        </section>
        <section class="description-resto" id="content-resto">
            <div class="title-detail">
                <h1 tabindex="0">Tentang Restoran</h1>
                <hr />
            </div>
        </section>
        `;
    },
    async afterRender() {
        this.contentSection = document.querySelector('#content-resto');

        ToastModalInitiator.init();
        ProgressbarInitiator.init();

        let detailRestoObject = {};
        try {
            await this.showProgressBar(true);
            this.urlObject = UrlParser.parseActiveUrlWithoutCombiner();
            detailRestoObject = await RestoranNetworkSource.getDetailRestoran(
                this.urlObject.id,
            );
        } catch (err) {
            console.log(err);
            await this.showProgressBar(false);
            ToastModalInitiator.showToast('Gagal mengambil data dari internet');
        }

        if (detailRestoObject) {
            await this.createJumbotronCardDetail(detailRestoObject);
            await this.initCommentButton();
            await this.initCarouselHeroBackground(detailRestoObject);
            await this.scrollTopDetailPage();
        } else {
            ToastModalInitiator.showToast(
                'Gagal memuat halaman detail restoran',
            );
        }

        await this.showProgressBar(false);

        this.setupSkipToContent();
    },
    async createJumbotronCardDetail(detailRestoObject) {
        const jumbotronEl = document.querySelector('.hero-jumbotron');
        jumbotronEl.innerHTML = '';
        jumbotronEl.innerHTML +=
            createDetailJumbotronTemplate(detailRestoObject);

        const descriptionEl = document.querySelector('.description-resto');
        const cardDetailEl = await createCardDetailRestoElement(
            detailRestoObject,
        );
        descriptionEl.appendChild(cardDetailEl);
    },
    async initCommentButton() {
        CommentButtonInitiator.init((successDataResponse) => {
            this.renderCommentReviewData(successDataResponse);
        });
        CommentButtonInitiator.setIdRestoranDetail(this.urlObject.id);
    },
    async renderCommentReviewData(datareview) {
        const reviewElementArray = await generateCommentElement(datareview);

        const ratingCommentEl = document.querySelector('.rating-comment');
        ratingCommentEl.innerHTML = '';
        ratingCommentEl.append(...reviewElementArray);
    },
    async initCarouselHeroBackground(detailrestoitem) {
        CarouselDetailHeroInitiator.init(detailrestoitem);
    },
    async scrollTopDetailPage() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },
    setupSkipToContent() {
        const hrefContent = document.querySelector('.skip-content');
        hrefContent.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            this.contentSection.scrollIntoView({ behavior: 'smooth' });
        });
    },
    async showProgressBar(isloading) {
        if (isloading === true) {
            ProgressbarInitiator.showProgressBar();
        } else {
            ProgressbarInitiator.hideProgressBar();
        }
    },
};

export default DetailResto;
