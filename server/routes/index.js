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
    app.get('/api', (req,res) => res.status(200).send({
        message: 'Welcome to the Users API! Token',
    }));
    //app.put('/api/updateAdminq/:testId',adminCheckAuth,(req,res)=>res.status(200).send({
    //    message:'Welcome to update;',
    //}));

    // Users
    app.post('/api/register', userController.createUser);
    app.get('/api/users', userController.getAllUsers);
    app.get('/api/users/:userId', userController.getUsersAndCourses);
    app.post('/api/login', userController.userLogin);
    app.post('/api/users/forgotPassword', userController.userRequestPasswordReset);
    app.post('/api/users/reset/:passwordToken', userController.userPasswordReset);
    app.put('/api/users/:userId',userController.updateUserById);
    app.delete('/api/users/:userId', userController.destroyUserById);

    // Courses
    app.post('/api/categories/:categoryId', courseController.createCourseForCategory);
    app.put('/api/categories/courses/:courseId', courseController.updateCourse);
    app.delete('api/categories/courses/:courseId', courseController.destroyCourse);
    app.get('/api/categories/courses/:courseId', courseController.showCourseAndChapters);
    app.get('/api/categories/courses', courseController.showAllCoursesAndChapters);

    // Categories
    app.post('/api/categories', categorieController.createCategory);
    app.get('/api/categories', categorieController.getCategoriesAndCourses);
    app.put('/api/categories/:categoryId', categorieController.updateCategory);
    app.delete('/api/categories/:categoryId', categorieController.destroyCategory);

    // Chapters
    app.post('/api/categories/courses/:courseId/chapters', chapterController.createChapterForCourse);
    app.put('/api/categories/courses/chapters/:chapterId', chapterController.updateChapterForCourse);
    app.delete('/api/categories/courses/chapters/:chapterId', chapterController.destroyChapterForCourse);
    app.get('/api/categories/courses/chapters', chapterController.showAllChaptersAndQuizzes);

    //Quiz
    app.post('/api/categories/courses/chapters/:idChapter/quiz', quizController.createQuizForChapter);
    app.get('/api/categories/courses/chapters/:idQuiz/quiz', quizController.listQuizAndQuizOptions);
    app.put('/api/categories/courses/chapters/:idQuiz/quiz', quizController.updateQuizForChapter);
    app.delete('/api/categories/courses/chapters/:idQuiz/quiz', quizController.destroyQuizForChapter);

    
    // QuizOptions
    app.post('/api/categories/courses/chapters/quiz/:idQuiz', quizOptionController.createQuizOption);
    app.get('/api/categories/courses/chapters/quiz', quizOptionController.listQuizOption);
    app.put('/api/categories/courses/chapters/quiz/:quizOptionId', quizOptionController.updateQuizOption);
    app.delete('/api/categories/courses/chapters/quiz/:quizOptionId', quizController.destroyQuizForChapter);
};
