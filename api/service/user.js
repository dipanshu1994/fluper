const UserValidation = require('../middleware/validation'); 
const UserController = require('../controller/user');

const User = {
    authenticateUser: function(req, res) {
        UserValidation.authUservalidate(req.body)
        .then((validateData) => {
        UserController.authenticateUser(req, res, validateData)
        })
        .catch(err => {
            res.send(err);
        })

    },
    likedAndUnlikedProduct: function(req, res) {
        UserValidation.likedUnlikedValidation(req.body)
        .then(validateData => {
            UserController.likedUnlikedProduct(req, res, validateData)
        })
        .catch(err => {
            res.send(err);
        })
    },
    likedWishListProduct: function(req, res) {
        UserController.likedWishListProduct(req, res)
    }
};

module.exports = User;

