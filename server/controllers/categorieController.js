const Categories = require('../models').Categorie;
const Courses = require('../models').Course;

module.exports = {
    create(req, res) {
        return Categories
            .create({
                name: req.body.name
            })
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error))
    },
    //Todo destroy and update
    listGategories(req, res){
        return Categories
            .findAll({
                include: [{
                    model: Courses,
                    as: 'courses'
                }]
            })
            .all()
            .then(categories => res.status(200).send(categories))
            .catch(error => res.status(400).send(error))
    },
    updateCategories(req, res){
        return  Categories
            .find({
                where: {
                    id: req.params.categoryId
                }
            })
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
    destroyCategories(req, res){
        return Categories
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