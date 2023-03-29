const { StatusCodes } = require('http-status-codes');

const getAlljobs = async(req, res) => {
    return res.send('ALL jobs sent');
}

const getjob = async(req, res) => {
    return res.send('job with id sent');
}
const createJob = async(req, res) => {
    return res.send('job created');
}
const deleteJob = async(req, res) => {
    return res.send('job Deleted');
}
const updateJob = async(req, res) => {
    return res.send('job updated');
}

module.exports = {
    createJob,
    getAlljobs,
    getjob,
    deleteJob,
    updateJob
}