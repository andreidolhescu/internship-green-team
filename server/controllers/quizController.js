const Quizzes = require('../models').Quizzes;

module.exports = {
    createq (req, res) {
        return Quizzes
            .create({
            content:req.body.content,
            idCourse:req.body.idCourse   
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
    listbycourseq(req, res) {
        let idCourse=req.body.idCourse;
        if (!idCourse) {
            return res.status(400).send({
                message: "Id course required!"
            });
        }
         return Quizzes
            .findAll({
                where:{
                    idCourse:idCourse
                }
            })
            .then(quiz => res.status(201).send(quiz))
            .catch(error => res.status(400).send(error));
    },
    updateAdminq (req, res) {
        return Chapters
            .findById(req.params.testId)
            .then(chapter => {
                if (!chapter) {
                    return res.status(404).send({
                        message: 'Chapter Not Found',
                    });
                }
                if (!req.body.content) {
                    return res.status(400).send({
                        message: "Content required!"
                    });
                }
                if (!req.body.idCourse) {
                    return res.status(400).send({
                        message: "idCourse required!"
                    });
                }
                if (!req.body.content && !req.body.idCourse ) {
                    return res.status(400).send({
                        message: "Miss!"
                    });
                }
                return chapter
                    .update({
                        content:req.body.content || chapter.content,
                        idCourse:req.body.idCourse || chapter.idCourse,
                    })
                    .then(quiz =>{ 
                        if (!quiz) {
                            return res.status(404).send({
                                message: 'Chapter Not Found',
                            });
                        }else res.status(201).send(chapter)})
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