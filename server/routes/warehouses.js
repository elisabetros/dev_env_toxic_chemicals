const router = require('express').Router();

const Warehouse = require('../models/Warehouse')
const ChemicalStock = require('../models/ChemicalStock')
const Job = require('../models/ShipmentJob')
const JobItem = require('../models/ShipmentItem')

router.get('/currentstock/:id', async (req, res) => {
    const warehouseID = req.params.id
    const stock = await ChemicalStock.query().where('nWarehouseID', warehouseID)
    return res.send(stock)
})

router.get('/warehouses', async (req, res) => {
    // const warehouseId = req.params.id
    const warehouses = await Warehouse.query().select()
    return res.send(warehouses)
})

router.post('/processJob', async (req, res) => {
    const {job} = req.body
    console.log(job)
    const newJob = await Job.query().insert({
        cJobType:job.type
    })
    jobId = newJob.nJobID
    job.placementArray.map(item => {
        const newJobItem = await JobItem.query().insert({
            nAmount:item.amount,
            cChemicalName: item.chemical,
            nJobID: jodId,
            nWarehouseID: item.warehouse
        })
        const udpatedWarehouseStock = await ChemicalStock.query.update({
            
        }).where(nWarehouseID, item.warehouse).andWhere(cChemicalName, item.chemical)
    });
    return res.send(newJob)

})


module.exports = router;