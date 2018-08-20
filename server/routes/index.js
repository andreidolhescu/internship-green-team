const cors = require('cors'); // do not remove this
const checkAuth = require('../middleware/check-out');
const testController = require('../controllers').testController;

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
const Dashboard = require('../controllers').Dashboard;
const Courses = require('../controllers').Courses;

module.exports = (app) => {
    app.post('/api', checkAuth, (req,res) => res.status(200).send({
        message: 'Welcome to the Users API! Token',
    }));

    app.post('/api/register', userController.create); 
    app.post('/api/Dashboard/add', Dashboard.create); 
    app.post('/api/Courses/add', upload.single('courseImage'), Courses.create); 

    app.get('/api/register', userController.list);
    app.get('/api/Dashboard', Dashboard.list); 

    app.get('/api/register/:id', userController.retrive); 
    app.post('/api/login', userController.login); 
    app.post('/api/forgotPassword', userController.forgotPassword);
    app.post('/api/reset/:passwordToken', userController.reset);
    app.put('/api/register/:id',userController.update);
    app.delete('/api/register/:id', userController.destroy);


    app.get('/api/user/:userid', userController.retrive);
    app.get('/api/Dashboard/:CategoryId', Dashboard.getById);
    app.get('/api/Courses/:courseId', Courses.getById);
   
    app.put('/api/user/:userid', userController.update);
    app.put('/api/Dashboard/:CategoryId', Dashboard.update);
   
    app.delete('/api/user/:userid', userController.destroy);
    app.delete('/api/Dashboard/:CategoryId', Dashboard.destroy);
};