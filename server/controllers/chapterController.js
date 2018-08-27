const Chapter = require('../models').Chapter;
const Quiz = require('../models').Quiz;

module.exports = {
    createChapterForCourse(req, res){
        return Chapter
            .create({
                name: req.body.name,
                content: req.body.content,
                courseId: req.params.courseId
            })
            .then(chapter => res.status(200).send(chapter))
            .catch(() => res.status(400).send(`There is no such course as course ${req.params.courseId}`))
    },
    updateChapterForCourse(req, res){
        return Chapter
            .find({
                where: {
                    id: req.params.chapterId,
                    // TODO: Delete(all commented code) this at a later time if all goes well!
                    //courseId: req.params.courseId
                }
            })
            .then(chapter => {
                if(!chapter){
                    return res.status(404).send('Chapter not found');
                }

                return chapter
                    .update({
                        name: req.body.name || chapter.name,
                        content: req.body.content || chapter.content
                    })
                    .then(chapter => res.status(200).send(chapter))
                    .catch(error => res.status(400).send(error))
            })
            .catch(error => res.status(400).send(error))
    },
    destroyChapterForCourse(req, res){
        return Chapter 
            .find({
                where:{
                    id: req.params.chapterId,
                    // TODO: Delete(all commented code) this at a later time if all goes well!
                    //courseId: req.params.courseId
                }
            })
            .then(chapter => {
                if(!chapter){
                    return res.status(400).send('Chapter not found')
                }

                return chapter
                    .destroy()
                    .then(chapter => res.status(200).send(chapter))
                    .catch(error => res.status(400).send(error))
            })
            .catch(error => re.status(400).send(error))
    },
    showAllChapters(req,res){
        return Chapter
            .all()
            .then(chapters => res.status(200).send(chapters))
            .catch(error => res.status(400).send(error))
    },
    showAllChaptersAndQuizzes(req, res) {
        return Chapter
            .findAll({
                include: [{
                    model: Quiz,
                    as: 'quizzes'
                }]
            })
            .then(chapters => res.status(200).send(chapters))
            .catch(error => res.status(400).send(error))
    }
};