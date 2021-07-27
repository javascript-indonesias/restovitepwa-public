import CONFIG from './config';

const API_ENDPOINT = {
    LIST_RESTO: `${CONFIG.BASE_URL}list`,
    DETAIL_RESTO: (id) => `${CONFIG.BASE_URL}detail/${id}`,
    SENDREVIEW: `${CONFIG.BASE_URL}review`,
    LARGEIMAGE: (imageid) => `${CONFIG.BASE_IMAGE_URL_LARGE}${imageid}`,
};

export default API_ENDPOINT;
