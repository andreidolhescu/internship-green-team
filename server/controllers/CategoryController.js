const Categories = require('../models').Categories;
const Courses = require('../models').Courses;

module.exports = {
    // add new category
    create (req, res) {

        return Categories
            .create({
                title: req.body.title
            })
            .then(cat => res.status(201).send(cat))
            .catch(error => res.status(400).send(error));
    },
   
    // get all entries from Categories table
    list (req, res) {
        console.log("aici \n\n\n\n");
        return Categories
            .findAll({
                include: [{
                    model: Courses,
                    // as: 'courseItems' 
                }]
            })
            .then(categories => res.status(201).send(categories))
            .catch(error => {
                console.log("Eroare", error)
               return  res.status(400).send(error)

            });

    },

    // update a category
    update (req, res) {
        return Category
            .findById(req.params.CategoryId)
            .then(category => {
                if (!category) {
                    return res.status(404).send({
                        message: 'Category Not Found',
                    });
                }
  
                return category
                    .update({
                       title: req.body.title
                    })
                    .then(() => res.status(200).send(category))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    // get a category by id
    getById (req, res) {
        return Category
            .findById(req.params.CategoryId)
            .then(category => {
                if (!category) {
                  return res.status(404).send({
                    message: 'Category Not Found',
                  });
                }
                return res.status(200).send(category);
              })
              .catch(error => res.status(400).send(error));
    },

    destroy (req, res) {
        return Category
            .findById(req.params.idCategory)
            .then(category => {
                if (!category) {
                    return res.status(404).send({
                        message: 'Category Not Found',
                    });
                }
  
                return category
                    .destroy()
                    .then(() => res.status(200).send("Succes"))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
}