const testController = require('./testController');
const users = require('./user');
const chapter=require('./chapterController');
const CategoryController = require('./CategoryController');
const CourseController = require('./CourseController');
const quiz=require('./quizController');
const quizOptions = require('./quizOptionsController');
const progress = require('./progresController');
// export all your controllers here

module.exports = {
    testController, 
    users,
    CategoryController,
    CourseController,
    chapter,
    quiz,
    quizOptions, 
    progress
};