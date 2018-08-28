const Chapter=require('../models').Chapter;
const Quiz=require('../models').Quiz;
const QuizOption=require('../models').QuizOption;
const User=require('../models').User;
const Answers=require('../models').Answers;

module.exports={
    createProgress(req,res){
        return Answers
        .create({
            userId:req.params.userId,
            chapterId:req.params.chapterId,
            quizId:req.params.quizId,
            optionId:req.params.optionId
        })
        .then(answer=>res.status(200).send(answer))
        .catch((error)=>res.status(400).send(`Error${error}`))
    },
    showProgress(req,res){
        return Answers
        .findAll({
            include:[{
                model:User,
                as:'User'
            },
            {
                model:Chapter,
                as:'Chapter'
            },
            {
                model:Quiz,
                as:'Quiz'
            },
            {
                model:QuizOption,
                as:'chosedOption'
            }],
        })
        //.all()
        .then(answer=>res.status(200).send(answer))
        .catch(error=>res.status(400).send(error))
    }
}