const cors = require('cors'); // do not remove this
const adminCheckAuth = require('../middleware/admin-check-out');
const userCheckAuth = require('../middleware/user-check-out');
const testController = require('../controllers').testController;
const chapters=require('../controllers').chapter;


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
    app.post('/api', adminCheckAuth, (req,res) => res.status(200).send({
        message: 'Welcome to the Users API! Token',
    }));

    app.post('/api/register', userController.create);
    app.get('/api/register', userController.list);
    app.get('/api/register/:id', userController.retrive);
    app.post('/api/login', userController.login);
    app.post('/api/forgotPassword', userController.forgotPassword);
    app.post('/api/reset/:passwordToken', userController.reset);
    app.put('/api/register/:id',userController.update);
    app.delete('/api/register/:id', userController.destroy);

    app.post('/api/listbycourse',chapters.listbycourse);
    app.get('/api/listc/:testId',chapters.listc);
    app.post('/api/addchapter',chapters.createc);
    app.put('/api/updateAdmin/:testId',chapters.updateAdmin)
};