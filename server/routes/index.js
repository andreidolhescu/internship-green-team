const cors = require('cors'); // do not remove this
const adminCheckAuth = require('../middleware/admin-check-out');
const userCheckAuth = require('../middleware/user-check-out');
const testController = require('../controllers').testController;
const chapters=require('../controllers').chapter;
const quizzes=require('../controllers').quiz;
const qoptions = require ('../controllers').quizOptions;

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const upload = multer({storage: storage});


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
const CategoryController = require('../controllers').CategoryController;
const CourseController = require('../controllers').CategoryController;

module.exports = (app) => {
    app.post('/api', adminCheckAuth, (req,res) => res.status(200).send({
        message: 'Welcome to the Users API! Token',
    }));
    //app.put('/api/updateAdminq/:testId',adminCheckAuth,(req,res)=>res.status(200).send({
    //    message:'Welcome to update;',
    //}));

    //User
    app.post('/api/register', userController.create);
    app.get('/api/register/:id',userCheckAuth, userController.retrive);
    app.get('/api/register', userController.list);
    app.post('/api/forgotPassword',userCheckAuth, userController.forgotPassword);
    app.post('/api/login', userController.login); 
    app.post('/api/reset/:passwordToken', userController.reset);
    app.put('/api/register/:id',userController.update);
    app.delete('/api/register/:id', userController.destroy);

    //Course categories
    app.post('/api/Category/add', adminCheckAuth, CategoryController.create);
    app.get('/api/Category', userCheckAuth, CategoryController.list);
    app.get('/api/Category/:CategoryId', userCheckAuth, CategoryController.getById);
    app.put('/api/Category/:CategoryId', CategoryController.update);
    app.delete('/api/Category/delete/:idCategory', adminCheckAuth, CategoryController.destroy);

    //Courses
    app.post('/api/Courses/:idCategory', upload.single('courseImage'), CourseController.create);
    app.post('/api/Courses/listbyidCategory', CourseController.list);
    app.get('/api/Courses/:courseId', userCheckAuth, CourseController.getById);
    //app.put('/api/Courses/:courseId', adminCheckAuth, CourseController.updateAdminC);
    //app.delete('/api/deleteCourse/:courseId', adminCheckAuth, CourseController.destroyC);

    //Quiz options
    app.post('/api/addOptions', qoptions.create);
    app.get('/api/optionsList', qoptions.list);
    app.post('/api/optionsListquiz', qoptions.getById);
    app.put('/api/updateQuizOptions',adminCheckAuth, qoptions.update);
    app.delete('/api/deleteOptions',adminCheckAuth, qoptions.destroy);

    //Chapters
    app.post('/api/listbycourse',userCheckAuth,chapters.listbycourse);
    app.get('/api/listc/:testId',userCheckAuth,chapters.listc);
    app.post('/api/addchapter',userCheckAuth,chapters.createc);
    app.put('/api/updateAdmin/:testId',adminCheckAuth,chapters.updateAdmin);
    app.delete('/api/deletechapter/:testId',adminCheckAuth, chapters.destroy);

    //Quizzes
    app.post('/api/addquiz',userCheckAuth,quizzes.createq);
    app.get('/api/listq/:testId',userCheckAuth,quizzes.getByIdq);
    app.post('/api/listbychapterq',userCheckAuth,quizzes.listbychapterq);
    app.put('/api/updateAdminq/:testId',adminCheckAuth,quizzes.updateAdminq);
    app.delete('/api/deletequiz/:testId',adminCheckAuth,quizzes.destroyq);
};


