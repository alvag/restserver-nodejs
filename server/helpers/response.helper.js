let successResponse = ( res, response, statusCode = 200 ) => {
    return res.status( statusCode ).json( {
        ok: true,
        response
    } );
};

let errorResponse = ( res, error, statusCode = 400 ) => {
    return res.status( statusCode ).json( {
        ok: false,
        error
    } );
};

module.exports = {
    successResponse,
    errorResponse
};
