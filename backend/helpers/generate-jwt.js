const jwt = require('jsonwebtoken');


const generateJWT = (id = '') => {
    return new Promise((resolve, reject) => {

        const payload = { id };

        jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('Token was not generated');
            } else {
                resolve(token);
            }
        });
    })
}


module.exports = generateJWT;