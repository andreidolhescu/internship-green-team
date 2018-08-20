const Chapters = require('../models').Chapters;

module.exports = {
    createc (req, res) {
        return Chapters
            .create({
            title: req.body.title,
            content:req.body.content,
            idCourse:req.body.idCourse   
            })
            .then(chapter => res.status(201).send(chapter))
            .catch(error => res.status(400).send(error));
    },
    listc(req, res) {
        return Chapters
            .findById(req.params.testId)
            .then(chapter =>{ 
                if (!chapter) {
                    return res.status(404).send({
                        message: 'Chapter Not Found',
                    });
                }else res.status(201).send(chapter)})
            .catch(error => res.status(400).send(error));
    },
    listbycourse(req, res) {
        let idCourse=req.body.idCourse;
        if (!idCourse) {
            return res.status(400).send({
                message: "Id course required!"
            });
        }
         return Chapters
            .findAll({
                where:{
                    idCourse:idCourse
                }
            })
            .then(chapter => res.status(201).send(chapter))
            .catch(error => res.status(400).send(error));
    },
    updateAdmin (req, res) {
        return Chapters
            .findById(req.params.testId)
            .then(chapter => {
                if (!chapter) {
                    return res.status(404).send({
                        message: 'Chapter Not Found',
                    });
                }
                if (!req.body.title) {
                    return res.status(400).send({
                        message: "Title required!"
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
                if (!req.body.title&& !req.body.content && !req.body.idCourse ) {
                    return res.status(400).send({
                        message: "Miss!"
                    });
                }
                return chapter
                    .update({
                        title: req.body.title || chapter.title,
                        content:req.body.content || chapter.content,
                        idCourse:req.body.idCourse || chapter.idCourse,
                    })
                    .then(chapter =>{ 
                        if (!chapter) {
                            return res.status(404).send({
                                message: 'Chapter Not Found',
                            });
                        }else res.status(201).send(chapter)})
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    destroy (req, res) {
        return Chapters
            .findById(req.params.testId)
            .then(chapter => {
                if (!chapter) {
                    return res.status(404).send({
                        message: 'Chapter not Found',
                    });
                }

                return chapter
                    .destroy()
                    .then(() => res.status(200).send("Success"))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }
};