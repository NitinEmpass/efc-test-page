import React from "react";
import GSL from "../assets/images/GSL.avif";
import Empass from "../assets/images/empass_logo.svg";
import MMM from "../assets/images/mmm_icon.png";
import { Tooltip } from "react-tippy";
import { useLocation } from "react-router-dom";
// import LSC from "../assets/images/lsc.png";

const Footer = () => {
  const location = useLocation();
  const date = new Date();
  return (
    <div className="flex flex-col lg:flex-row w-full justify-between items-center lg:gap-10 border border-t-2 border-t-blue-400 lg:px-5 py-1 fixed bottom-0 bg-gray-100">
      <div className="hidden lg:flex flex-col lg:flex-row justify-evenly items-center w-[80%] lg:w-[60%] mx-auto p-2 lg:p-0 gap-5">
        <div className="lg:flex justify-center items-center gap-6 lg:gap-26">
          <a href="https://goodsensorylearning.com/">
            <img
              src={GSL}
              alt="Good Sensory Learning"
              width={110}
              className="aspect-auto mix-blend-darken"
            />
          </a>
          <a href="https://www.empasslearning.com/">
            <img
              src={Empass}
              alt="Empass Learning"
              width={70}
              className="bg-black/80 px-2 py-2.5 rounded-md"
            />
          </a>
          <a href="https://mymemorymentor.com/">
            <img
              src={MMM}
              alt="MMM"
              width={35}
              className="rounded-md cursor-pointer"
            />
          </a>
        </div>
      </div>
      <div className="flex justify-center items-center w-full text-gray-500 gap-4">
        <span>&#169; {date.getFullYear()} Erica Warren LLC.</span>
        {location.pathname === "/result" ? (
          <a
            href="mailto:support@mymemorymentor.com"
            className="p-1 lg:p-1 lg:px-3 text-base lg:text-xl border rounded-lg mr-4 bg-gradient-to-r from-gsl-light-green to-gsl-dark-orange text-white"
          >
            <Tooltip
              title="For any help or request for test code , click here to mail us at support@mymemorymentor.com"
              className="w-[90%] lg:w-full"
              position="bottom"
              trigger="mouseenter focus"
              arrow={true}
              theme="light"
            >
              <span className="hidden lg:block uppercase">Help </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 lg:hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </Tooltip>
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default Footer;
