const User=require('../models').User;
const Course=require('../models').Course;
const Track=require('../models').TrackAssistTeachMe;

module.exports={
    createTrack(req,res){
        return Track
        .create({
            userId:req.params.userId,
            courseId:req.params.courseId
        })
        .then(track=>res.status(200).send(track))
        .catch((error)=>res.status(400).send(error))
        
    },
    showTrack(req,res){
        return Track
        .findOne({
            where:{
                userId:req.params.userId,
            },
            include:[{
                model:User,
                as:'User'
            },
            {
                model:Course,
                as:'Course'
            }],
        })
        .then(track=>res.status(200).send(track))
        .catch(error=>res.status(400).send(error))
    }
}