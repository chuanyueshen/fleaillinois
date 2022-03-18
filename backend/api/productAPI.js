var express = require('express');
router = express.Router();

var Product = require('../models/product');
var User = require('../models/user');

function parseQuery(condition) {
    if (typeof condition !== 'undefined'){
        return JSON.parse(condition);
    }
    return condition;
}

function parseQuery_where(condition) {
    if (typeof condition !== 'undefined'){
        var temp = JSON.parse(condition)
        temp.productName = new RegExp(temp.productName, "i")
        return temp;
    }
    return condition;
}

router.get('/', function(req, res) {
    Product.find(parseQuery_where(req.query.where))
        .sort(parseQuery(req.query.sort))
        .select(parseQuery(req.query.select))
        .skip(parseQuery(req.query.skip))
        .limit(parseQuery(req.query.limit))
        .exec()
        .then(products => {
            if(products){
                if(req.query.count){
                    return res.status(200).json({
                        message: "OK", 
                        data: products.length
                    });
                }
                if(products.length == 0){
                    return res.status(404).json({
                        message: "Product not found",
                        data: []
                    });
                }
                return res.status(200).json({
                    message: "OK", 
                    data: products
                });
            }

        })
        .catch(err => {
            return res.status(500).json({
                message: "Server Error",
                data: err
            });
        })
});

router.get('/:id', function(req, res) {
    Product.findById(req.params.id, function(err, targetProduct){
        if(targetProduct){
            return res.status(200).json({
                message: "OK",
                data: targetProduct
            });
        }else if(err){
            if (err.name == "CastError") {
                return res.status(400).json({
                    message:"Product id is invalid", 
                    data: {"Invalid id is": req.params.id}
                });
            }
            return res.status(500).json({
                message: "Server error",
                data: err
            });
        }else{
            return res.status(404).json({
                message: "Product not found",
                data: []
            });
        }
    });
});

router.post('/', function(req, res) {
    if (!req.body.name || !req.body.sellerID || !req.body.price) {
        return res.status(400).json({
            message:'Post request need product name, seller id and price', 
            data: []
        });
    }
    const newProduct = {
        productName: req.body.name, // must have
        productDescription: req.body.description,
        productPrice: req.body.price, // must have
        productImage: req.body.image,
        sellerID: req.body.sellerID, // must have
        forSell: true, // while posting, every product is selling
        commentList: req.body.commentList
    }

    Product.create(newProduct)
    .then(postRes => {
        return res.status(201).json({
            message: "Product successfully created", 
            data: postRes
        })
    })
    .catch(err => {
        return res.status(500).json({
            message: "Server Error",
            data: err
        });
    });
    //sellerID = uid, which is provided by firebase

    // User.findById(req.body.sellerID, function(userErr, targetUser){
    //     if(targetUser){ // every product must have a valid seller
    //         Product.create(newProduct)
    //             .then(postRes => {
    //                 return res.status(201).json({
    //                     message: "Product successfully created", 
    //                     data: postRes
    //                 })
    //             })
    //             .catch(err => {
    //                 return res.status(500).json({
    //                     message: "Server Error",
    //                     data: err
    //                 });
    //             });
    //     }else if(userErr){ // seller not found or error
    //         if (userErr.name == "CastError") {
    //             return res.status(400).json({
    //                 message:"Seller id is invalid", 
    //                 data: {"Invalid id is": req.body.sellerID}
    //             });
    //         }
    //         return res.status(500).json({
    //             message: "Server error",
    //             data: err
    //         });
    //     }else{
    //         return res.status(404).json({
    //             message: "Seller not found",
    //             data: []
    //         });
    //     }
    // });
});

router.put('/:id', function(req, res) {
    Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedProduct){
        if(updatedProduct){
            if(req.body.sellerID){ // if seller is changed
                User.findById(req.body.sellerID, function(userErr, targetUser){
                    if(userErr || !targetUser){
                        return res.status(400).json({
                            message:"Seller is invalid or not found", 
                            data: []
                        });
                    }
                });
            }
            
            return res.status(201).json({
                message: 'Product updated',
                data: updatedProduct
            });
        }else if(err){
            if (err.name == "CastError") {
                return res.status(400).json({
                    message:"Product id is invalid", 
                    data: {"Invalid id is": req.params.id}
                });
            }
            return res.status(500).json({
                message: "Server error",
                data: err
            });
        }else{
            return res.status(404).json({
                message: "Product not found",
                data: []
            });
        }
    });
});

router.delete('/:id', function(req, res) {
    Product.findByIdAndDelete(req.params.id, function (err, targetProduct){
        if(targetProduct){
            return res.status(200).json({
                message: 'Product deleted',
                data: targetProduct
            });
        }else if(err){
            if (err.name == "CastError") {
                return res.status(400).json({
                    message:"Product id is invalid", 
                    data: {"Invalid id is": req.params.id}
                });
            }
            return res.status(500).json({
                message: "Server error",
                data: err
            });
        }else{
            return res.status(404).json({
                message: "Product not found",
                data: []
            });
        }
    });
});

module.exports = router;
