const quizOptions = require('../models').quizOptions;

module.exports = {
    create (req, res) {
        return quizOptions
            .create({
                option1: req.body.option1,
                option2: req.body.option2,
                option3: req.body.option3,
                idQuiz: req.body.idQuiz
            })
            .then(quizoption => res.status(201).send(quizoption))
            .catch(error => res.status(400).send(error.message));
    },

    list (req, res) {
        return quizOptions
            .all()
            .then(qo => res.status(200).send(qo))
            .catch(error => res.status(400).send(error));
    },

    getById(req, res) {
        let idQuiz = req.body.idQuiz;
        if (!idQuiz) {
            return res.status(400).send({
                message: "Id quiz required!"
            });
        }
         return quizOptions
            .findAll({
                where:{
                    idQuiz:idQuiz
                }
            })
            .then(quiz => res.status(201).send(quiz))
            .catch(error => res.status(400).send(error));
    }
}