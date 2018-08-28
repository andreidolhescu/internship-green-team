const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const random = require('randomstring');
const nodemailer = require('nodemailer');


const Course = require('../models').Course;
const User = require('../models').User;

let array = [];

module.exports = {
    createUser(req, res) {
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
                        admin: req.body.admin,
                    })
                .then(user => res.status(201).send(user))
                .catch(error => res.status(400).send('Here' + error.message));
        });
    },
    getUsersAndCourses(req,res) {
        return User
            .findById(req.params.userId, {
                include: [{
                    model: Course,
                    as: 'courses'
                }],
            })
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },
    updateUserById(req,res) {
        return User
            .findById(req.params.userId)
            .then(user => {
                if(!user) {
                    return res.status(404).send({
                        message: 'User not found'
                    });
                }
                bcrypt.hash(req.body.password,10,(error, hash) => {
                    if(error){
                        res.status(400).send({
                            message: `Error complicated:${error}`
                        });
                    }

                    return user
                        .update({
                            firstName: req.body.firstName || user.firstName,
                            lastName: req.body.lastName || user.lastName,
                            password: hash || user.password,
                            email: req.body.email || user.email,
                            userImage: req.body.userImage || user.userImage
                        })
                        .then(() => res.status(200).send(user))
                        .catch((error) => res.status(400).send(error));
                })
                
        })
        .catch(error => res.status(400).send(error));
    },
    getAllUsers(req, res) {
        return User
            .all()
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error))
    },
    destroyUserById(req, res){
        return User
            .findById(req.params.userId)
            .then(user => {
                if(!user){
                    return res.status(404).send({
                        message: 'User not found'
                    });
                }
                return user
                    .destroy()
                    .then(user => res.status(200).send(user))
                    .catch(error => res.send(error))
            })
            .catch(error => res.status(400).send(error));
    },
    userRequestPasswordReset(req,res){
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

            User.find({
                where: {
                    email: email
                }
            })
            .then(user => {
                if(!user){
                    return res.status(400).send('No user with this email address');
                }
                
                nodemailer.createTestAccount((error, account) => {
                    if(error){
                        console.log('Failed to create a testing account ', error);
                        return res.send(`Error ${error}`);
                    }
                    console.log('Credentials obtainde, sending message...');
                    
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'greenteam557@gmail.com',
                            pass: 'greenteam1234'
                        }
                    });
               
                    let mailOptions = {
                        from: 'greenteam557@gmail.com',
                        to: `${user.email}`,
                        subject: 'ResetPassword',
                        text: 'GG EZ WORK!',
                        html: 'http://api/users/reset/'+`${user.forgotPassword}`
                    };
                    
                    return transporter.sendMail(mailOptions, (error, info) => {
                        if(error){
                            return res.send(`Error ${error}`);
                        }
                        console.log('Message sent: %s', info.messageId);
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                        return res.status(200).send({
                            message: `Reset password message send to ${user.email}`
                        });
                    });
                })
            })
            .catch(error => res.status(400).send(`Error change password ${error}`));
    },
    userPasswordReset(req,res){
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
                        return res.status(400).send({
                            message: `Error: ${error}`
                        });
                    }
                    return user
                        .update({
                            password: hash,
                            forgotPassword: random.generate(15) 
                        })
                })
            })
            .catch(error => res.send(`Error: ${error}`))
    },
    userLogin(req,res) {
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
    }
};