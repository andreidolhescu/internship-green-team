const cors = require('cors'); // do not remove this
const adminCheckAuth = require('../middleware/admin-check-out');
const userCheckAuth = require('../middleware/user-check-out');
const testController = require('../controllers').testController;
const userController = require('../controllers').userController;
const courseController = require('../controllers').courseController;
const categorieController = require('../controllers').categorieController;
const chapterController = require('../controllers').chapterController;
const quizController = require('../controllers').quizController;
const quizOptionController = require('../controllers').quizOptionController;


module.exports = (app) => {
    app.post('/api', adminCheckAuth, (req,res) => res.status(200).send({
        message: 'Welcome to the Users API! Token',
    }));
    //app.put('/api/updateAdminq/:testId',adminCheckAuth,(req,res)=>res.status(200).send({
    //    message:'Welcome to update;',
    //}));

    // Users
    app.post('/api/register', userController.create);
    app.get('/api/register/:id',userCheckAuth, userController.retrive);
    app.get('/api/register', userController.list);
    app.get('/api/register/:userId', userController.retrive);
    app.post('/api/login', userController.login);
    app.post('/api/forgotPassword', userController.forgotPassword);
    app.post('/api/reset/:passwordToken', userController.reset);
    app.put('/api/register/:userId',userController.update);
    app.delete('/api/register/:userId', userController.destroy);

    // Courses
    app.post('/api/categories/:categoryId/course', courseController.createCourseForCategory);
    app.put('/api/categories/:categoryId/course/:courseId', courseController.updateCourseInCategory);
    app.delete('api/categories/:categoryId/course/:courseId', courseController.destroyCourseInCategory);
    app.get('/api/courses', courseController.showAllCourses);

    // Categories
    app.post('/api/categories', categorieController.create);
    app.get('/api/categories', categorieController.listGategories);
    app.put('/api/categories/:categoryId', categorieController.updateCategories);
    app.delete('/api/categories/:categoryId', categorieController.destroyCategories);

    // Chapters
    app.post('/api/chapters/courseId/:chapterId/chapter', chapterController.createChapterForCourse);
    app.put('/api/chapters/:chapterId/chapter', chapterController.updateChapterInCourse);
    app.delete('/api/:courseId/chapter', chapterController.destroyChapterInCourse);
    app.get('/api/:courseId/chapter', chapterController.showAllChapters);

    //Quiz
    app.post('/api/:courseId/chapter', chapterController.createChapterForCourse);
    app.get('/api/:courseId/chapter', chapterController.showAllChapters);
    app.put('/api/:courseId/chapter', chapterController.updateChapterInCourse);
    app.delete('/api/:courseId/chapter', chapterController.destroyChapterInCourse);

    
    // QuizOptions
    app.post('/api/optionsListquiz', quizController.createQuizForChapter);
    app.get('/api/optionsList', quizController.listQuizezInChapter);
    app.put('/api/updateQuizOptions', quizController.updateQuizInChapter);
    app.delete('/api/deleteOptions/:idQuiz/items/:id', quizController.destroyQuizInChapter);
    app.post('/api/addquiz/:idQuiz/items', quizController.updateQuizInChapter);
};
