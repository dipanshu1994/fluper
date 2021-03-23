const JWT = require('jsonwebtoken');
const Config = require('../config/config');
const UserModel = require('../models/user');

const Auth = {
    checkAuth: function(req, res, next) {
        let token = req.headers.authorization.split('Bearer ')[1];
        JWT.verify(token,Config.secretKey, (err, decodedValue) => {
            if(err) {
                res.send({
                    success: false,
                    msg: 'User Not Authenticated'
                })
            } else {
                UserModel.findOne({
                    email: decodedValue.email
                })
                .then((result) => {
                    if(result) {
                        req.userData = result;
                        next();
                    } else {
                        throw new Error('User Not Authenticated');
                    }
                })
                .catch(() => {
                    res.send({
                        success: false,
                        msg: 'User Not Authenticated'
                    })
                })
            }
        });
    }
};

module.exports = Auth
