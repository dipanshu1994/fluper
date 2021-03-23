const UserModel = require('../models/user');
const JWT = require('jsonwebtoken');
const Config = require('../config/config');

const User = {
    authenticateUser: (req, res, data) => {
        let query = {
            email: data.email,
            password: data.password
        }
        UserModel.findOne(query)
            .then((result) => {
                if (result) {
                    res.send({
                        success: true,
                        token: JWT.sign({ email: data.email }, Config.secretKey)
                    })
                } else {
                    throw new Error('Invalid user');
                }
            })
            .catch(() => {
                res.send({
                    succes: false,
                    msg: 'Invalid user'
                })
            })
    },
    likedUnlikedProduct: (req, res, data) => {
        let userId = req.userData._id,
            productId = data._id,
            statusType = data.type;

        let query = {
            _id: userId
        };

        let update;
        if (statusType === 'like') {
            update = {
                $push: {
                    likeProduct: productId
                }
            };
        } else if (statusType === 'unlike') {
            update = {
                $push: {
                    unLikeProduct: productId
                }
            };
        }

        UserModel.findOneAndUpdate(query, update)
            .then(result => {
                res.send({
                    success: true,
                    msg: `${statusType} the product successfully`
                })
            })
            .catch(() => {
                res.send({
                    success: false
                })
            })
    },
    likedWishListProduct: (req, res) => {
        let userId = req.userData._id;
        UserModel.aggregate([
            {
                $match: {
                    _id: userId
                }
            },
            {
                $unwind: "$likeProduct"
            },
            {
                $addFields: { likedproducts: { $toObjectId: "$likeProduct" } },
              },
             
            {
                $lookup: {
                    "from": "products",
                    "localField": "likedproducts",
                    "foreignField": "_id",
                    "as":"products"
                }
            },
            {
                $group: {
                    "_id": "$_id",
                    "products": { "$push": "$products" }
                }
            },
            {
                $project: { 
                    _id: 1,
                    "products.name": 1,
                    "products._id": 1
                }
            }
        ])
            .then((result) => {
                res.send(result);
            })
    }
};

module.exports = User;