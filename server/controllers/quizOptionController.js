const QuizOption = require('../models').QuizOption;

module.exports = {
    createQuizOption(req, res) {
        return QuizOption
            .create({
                answer: req.body.answer,
                correct: req.body.correct,
                quizId: req.params.quizId
            })
            .then(quizOption => res.status(201).send(quizOption))
            .catch(error => res.status(400).send(error.message));
    },

    listQuizOption(req, res) {
        return QuizOption
            .all()
            .then(quizOption => res.status(200).send(quizOption))
            .catch(error => res.status(400).send(error));
    },

    getQuizOption(req, res) {
        return QuizOption
            .find({
                where: {
                    id: req.body.quizId
                }
            })
            .then(quizOption => res.status(201).send(quizOption))
            .catch(error => res.status(400).send(error));
    },

    //allow admin to change quiz option details
    updateQuizOption(req, res) {
        return QuizOption
            .find({
                where: {
                    id: req.params.quizOptionId,
                    //Todo: Delete if you don't need it
                    //idQuiz: req.body.idQuiz
                }
            })
            .then(quizOption => {
                if (!quizOption) {
                    return res.status(404).send({
                        message: 'Quiz Not Found',
                    });
                }

                return quizOption
                    .update({
                        text: req.body.text || quizOption.text,
                        correct: req.body.correct || quizOption.correct,
                    })
                    .then(quizOption => res.status(200).send(quizOption))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    //allow admins to delete quiz options
    destroyQuizOption(req, res) {
        return QuizOption
            .find({
                where: {
                    id: req.params.quizOptionId,
                    //Todo: Delete if you don't need it
                    //idQuiz: req.params.idQuiz,
                },
            })
            .then(quizOption => {
                if (!quizOption) {
                    return res.status(404).send({
                        message: 'Option quiz Not Found',
                    });
                }

                return quizOption
                    .destroy()
                    .then(quizOption => res.status(204).send(quizOption))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
}