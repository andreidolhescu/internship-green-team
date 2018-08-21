const testController = require('./testController');
const users = require('./user');
const chapter=require('./chapterController');
const Dashboard = require('./Dashboard');
const Courses = require('./Courses');
const quiz=require('./quizController');
const quizOptions = require('./quizOptionsController');
// export all your controllers here

module.exports = {
    testController, 
    users,
    Dashboard,
    Courses,
    chapter,
    quiz,
    quizOptions
};