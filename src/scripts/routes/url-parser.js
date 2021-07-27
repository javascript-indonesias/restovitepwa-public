const UrlParser = {
    // Penggunaan slice
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    // Penggunaan location hash
    // https://www.w3schools.com/jsref/prop_loc_hash.asp
    parseActiveUrlWithCombiner() {
        const url = window.location.hash.slice(1).toLowerCase();
        const splitedUrl = this.urlSplitter(url);
        // Tes hasil split url
        console.log(url); // /upcoming
        console.log(splitedUrl); // { resource: "upcoming", id: null, verb: null }
        console.log(this.urlCombiner(splitedUrl)); // /upcoming
        return this.urlCombiner(splitedUrl);
    },

    parseActiveUrlWithoutCombiner() {
        const url = window.location.hash.slice(1).toLowerCase();
        return this.urlSplitter(url);
    },

    urlSplitter(url) {
        // const urlContoh = '/hello/world/';
        const urlsSplits = url.split('/');
        // Tes hasil split url
        // console.log('urlSplits', urlsSplits, urlContoh.split('/')); // [ "", "hello", "world", "" ]
        return {
            resource: urlsSplits[1] || null,
            id: urlsSplits[2] || null,
            verb: urlsSplits[3] || null,
        };
    },

    urlCombiner(splitedUrl) {
        return (
            (splitedUrl.resource ? `/${splitedUrl.resource}` : '/') +
            (splitedUrl.id ? '/:id' : '') +
            (splitedUrl.verb ? `/${splitedUrl.verb}` : '')
        );
    },
};

export default UrlParser;
