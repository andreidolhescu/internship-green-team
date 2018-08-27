const Answer = require('../models').Answer;
const Users = require('../models').Users;
const Course = require('../models').Course;
const Chapters = require('../models').Chapters;
const Quizzes = require('../models').Quizzes;
const QuizOptions = require('../models').quizOptions;




module.exports = {
    //track progress
    progress (req, res) {
        return Answer
            .findAll({
                include: [{
                    model: Users
                },
                {
                    model: Course
                },
                {
                    model: Chapters
                },
                {
                    model: Quizzes
                },
                {
                    model: QuizOptions,
                    as: 'chosedOption'
                }
                ]
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => {
                console.log("eroare", error);
                return res.status(400).send(error)
            });
    }
}