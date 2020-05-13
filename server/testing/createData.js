const Site = require('./site')
const Warehouse = require('./warehouse')
const Ticket = require('./ticket')
const Job = require('./job')


const axios = require('axios')
// 10, 12, 5, 3, 9


let site1 = new Site(1)
let site2 = new Site(2)

let ticket1 = new Ticket('incoming', {'A': 5, 'C':2})
let ticket2 = new Ticket('incoming', {'B': 7, 'C':3})
let ticket3 = new Ticket('incoming', {'C':7})
let ticket4 = new Ticket('outgoing', {'C':7})
let ticket5 = new Ticket('outgoing', {'A':2})
let ticket6 = new Ticket('incoming', {'A':5, 'C':7})


// site1.processTicket(ticket1)
// // console.log(site1.warehouses)
// site1.processTicket(ticket2)
// // console.log(site1.warehouses)
// site1.processTicket(ticket4)
// console.log(ticket4.status)
// if(ticket4.status === 'Denied'){
//     site1.warehouses = [warehouse1, warehouse2, warehouse3, warehouse4, warehouse5]
// }
// console.log(site1.warehouses)
// site2.processTicket(ticket3)
// console.log(site2.warehouses)
// site2.processTicket(ticket4)
// console.log(site2.warehouses)
// site2.processTicket(ticket5)
// console.log(site2.warehouses)
// site2.processTicket(ticket6)
// console.log(site2.warehouses)



let aWarehouses = []
let aWarehouses1 = []


const fetchWarehouses = async () => {
    const response = await axios('http://localhost/warehouses')
    const warehouses = response.data
    // console.log(warehouses)
    warehouses.forEach(warehouse => {
        if(warehouse.nWarehouseID <= 5){
            aWarehouses.push(new Warehouse(warehouse.nWarehouseID, warehouse.nCapacity))
        }else{
            aWarehouses1.push(new Warehouse(warehouse.nWarehouseID, warehouse.nCapacity))
        }
       
    })
    // aWarehouses = ['A', 'B']
    // console.log(aWarehouses)
}
const assignWarehouses = async () =>{
    await fetchWarehouses()
    site1.warehouses= aWarehouses
    site2.warehouses= aWarehouses1
    await fetchWarehouseStock(site1)
    await fetchWarehouseStock(site2)
    await createTickets()
    // console.log(site1)

}
assignWarehouses()

const fetchWarehouseStock = async (site) => {
    await site.warehouses.forEach(async (warehouse) => {
        const response = await axios(`http://localhost/currentstock/${warehouse.id}`)
      
            let stockArray = []
            await response.data.map(stock => {
                temp ={}
                temp[stock.sChemicalName] = stock.nStock
                stockArray.push(temp)
            })
            warehouse.chemicalInventory = stockArray  
       })
}

const createTickets = async () => {
    // const ticket = new Ticket({})
    site1.processTicket(ticket1)
    site1.processTicket(ticket2)
    console.log(site1)
}

