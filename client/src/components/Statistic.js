import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Statistic() {

  useEffect(() => {

    const fetchAuditData = async () => {
      const auditData = await axios('https://toxic-chemicals-devenv.herokuapp.com/auditData')
      console.log(auditData.data)
    }

    fetchAuditData()
  },[])


  return (
    <>
      <div>
        <h1> This is statistics page</h1>
        <p>
          My idea for statistics was to fetch everything from audit tabel, but
          you can decide yourself :)
        </p>
      </div>
    </>
  );
}
