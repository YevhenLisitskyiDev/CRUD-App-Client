import React from "react";
import Navbar from "./Navbar/Navbar";

export default function PageWithNavbar({ Page }) {
  return (
    <>
      <Navbar />
      <div className="page">
        <Page />
      </div>
    </>
  );
}
