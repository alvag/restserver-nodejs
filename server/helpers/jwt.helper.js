const jwt = require( 'jsonwebtoken' );

const createToken = (payload) => {
    return jwt.sign({
        user: payload
    }, process.env.TOKEN_SECRET_KEY, {expiresIn: process.env.TOKEN_EXPIRES})
};

const decodeToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            let payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
            resolve(payload);
        } catch (e) {
            reject( e );
        }
    });
};

module.exports = {
  createToken,
    decodeToken
};
