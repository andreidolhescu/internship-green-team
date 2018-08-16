const cors = require('cors'); // do not remove this

const testController = require('../controllers').testController;
const users = require('../controllers').users;

module.exports = (app) => {

    app.use(cors()); // do not remove this

    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Users Table',
    }));

    // start examples
    // the following routes are only for guidance, you can remove them
    app.post('/api/test', testController.create);
    app.post('/api/register', users.create);
    app.get('/api/test', testController.list);
    app.get('/api/all', users.list);
    app.get('/api/test/:testId', testController.getById);
    app.get('/api/user/:userid', users.getById);
    app.put('/api/test/:testId', testController.update);
    app.put('/api/user/:userid', users.update);
    app.delete('/api/test/:testId', testController.destroy);
    app.delete('/api/user/:userid', users.destroy);
    app.post('/api/login', users.login);
    // end examples
}