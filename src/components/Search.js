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
  const [site2DataTotal, setSite2DataTotal] = useState({A:0, B:0,C:0})
  const [site1DataTotal, setSite1DataTotal] = useState({A:0, B:0,C:0});
  
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
    console.log('sort by warehouse')
    // console.log(site1DetailedData[0].date);
    const sortedByWarehouse = [...site1DetailedData].sort((a, b) => {
      return a.warehouse - b.warehouse;
    });
    setSite1DetailedData(sortedByWarehouse);
  };

  const sortByDate = () => {
    console.log('sort by date')
    const sortedByDate = [...site1DetailedData].sort((a, b) => {
      let dateA = new Date(a.date),
        dateB = new Date(b.date);
      console.log(dateA, dateB)
      return dateA - dateB;
    });
    setSite1DetailedData(sortedByDate);
  };

  const [searchDates, setSearchDates] = useState();

  function handleSearchDates(value) {
    console.log(value);
    setSearchDates(value);
  }

  const clearFilters = () => {
    setSearchDates(null)
    ref.current.cleanValue();
  };

  useEffect(() => {
    let isFetching = true;
    let site1Data = []
    let site2Data = []
    let site1ACounter = 0;
    let site1BCounter = 0;
    let site1CCounter = 0;
    let site2ACounter = 0;
    let site2BCounter = 0;
    let site2CCounter = 0;
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
        // console.log(jobDate)
        job.jobItem.map(jobItem => {
          console.log(jobItem)
          if(job.site_id === 2){
            site2Data.push({chemical: jobItem.chemical, action, date: jobDate, warehouse: jobItem.warehouse_id, ticket:job.id })
            if (jobItem.chemical === 'A'){
              site2ACounter = site2ACounter + jobItem.amount;
            }
            if (jobItem.chemical === 'B'){
              site2BCounter = site2BCounter + jobItem.amount;
            }
            if (jobItem.chemical === 'C'){
              site2CCounter = site2CCounter + jobItem.amount;
            }
          
          }else{
            site1Data.push({chemical: jobItem.chemical, action, date: jobDate, warehouse: jobItem.warehouse_id, ticket:job.id })
            if (jobItem.chemical === 'A'){
              site1ACounter = site1ACounter + jobItem.amount;
            }
            if (jobItem.chemical === 'B'){
              site1BCounter = site1BCounter + jobItem.amount;
            }
            if (jobItem.chemical === 'C'){
              site1CCounter = site1CCounter + jobItem.amount;
            }
          }
        })      
      })
      if(isFetching){
        setSite1DetailedData(site1Data)
        setSite2DetailedData(site2Data)
        setSite1DataTotal({A: site1ACounter, B:site1BCounter, C:site1CCounter})
        setSite2DataTotal({A: site2ACounter, B:site2BCounter, C:site2CCounter})
      }
    }
    if(!searchDates){
      fetchJobs()
    }

    console.log(searchDates);
    if (searchDates && searchDates.endDate && site1DetailedData) {
      console.log(searchDates);
      let filteredDates = site1DetailedData.filter((item) => {
        console.log( moment(item.date).isBetween(
          moment(searchDates.startDate),
          moment(searchDates.endDate)))
        if (
          moment(item.date).isBetween(
            moment(searchDates.startDate),
            moment(searchDates.endDate),
            null,
            '[]'
          )
        ) {
          console.log('yes')
          return true;
        } else {
          console.log('no')
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
      {/* <h1>This is search page </h1>  */}
     
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
            <div className="total">
              <h2> Total amount:</h2>
                <h3>A: {site1DataTotal.A}</h3>
                <h3> B: {site1DataTotal.B}</h3>
                <h3> C: {site1DataTotal.C}{" "}</h3>
          </div>
          <div className="buttonWrapper">
            <button onClick={clearFilters}>Clear all filters</button>
            <button onClick={sortByWarehouse}>Sort by warehouse</button>
            <button onClick={sortByDate}>Sort by date</button>
          </div>

            <div>
              <Accordion title="Search by date">
                <Datepicker
                  value={searchDates}
                  onChange={handleSearchDates}
                  ref={ref}
                />
              </Accordion>
            </div>

            <div className="tickets">
              <div className="tableHeaders">{renderTableHeader(site1DetailedData)}</div>
              
              {detailedData(site1DetailedData)}
            </div>
          </div>
        </Content> 
         <Content active={active === 1}>
         <h1>Site 2</h1>
          <div className="total-container">
            <div className="total">
              <h2> Total amount:</h2>
                <h3>A: {site1DataTotal.A}</h3>
                <h3> B: {site1DataTotal.B}</h3>
                <h3> C: {site1DataTotal.C}{" "}</h3>
            </div>
         

          <div className="buttonWrapper">
            <button onClick={clearFilters}>Clear all filters</button>
            <button onClick={sortByWarehouse}>Sort by warehouse</button>
            <button onClick={sortByDate}>Sort by date</button>
          </div>

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
            <div className="tableHeaders">{renderTableHeader(site1DetailedData)}</div>
              {detailedData(site2DetailedData)}
            </div>
          </div>
        </Content>
      </>
    </div>
  );
}
