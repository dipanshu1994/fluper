const Joi = require('@hapi/joi');

const Product = {
    insertProductValidation: (body) => {
        let bodyScheema = Joi.object().keys({
            products: Joi.array().required()
        }).required()
        return bodyScheema.validate(body)
    },
    authUservalidate: (body) => {
        let userScheema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
        });
        return userScheema.validate(body);
    },
    likedUnlikedValidation: (body) => {
        let dataScheema = Joi.object().keys({
            type: Joi.string().valid('like', 'unlike').default('like').required(),
            _id: Joi.string().min(10).max(50) .required()
        });
        return dataScheema.validate(body);
    }
};

module.exports = Product;