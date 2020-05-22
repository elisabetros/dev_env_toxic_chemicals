import React, { useState, useEffect } from "react";
import "../css/chemicals.css";
import ChartChemicalsDelivered from "./charts/ChartChemicalsDelivered";
import ChartChemicalsDispatched from "./charts/ChartChemicalsDispatched";
import axios from "axios";

export default function Chemicals() {
  //preparing for fetch
  // const [loading, setLoading] = useState(false);
  const[ jobs, setJobs ] = useState()
  const [selectLabelsDelivered, setselectLabelsDelivered] = useState([
    { label: "total", value: "total" },
    { label: "today", value: "today" },
    { label: "week", value: "week" },
    { label: "month", value: "month" },
  ]);

  const [selectLabelsDispatched, setSelectLabelsDispatched] = useState([
    { label: "total", value: "total" },
    { label: "today", value: "today" },
    { label: "week", value: "week" },
    { label: "month", value: "month" },
  ]);

  const [deliveryForChart, setDeliveryForChart] = useState({});

  const [dispatchForChart, setDispatchForChart] = useState({});

  const [dispatchedByTypes, setDispatchedByTypes] = useState([]);

  const [deliveredByTypes, setDeliveredByTypes] = useState([]);

  const getValueForDelivered = (selectedValue) => {
    console.log(selectedValue);

    // console.log({ deliveryForChart });
    deliveredByTypes.forEach((deliveredByTypes) => {
      if (selectedValue === deliveredByTypes.desc) {
        console.log({ deliveryForChart });
        console.log(deliveredByTypes);
        setDeliveryForChart({
          A: deliveredByTypes.A,
          B: deliveredByTypes.B,
          C: deliveredByTypes.C,
          desc: deliveredByTypes.desc,
          total: deliveredByTypes.total,
        });
        console.log({ deliveryForChart });
      }
    });
  };

  const getValueForDispatched = (selectedValue) => {
    // console.log(selectedValue);
    dispatchedByTypes.forEach((dispatchedByTypes) => {
      if (selectedValue === dispatchedByTypes.desc) {
        setDispatchForChart({
          A: dispatchedByTypes.A,
          B: dispatchedByTypes.B,
          C: dispatchedByTypes.C,
          desc: dispatchedByTypes.desc,
          total: dispatchedByTypes.total,
        });
        console.log({ dispatchForChart });
      }
    });
  };
  const calculateWeek = () => {
    let curr = new Date()
    let week = []

    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i 
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
      week.push(day)
    }
    return week
  }
  useEffect(() => {
    let isFetching = true;
    
    const fetchjobItems = async () => {
      const jobs = await axios('http://localhost/jobsWithJobItems')
      
      let chemicalObjInc={today:{A:0,B:0,C:0, total:0}, total:{A:0,B:0,C:0, total:0}, week:{A:0,B:0,C:0, total:0}, month:{A:0,B:0,C:0, total:0}}
      let chemicalObjOut={today:{A:0,B:0,C:0, total:0}, total:{A:0,B:0,C:0, total:0}, week:{A:0,B:0,C:0, total:0}, month:{A:0,B:0,C:0, total:0}}
      let currDate = new Date().getDay()
      let month = new Date().getMonth()
      let currWeek = calculateWeek(new Date())
      console.log('week', currWeek)

      jobs.data.map(job => {
        job.jobItem.forEach(item => {
          let jobDate = new Date(job.date).toISOString().slice(0,10)
            // console.log(item.chemical,':', item.amount, 'date:', job.date)
            if(job.type === 'I'){
              chemicalObjInc.total[item.chemical] = parseInt(chemicalObjInc.total[item.chemical]) + parseInt(item.amount)
              chemicalObjInc.total.total = parseInt(chemicalObjInc.total.total) + parseInt(item.amount)
            if(month === new Date(job.date).getMonth()){
              chemicalObjInc.month[item.chemical] = parseInt(chemicalObjInc.month[item.chemical]) + parseInt(item.amount)
              chemicalObjInc.month.total = parseInt(chemicalObjInc.month.total) + parseInt(item.amount)
            }
            if(currDate === new Date(job.date).getDay()){
              chemicalObjInc.today[item.chemical] = parseInt(chemicalObjInc.today[item.chemical]) + parseInt(item.amount)
              chemicalObjInc.today.total = parseInt(chemicalObjInc.today.total) + parseInt(item.amount)
            }
            
        
            if(currWeek.includes(jobDate)){
              chemicalObjInc.week[item.chemical] = parseInt(chemicalObjInc.week[item.chemical]) + parseInt(item.amount)
              chemicalObjInc.week.total = parseInt(chemicalObjInc.week.total) + parseInt(item.amount)
            }
            
          }
          if(job.type === 'O'){
              chemicalObjOut.total[item.chemical] = parseInt(chemicalObjOut.total[item.chemical]) + parseInt(item.amount)
              chemicalObjOut.total.total = parseInt(chemicalObjOut.total.total) + parseInt(item.amount)
            if(month === new Date(job.date).getMonth()){
              chemicalObjOut.month[item.chemical] = parseInt(chemicalObjOut.month[item.chemical]) + parseInt(item.amount)
              chemicalObjOut.month.total = parseInt(chemicalObjOut.month.total) + parseInt(item.amount)
            }
            if(currDate === new Date(job.date).getDay()){
              chemicalObjOut.today[item.chemical] = parseInt(chemicalObjOut.today[item.chemical]) + parseInt(item.amount)
              chemicalObjOut.today.total = parseInt(chemicalObjOut.today.total) + parseInt(item.amount)
            }
            if(currWeek.includes(jobDate)){
              chemicalObjOut.week[item.chemical] = parseInt(chemicalObjOut.week[item.chemical]) + parseInt(item.amount)
              chemicalObjOut.week.total = parseInt(chemicalObjOut.week.total) + parseInt(item.amount)
            }
          }
          })
      })
      if(isFetching){
        setDeliveredByTypes([
          {A:chemicalObjInc.today.A, B:chemicalObjInc.today.B, C:chemicalObjInc.today.C, desc:'today', total:chemicalObjInc.today.total},
          {A:chemicalObjInc.total.A, B:chemicalObjInc.total.B, C:chemicalObjInc.total.C, desc:'total',total:chemicalObjInc.total.total}, 
          {A:chemicalObjInc.week.A, B:chemicalObjInc.week.B, C:chemicalObjInc.week.C, desc:'week', total:chemicalObjInc.week.total},
          {A:chemicalObjInc.month.A, B:chemicalObjInc.month.B, C:chemicalObjInc.month.C, desc:'month', total:chemicalObjInc.month.total}
        ])
        setDispatchedByTypes([
          {A:chemicalObjOut.today.A, B:chemicalObjOut.today.B, C:chemicalObjOut.today.C, desc:'today', total:chemicalObjOut.today.total},
          {A:chemicalObjOut.total.A, B:chemicalObjOut.total.B, C:chemicalObjOut.total.C, desc:'total',total:chemicalObjOut.total.total}, 
          {A:chemicalObjOut.week.A, B:chemicalObjOut.week.B, C:chemicalObjOut.week.C, desc:'week', total:chemicalObjOut.week.total},
          {A:chemicalObjOut.month.A, B:chemicalObjOut.month.B, C:chemicalObjOut.month.C, desc:'month', total:chemicalObjOut.month.total}
          
        ])
        setDeliveryForChart({
          A: chemicalObjInc.total.A,
          B: chemicalObjInc.total.B,
          C: chemicalObjInc.total.C,
          desc:'total',
          total: chemicalObjInc.total.total})
        setDispatchForChart({
          A: chemicalObjOut.total.A,
          B: chemicalObjOut.total.B,
          C: chemicalObjOut.total.C,
          desc:'total',
          total: chemicalObjOut.total.total})
      }
      console.log(chemicalObjInc, chemicalObjOut)
     }
    fetchjobItems()
    return () => isFetching = false
    // console.log(deliveryForChart);
  }, []); //deliveryForChart


console.log(deliveredByTypes)
  return (
    <>
      <div>
        <h1> This is chemicals page</h1>
        <div className="chemicals-container">
          <div className="deliver-container">
            <h2>Delivered</h2>
            <select
              value={selectLabelsDelivered.value}
              onChange={(e) => getValueForDelivered(e.currentTarget.value)}
            >
              {selectLabelsDelivered.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {Object.keys(deliveryForChart).length === 0 &&
            deliveryForChart.constructor === Object ? (
              <p>Loading</p>
            ) : (
              <ChartChemicalsDelivered {...deliveryForChart} />
            )}
          </div>
          <div className="dispatch-container">
            <h2>Dispatched</h2>
            <select
              value={selectLabelsDispatched.value}
              onChange={(e) => getValueForDispatched(e.currentTarget.value)}
            >
              {selectLabelsDispatched.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {Object.keys(dispatchForChart).length === 0 &&
            dispatchForChart.constructor === Object ? (
              <p>Loading</p>
            ) : (
              <ChartChemicalsDispatched {...dispatchForChart} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
