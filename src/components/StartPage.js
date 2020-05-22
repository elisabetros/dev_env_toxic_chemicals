import React, { useState, useEffect } from "react";
import ChartJobs from "./charts/ChartJobs";
import "../css/startPage.css";
import axios from 'axios'

export default function StartPage() {
  const [alerts, setAlerts] = useState({alerts: []});
  const [jobsDone, setJobDone] = useState()
  const [ allJobsDone, setAllJobsDone ] = useState()
  // const [jobsAmonth, setJobsAmonth] = useState();
  // const [jobsAweek, setJobsAweek] = useState();
  // const [jobsAday, setJobsAday] = useState();

  useEffect(() => {
    let isFetching = true
   const fetchJobs = async () => {
      console.log('fetch jobs')
      const jobs = await axios('http://localhost/job')
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
     }
    }

    async function fetchWarehouseStock(){
      const response = await axios('http://localhost/allstock')
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
    { label: "last week", value: "week" },
    { label: "last month", value: "month" },
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
      const jobsThisMonth = jobsDone.filter(job=>{
        const jobDate = new Date(job.date).getMonth()
        const currDate = new Date().getMonth()
        // console.log(currDate, jobDate)
        if(jobDate === currDate){
          console.log('matches')
          return job
        }
        // console.log(jobDate.getMonth())
        // if(getMonth(job.date)
      })
      jobsThisMonth = jobsThisMonth.sort()
      console.log(jobsThisMonth)
      setJobDone({dates:jobsThisMonth})
     
    } else {
      setJobDone({
        dates: [
          {
            t: new Date("2020-5-01"),
            y: 3,
          },
          {
            t: new Date("2020-5-03"),
            y: 6,
          },

          {
            t: new Date("2020-5-05"),
            y: 12,
          },

          {
            t: new Date("2020-5-06"),
            y: 2,
          },

          {
            t: new Date("2020-5-07 13:3"),
            y: 10,
          },
          {
            t: new Date("2020-5-08 13:3"),
            y: 6,
          },
          {
            t: new Date("2020-5-11"),
            y: 3,
          },
        ],
      });
    }
  };

  return (
    <>
      <div>
        <h1> This is start page</h1>
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
