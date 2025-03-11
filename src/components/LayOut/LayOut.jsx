
import React from "react";
import Header from "../Header/Header"; // Ensure this file exists & path is correct

function LayOut({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default LayOut;
