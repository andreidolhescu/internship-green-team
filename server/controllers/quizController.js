const Quizzes = require('../models').Quizzes;
const quizOptions = require('../models').quizOptions;

module.exports = {
    createq(req, res) {
        return Quizzes
            .create({
                content: req.body.content,
                idChapter: req.param.idChapter
            })
            .then(quiz => res.status(201).send(quiz))
            .catch(error => res.status(400).send(error));
    },
    destroyq(req, res) {
        return Quizzes
            .findById(req.params.idQuiz)
            .then(quiz => {
                if (!quiz) {
                    return res.status(404).send({
                        message: 'Quiz not Found',
                    });
                }

                return quiz
                    .destroy()
                    .then(() => res.status(200).send("Success"))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    listq(req, res) {
        return Quizzes
            .findAll({
                include: [{
                    model: quizOptions,
                    as: 'quizItems',
                }],
            })
            .then(quiz => res.status(200).send(quiz))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Quizzes
            .findById(req.params.idQuiz, {
                include: [{
                    model: quizOptions,
                    as: 'quizItems',
                }],
            })
            .then(quiz => {
                if (!quiz) {
                    return res.status(404).send({
                        message: 'Quiz Not Found',
                    });
                }
                return res.status(200).send(quiz);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Quizzes
            .findById(req.params.idQuiz, {
                include: [{
                    model: quizOptions,
                    as: 'quizItems',
                }],
            })
            .then(quiz => {
                if (!quiz) {
                    return res.status(404).send({
                        message: 'Quiz Not Found',
                    });
                }
                return quiz
                    .update({
                        content: req.body.content || todo.content,
                    })
                    .then(() => res.status(200).send(quiz))  // Send back the updated todo.
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
}