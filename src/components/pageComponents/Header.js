import React, { useState } from "react";

export default function Header() {
  let date = new Date().toLocaleString();

  const [user, setUser] = useState({
    name: "Admin",
  });

  return (
    <>
      <div className="main-header">
        <h3> Hello {user.name}</h3>
        <p className="currentTime">{date}</p>
      </div>
    </>
  );
}
