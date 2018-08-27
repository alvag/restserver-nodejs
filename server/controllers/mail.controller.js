const { errorResponse, successResponse } = require( '../helpers/response.helper' );

const nodemailer = require( 'nodemailer' );

let verifyAccount = ( res, user ) => {
    const transporter = nodemailer.createTransport( {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    } );

    let mailOptions = {
        from: '"API REST NodeJS" <apirest@maxalva.com>', // sender address
        to: user.email, // list of receivers
        subject: 'Verifica tu correo', // Subject line
        html: getHTMLMessage( user ) // html body
    };

    transporter.sendMail( mailOptions, ( error, response ) => {

        if ( error ) {
            errorResponse( res, error );
        } else {
            successResponse( res, {
                message: 'Por favor verifique su correo electrónico',
                emailLink: nodemailer.getTestMessageUrl( response )
            }, 200 );
        }
    } );
};

function getHTMLMessage( user ) {

    let content = `
        <div style="text-align: center;">
            <h1>Verifica tu correo electrónico</h1>
            <h2><a href="${process.env.APP_URL}/verificar/${user.id}" target="_blank">Click Aquí</a></h2>
        </div>
    `;

    return content;
}

module.exports = {
    verifyAccount
};
