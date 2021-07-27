## Deploy ke Github Pages

Ubah public path ke domain repository Github yang dipakai. Ubah di webpack.commond.js
publicPath: '/resto-vite-demo/'

Di dalam file template creator resto, ubah url path ke halaman detail khusus Github Pages.

a href="${`/resto-vite-demo/#/detail/${restoitem.id}`}
<!-- [](<a href="${`/resto-vite-demo/#/detail/${restoitem.id}`}">) -->

Pada halaman index.js, ubah path ke Service Worker JS sw-worker.js untuk path ke domain Github Pages

navigator.serviceWorker.register('/resto-vite-demo/sw-worker.js');
