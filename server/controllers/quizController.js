const Quizzes = require('../models').Quiz;
const QuizOptions = require('../models').QuizOption;

module.exports = {
    createQuizForChapter(req, res) {
        return Quizzes
            .create({
                content: req.body.content,
                idChapter: req.param.idChapter
            })
            .then(quiz => res.status(201).send(quiz))
            .catch(error => res.status(400).send(error));
    },
    destroyQuizInChapter(req, res) {
        return Quizzes
            .find({
                id: req.params.idQuiz,
                idChapter: req.params.idChapter
            })
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
    listQuizezInChapter(req, res) {
        return Quizzes
            .findAll({
                include: [{
                    model: QuizOptions,
                    as: 'quizOptions',
                }],
            })
            .then(quiz => res.status(200).send(quiz))
            .catch(error => res.status(400).send(error));
    },
    retrieveQuizFromChapter(req, res) {
        return Quizzes
            .findById(req.params.idQuiz, {
                include: [{
                    model: QuizOptions,
                    as: 'quizOptions',
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
    updateQuizInChapter(req, res) {
        return Quizzes
            .findById(req.params.idQuiz, {
                include: [{
                    model: QuizOptions,
                    as: 'quizOptions',
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