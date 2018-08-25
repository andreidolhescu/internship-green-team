const Course = require('../models').Course;
const Chapter = require('../models').Chapter;

module.exports = {
    //add new course
    createCourseForCategory (req, res) {
        return Course
            .create({
                title: req.body.title,
                description: req.body.description,
                categoryId: req.params.categoryId,
            })
            .then(course => res.status(201).send(course))
            .catch(() => res.status(400).send(`There is no such category as category ${req.params.categoryId}`));
    },
    updateCourse (req, res){
        return Course
            .find({
                where: {
                    id: req.params.courseId,
                    //categoryId: req.params.categoryId
                },
            })
            .then(course => {
                if(!course) {
                    return res.status(404).send({
                        message: 'Course Not Found'
                    });
                }

                return course
                    .update({
                        title: req.body.title || course.title,
                        description: req.body.description || course.description             
                    })
                    .then(updateCourse => res.status(200).send(updateCourse))
                    .catch(error => res.status(400).send(error));
                    //Try This: .update(req.body, { fields: Object.keys(req.body) })
            })
            .catch(error => res.status(400).send(error));
    },
    destroyCourse(req, res){
        return Course
            .findById(req.params.courseId)
            .then(course => {
                if(!course) {
                    return res.status(404).send({
                        message: 'Course Not Found',
                    });
                }
                
                return course
                    .destroy()
                    .then(course => res.status(204).send(course))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error))
    },
    showCourseAndChapters(req, res){
        return Course
            .findById(req.params.courseId,{
                include: [{
                    model: Chapter,
                    as: 'chapters',
                }]
            })
            .then(course => res.status(200).send(course))
            .catch(error => res.status(400).send(error))
    },
    showAllCoursesAndChapters(req, res){
        return Course
            .findAll({
                include: [{
                    model: Chapter,
                    as: 'chapters'
                }]
            })
            .then(courses => res.status(200).send(courses))
            .catch(error => res.status(404).send('Nothing found'+error)) 
    }

};