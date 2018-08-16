const User = require('../models').Users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    create(req, res) {
        bcrypt.hash(req.body.password, 10, (error,hash) => {
            if(error){
                return res.status(400).send({
                    message: 'Error(Password)'
                });
            }
            return User
                .create(
                    {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        admin: req.body.admin
                    })
                .then(user => res.status(201).send(user))
                .catch(error => res.status(400).send(error.message));
        });
    },
    list(req,res) {
        return User
        .all()
        .then(users => res.status(200).send(users))
        .catch(error => res.status(400).send(error));
    },
    retrive(req,res) {
        return User
            .findById(req.params.id)
            .then(user => {
                if(!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req,res) {
        console.log('I am here');
        return User
            .findById(req.params.id)
            .then(user => {
                if(!user) {
                    return res.status(404).send({
                        message: 'User not found'
                    });
                }
            return user
                .update({
                    firstName: req.body.firstName || user.firstName,
                    lastName: req.body.lastName || user.lastName
                })
                .then(() => res.status(200).send(user))
                .catch((error) => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    },
    destroy(req, res){
        return User
            .findById(req.params.id)
            .then(user => {
                if(!user){
                    return res.status(404).send({
                        message: 'User not found'
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(200).send(user))
                    .catch((error) => res.send(error))
            })
            .catch(error => res.status(400).send(error));
    },
    forgetPassword(req,res){
            let email = req.body.email;
            User.findOne({
                where: {
                    email: email
                }
            })
    },
    login(req,res) {
        let email = req.body.email;
        let password = req.body.password;
        
        if(!email || !password){
            return res.status(400).send({
                message: "Email and password required!"
            });
        }
        email = email.toLowerCase();

        User.findOne({
            where: {
                email: email
            }
        })
        .then(user => {
            bcrypt.compare(req.body.password, user.password, (error, result) =>{
                if(error){
                    return res.status(401).send({
                        message: 'Auth failed'
                    });
                }
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        id: user.id,
                        isAdmin: user.admin
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: '1h'
                    });
                    return res.status(200).send({
                        message: 'Auth successful',
                        token: token
                    });
                }
                return res.status(401).send({
                    message: 'Auth failed'
                });
            });  
        })
        .catch(error => res.status(400).send(`Email invalid. Error: ${error}`))
    }

};