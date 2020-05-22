const router = require('express').Router();


module.exports = router;

const Job = require('../models/Job')
const JobItem = require('../models/JobItem')


router.get('/job', async (req, res) => {
    const jobs = await Job.query().select()
    return res.status(200).send(jobs)
})

router.get('/jobsWithJobItems', async (req, res) => {
    const jobItems = await Job.query().withGraphFetched('jobItem')
    return res.status(200).send(jobItems)
})
router.get('/jobItem', async (req, res) => {
    const jobItems = await JobItem.query().select()
    return res.status(200).send(jobItems)
})

router.get('/jobItem/:jobID', async (req, res) => {
    const jobID = req.params.jobID
    const jobItem = await JobItem.query().select().where({'job_id': jobID})
    return res.status(200).send(jobItem)
})