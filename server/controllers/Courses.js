const course = require('../models').course;


module.exports = {
    //add new course
    create (req, res) {
        return course
            .create({
                title: req.body.title,
                description: req.body.description,
                courseImage: req.file.path
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));
    },

    // get a course by id
    getById (req, res) {
        return course
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


}