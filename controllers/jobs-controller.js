const { StatusCodes } = require('http-status-codes');
const Job = require('../models/Job');
const { BadRequestError, NotFoundError } = require('../errors/index');

const getAlljobs = async(req, res) => {
    const jobs = await Job.find({createdBy : req.user.userId}).sort('createdAt');
    return res.status(StatusCodes.OK).json({jobs,count: jobs.length});
}

const getjob = async(req, res) => {
    const jobId = req.params.id;
    const userId = req.user.userId;
    const job = await Job.findOne({
        _id:jobId,createdBy: userId
    });
    if(!job){
        throw new NotFoundError(`No job with id: ${jobId}`);
    }
    return res.status(StatusCodes.OK).json({job});
}
const createJob = async(req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    return res.status(StatusCodes.CREATED).json({job});
}
const deleteJob = async(req, res) => {
    const jobId = req.params.id;
    const userId = req.user.userId;
    const job = await Job.findByIdAndDelete({
        _id:jobId,createdBy: userId
    });
    if(!job){
        throw new NotFoundError(`No job with id: ${jobId}`);
    }
    return res.status(StatusCodes.OK).json({job});
}
const updateJob = async(req, res) => {
    const jobId = req.params.id;
    const userId = req.user.userId;
    const company = req.body.company;
    const position = req.body.position;
   if(company === '' || position ===''){
    throw new BadRequestError('Company or Position fields cannot be empty');
   }

   const job = await Job.findByIdAndUpdate({_id:jobId,createdBy:userId}, req.body, {new: true});
   if(!job){
    throw new NotFoundError(`No job with id: ${jobId}`);
   }
   return res.status(StatusCodes.OK).json(job);
}

module.exports = {
    createJob,
    getAlljobs,
    getjob,
    deleteJob,
    updateJob
}