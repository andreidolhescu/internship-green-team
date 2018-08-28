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


// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function(req, res, cb){
//         cb(null, './uploads/');
//     },
//     filename: function(req, file, cb){
//         cb(null, new Date().toISOString() + file.originalname)
//     }
// });

// const fileFilter = (req, file, cb) => {
//     //reject a file
//     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
//         cb(null,true)
//     }else{
//         cb(null,false)
//     }
// }

// const upload = multer({
//     storage: storage, 
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// });


module.exports = (app) => {
    app.use(cors()); //Do not remove this
    
    app.get('/api', (req,res) => res.status(200).send({
        message: 'Welcome to the Users API! Token',
    }));
    app.put('/api/updateAdminq/:testId',adminCheckAuth,(req,res)=>res.status(200).send({
       message:'Welcome to update;',
    }));

    //Testing
    //app.get('/api/user/:userId/course/:courseId', userCourseController.create);
    //app.get('/api/test', userController.listCourseAndUser);

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
    app.delete('/api/categories/courses/:courseId', courseController.destroyCourse);
    app.get('/api/categories/courses/:courseId', courseController.showCourseAndChapters);
    app.get('/api/categories/courses', courseController.showAllCoursesAndChapters);

    // Categories
    app.post('/api/categories', categorieController.createCategory);
    app.get('/api/categories', categorieController.getCategoriesAndCourses);
    app.get('/api/categories/:categoryId', categorieController.getCategoryWithCourses);
    app.put('/api/categories/:categoryId', categorieController.updateCategory);
    app.delete('/api/categories/:categoryId', categorieController.destroyCategory);

    // Chapters
    app.post('/api/categories/courses/:courseId', chapterController.createChapterForCourse);
    app.put('/api/categories/courses/chapters/:chapterId', chapterController.updateChapterForCourse);
    app.delete('/api/categories/courses/chapters/:chapterId', chapterController.destroyChapterForCourse);
    app.get('/api/categories/course/quizes', chapterController.showAllChaptersAndQuizzes);

    //Quiz
    app.post('/api/categories/courses/chapters/:chapterId', quizController.createQuizForChapter);
    app.get('/api/categories/courses/chapters/quiz/:idQuiz', quizController.listQuizAndQuizOptions);
    app.put('/api/categories/courses/chapters/quiz/:idQuiz', quizController.updateQuizForChapter);
    app.delete('/api/categories/courses/chapters/quiz/:idQuiz', quizController.destroyQuizForChapter);

    
    // QuizOptions
    app.post('/api/categories/courses/chapters/quiz/:idQuiz', quizOptionController.createQuizOption);
    app.get('/api/categories/courses/chapters/quiz', quizOptionController.listQuizOption);
    app.put('/api/categories/courses/chapters/quiz/:quizOptionId', quizOptionController.updateQuizOption);
    app.delete('/api/categories/courses/chapters/quiz/:quizOptionId', quizController.destroyQuizForChapter);
};
