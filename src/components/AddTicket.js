import React, { useEffect, useState } from "react";
import ticketCSS from '../css/addTicket.css'
import axios from "axios";

const AddTicket = () => {
    const [ticketType, setTicketType] = useState()
    const [chemical1, setChemical1] = useState()
    const [chemicalAmount1, setChemicalAmount1] = useState()
    const [chemical2, setChemical2] = useState()
    const [chemicalAmount2, setChemicalAmount2] = useState()
    const [ticket, setTicket] = useState()

    const [site1Stock, setSite1Stock] = useState()
    const [site2Stock, setSite2Stock] = useState()
    const [job, setJob] = useState()
    const [process, setProcess] = useState()

    const checkIfSiteContainsChemicals = (site) => {
       let currentTotalInventory = 0;
        if(ticket.site === 'site1'){
            site1Stock.forEach(warehouse => {
                currentTotalInventory = warehouse.current_stock + currentTotalInventory
            })
        }
        if(currentTotalInventory >= ticket.totalAmount){
            return true
        }else {
            return false
        }
    }

    const checkIfSpaceAtSite = (site) => {
        let totalSiteCapacity = 0;
        if(ticket.site === 'site1'){
            site1Stock.forEach(warehouse => {
                // console.log(warehouse.capacity)
                totalSiteCapacity = warehouse.capacity + totalSiteCapacity
            })
        }
        // console.log(totalSiteCapacity ,ticket.totalAmount)
        if(totalSiteCapacity >= parseInt(ticket.totalAmount)){
            console.log('true')
            return true
        }
        else{
            return false 
        }
    }
    const processWarehouseInventory = (warehouse) => {
        let chemicalsAllowed;
        console.log('process inventory')
        if(Object.keys(warehouse.chemicalInventory).length !== 0){
            // const chemicalInventory = Object.keys(warehouse.chemicalInventory)
            if(warehouse.chemicalInventory.A){
                chemicalsAllowed = ['A', 'C']
            }else if(warehouse.chemicalInventory.B){
                chemicalsAllowed = ['B', 'C']
            }else if(warehouse.chemicalInventory.C){
                chemicalsAllowed = ['A', 'B', 'C']
            }
            console.log(warehouse.capacity - warehouse.current_stock, warehouse.chemicalInventory, warehouse.current_stock)
            return {chemicalsAllowed, remainingStorage: warehouse.capacity - warehouse.current_stock}
        }else{
            console.log(warehouse.capacity - warehouse.current_stock)
            return {chemicalsAllowed: ['A', 'B', 'C'], remainingStorage: warehouse.capacity - warehouse.current_stock}
        }
    }
    
    const findWarehousesForDispatch = (site) => {
        let aWarehousesToRemoveFrom = []
        let warehouses;
        if(site === "site1"){
            warehouses = site1Stock
        }else{
            warehouses = site2Stock
        }
        let ticketTemp = ticket
        Object.keys(ticketTemp.chemicals).map(chemical => {
            const amount = ticketTemp.chemicals[chemical]
            console.log(amount)
            for(let i = 0; i< amount; i++){
                console.log(ticketTemp.totalAmount)
                const warehouseToRemoveFrom = warehouses.find(warehouse => {
                    console.log(warehouse)
                    if(warehouse.chemicalInventory){
                        console.log('has stock')
                        if(warehouse.chemicalInventory[chemical] && warehouse.chemicalInventory[chemical]!== 0 && ticketTemp.chemicals[chemical] !== 0){
                            console.log('has chemical and is not empty')
                            --warehouse.chemicalInventory[chemical]
                             --ticketTemp.chemicals[chemical]
                            --ticketTemp.totalAmount
                            return {...warehouse}
                        }
                    }else{
                        console.log('false', warehouse)
                        return false   
                    }
                })            
                if(warehouseToRemoveFrom){
                   const warehouseId = warehouseToRemoveFrom.id
                    let existingInArray = aWarehousesToRemoveFrom.filter(placement => placement.warehouse === warehouseId)
                    if(existingInArray.length){
                        // console.log(existingInArray)
                        let index = aWarehousesToRemoveFrom.findIndex(placement=> placement.warehouse === warehouseId)
                        aWarehousesToRemoveFrom[index].amount++
                    }else{
                        aWarehousesToRemoveFrom.push({'warehouse': warehouseId, 'chemical':chemical, 'amount': 1})                  
                    }                        
                }
            }
        })   
        if(ticketTemp.totalAmount !== 0) {
            console.log('coult not do job')
            return false
        }else{
            return aWarehousesToRemoveFrom
        }
    }
    const placeChemical = (amount, chemical, ticketTemp) => {
        let aWarehousesToStore = []
        let warehouses;
        if(ticket.site === 'site1'){
            warehouses = site1Stock
        }else{
            warehouses = site2Stock
        }
        for(let i = 0; i< amount; i++){
            const warehouseToStore = site1Stock.find((warehouse, index) => {
                console.log('os', warehouse.chemicalInventory)
                const chemicalsAllowed= processWarehouseInventory(warehouse).chemicalsAllowed
                let remainingStorage = processWarehouseInventory(warehouse).remainingStorage
                console.log(chemicalsAllowed, remainingStorage)
                // console.log(warehouse)
                if (chemicalsAllowed.includes(chemical) && remainingStorage >= 1 ){
                    if(chemical === 'A'){
                        let nextWarehouse = warehouses[index+1];
                        let previousWarehouse= warehouses[index-1];
                        if(nextWarehouse && nextWarehouse.chemicalInventory){
                            if(nextWarehouse.chemicalInventory.A){
                                return false
                            }
                        }
                        if(previousWarehouse && previousWarehouse.chemicalInventory){
                            if(previousWarehouse.chemicalInventory.A){
                                return false
                            }
                        }
                            if(warehouse.chemicalInventory === undefined){
                               warehouse.chemicalInventory = {[chemical]:1}
                            }else if(!warehouse.chemicalInventory[chemical]){
                                warehouse.chemicalInventory[chemical] = 1
                            }else{
                                ++warehouse.chemicalInventory[chemical]
                            }
                            ++warehouse.current_stock
                            --ticketTemp.chemicals[chemical]
                            --ticketTemp.totalAmount            
                                              
                            return warehouse
                      
                    }else{
                            if(warehouse.chemicalInventory === undefined){
                                warehouse.chemicalInventory= {[chemical]:1}
                             }else if(!warehouse.chemicalInventory[chemical]){
                                 warehouse.chemicalInventory[chemical] = 1
                             }else{
                                 ++warehouse.chemicalInventory[chemical]
                             }
                             ++warehouse.current_stock
                             --ticketTemp.chemicals[chemical]
                             --ticketTemp.totalAmount   
                             if(warehouse.chemicalInventory[chemical] === 0){
                                delete warehouse.chemicalInventory[chemical]
                            }    
                            
                            // warehouseId = warehouse.id      
                            return warehouse                 
                        
                    }
                }
            })
            if(warehouseToStore){
                const warehouseId = warehouseToStore.id
              
                let existingInArray = aWarehousesToStore.filter(placement => placement.warehouse === warehouseId)
                if(existingInArray.length){
                    // console.log('a',existingInArray)
                    
                   const index= aWarehousesToStore.findIndex( placement=>  placement.warehouse === warehouseId && placement.chemical === chemical)
        
                    aWarehousesToStore[index].amount++
                }else{
                    aWarehousesToStore.push({'warehouse': warehouseId, 'chemical':chemical, 'amount': 1})                  
                }
            }
        }
        // aWarehousesToStore.forEach(a=> console.log('a:',a))
            console.log(aWarehousesToStore)
       return aWarehousesToStore
    }
    const findWarehousesForDelivery = (site) => {
        let placementArray = []
        let ticketTemp = ticket
        // console.log('amount', amount)
        Object.keys(ticketTemp.chemicals).map(chemical => {
            const amount = ticketTemp.chemicals[chemical]
            const warehouseArray = placeChemical(amount, chemical, ticketTemp)
            placementArray.push(...warehouseArray)
        })

        if(ticketTemp.totalAmount !== 0){
            return false
        }
        return placementArray
    }

    const processTicket = async () => {
        console.log('process ticket')
        console.log(ticket)
        
        if(ticket.type === 'O'){
           if(checkIfSiteContainsChemicals(ticket.site)){
               console.log('enough')
               const placementArray = findWarehousesForDispatch(ticket.site)
               if(placementArray){
                   console.log(placementArray)
                   setJob({status:'inProcess', type: ticket.type, placementArray}) 
                   setTicket({...ticket, status: 'Approved'})
                   setProcess(false)
               }else{
                setTicket({...ticket, status: 'Denied'})
               }  
             // not enough chemicals
           }else{
            setTicket({...ticket, status: 'Denied'})
           }
        }
         if(ticket.type === 'I'){
           if(checkIfSpaceAtSite(ticket.site)){
               console.log('space')
               const placementArray = findWarehousesForDelivery(ticket.site)
               if(placementArray){
                console.log(placementArray)
                setJob({status:'inProcess', type: ticket.type, placementArray}) 
                setTicket({...ticket, status: 'Approved'})
                setProcess(false)
               }else{
                setTicket({...ticket, status: 'Denied'})
               } 
            //    not enough space at site
            }else{
               console.log('ticket denied')
               setTicket({...ticket, status: 'Denied'})
           }
        }
        // check if outgoing or incoming
        // check if space or enough inventory on site
        // check if warehouses can handle stock
        // if so raise job -> else deny ticket
        // if job is raised, refetch stock, do individual checks at warehouses
        //      if all is good post to database
        console.log(site1Stock)

    }
    const handleSubmit = async (e, site) => {
        e.preventDefault()
        if(ticketType && chemical1 && chemicalAmount1 && !chemical2){
            await setTicket({
                'chemicals': {[chemical1]:parseInt(chemicalAmount1)},
                'type': ticketType,
                'totalAmount': parseInt(chemicalAmount1),
                'status':'pending',
                site
            })
            setProcess(true)
        } else if(ticketType && chemical1 && chemicalAmount1 && chemical2 && chemicalAmount2){
           await setTicket({
                'chemicals': {[chemical1]:parseInt(chemicalAmount1), [chemical2]: parseInt(chemicalAmount2)},
                'type': ticketType,
                'totalAmount': parseInt(chemicalAmount1)+parseInt(chemicalAmount2),
                'status':'pending',
                site
            })
            setProcess(true)
        }
    }

    const setChemicalInventory = (warehouse) => {
        let stockObj = {}
        warehouse.warehouseitem.map(item => {
            if(item.amount !== 0){
                let temp = {}
                temp[item.chemical] = item.amount
                stockObj = {...temp, ...stockObj}
                return temp                
            }
        })
        return stockObj
    }

    useEffect(() => {
        let isFetching = true
        const fetchAllStock = async () => {
            const responseSite1 = await axios(`http://localhost/warehousesWithStock/site1`)
            const responseSite2 = await axios(`http://localhost/warehousesWithStock/site2`)
            responseSite1.data.map(warehouse => {               
               warehouse.chemicalInventory = setChemicalInventory(warehouse)
                delete warehouse.warehouseitem
            })
            responseSite2.data.map(warehouse => {               
               warehouse.chemicalInventory = setChemicalInventory(warehouse)
                delete warehouse.warehouseitem
            })

            if(isFetching){
                console.log(responseSite1.data)
                console.log(responseSite2.data)
                setSite1Stock(responseSite1.data)
                setSite2Stock(responseSite2.data)
            }
        }
        const fetchPostJob = async () => {
            try{
                const response = await axios.post(`http://localhost/processJob`, {job})
                console.log(response.data)
                if(response.data.response){
                setJob({...job, status: 'Confirmed'})
                }
            }catch(err){
                if(err){console.log(err); return; }
            }
            
        }
        fetchAllStock()

        if(ticket && !job){
            processTicket()
        }
        if(job){
            console.log('send job to db', job)
            console.log({...job.placementArray})
            fetchPostJob()
        }
        return () => isFetching = false
    }, [process])


// if(ticket){
//     console.log(ticket)
// }
//     console.log(site1Stock)
//     console.log(site2Stock)
    return(
        <div>
            <h1>Process ticket</h1>
            <form>
            {ticket? <h2>Ticket: {ticket.status}</h2>: null}  
            {job? <h2>Job: {job.status}</h2>: null}  
                <h3>Fill in ticket information</h3>
                <label>
                   <p>Select type of Ticket</p> 
                    <select name="type" value={ticketType} onChange={(e)=>setTicketType(e.target.value)}>
                        <option value="null">Select Ticket Type</option>
                        <option value="O">Dispatch</option>
                        <option value="I">Delivery</option>
                    </select>
                </label>
                <label>
                    <p>Select type of Chemical</p>
                    <select name="chemical1" value={chemical1} onChange={(e)=>setChemical1(e.target.value)}>
                        <option value="null">Select Chemical</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </label>
                <label>
               <p> Amount</p>
                    <input type="number" name="amount1" onChange={(e)=>{console.log(e.target.value);setChemicalAmount1(e.target.value)}}/>
                </label>
                <label>
                   <p> Select type of Chemical</p>
                    <select name="chemical2" value={chemical2}onChange={(e)=>setChemical2(e.target.value)}>
                        <option value="null">Select Chemical</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </label>
                <label>
                <p>Amount</p>
                    <input type="number" name="amount2" onChange={(e)=>setChemicalAmount2(e.target.value)}/>
                </label>
            <button onClick={(e)=>handleSubmit(e, "site1")}>Process Ticket</button>
            </form>
            
        </div>
    )
}

export default AddTicket