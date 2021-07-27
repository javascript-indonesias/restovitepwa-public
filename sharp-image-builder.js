// eslint-disable-next-line import/no-extraneous-dependencies
const sharp = require('sharp');
const fspromise = require('fs').promises;
const path = require('path');

// if (!fs.existsSync(destination)) {
//     fs.mkdirSync(destination);
// }

const target = path.resolve(__dirname, 'src/public/raw-images');
const destination = path.resolve(__dirname, 'src/public/images');

function generateResizedImageFile() {
    let imageFilesData = [];
    fspromise
        .readdir(target)
        .then((imagefiles) => {
            imageFilesData = imagefiles;
            const listPromiseImgLarge = [];

            // mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
            imagefiles.forEach((image) => {
                const promiseSharp = sharp(`${target}/${image}`)
                    .resize(800)
                    .toFile(
                        path.resolve(
                            __dirname,
                            `${destination}/${image
                                .split('.')
                                .slice(0, -1)
                                .join('.')}-large.jpg`,
                        ),
                    );
                listPromiseImgLarge.push(promiseSharp);
            });

            return Promise.all(listPromiseImgLarge);
        })
        .then((resultImageLarges) => {
            console.log('result image large', resultImageLarges);

            // mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
            const listPromiseImgSmall = [];
            imageFilesData.forEach((image) => {
                const promiseSharp = sharp(`${target}/${image}`)
                    .resize(480)
                    .toFile(
                        path.resolve(
                            __dirname,
                            `${destination}/${image
                                .split('.')
                                .slice(0, -1)
                                .join('.')}-small.jpg`,
                        ),
                    );

                listPromiseImgSmall.push(promiseSharp);
            });

            return Promise.all(listPromiseImgSmall);
        })
        .then((resultImageSmalls) => {
            console.log('resulted image small', resultImageSmalls);
        })
        .catch((error) => {
            console.log(error);
        });
}

function createDirectory() {
    fspromise
        .mkdir(destination, { recursive: true })
        .then(() => {
            generateResizedImageFile();
        })
        .catch((err) => {
            console.log('error create directory', err);
        });
}

function checkDirectory() {
    fspromise
        .stat(destination)
        .then((resultStat) => {
            if (resultStat.isDirectory()) {
                return Promise.resolve(true);
            }
            return fspromise.mkdir(destination);
        })
        .then(() => {
            generateResizedImageFile();
        })
        .catch((err) => {
            console.log('directory or file not available', err);
            createDirectory();
        });
}

checkDirectory();
