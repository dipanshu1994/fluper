const mongoose = require('mongoose');

const productScheema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('product',productScheema);