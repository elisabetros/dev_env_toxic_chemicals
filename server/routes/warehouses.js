const router = require('express').Router();

const Warehouse = require('../models/Warehouse')
const WarehouseItem = require('../models/WarehouseItem')

router.get('/currentstock/:id', async (req, res) => {
    const warehouseID = req.params.id
    try{
        const stock = await WarehouseItem.query().select().where('warehouse_id', warehouseID)
        return res.status(200).send(stock)
        
    }catch(err){
        if(err){console.log(err); return; }
    }
})
router.get('/warehousesWithStock/:site', async (req, res) => {
    const site = req.params.site
    let warehousesWithStock;
    try{
        if(site === 'site1'){
            warehousesWithStock = await Warehouse.query().select().where('id', '<', 6).withGraphFetched('warehouseitem')
        }else{
            warehousesWithStock = await Warehouse.query().select().where('id', '>', 5).withGraphFetched('warehouseitem')
        }
        return res.status(200).send(warehousesWithStock)
        
    }catch(err){
        if(err){console.log(err); return res.status(500).send({error:'database error'}); }
    }
} )
router.get('/allstock', async (req, res) => {
    try{
        const stock = await WarehouseItem.query().select()
        return res.status(200).send(stock)
        
    }catch(err){
        if(err){console.log(err); return; }
    }
})

router.get('/warehouses', async (req, res) => {
    try{
        const warehouses = await Warehouse.query().select()
        return res.status(200).send(warehouses)
        
    }catch(err){
        if(err){console.log(err); return; }
    }
})


module.exports = router;

