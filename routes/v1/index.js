const express = require('express');
const router = express.Router();
const { register, login } = require('../../controllers/user-controller');
const { createJob, deleteJob, getAlljobs, getjob, updateJob } = require('../../controllers/jobs-controller');
const errorHandlerMiddleware = require('../../middlewares/errorHandlerMiddleware');


router.post('/auth/register',register);
router.post('/auth/login',login);

router.get('/jobs',getAlljobs);
router.post('/jobs',createJob);
router.get('/jobs/:id',getjob);
router.delete('/jobs/:id',deleteJob);
router.patch('/jobs/:id',updateJob);


module.exports = router;


