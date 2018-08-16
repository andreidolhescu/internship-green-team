const Users = require('../models').Users;
const jwt = require('jsonwebtoken'); //used to create, sign, and verify tokens
const bcrypt = require('bcrypt');

module.exports = {
    create(req, res) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
          return res.status(500).send({
            message: 'Eroare parola'
          });
        } else {
        
        return Users
          .create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash,
          })
          .then(todo => res.status(201).send(todo))
          .catch(error => res.status(400).send(error));
        }
      });
    },

    // get all entries from Users table
    list (req, res) {
      return Users
          .all()
          .then(todo => res.status(201).send(todo))
          .catch(error => res.status(400).send(error));
    },

    // get an user by id
    getById (req, res) {
      return Users
          .findById(req.params.userid)
          .then(user => {
              if (!user) {
                return res.status(404).send({
                  message: 'User Not Found',
                });
              }
              return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error));
    },

    // update an user
    update (req, res) {
      return Users
          .findById(req.params.userid)
          .then(user => {
              if (!user) {
                  return res.status(404).send({
                      message: 'User Not Found',
                  });
              }

              return user
                  .update({
                      first_name: req.body.first_name,
                      last_name: req.body.last_name,
                      email: req.body.email,
                      password: req.body.password,
                  })
                  .then(() => res.status(200).send(user))
                  .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
    },

    // delete an user entry
    destroy (req, res) {
      return Users
          .findById(req.params.userid)
          .then(user => {
              if (!user) {
                  return res.status(404).send({
                      message: 'User Not Found',
                  });
              }

              return user
                  .destroy()
                  .then(() => res.status(200).send())
                  .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
    },

    //login method
    login (req, res) {

      let email = req.body.email,
          password = req.body.password;

          if (!email || !password) {
             return res.status(400).send({
                message: "Email and password required!"
              });
          }

          email = email.toLowerCase();

          Users.findOne({
               where: {
                    email: email
               }
          })
         .then(user => {
       
             bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err){
                  return res.status(401).send({
                     message: "Auth failed 1"
                });
               }

              if(result) {
                let payload = {

                  email: user.email, 
                  id: user.id };
                  let key = 'Secret'
                  const token = jwt.sign(payload, key,
                  {
                      expiresIn: "1h"
                  });

                 return res.status(200).send({
                    message: "Success",
                    token: token
                 });
            }
           return res.status(401).send({
               message: "The password is incorrect"
           });
        
        });
     })
     .catch(err => res.status(400).send('Invalid email. Error: ${err}'))
    }
};