const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const random = require('randomstring');
const nodemailer = require('nodemailer');

const User = require('../models').Users;

module.exports = {
    create(req, res) {
        bcrypt.hash(req.body.password, 10, (error,hash) => {
            if(error){
                return res.status(400).send({
                    message: `Error ${error}`
                });
            }
            return User
                .create(
                    {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        forgotPassword: random.generate(15),
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
    forgotPassword(req,res){
            let email = req.body.email;
            // let password = req.body.password;
            // let newPassword = req.body.newPassword;
            // let comparePassword = password.localeCompare(newPassword);

            if(!email){
                return res.status(400).send({
                    message: 'Email required!'
                });
            }

            email = email.toLowerCase();

            User.findOne({
                where: {
                    email: email
                }
            })
            .then(user => {
                nodemailer.createTestAccount((error, account) => {
                    if(error){
                        res.send(`Error ${error}`);
                    }
                    let transporter = nodemailer.createTransport({
                        host: 'smtp.ethereal.email',
                        port: 587,
                        secure: false,
                        auth: {
                            user: account.user,
                            pass: account.pass
                        }
                    });
               
                    let mailOptions = {
                        from: '"Green " <greenTeam@example.com>',
                        to: `${user.email}`,
                        subject: 'ResetPassword',
                        text: 'http://api/reset/'+`${user.forgotPassword}`,
                        html: '<b>Hello there, friend!</b>'
                    };
                    
                    transporter.sendMail(mailOptions, (error, info) => {
                        if(error){
                            return res.send(`Error ${error}`);
                        }
                        console.log('Message sent: %s', info.messageId);
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    });
            });
            })
            .catch(error => res.status(400).send(`Error change password ${error}`));
    },
    reset(req,res){
        return User
            .findOne({
                where: {
                    forgotPassword: req.params.passwordToken
                }
            })
            .then(user => {
                if(!user){
                    res.status(400).send({
                        message: 'User not found'
                    });
                }

                let password = req.body.password;
                let confirmPassword = req.body.confirmPassword;

                if(!password || !confirmPassword){
                    return res.send('Password and Confirm password fields are required!');
                }

                let comparePasswords = password.compareLocal(confirmPassword);
                
                if(comparePasswords != 0){
                    return res.send('Passwords must match');
                }

                bcrypt.hash(password, 10, (error, hash) => {
                    if(error){
                        res.status(400).send({
                            message: `Error: ${error}`
                        });
                    }
                    return user
                        .update({
                            password: hash
                            //Todo: update forgot password token
                        })
                })
            })
            .catch(error => res.send(`Error: ${error}`))
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
                        admin: user.admin
                    },
                    'secretKey',
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
    },

};