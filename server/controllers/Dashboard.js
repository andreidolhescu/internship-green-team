const Dashboard = require('../models').Dashboard;

module.exports = {
    // add new category
    create (req, res) {

        return Dashboard
            .create({
                title: req.body.title
            })
            .then(cat => res.status(201).send(cat))
            .catch(error => res.status(400).send(error));
    },
   
    // get all entries from Dashboard table
    list (req, res) {
        return Dashboard
            .all()
            .then(cat => res.status(201).send(cat))
            .catch(error => res.status(400).send(error));
    },

    // update a category
    update (req, res) {
        return Dashboard
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
        return Dashboard
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
        return Dashboard
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