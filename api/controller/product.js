const Products = require('../models/product');

const Product = {
    insertProduct: (req, res, data) => {
        Products.insertMany(data.products)
            .then(() => {
                res.send({
                    success: true,
                    msg: 'products inserted successfully!!'
                })
            })
            .catch(() => {
                res.send({
                    success: false,
                    msg: 'something went wrong !'
                })
            })
    },
    showProducts: (req, res, data) => {
        Products.find({},{__v: 0})
        .then((productsList) => {
            res.send({
                success: true,
                productsList: productsList
            })
        })
        .catch((error) => {
            res.send({
                success: false,
                msg: 'something went wrong!'
            })
        })
    }
}

module.exports = Product