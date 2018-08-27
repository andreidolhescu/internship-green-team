const Quizzes = require('../models').Quizzes;

module.exports = {
    createq (req, res) {
        return Quizzes
            .create({
            content:req.body.content,
            chaptersid: req.params.chaptersid,
            coursesid:req.params.coursesid   
            })
            .then(quiz => res.status(201).send(quiz))
            .catch(error => res.status(400).send(error));
    },
    getByIdq (req, res) {
        return Quizzes
            .findById(req.params.testId)
            .then(quiz => {
                if (!quiz) {
                  return res.status(404).send({
                    message: 'Test Not Found',
                  });
                }
                return res.status(200).send(quiz);
              })
              .catch(error => res.status(400).send(error));
    },
    listbychapterq(req, res) {
        let idChapter=req.body.idChapter;
        if (!idChapter) {
            return res.status(400).send({
                message: "Id chapter required!"
            });
        }
         return Quizzes
            .findAll({
                where:{
                    idChapter:idChapter
                }
            })
            .then(quiz => res.status(201).send(quiz))
            .catch(error => res.status(400).send(error));
    },
    updateAdminq (req, res) {
        return Quizzes
            .findById(req.params.testId)
            .then(quiz => {
                if (!quiz) {
                    return res.status(404).send({
                        message: 'Quiz Not Found',
                    });
                }
                if (!req.body.content) {
                    return res.status(400).send({
                        message: "Content required!"
                    });
                }
                if (!req.body.idChapter) {
                    return res.status(400).send({
                        message: "idChapter required!"
                    });
                }
                if (!req.body.content && !req.body.idChapter ) {
                    return res.status(400).send({
                        message: "Miss!"
                    });
                }
                return quiz
                    .update({
                        content:req.body.content || quiz.content,
                        idChapter:req.body.idChapter || quiz.idChapter,
                    })
                    .then(quizz =>{ 
                        if (!quizz) {
                            return res.status(404).send({
                                message: 'Quizz Not Found',
                            });
                        }else res.status(201).send(quiz)})

                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    destroyq (req, res) {
        return Quizzes
            .findById(req.params.testId)
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
    }
}