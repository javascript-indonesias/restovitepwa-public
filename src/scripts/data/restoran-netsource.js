import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class RestoranNetworkSource {
    static async getListRestoran() {
        try {
            const response = await fetch(API_ENDPOINT.LIST_RESTO);
            const jsondata = await response.json();
            return jsondata.restaurants;
        } catch (err) {
            return Promise.reject(
                new Error(`Gagal mengolah data request ${err}`),
            );
        }
    }

    static async getDetailRestoran(id = 0) {
        try {
            const response = await fetch(API_ENDPOINT.DETAIL_RESTO(id));
            const jsondata = await response.json();
            return jsondata.restaurant;
        } catch (err) {
            return Promise.reject(
                new Error(`Gagal mengolah data request ${err}`),
            );
        }
    }

    static async sendCommentReview({ id, name, review }) {
        const request = fetch(API_ENDPOINT.SENDREVIEW, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-Auth-Token': CONFIG.APIKEY_RESTO,
            },
            body: JSON.stringify({
                id,
                name,
                review,
            }),
        }).then((response) => response.json());

        const dataResponseReview = await request;

        if (dataResponseReview.error === false) {
            return Promise.resolve(dataResponseReview);
        }
        return Promise.reject(new Error('Gagal mengirim komentar review'));
    }
}

export default RestoranNetworkSource;
