const router = require('express').Router();



const Job = require('../models/Job')
const JobItem = require('../models/JobItem')


router.get('/job', async (req, res) => {
    try{
        const jobs = await Job.query().select()
        return res.status(200).send(jobs)
        
    }catch(err){
        if(err){console.log(err); return; }
    }
})

router.get('/jobsWithJobItems', async (req, res) => {
    try{
        const jobItems = await Job.query().withGraphFetched('jobItem')
        return res.status(200).send(jobItems)        
    }catch(err){
        if(err){console.log(err); return; }
    }
})

module.exports = router;