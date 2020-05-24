import React, { useState, useEffect, useRef } from "react";
// import { Tabs, useTabState, usePanelState } from "@bumaga/tabs";
import { Tabs, Tab, Content } from "./TabStyle";
import "../css/search.css";
import Datepicker from "./datePicker/DatePicker";
import Accordion from "./Accordion";
import * as moment from "moment";
import axios from 'axios'

export default function Search() {
  const [active, setActive] = useState(0);
  const handleClick = (e) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };

  const ref = useRef(null); 
  const [site1DataTotal, setSite1DataTotal] = useState({
    A: 25,
    B: 15,
    C: 12,
    alert: 0,
  });
  
  const [site2DetailedData, setSite2DetailedData] = useState()
  const [site1DetailedData, setSite1DetailedData] = useState();
  // console.log(site1DataTotal);

  let detailedData = (site) => {
    const detailedData=site.map((data, i) => {
      return (
        <div className="table-rows" key={i}>
          <p className="tabel-item"> {data.chemical}</p>
          <p className="tabel-item"> {data.action}</p>
          <p className="tabel-item"> {data.date}</p>
          <p className="tabel-item"> {data.warehouse}</p>
          <p className="tabel-item"> {data.ticket}</p>
        </div>
      );
    });
    return detailedData
  }

  const renderTableHeader = (data) => {
    console.log(data)
    let header = Object.keys(data[0]);
    return header.map((key, index) => {
      return (
        <p key={index} className="tabel-header">
          {key.toUpperCase()}
        </p>
      );
    });
  };

  const sortByWarehouse = () => {
    // console.log(site1DetailedData[0].date);
    const sortedByWarehouse = [...site1DetailedData].sort((a, b) => {
      return a.warehouse - b.warehouse;
    });
    setSite1DetailedData(sortedByWarehouse);
  };

  const sortByDate = () => {
    const sortedByDate = [...site1DetailedData].sort((a, b) => {
      let dateA = new Date(a.date),
        dateB = new Date(b.date);

      return dateA - dateB;
    });
    setSite1DetailedData(sortedByDate);
  };

  const [searchDates, setSearchDates] = useState();

  function handleSearchDates(value) {
    console.log(value);
    setSearchDates(value);
    console.log(searchDates);
  }

  const clearFilters = () => {
    setSite1DetailedData([
      { chemical: "A", action: "delivered", date: "12-05-2020", warehouse: 1 },
      { chemical: "C", action: "dispatched", date: "04-05-2020", warehouse: 1 },
      { chemical: "B", action: "delivered", date: "07-05-2020", warehouse: 5 },
      { chemical: "B", action: "delivered", date: "08-05-2020", warehouse: 2 },
      { chemical: "A", action: "dispatched", date: "05-05-2020", warehouse: 3 },
      { chemical: "C", action: "delivered", date: "13-05-2020", warehouse: 1 },
    ]);
    ref.current.cleanValue();
  };

  useEffect(() => {
    let isFetching = true;
    let site1Data = []
    let site2Data = []
    let action;
    const fetchJobs = async () => {
      const jobs = await axios('http://localhost/jobsWithJobItems')
      console.log(jobs.data)
      jobs.data.forEach(job => {
        if(job.type === 'I'){
          action = "delivered"
        }else{
          action = "dispatched"
        }
        let jobDate = new Date(job.date).toISOString().slice(0, 10)
        console.log(jobDate)
        job.jobItem.map(jobItem => {
          console.log(jobItem)
          if(job.site_id === 2){
            site2Data.push({chemical: jobItem.chemical, action, date: jobDate, warehouse: jobItem.warehouse_id, ticket:job.id })
          }else{
            site1Data.push({chemical: jobItem.chemical, action, date: jobDate, warehouse: jobItem.warehouse_id, ticket:job.id })
          }
        })      
      })
      if(isFetching){
        setSite1DetailedData(site1Data)
        setSite2DetailedData(site2Data)
      }
    }
    fetchJobs()
    console.log(searchDates);
    if (searchDates && searchDates.endDate) {
      console.log(searchDates);
      let filteredDates = site1DetailedData.filter((item) => {
        if (
          moment(item.date, "DD-MM-YYYY").isBetween(
            moment(searchDates.startDate),
            moment(searchDates.endDate),
            null,
            "[]"
          )
        ) {
          return true;
        } else {
          return false;
        }
      });
      console.log(filteredDates);
      setSite1DetailedData(filteredDates);
    }
  }, [searchDates]);

  //

  
    if(!site1DetailedData || !site2DetailedData){
      return(<div>Loading...</div>)
    }
    console.log(site1DetailedData, site2DetailedData)
    return (
    <div>
      <h1>This is search page </h1>
      <button onClick={clearFilters}>Clear all filters</button>
      <Tabs>
        <Tab onClick={handleClick} active={active === 0} id={0}>
          Site 1
        </Tab>

        <Tab onClick={handleClick} active={active === 1} id={1}>
          Site 2
        </Tab>
      </Tabs> 
      <>
     <Content active={active === 0}>
          <h1>Site 1</h1>
          <div className="total-container">
            <h2> Total</h2>
            <p>
              A: {site1DataTotal.A} B: {site1DataTotal.B} C: {site1DataTotal.C}{" "}
              Alert: {site1DataTotal.alert}{" "}
            </p>

            <button onClick={sortByWarehouse}>Sort by warehouse</button>
            <button onClick={sortByDate}>Sort by date</button>

            <div>
              <Accordion title="Search by date">
                <Datepicker
                  value={searchDates}
                  onChange={handleSearchDates}
                  ref={ref}
                />
              </Accordion>
            </div>

            <div>
              {renderTableHeader(site1DetailedData)}
              {detailedData(site1DetailedData)}
            </div>
          </div>
        </Content> 
         <Content active={active === 1}>
         <h1>Site 2</h1>
          <div className="total-container">
            <h2> Total</h2>
            <p>
              A: {site1DataTotal.A} B: {site1DataTotal.B} C: {site1DataTotal.C}{" "}
              Alert: {site1DataTotal.alert}{" "}
            </p>

            <button onClick={sortByWarehouse}>Sort by warehouse</button>
            <button onClick={sortByDate}>Sort by date</button>

            <div>
              <Accordion title="Search by date">
                <Datepicker
                  value={searchDates}
                  onChange={handleSearchDates}
                  ref={ref}
                />
              </Accordion>
            </div>

            <div>
              {renderTableHeader(site2DetailedData)}
              {detailedData(site2DetailedData)}
            </div>
          </div>
        </Content>
      </>
    </div>
  );
}
