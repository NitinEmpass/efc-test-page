import React from "react";
// import techniques from "../assets/images/techniques.png";
import LoginForm from "./LoginForm";
import efc from "../assets/images/What-Is-Executive-Function.webp";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 mb-28">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-gsl-light-green text-center text-3xl lg:text-5xl p-5 text-stroke">
          Executive Functioning Competency Screener
        </h1>
        {/* <span className="font-semibold text-base lg:text-2xl text-center">
          Embrace and Accommodate Neurodiversity
        </span> */}
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center mb-5 mx-auto gap-10 lg:gap-16">
        <div className="order-last lg:order-first">
          <img
            className="w-full lg:w-[600px] h-full lg:h-80 rounded-lg aspect-video"
            src={efc}
            alt="EFC"
          />
        </div>
        <div className="border-blue-400 border-2 h-40 hidden lg:block"></div>
        <LoginForm />
      </div>
      {/* <div>
        <img src={techniques} alt="Techniques" className="w-[75%] mx-auto" />
      </div> */}
    </div>
  );
};

export default Login;
