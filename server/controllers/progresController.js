const answer = require('../models').answer;
const User = require('../models').Users;
const Course = require('../models').Course;
const Chapters = require('../models').Chapters;
const Quizzes = require('../models').Quizzes;



module.exports = {
    //track progress
    progress (req, res) {
        console.log('\n\n\nAici');
        return User
            .findAll({
                include: [{
                    model: Course,
                    as: 'courseItems'
                },
                {
                    model: Chapters
                },
                {
                    model: Quizzes
                }
            ]
            })
            .then(users => res.status(201).send(users))
            .catch(error => {
                console.log("eroare", error);
                return res.status(400).send(error)
            });
    }
}