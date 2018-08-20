const course = require('../models').course;
const Dashboard = require('../models').Dashboard;


module.exports = {
    //add new course
    create (req, res) {
        return course
            .create({
                title: req.body.title,
                description: req.body.description,
                courseImage: req.file.path,
                CategoryId: req.body.CategoryId
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

    //list all courses by category id
    list (req, res) {
        let CategoryId = req.body.CategoryId;
        if(!CategoryId) {
            return res.status(404).send({
              message: 'Category Id required',
            });
          }
        return course.findAll({
            where: {
                CategoryId: CategoryId
            }
        })
        .then(cat => res.status(201).send(cat))
        .catch(error => res.status(400).send(error));

    },
    
    

}