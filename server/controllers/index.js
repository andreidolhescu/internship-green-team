const testController = require('./testController');
<<<<<<< HEAD
const userController = require('./userController');
const courseController = require('./courseController');
const categorieController = require('./categorieController');
const chapterController = require('./chapterController');
const quizController = require('./quizController');
const quizOptionController = require('./quizOptionController');
=======
const users = require('./user');
const chapter=require('./chapterController');
const Dashboard = require('./Dashboard');
const Courses = require('./Courses');
const quiz=require('./quizController');
const quizOptions = require('./quizOptionsController');
>>>>>>> 5b5f206fba32a4ef81cfce127f9a2c8a8174e12d
// export all your controllers here

module.exports = {
    testController, 
<<<<<<< HEAD
    userController,
    courseController,
    categorieController,
    chapterController,
    quizController,
    quizOptionController
=======
    users,
    Dashboard,
    Courses,
    chapter,
    quiz,
    quizOptions
>>>>>>> 5b5f206fba32a4ef81cfce127f9a2c8a8174e12d
};