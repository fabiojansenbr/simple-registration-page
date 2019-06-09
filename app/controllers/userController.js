const User = require('../../database/models').User;
const bcrypt = require('bcrypt');

function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

module.exports = {
    list(req, res) {
        return User
            .findAll()
            .then((users) => res.status(200).json({
                status: true,
                data: users
            }))
            .catch((error) => {
                res.status(500).send(error);
            });
    },

    getById(req, res) {
        return User
            .findByPk(req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(200).json({
                        status: false,
                        message: 'User Not Found',
                    });
                }
                return res.status(200).json({
                    status: true,
                    data: user
                });
            })
            .catch((error) => res.status(500).send(error));
    },

    getByToken(req, res) {
        return User
            .findByPk(req.decoded.id)
            .then((user) => {
                if (!user) {
                    return res.status(200).json({
                        status: false,
                        message: 'User Not Found',
                    });
                }
                return res.status(200).json({
                    status: true,
                    data: user
                });
            })
            .catch((error) => res.status(500).send(error));
    },

    add(req, res) {
        return User
            .create({
                email: req.body.email,
                password: hashPassword(req.body.password),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                mobileNumber: req.body.mobileNumber,
                dateOfBirth: req.body.dateOfBirth,
                gender: req.body.gender
            })
            .then((user) => res.status(200).json({
                status: true,
                data: user
            }))
            .catch((error) => res.status(500).send(error));
    },

    update(req, res) {
        return User
            .findByPk(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(200).json({
                        status: false,
                        message: 'User Not Found',
                    });
                }

                let password;

                if (bcrypt.compareSync(req.body.password, user.password)) {
                    // if hash password match with old password dont change password
                    password = user.password;
                } else {
                    // if hash password dont match with old password, create new hash password
                    password = hashPassword(req.body.password);
                }

                return user
                    .update({
                        username: req.body.username || user.username,
                        password: req.body.password || user.password,
                        email: req.body.email || user.email,
                        password: password || user.password,
                        firstName: req.body.firstName || user.firstName,
                        lastName: req.body.lastName || user.lastName,
                        mobileNumber: req.body.mobileNumber || user.mobileNumber,
                        dateOfBirth: req.body.dateOfBirth || user.dateOfBirth,
                        gender: req.body.gender || user.gender
                    })
                    .then(() => res.status(200).json({
                        status: true,
                        data: user
                    }))
                    .catch((error) => res.status(500).send(error));
            })
            .catch((error) => res.json(error));
    },

    delete(req, res) {
        return User
            .findByPk(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(200).json({
                        status: false,
                        message: 'user not found',
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(200).json({
                        status: true,
                        message: "user deleted successfully"
                    }))
                    .catch((error) => res.status(500).send(error));
            })
            .catch((error) => res.status(500).send(error));
    },
};