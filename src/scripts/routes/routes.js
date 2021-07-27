import BerandaResto from '../views/pages/beranda-resto';
import DetailResto from '../views/pages/detail-resto';
import FavoriteResto from '../views/pages/favorite-resto';

const routes = {
    '/': BerandaResto, // default page
    '/beranda': BerandaResto,
    '/detail/:id': DetailResto,
    '/favorite': FavoriteResto,
};

export default routes;
