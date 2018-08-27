const Category = require('../models').Categorie;
const Course = require('../models').Course;

module.exports = {
    createCategory(req, res) {
        return Category
            .create({
                name: req.body.name
            })
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error))
    },
    getCategoriesAndCourses(req, res){
        return Category
            .findAll({
                include: [{
                    model: Course,
                    as: 'courses'
                }]
            })
            .then(categories => res.status(200).send(categories))
            .catch(error => {
                console.log(error);
              return  res.status(400).send(error)
            })
    },
    getCategoryWithCourses(req, res){
        return Category
            .findById(req.params.categoryId,{
                include: [{
                    model: Course,
                    as: 'courses',
                }]
            })
            .then(category => res.status(200).send(category))
            .catch(error => res.status(400).send(error))
    },
    getCategory(req, res){
        return Category
            .findById(req.params.categoryId)
            .then(category => res.status(200).send(category))
            .catch(error => res.status(400).send(error))
    },
    updateCategory(req, res){
        return  Category
            .findById(req.params.categoryId)
            .then(category => {
                if(!category){
                    return res.status(400).send('Category does not exist')
                }

                return category
                    .update({
                        name: req.body.name || category.name
                    })
                    .then(category => res.status(200).send(category))
                    .catch(error => res.status(400).send(error))
            })
            .catch(error => res.status(400).send(error))     
    },
    destroyCategory(req, res){
        return Category
            .findById(req.params.categoryId)
            .then(category => {
                if(!category){
                    return res.status(400).send('Category not found')
                }

                return category
                    .destroy()
                    .then(category => res.status(200).send(category))
                    .catch(error => res.status(400).send(error))
            })
            .catch(error => res.status(400).send(error))
    }
};