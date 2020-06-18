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
    { label: "Total", value: "Total" },
    { label: "Today", value: "Today" },
    { label: "Week", value: "Week" },
    { label: "Month", value: "Month" },
  ]);

  const [selectLabelsDispatched, setSelectLabelsDispatched] = useState([
    { label: "Total", value: "Total" },
    { label: "Today", value: "Today" },
    { label: "Week", value: "Week" },
    { label: "Month", value: "Month" },
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
      const jobs = await axios('https://toxic-chemicals-devenv.herokuapp.com/jobsWithJobItems')
      
      let incoming = {today:{A:0,B:0,C:0, total:0}, total:{A:0,B:0,C:0, total:0}, week:{A:0,B:0,C:0, total:0}, month:{A:0,B:0,C:0, total:0}}
      let dispatched = {today:{A:0,B:0,C:0, total:0}, total:{A:0,B:0,C:0, total:0}, week:{A:0,B:0,C:0, total:0}, month:{A:0,B:0,C:0, total:0}}
      let currDate = new Date().toISOString().slice(0,10)
      let month = new Date().getMonth()
      let currWeek = calculateWeek(new Date())
      jobs.data.forEach(job => {
        job.jobItem.forEach(item => {
          let jobDate = new Date(job.date).toISOString().slice(0,10)
            // console.log(item.chemical,':', item.amount, 'date:', job.date)
            if(job.type === 'I'){
              incoming.total[item.chemical] = parseInt(incoming.total[item.chemical]) + parseInt(item.amount)
              incoming.total.total = parseInt(incoming.total.total) + parseInt(item.amount)
            if(month === new Date(job.date).getMonth()){
              incoming.month[item.chemical] = parseInt(incoming.month[item.chemical]) + parseInt(item.amount)
              incoming.month.total = parseInt(incoming.month.total) + parseInt(item.amount)
            }
            if(currDate == jobDate){
              console.log('same')
              incoming.today[item.chemical] = parseInt(incoming.today[item.chemical]) + parseInt(item.amount)
              incoming.today.total = parseInt(incoming.today.total) + parseInt(item.amount)
            }   
            if(currWeek.includes(jobDate)){
              incoming.week[item.chemical] = parseInt(incoming.week[item.chemical]) + parseInt(item.amount)
              incoming.week.total = parseInt(incoming.week.total) + parseInt(item.amount)
            }            
          }

          if(job.type === 'O'){
              dispatched.total[item.chemical] = parseInt(dispatched.total[item.chemical]) + parseInt(item.amount)
              dispatched.total.total = parseInt(dispatched.total.total) + parseInt(item.amount)
            if(month === new Date(job.date).getMonth()){
              dispatched.month[item.chemical] = parseInt(dispatched.month[item.chemical]) + parseInt(item.amount)
              dispatched.month.total = parseInt(dispatched.month.total) + parseInt(item.amount)
            }
            if(currDate === jobDate){
              dispatched.today[item.chemical] = parseInt(dispatched.today[item.chemical]) + parseInt(item.amount)
              dispatched.today.total = parseInt(dispatched.today.total) + parseInt(item.amount)
            }
            if(currWeek.includes(jobDate)){
              dispatched.week[item.chemical] = parseInt(dispatched.week[item.chemical]) + parseInt(item.amount)
              dispatched.week.total = parseInt(dispatched.week.total) + parseInt(item.amount)
            }
          }
          })
      })
      if(isFetching){
        setDeliveredByTypes([
          {A:incoming.today.A, B:incoming.today.B, C:incoming.today.C, desc:'Today', total:incoming.today.total},
          {A:incoming.total.A, B:incoming.total.B, C:incoming.total.C, desc:'Total',total:incoming.total.total}, 
          {A:incoming.week.A, B:incoming.week.B, C:incoming.week.C, desc:'Week', total:incoming.week.total},
          {A:incoming.month.A, B:incoming.month.B, C:incoming.month.C, desc:'Month', total:incoming.month.total}
        ])
        setDispatchedByTypes([
          {A:dispatched.today.A, B:dispatched.today.B, C:dispatched.today.C, desc:'Today', total:dispatched.today.total},
          {A:dispatched.total.A, B:dispatched.total.B, C:dispatched.total.C, desc:'Total',total:dispatched.total.total}, 
          {A:dispatched.week.A, B:dispatched.week.B, C:dispatched.week.C, desc:'Week', total:dispatched.week.total},
          {A:dispatched.month.A, B:dispatched.month.B, C:dispatched.month.C, desc:'Month', total:dispatched.month.total}
          
        ])
        setDeliveryForChart({
          A: incoming.total.A,
          B: incoming.total.B,
          C: incoming.total.C,
          desc:'Total',
          total: incoming.total.total})
        setDispatchForChart({
          A: dispatched.total.A,
          B: dispatched.total.B,
          C: dispatched.total.C,
          desc:'Total',
          total: dispatched.total.total})
      }
      // console.log(incoming, dispatched)
     }
    fetchjobItems()
    return () => isFetching = false
    // console.log(deliveryForChart);
  }, []); //deliveryForChart

  if(Object.keys(dispatchForChart).length === 0 &&
  dispatchForChart.constructor === Object){
    return<div className="loading">Loading...</div>
  }
console.log(deliveredByTypes)
console.log(dispatchedByTypes)
  return (
    <>
      <div>
        <h1> All chemicals on sites</h1>
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
           
              <ChartChemicalsDelivered {...deliveryForChart} />
      
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
              <ChartChemicalsDispatched {...dispatchForChart} />
            
          </div>
        </div>
      </div>
    </>
  );
}
