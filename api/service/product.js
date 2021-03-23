const ProductValidation = require('../middleware/validation');
const ProductController = require('../controller/product');

const Product = {
    insertProduct: function (req, res) {
        ProductValidation.insertProductValidation(req.body)
            .then(validateData => {
                ProductController.insertProduct(req, res, validateData)
            })
            .catch(err => {
                res.send(err)
            })

    },
    showProducts: function (req, res) {
        ProductController.showProducts(req, res, req.body)
    }
};

module.exports = Product;