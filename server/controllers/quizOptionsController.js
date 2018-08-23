const quizOptions = require('../models').quizOptions;

module.exports = {
    create(req, res) {
        return quizOptions
            .create({
                answer: req.body.answer,
                correct: req.body.correct,
                idQuiz: req.params.idQuiz
            })
            .then(quizoption => res.status(201).send(quizoption))
            .catch(error => res.status(400).send(error.message));
    },

    list(req, res) {
        return quizOptions
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
        return quizOptions
            .findAll({
                where: {
                    idQuiz: idQuiz
                }
            })
            .then(quiz => res.status(201).send(quiz))
            .catch(error => res.status(400).send(error));
    },

    //allow admin to change quiz option details
    update(req, res) {
        idQuiz = req.body.idQuiz
        return quizOptions
            .findOne({
                where: {
                    id: req.params.id,
                    idQuiz: idQuiz
                }
            })
            .then(quizoption => {
                if (!quizoption) {
                    return res.status(404).send({
                        message: 'Quiz Not Found',
                    });
                }

                return quizoption
                    .update({
                        text: req.body.text || quizoption.text,
                        correct: req.body.correct || quizoption.correct,
                    })
                    .then(quizoption => res.status(200).send(quizoption))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    //allow admins to delete quiz options
    destroy(req, res) {
        return quizOptions
            .find({
                where: {
                    id: req.params.id,
                    idQuiz: req.params.idQuiz,
                },
            })
            .then(quiz => {
                if (!quiz) {
                    return res.status(404).send({
                        message: 'Optionquiz Not Found',
                    });
                }

                return quiz
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
}