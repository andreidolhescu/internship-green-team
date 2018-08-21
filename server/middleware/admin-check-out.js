const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token) {
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if(error){
                return res.send({
                message: 'Failed authentification'
            });
            } else {
                if(decoded.admin){
                    req.decoded = decoded;
                    return next();
                }
                return res.send('Sorry you are not an admin!');
            }
        });
    } else {
        return res.status(400).send({
            success: false,
            message: 'No token provided.'
        });
    }
}