const cors = require('cors'); // do not remove this

const testController = require('../controllers').testController;

module.exports = (app) => {

    app.use(cors()); // do not remove this

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Internship',
    }));

    // start examples
    // the following routes are only for guidance, you can remove them
    app.post('/api/test', testController.create);
    app.get('/api/test', testController.list);
    app.get('/api/test/:testId', testController.getById);
    app.put('/api/test/:testId', testController.update);
    app.delete('/api/test/:testId', testController.destroy);
    // end examples
}

const userController = require('../controllers').users;

module.exports = (app) => {
    app.get('/api', (req,res) => res.status(200).send({
        message: 'Welcome to the Users API!',
    }));

    app.post('/api/register', userController.create);
    app.get('/api/register', userController.list);
    app.put('/api/register/:id',userController.update);
    app.delete('/api/register/:id', userController.destroy);
};