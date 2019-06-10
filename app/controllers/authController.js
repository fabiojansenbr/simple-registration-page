const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config-app');
const phone = require('phone');

module.exports = {
    login(req, res) {
        return User.findOne({
            where: {
                email: req.body.email
            }
        }).then((user) => {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {
                    id: user.id
                };
                let token = jwt.sign(payload, config.secret, {
                    // tokens will expire in 15 minutes
                    expiresIn: 1800
                });

                res.status(200).json({
                    status: true,
                    message: 'login sucessfully',
                    data: {
                        token: token
                    }
                });
            } else {
                res.status(200).json({
                    status: false,
                    message: 'password incorrect'
                });
            }
        }).catch((error) => {
            res.status(500).send(error);
        });
    },
    register(req, res) {
        return User
            .create({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                mobileNumber: req.body.mobileNumber,
                dateOfBirth: req.body.dateOfBirth || null,
                gender: req.body.gender || null
            })
            .then((user) => res.status(200).json({
                status: true,
                data: user
            }))
            .catch((error) => res.status(500).send(error));
    },
    uniqueCheck(req, res) {
        if (req.body.email) {
            return User.findOne({
                where: {
                    email: req.body.email
                }
            }).then((user) => {
                if (!user) {
                    return res.status(200).json(true);
                }
                return res.status(200).json("Email is already taken");
            }).catch((error) => {
                res.status(500).send(error);
            });
        } else if (req.body.mobileNumber) {
            let extractPhone = phone(req.body.realMobileNumber);

            if (extractPhone) {
                if (extractPhone[1] == 'IDN') {
                    return User.findOne({
                        where: {
                            mobileNumber: req.body.mobileNumber
                        }
                    }).then((user) => {
                        if (!user) {
                            return res.status(200).json(true);
                        }
                        return res.status(200).json("Mobile number is already taken");
                    }).catch((error) => {
                        res.status(500).send(error);
                    });
                } else {
                    return res.status(200).json("Please enter valid Indonesian mobile phone number");
                }
            } else {
                return res.status(200).json("Please enter valid mobile phone number");
            }
        }
    }
}