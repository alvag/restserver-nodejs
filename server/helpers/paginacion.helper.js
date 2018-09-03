const paginar = (path, total, pag, cant) => {
    let url = process.env.APP_URL;
    let pages = Math.ceil(total / cant);
    let _pag = pag + 1;
    let nextPage;
    if (pag < pages) {
        nextPage = url + path + '?pag=' + _pag + '&cant=' + cant;
    }

    let previousPage;
    _pag = pag - 1;
    if (_pag > 0) {
        previousPage = url + path + '?pag=' + _pag + '&cant=' + cant;
    }

    return { total, pages, currentPage: pag, nextPage, previousPage };
};

module.exports = {
    paginar
};
