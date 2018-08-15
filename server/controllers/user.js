const User = require('../models').Users;

module.exports = {
    create(req, res) {
        return User
            .create({
                name: req.body.name,
                age: req.body.age,
                email: req.body.email
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error.message));
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
                    name: req.body.name || user.name,
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
    }

};