const Course = require('../models').Course;
const Chapters = require('../models').Chapters;
const Quizzes = require('../models').Quizzes;
const QuizOptions = require('../models').quizOptions;


module.exports = {
    //add new course
    create (req, res) {
        console.log("Course controller");
        return Course
           .create({
                title: req.body.title,
                small_description: req.body.small_description,
                long_description: req.body.long_description,
                courseImage: req.file.path,
                tags: req.body.tags,
                idCategory: req.params.idCategory
            })
            .then(course => res.status(201).send(course))
            .catch(error => res.status(400).send(error));
            
    },


    // get a course by id
    getById (req, res) {
        return Course
            .findById(req.params.courseId)
            .then(todo => {
                if (!todo) {
                  return res.status(404).send({
                    message: 'Course Not Found',
                  });
                }
                return res.status(200).send(todo);
              })
              .catch(error => res.status(400).send(error));
    },

    //list all courses by category id
    list (req, res) {
        let idCategory = req.params.idCategory;
        if(!idCategory) {
            return res.status(404).send({
              message: 'Category Id required',
            });
          }
        return Course.findAll({
            where: {
                idCategory:idCategory
            }
        })
        .then(cat => res.status(201).send(cat))
        .catch(error => res.status(400).send(error));

    },

    //list all courses with chapters, quizzes and answers
    listCourses(req, res) {
        return Course
            .findAll({
                include: [{
                    model: Chapters
                },
                {
                    model: Quizzes
                },
                {
                    model: QuizOptions
                }
                ]
            })
            .then(curs => res.status(201).send(curs))
            .catch(error => {
                console.log("eroare", error);
                return res.status(400).send(error)
            });
    },
    
    updateAdminC (req, res) {
        console.log("Eroareee");
        return Course
            .findById(req.params.courseId)
            .then(todo => {
                if (!todo) {
                    return res.status(404).send({
                        message: 'Course Not Found',
                    });
                }
                if (!req.body.title) {
                    return res.status(400).send({
                        message: "Title required!"
                    });
                }
                if (!req.body.small_description) {
                    return res.status(400).send({
                        message: "Small descrtiption required!"
                    });
                }
                if (!req.body.long_description) {
                    return res.status(400).send({
                        message: "Long descrtiption required!"
                    });
                }
                if(!req.file.path) {
                    return res.status(400).send({
                        message: "Image path required!"
                    });
                }
                if (!req.body.tags) {
                    return res.status(400).send({
                        message: "Small descrtiption required!"
                    });
                }/*
                if(!req.body.idCategory) {
                    return res.status(400).send({
                        message: "idCategory required!"
                    });
                }*/
                return todo
                    .update({
                         title: req.body.title,
                         small_description: req.body.small_description,
                         long_description: req.body.long_description,
                         courseImage: req.file.path,
                         tags: req.body.tags,
                    })
                    .then(res.status(201).send(todo))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    
    destroyC (req, res) {
        return Courses
            .findById(req.params.courseId)
            .then(course => {
                if (!course) {
                    return res.status(404).send({
                        message: 'Course not Found',
                    });
                }

                return course
                    .destroy()
                    .then(() => res.status(200).send("Success"))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    }

}