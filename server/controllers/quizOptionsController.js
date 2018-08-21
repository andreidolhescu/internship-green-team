const QuizOptions = require('../models').quizOptions;

module.exports = {
    create (req, res) {
        return QuizOptions
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
        return QuizOptions
            .all()
            .then(qo => res.status(200).send(qo))
            .catch(error => res.status(400).send(error));
    },
    //all options for a quiz
    getById(req, res) {
        let idQuiz = req.body.idQuiz;
        if (!idQuiz) {
            return res.status(400).send({
                message: "Id quiz required!"
            });
        }
         return QuizOptions
            .findAll({
                where:{
                    idQuiz:idQuiz
                }
            })
            .then(quiz => res.status(201).send(quiz))
            .catch(error => res.status(400).send(error));
    },

    //allow admin to change quiz option details
    update (req, res) {
        idQuiz = req.body.idQuiz
        return QuizOptions
            .findOne ({
                where: {
                    idQuiz: idQuiz
                }
            })
            .then (quizoption => {
                if (!quizoption) {
                    return res.status(404).send({
                        message: 'Quiz Not Found',
                    });
                }

                return quizoption 
                    .update({
                        option1: req.body.option1 || quizoption.option1,
                        option2: req.body.option2 || quizoption.option2,
                        option3: req.body.option3 || quizoption.option3
                    })
                    .then(quizoption => {
                        if (!quizoption) {
                            return res.status(404).send({
                                message: "Quiz Not Found",
                            });
                        } else res.status(201).send(quizoption)
                    })
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    //allow admins to delete quiz options
    destroy (req, res) {
        idQuiz = req.body.idQuiz
        return QuizOptions
            .findOne({
                where: {
                    idQuiz: idQuiz
                }
            })
            .then (quizoption => {
                if (!quizoption) {
                    return res.status(404).send ({
                        message: 'Quiz Not Found',
                    });
                }

                return quizoption 
                    .destroy()
                    .then( () => res.status(200).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
}