var User = require('../models/user.js');
var Product = require('../models/product.js');

var express = require('express');
router = express.Router()

router.get('/', function (req, res) {
    var queryWhere = eval("(" + req.query.where + ")");
    var querySort = eval("(" + req.query.sort + ")");
    var querySelect = eval("(" + req.query.select + ")");
    var querySkip = eval("(" + req.query.skip + ")");
    var queryLimit = eval("(" + req.query.limit + ")");
    var queryCount = eval("(" + req.query.count + ")");

    User.find(queryWhere) 
    .sort(querySort)
    .select(querySelect)
    .skip(querySkip)
    .limit(queryLimit)
    .exec()
    .then(function (users) {
        if(queryCount) {
            return res.status(200).send({
                message: 'Users count retrieved',
                data: users.length
            });
        } else if (users.length == 0) {
            return res.status(404).send({
                message: "Users not found",
                data: []
            });
        } else {
        
            return res.status(200).send({
                message: 'Users retrieved',
                data: users
            });
        }
    })
    .catch(function (error) {
        return res.status(500).send({
            message: 'Server error',
            data: []
        });
    });
});

router.get('/:id', function(req, res) {
    User.findOne({'uid' : req.params.id}).exec()

    .then(function(user) {
        if(user == null) {
            return res.status(404).send({
                message: 'Cannot GET, user not exist',
                data: []
            });
        } else {
            return res.status(200).send({
                message: 'User info retrieved',
                data: user
            });
        }
    })
    .catch(function(error) {
        return res.status(500).send({
            message: 'Server error',
            data: []
        });
    });
});

router.post('/', function (req, res) {
    var newUser = new User();

    if('name' in req.body && req.body.name !== undefined) {
        newUser.name = req.body.name;
    } else {
        return res.status(400).send({
            message: 'Name is required',
            data: []
        });
    }

    var inputEmail = req.body.email; 
    if ('email' in req.body && req.body.email !== undefined) {
        User.findOne({email: req.body.email}).exec()
        .then(function (match){
            if (match == null) {
                newUser.email = req.body.email; 
                newUser.uid = req.body.uid;
                const temp = inputEmail.split('@');
                var len = temp.length;
                if(temp[len-1] == "illinois.edu"){
                    newUser.verified = true;
                }
                if('phoneNumber' in req.body && req.body.phoneNumber !== undefined){
                    newUser.phoneNumber = req.body.phoneNumber;
                }
                if('profileImage' in req.body && req.body.profileImage !== undefined){
                    newUser.profileImage = req.body.profileImage;
                }
                newUser.save()
                .then(function (data) {
                    res.status(201).send({
                        message: "New user created",
                        data: data
                    });
                });                      
            } else if (match !== null) {
                return res.status(400).send({
                    message: "Email has duplicate",
                    data: []
                });
            }
        })
        .catch(function (error){
            return res.status(500).send({
                message: 'Server error 1',
                data: []
        })
    });   
    
    } else {

        return res.status(400).send({
            message: 'Email is required',
            data: []
        });
    };

});

router.delete('/:id', function(req, res) {
    
    User.findById(req.params.id).exec()
    
    .then(function(user) {
        if(user == null) {
            return res.status(404).send({
                message: 'Cannot DELETE, user not exist',
                data: []
            });
        } 
        else if (user != null) {
            Product.updateMany(
                {buyerID: user.id}, {buyerID: "", buyerName: ""}
            )
            .then(function(){
                Product.updateMany(
                    {sellerID: user.id}, {sellerID: "", sellerName: "",}
                ).then(function(){
                    Product.deleteMany(
                        {sellerID: ""}
                    ).then(function(){
                        user.delete()
                        .then(function() {
                            return res.status(200).send({
                                message: 'User deleted, product related info updated',
                                data: []
                            });
                        })
                        .catch(function(error){
                            return res.status(500).send({
                                message: "Unexpected error during DELETE",
                                data: []
                            });
                        });

                    })
                    .catch(function(error) {
                        return res.status(500).send({
                            message: "Unexpected error during DELETE products when Seller is deleted",
                            data: []
                        });
                    })
                })
                .catch(function(error) {
                    return res.status(500).send({
                        message: "Unexpected error during UPDATE Seller",
                        data: []
                    });
                })
            })
            .catch(function(error){
                return res.status(500).send({
                    message: "Unexpected error during UPDATE Buyer",
                    data: []
                });  

            })
        }
    })
    .catch(function(error) {
        return res.status(500).send({
            message: 'Server error',
            data: []
        });
    });
});

router.put('/:id', function(req, res) {
    User.findById(req.params.id).exec()

    .then(function(data) {
        if(data == null) {
            return res.status(404).send({
                message: 'Cannot PUT, user not exist',
                data: []
            });
        } else {
            var putUser = {};
            if('name' in req.body && req.body.name !== undefined) {
                putUser.name = req.body.name;
            }else {
                return res.status(400).send({
                    message: 'Name is required',
                    data: []
                });
            }

            if('phoneNumber' in req.body && req.body.phoneNumber !== undefined){
                putUser.phoneNumber = req.body.phoneNumber;
            }
            if('profileImage' in req.body && req.body.profileImage !== undefined){
                putUser.profileImage = req.body.profileImage;
            }

            if('email' in req.body && req.body.email !== undefined) {
                User.findOne({email: req.body.email}).exec()
                .then(function(match) {
                    if(match == null || match.id == data.id) {
                        putUser.email = req.body.email;

                        Product.updateMany(
                            {assignedSellerID: data.id}, {assignedSellerName: putUser.name}
                        )
                        .then(function(){
                            Product.updateMany(
                                {assignedBuyerID: data.id}, {assignedBuyerName: putUser.name}
                            ).then(function(){
                                User.findByIdAndUpdate(data.id, putUser, {new:true})                                  
                                .then(function (result) {
                                    return res.status(201).send({
                                        message: "PUT executed, product related info also updated",
                                        data: result
                                    });
                                })
                                .catch(function(error) {
                                    return res.status(500).send({
                                        message: "Unexpected error during PUT",
                                        data: []
                                    });
                                });

                                
                            })
                            .catch(function(error){
                                return res.status(500).send({
                                    message: "Unexpected error during UPDATE Buyer",
                                    data: []
                                });
                            })
                        })
                        .catch(function(error) {
                            return res.status(500).send({
                                message: "Unexpected error during UPDATE Seller",
                                data: []
                            });
                        });                                        
                        
                    } else {
                        return res.status(400).send({
                            message: 'Email has duplicate',
                            data: []
                        });
                    }
                })
                .catch(function(error) {
                    return res.status(400).send({
                        message: "PUT failed, server error",
                        data: []
                    })
                });

            } else {
                return res.status(400).send({
                    message: 'Email is required',
                    data: []
                });
            }

        }
    })
    .catch(function(error) {
        return res.status(500).send({
            message: 'Server error',
            data: []
        });
    });
});
        
module.exports = router;



    
        
    
        
