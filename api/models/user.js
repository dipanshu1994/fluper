const mongoose = require('mongoose');

const userScheema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    likeProduct: {
        type: Array
    },
    unLikeProduct: {
        type: Array
    }
});

module.exports = mongoose.model('user',userScheema);