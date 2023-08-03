import React from "react";
import logo from "../assets/images/efcs-removebg.png";
import { Link } from "react-router-dom";

const ResultPageNavBar = ({ report_id = "EFC-2023-2003-2626" }) => {
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-b-blue-400 bg-gray-100 py-1">
      <Link to="/">
        <img
          src={logo}
          alt="SPI"
          height="auto"
          className="aspect-auto lg:w-36 w-20"
        />
      </Link>
      <div className="px-2 py-1 text-lg font-bold border border-blue-400 mr-2">
        {report_id}
      </div>
    </div>
  );
};

export default ResultPageNavBar;
