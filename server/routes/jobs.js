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
