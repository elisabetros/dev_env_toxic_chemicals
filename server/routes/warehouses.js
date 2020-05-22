const router = require('express').Router();

const Warehouse = require('../models/Warehouse')
const WarehouseItem = require('../models/WarehouseItem')

router.get('/currentstock/:id', async (req, res) => {
    const warehouseID = req.params.id
    const stock = await WarehouseItem.query().select().where('warehouse_id', warehouseID)
    return res.status(200).send(stock)
})

router.get('/allstock', async (req, res) => {
    const stock = await WarehouseItem.query().select()
    return res.status(200).send(stock)
})

router.get('/warehouses', async (req, res) => {
    const warehouses = await Warehouse.query().select()
    return res.status(200).send(warehouses)
})


module.exports = router;

