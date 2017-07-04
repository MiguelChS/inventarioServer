let jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //verificamos que se para el path api
    if (/^\/\api+/.test(req.path)) {
        console.log(req.path);
        jwt.verify(req.headers.authorization, 'secretKey', (err, decoded) => {
            if (err) {
                //solo dejar pasar cuando quiere loguearse
                if (req.path == '/api/login') {
                    next();
                } else {
                    res.status(401).send();
                }
            } else {
                next();
            }
        });
    } else {
        next();
    }
}