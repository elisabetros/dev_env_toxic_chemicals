const router = require('express').Router();

const Audit = require('../models/Audit')

router.get('/auditData', async (req, res) => {
    try{
        const auditData = await Audit.query().select()
        return res.status(200).send(auditData)

    }catch(err){
        if(err){console.log(err); return;}
    }
})


module.exports = router;