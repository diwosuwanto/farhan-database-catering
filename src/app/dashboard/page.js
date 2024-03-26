import React from "react";
import Navbar from "../components/navbar";
const test = () => {
  return (
    <div className="bg-white h-screen">
      <div className="container">
        <Navbar />
        {/* \Tabs */}
        <div className="w-100 text-center">
          <div role="tablist" className="tabs tabs-bordered w-64 mx-auto">
            <a role="tab" className="tab tab-active">
              Home
            </a>
            <a role="tab" className="tab">
              Margin
            </a>
          </div>
        </div>
        <a href="/">test</a>
        tefa-stack-2x afawef eawf
      </div>
    </div>
  );
};

export default test;
