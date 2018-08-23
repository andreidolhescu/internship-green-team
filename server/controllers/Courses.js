const courses = require('../models').courses;

module.exports = {
    //add new course
    create (req, res) {
        return courses
            .create({
                title: req.body.title,
                description: req.body.description,
                courseImage: req.file.path,
                //idCategory: req.body.idCategory
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },

    // get a course by id
    getById (req, res) {
        return courses
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
        let idCategory = req.body.idCategory;
        if(!idCategory) {
            return res.status(404).send({
              message: 'Category Id required',
            });
          }
        return courses.findAll({
            where: {
                idCategory:idCategory
            }
        })
        .then(cat => res.status(201).send(cat))
        .catch(error => res.status(400).send(error));

    },
    
    updateAdminC (req, res) {
        return courses
            .findById(req.params.courseId)
            .then(course => {
                if (!course) {
                    return res.status(404).send({
                        message: 'Course Not Found',
                    });
                }
                if (!req.body.title) {
                    return res.status(400).send({
                        message: "Title required!"
                    });
                }
                if (!req.body.description) {
                    return res.status(400).send({
                        message: "Description required!"
                    });
                }
                /*if(!req.file.path) {
                    return res.status(400).send({
                        message: "Image path required!"
                    });
                }*/
                if(!req.body.idCategory) {
                    return res.status(400).send({
                        message: "idCategory required!"
                    });
                }
                return course
                    .update({
                         title: req.body.title || course.title,
                         description: req.body.description || course.description,
                         //courseImage: req.file.path || course.courseImage,
                         idCategory: req.body.idCategory || course.idCategory
                    })
                    .then(course =>{ 
                        if (!course) {
                            return res.status(404).send({
                                message: 'Course Not Found',
                            });
                        }else res.status(201).send(course)})
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    
    destroyC (req, res) {
        return courses
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