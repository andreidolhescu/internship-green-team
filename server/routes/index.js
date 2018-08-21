const cors = require('cors'); // do not remove this
const adminCheckAuth = require('../middleware/admin-check-out');
const userCheckAuth = require('../middleware/user-check-out');
const testController = require('../controllers').testController;
const chapters=require('../controllers').chapter;
const quizzes=require('../controllers').quiz;


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
    //app.put('/api/updateAdminq/:testId',adminCheckAuth,(req,res)=>res.status(200).send({
    //    message:'Welcome to update;',
    //}));


    app.post('/api/register', userController.create);
    app.get('/api/register',userCheckAuth, userController.list);
    app.get('/api/register/:id',userCheckAuth, userController.retrive);
    app.post('/api/login', userController.login);
    app.post('/api/forgotPassword',userCheckAuth, userController.forgotPassword);
    app.post('/api/reset/:passwordToken', userController.reset);
    app.put('/api/register/:id',userController.update);
    app.delete('/api/register/:id', userController.destroy);

    app.post('/api/listbycourse',userCheckAuth,chapters.listbycourse);
    app.get('/api/listc/:testId',userCheckAuth,chapters.listc);
    app.post('/api/addchapter',userCheckAuth,chapters.createc);
    app.put('/api/updateAdmin/:testId',adminCheckAuth,chapters.updateAdmin);
    app.delete('/api/deletechapter/:testId',adminCheckAuth, chapters.destroy);

    app.post('/api/addquiz',userCheckAuth,quizzes.createq);
    app.get('/api/listq/:testId',userCheckAuth,quizzes.getByIdq);
    app.post('/api/listbychapterq',userCheckAuth,quizzes.listbychapterq);
    app.put('/api/updateAdminq/:testId',adminCheckAuth,quizzes.updateAdminq);
    app.delete('/api/deletequiz/:testId',adminCheckAuth,quizzes.destroyq);
};