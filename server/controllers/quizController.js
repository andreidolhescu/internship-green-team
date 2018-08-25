const Quiz = require('../models').Quiz;
const QuizOption = require('../models').QuizOption;

module.exports = {
    createQuizForChapter(req, res) {
        return Quiz
            .create({
                content: req.body.content,
                chapterId: req.param.chapterId
            })
            .then(quiz => res.status(201).send(quiz))
            .catch(error => res.status(400).send(error));
    },
    destroyQuizForChapter(req, res) {
        return Quiz
            .find({
                id: req.params.idQuiz,
                // TODO: Delete(all commented code) this at a later time if all goes well!
                //chapterId: req.params.chapterId
            })
            .then(quiz => {
                if (!quiz) {
                    return res.status(404).send({
                        message: 'Quiz not Found',
                    });
                }

                return quiz
                    .destroy()
                    .then((quiz) => res.status(200).send(quiz))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    listQuizAndQuizOptions(req, res) {
        return Quiz
            .findById(req.params.idQuiz,{
                include: [{
                    model: QuizOption,
                    as: 'quizOptions'
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
    updateQuizForChapter(req, res) {
        return Quiz
            .findById(req.params.idQuiz)
            .then(quiz => {
                if (!quiz) {
                    return res.status(404).send({
                        message: 'Quiz Not Found',
                    });
                }
                return quiz
                    .update({
                        content: req.body.content || quiz.content,
                    })
                    .then((quiz) => res.status(200).send(quiz))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
}