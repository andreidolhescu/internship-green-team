const cors = require('cors'); // do not remove this

const testController = require('../controllers').testController;
const users = require('../controllers').users;
const Dashboard = require('../controllers').Dashboard;
const Courses = require('../controllers').Courses;

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
        message: 'Welcome to the Users Table',
    }));

    // start examples
    // the following routes are only for guidance, you can remove them
    app.post('/api/test', testController.create);
    app.post('/api/register', users.create);
    app.post('/api/Dashboard/add', Dashboard.create);
    app.post('/api/Courses/add', upload.single('courseImage'), Courses.create);
    app.get('/api/test', testController.list);
    app.get('/api/user/all', users.list);
    app.get('/api/Dashboard/all', Dashboard.list);
    app.get('/api/test/:testId', testController.getById);
    app.get('/api/user/:userid', users.getById);
    app.get('/api/Dashboard/:CategoryId', Dashboard.getById);
    app.get('/api/Courses/:courseId', Courses.getById);
    app.put('/api/test/:testId', testController.update);
    app.put('/api/user/:userid', users.update);
    app.put('/api/Dashboard/:CategoryId', Dashboard.update);
    app.delete('/api/test/:testId', testController.destroy);
    app.delete('/api/user/:userid', users.destroy);
    app.delete('/api/Dashboard/:CategoryId', Dashboard.destroy);
    app.post('/api/login', users.login);
    // end examples
}