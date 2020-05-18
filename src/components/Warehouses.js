import React, { useState, useEffect } from "react";
import "../css/warehouse.css";
import axios from 'axios'

import ChartWarehouse from "./charts/ChartWarehouse";

// (1st-10ku, 2nd-12ku, 3rd-5ku, 4th-3ku, 5th-9ku)

export default function Warehouses() {
  const [warehouses, setWarehouses] = useState([])
  const [isLoading, setLoading] = useState(true)
  
  useEffect(() =>{
    let isFetching = true
    const fetchData = async () => {
    const response = await axios('http://localhost/warehouses')
    
    const warehouses = response.data
    for await (let warehouse of warehouses){
      console.log(warehouses)
     warehouse.chemicalInventory = await fetchWarehouseStock(warehouse.id)
    }
    if(isFetching){
      setWarehouses(warehouses)
      setLoading(false)
    }
  }
  fetchData()
    return () => isFetching = false
},[])

console.log(isLoading)


  const fetchWarehouseStock = async (id) => {
    const response = await axios(`http://localhost/currentstock/${id}`)
    const warehouseStock = await response.data
    let stockObj = {}
    warehouseStock.map(stock => {
            let temp ={}
            temp[stock.chemical] = stock.amount
            stockObj = {...temp, ...stockObj}
            return temp
        })
        return stockObj
}
if(isLoading){
  return(<div>Loading..</div>)
}

  if(!isLoading){
    console.log('not loading')
    console.log(warehouses[0])
    // warehouses.forEach(x => console.log(x))
  }
  return (
    <>
      <h1> This is warehouse page</h1>
      <h2>Site 1</h2>
      <div className="warehouse-container">
        <div className="canvas-container">
          <ChartWarehouse {...warehouses[0]} />
        </div>
        <div className="canvas-container">
          <ChartWarehouse {...warehouses[1]} />
        </div>
        <div className="canvas-container">
          <ChartWarehouse {...warehouses[2]} />
        </div>
        <div className="canvas-container">
          <ChartWarehouse {...warehouses[3]} />
        </div>
        <div className="canvas-container">
          <ChartWarehouse {...warehouses[4]} />
        </div>
      </div>
      <h2>Site 2</h2>
      <div className="warehouse-container">
        <div className="canvas-container">
          <ChartWarehouse {...warehouses[5]} />
        </div>
        <div className="canvas-container">
          <ChartWarehouse {...warehouses[6]} />
        </div>
        <div className="canvas-container">
          <ChartWarehouse {...warehouses[7]} />
        </div>
        <div className="canvas-container">
          <ChartWarehouse {...warehouses[8]} />
        </div>
        <div className="canvas-container">
          <ChartWarehouse {...warehouses[9]} />
        </div>
      </div>
    </>
  );
}
