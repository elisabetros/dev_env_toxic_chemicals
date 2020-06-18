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
    const response = await axios('https://toxic-chemicals-devenv.herokuapp.com/warehouses')
    
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
    const response = await axios(`https://toxic-chemicals-devenv.herokuapp.com/currentstock/${id}`)
    const warehouseStock = await response.data
    let stockObj = {}
    warehouseStock.map(stock => {
      if(stock.amount !== 0){
        let temp ={}
        temp[stock.chemical] = stock.amount
        stockObj = {...temp, ...stockObj}
        return temp
      }
        })
        return stockObj
}
if(isLoading){
  return(<div className="loading">Loading..</div>)
}


  return (
    <>
      <h1> Warehouse current stock</h1>
      <h2>Site 1</h2>
      <div className="warehouse-container">
        <div className="canvas-container">
          <p>Warehouse Capacity = 10ku</p>
          <ChartWarehouse {...warehouses[0]} />
        </div>
        <div className="canvas-container">
        <p>Warehouse Capacity = 12ku</p>
          <ChartWarehouse {...warehouses[1]} />
        </div>
        <div className="canvas-container">
        <p>Warehouse Capacity = 5ku</p>
          <ChartWarehouse {...warehouses[2]} />
        </div>
        <div className="canvas-container">
        <p>Warehouse Capacity = 3ku</p>
          <ChartWarehouse {...warehouses[3]} />
        </div>
        <p>Warehouse Capacity = 9ku</p>
        <div className="canvas-container">
          <ChartWarehouse {...warehouses[4]} />
        </div>
      </div>
      <h2>Site 2</h2>
      <div className="warehouse-container">
        <div className="canvas-container">
        <p>Warehouse Capacity = 10ku</p>
          <ChartWarehouse {...warehouses[5]} />
        </div>
        <div className="canvas-container">
        <p>Warehouse Capacity = 12ku</p>
          <ChartWarehouse {...warehouses[6]} />
        </div>
        <div className="canvas-container">
        <p>Warehouse Capacity = 5ku</p>
          <ChartWarehouse {...warehouses[7]} />
        </div>
        <div className="canvas-container">
        <p>Warehouse Capacity = 3ku</p>
          <ChartWarehouse {...warehouses[8]} />
        </div>
        <div className="canvas-container">
        <p>Warehouse Capacity = 9ku</p>
          <ChartWarehouse {...warehouses[9]} />
        </div>
      </div>
    </>
  );
}
