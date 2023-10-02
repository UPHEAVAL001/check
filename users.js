const express = require("express");

const Course = require("../mongoose/models/courses")

const usersRouter = new express.Router();


usersRouter.get('/courses/get', async(req,res) => {
    const data = await Course.find()
    res.status(200).json(data);
})

usersRouter.post('/courses/enroll/:id', async (req, res) => {
    const id = req.params.id;
    const getData = await Course.findById(id)
    if(!getData.isApplied){
        obj = {
            isApplied: true
        }
        await Course.findByIdAndUpdate(id, obj)
        res.status(200).json({message: "Enrolled successfully"})
    }else{
        res.status(403).json({message: "Not Allowed"})
    }
})

usersRouter.patch('/courses/rating/:id', async (req, res) => {
    const id = req.params.id;
    const getData = await Course.findById(id)
    if(getData.isApplied && !getData.isRated){
        const body = req.body
        const noOfRatings = getData.noOfRatings + 1
        const finalRate = (((getData.noOfRatings * getData.rating) + body.rating)/noOfRatings).toFixed(1)
        obj = {
            isRated : false,
            rating : finalRate,
            noOfRatings: noOfRatings
        }
        await Course.findByIdAndUpdate(id, obj)
        res.status(200).json({message: "Rated successfully"})
    }else{
        res.status(403).json({message: "Not Allowed"})
    }
})

usersRouter.delete('/courses/drop/:id', async (req, res) => {
    const id = req.params.id;
    const getData = await Course.findById(id)
    if(getData.isApplied){
        obj = {
            isApplied: false
        }
        await Course.findByIdAndUpdate(id, obj)
        res.status(200).json({message: "Dropped successfully"})
    }else{
        res.status(403).json({message: "Not Allowed"})
    }
})

module.exports = usersRouter;