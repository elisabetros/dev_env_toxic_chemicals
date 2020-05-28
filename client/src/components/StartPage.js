import React, { useState, useEffect } from "react";
import ChartJobs from "./charts/ChartJobs";
import "../css/startPage.css";
import axios from 'axios'

export default function StartPage() {
  const [alerts, setAlerts] = useState({alerts: [ ]});
  const [jobsDone, setJobDone] = useState()
  const [ allJobsDone, setAllJobsDone ] = useState()


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
    let isFetching = true
   const fetchJobs = async () => {
      console.log('fetch jobs')
      const jobs = await axios('https://toxic-chemicals-devenv.herokuapp.com/job')
      console.log(jobs.data)
      let dateArray = jobs.data.map((job, index)=> {
        let date = new Date(job.date)
        date = date.getFullYear()+ '-'+(parseInt(date.getMonth())+1) + '-' + date.getDate()
        return date
      })
      
      function findDuplicateDates(arra1) {
        let dateObject = {};
        let result = []
        arra1.forEach(item => {
          console.log(item)
          if(!dateObject[item])
              dateObject[item] = 0;
              dateObject[item] += 1;
        })
        console.log()
        for(let date in dateObject){
          result.push({t:new Date(date), y:dateObject[date]})
        }
        return result;        
    }
    dateArray = findDuplicateDates(dateArray)
    console.log(dateArray)

    if(isFetching){
        setJobDone({dates:dateArray})
        setAllJobsDone({dates:dateArray})
     }
    }

    async function fetchWarehouseStock(){
      const response = await axios('https://toxic-chemicals-devenv.herokuapp.com/allstock')
      // console.log(response.data)
      let chemicalCounterSite1 = 0;
      let chemicalCounterSite2 = 0;
      response.data.forEach(warehouseStock => {
        if(warehouseStock.chemical === 'A' && warehouseStock.warehouse_id <=5){
          chemicalCounterSite1 = chemicalCounterSite1 + warehouseStock.amount
        }
        if(warehouseStock.chemical === 'A' && warehouseStock.warehouse_id > 5){
          chemicalCounterSite2 = chemicalCounterSite2 + warehouseStock.amount
        }
        if(isFetching){
          if(chemicalCounterSite2 >= 15){
            setAlerts(state => [...state, {reason: "More than 15 A", site: "2"}])
          }
          if(chemicalCounterSite1 >= 15){
            setAlerts(state => [...state, {reason: "More than 15 A", site: "1"}])
          }
        }
      })
      console.log('fetch stock for alert level')

    }
    fetchJobs()
    fetchWarehouseStock()
    return () => isFetching = false
  },[])
  // console.log(alerts.alerts);
  
 

  const [selectLabels, setselectLabels] = useState([
    { label: "Total", value: "total" },
    { label: "This week", value: "week" },
    { label: "This month", value: "month" },
  ]);

  //by default last 6 days are shown, on select can change to a month

  const getAlerts = alerts.alerts.map((alert, i) => (
    <div className="notification" key={i}>
      <p className="notify"> </p>
      {alert.reason} at site #{alert.site}
    </div>
  ));

 
  const getValue = (selectValue) => {
    console.log(selectValue);
    if (selectValue === "month") {
      console.log(jobsDone)
      const jobsThisMonth = allJobsDone.dates.filter(job => {
        console.log(job)
        const jobDate = new Date(job.t).getMonth()
        const currDate = new Date().getMonth()
        console.log(currDate, jobDate)
        if(jobDate === currDate){
          console.log('matches')
          return job
        }
      
      })
      console.log(jobsThisMonth)
      setJobDone({dates:jobsThisMonth})     

    } else if(selectValue === "week") {
      let currWeek = calculateWeek()
      let jobsThisWeek = allJobsDone.dates.filter( job => {
        // console.log(job.t, currWeek)
        if(currWeek.includes(new Date(job.t).toISOString().slice(0,10))){
          return job
        }
      })
      setJobDone({dates:jobsThisWeek})
    }else{
      setJobDone(allJobsDone);
    }
  };

  return (
    <>
      <div>
        <h1> Completed Jobs</h1>
        <div className="container-start-page">
          <div className="alerts box">
            active alerts
            {getAlerts}
          </div>
          <div className="jobs box">
            <select
              value={selectLabels.value}
              onChange={(e) => getValue(e.currentTarget.value)}
            >
              {selectLabels.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            {jobsDone? <ChartJobs {...jobsDone} />: null}
          </div>
        </div>
      </div>
    </>
  );
}
