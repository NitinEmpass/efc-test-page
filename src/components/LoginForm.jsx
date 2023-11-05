import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { genderOptions, gradeOptions } from "../assets/data/selectOptions";
import "react-tippy/dist/tippy.css";
import "../tippycontent.css";
import TooltipInput from "./TooltipInput";

const LoginForm = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    onBehalf: false,
    otherName: "",
    otherEmail: "",
    testTakerType: "",
    testCode: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    age: "",
    grade: "",
    other: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState(0);
  const {
    setPlayer_Id,
    setName,
    setEmail,
    setAge,
    setGender,
    setGrade,
    setTestTakerType,
    setTestTakerEmail,
    setTestTakerName,
    setTestTakerLabel,
  } = useContext(UserContext);

  const handleSubmit = async (e) => {
    console.log(formData);
    setLoading(true);
    setName(formData.fullName);
    setEmail(formData.email);
    setAge(formData.age);
    setGender(formData.gender);
    setGrade(formData.grade);
    setTestTakerType(formData.onBehalf);
    setTestTakerEmail(formData.otherEmail);
    setTestTakerName(formData.otherName);
    setTestTakerLabel(
      formData.testTakerType === "other"
        ? formData.other
        : formData.testTakerType
    );
    e.preventDefault();
    e.target.classList.add("submitted");
    if (formData.grade === "") {
      setError("Please enter your Grade");
    } else if (formData.gender === "") {
      setError("Please enter your Gender");
    }

    // create a new Date object representing the current date and time
    const now = new Date();

    // extract the individual components of the date and time
    // concatenate the components into the desired format
    const formattedDate =
      now.getFullYear().toString().padStart(4, "0") +
      (now.getMonth() + 1).toString().padStart(2, "0") +
      now.getDate().toString().padStart(2, "0") +
      now.getHours().toString().padStart(2, "0") +
      now.getMinutes().toString().padStart(2, "0") +
      now.getSeconds().toString().padStart(2, "0") +
      now.getMilliseconds().toString().padStart(3, "0").slice(0, 2);

    // console.log(formattedDate); // output: "2023040411140755"
    const player_id = formattedDate;
    const data = {
      test_taker_type: formData.onBehalf ? "other" : "self",
      test_taker_name: formData.otherName,
      test_taker_email: formData.otherEmail,
      test_taker_label:
        formData.testTakerType === "other"
          ? formData.other
          : formData.testTakerType,
      firstname: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      age: formData.age,
      gender: formData.gender,
      grade: formData.grade,
      country: "India",
      city: "NA",
      quiz_id: process.env.REACT_APP_QUIZ_ID,
      player_id: player_id,
      source: process.env.REACT_APP_SOURCE,
      code: formData.testCode,
      school_name: "NA",
    };
    console.log(data);

    if (formData.testCode === "EFC08") {
      // console.log("EFC08");
      await handleRegister(data, player_id);
    } else {
      await handleVerify(data, player_id);
    }

    setLoading(false);

    // console.log(response);
    // console.log(testCode, firstName, lastName, email, gender, age, grade);
    // navigator("/rules", { state: { player_id: player_id } });
    // navigator("/rules");
  };
  const handleVerify = async (data, player_id) => {
    console.log("Verify Called");
    // console.log(data);
    // console.log(process.env.REACT_APP_WEBSITE_CHECK_USER);
    // console.log(process.env.REACT_APP_WEBSITE_TOKEN);
    await axios
      .post(
        "/MetaData",
        { data },
        {
          headers: {
            task: process.env.REACT_APP_WEBSITE_CHECK_USER,
            token: process.env.REACT_APP_WEBSITE_TOKEN,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        if (res.data.status === "201") {
          handleRegister(data, player_id);
        } else {
          setError(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Something went wrong. Please try again later.");
      });
  };
  const handleRegister = async (data, player_id) => {
    console.log("Register called");
    await axios
      .post(
        "/UserProfile",
        { data },
        {
          headers: {
            task: process.env.REACT_APP_WEBSITE_REGISTER,
            token: process.env.REACT_APP_WEBSITE_TOKEN,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setPlayer_Id(player_id);
        navigator("/rules");
      })
      .catch((err) => {
        console.log(err);
        setError("Something went wrong. Please try again later.");
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };
  console.log(formData)

  const handleStep = (e) => {
    e.preventDefault();
    if (
      formData.onBehalf &&
      formData.testTakerType === "" &&
      formData.otherName === "" &&
      formData.otherEmail === ""
    ) {
      return setError("Please enter all details!");
    }

    setError("");
    setSteps((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col justify-center items-center w-[90%] lg:w-[50%] gap-6 shadow-2xl px-5 lg:px-10 py-5 rounded-lg bg-white">
      {error && (
        <p className="bg-gsl-dark-orange p-3 rounded-md text-white">{error}</p>
      )}
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <div
          className={
            steps === 0 ? "flex flex-col gap-4 w-full animate-fade" : "hidden"
          }
        >
          <div className="flex items-center gap-2 text-lg">
            <label htmlFor="onBehalf">
              Are you taking this screener on behalf of a learner?
            </label>
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center justify-between w-full">
                <label htmlFor="teacher">Yes</label>
                <input
                  type="radio"
                  name="onBehalf"
                  value="true"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      onBehalf: true,
                      testTakerType: "",
                    });
                  }}
                  className="h-4 w-4"
                />
              </div>
              <div className="flex items-center justify-between w-full">
                <label htmlFor="parent">No</label>
                <input
                  type="radio"
                  name="onBehalf"
                  value="false"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      onBehalf: false,
                      testTakerType: "",
                    });
                  }}
                  className="h-4 w-4"
                />
              </div>
            </div>
          </div>

          {formData.onBehalf === true && (
            <>
              <div className="w-full flex flex-col justify-center gap-2 text-lg">
                <span>Are you a</span>
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="teacher">Teacher</label>
                    <input
                      type="radio"
                      name="testTakerType"
                      value="teacher"
                      onChange={handleChange}
                      className="h-4 w-4"
                      disabled={!formData.onBehalf}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="parent">Parent</label>
                    <input
                      type="radio"
                      name="testTakerType"
                      value="parent"
                      onChange={handleChange}
                      className="h-4 w-4"
                      disabled={!formData.onBehalf}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="professional">Professional</label>
                    <input
                      type="radio"
                      name="testTakerType"
                      value="professional"
                      className="h-4 w-4"
                      onChange={handleChange}
                      disabled={!formData.onBehalf}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="professional">Other</label>
                    <input
                      type="radio"
                      name="testTakerType"
                      value="other"
                      className="h-4 w-4"
                      onChange={handleChange}
                      disabled={!formData.onBehalf}
                    />
                  </div>
                </div>
              </div>

              {formData.testTakerType === "other" && (
                <input
                  type="text"
                  name="other"
                  placeholder="Other, please indicate relationship with the learner, e.g.sibling"
                  onChange={handleChange}
                  className="outline-none border-2 border-gray-500 p-2 rounded-md w-full focus:border-blue-400"
                />
              )}

              <TooltipInput
                tooltipText="Please enter the details of the person who is taking the screener on behalf of learner"
                type="text"
                placeholder="Your Full name"
                name="otherName"
                autoComplete="name"
                value={formData.otherName}
                onChange={handleChange}
                className="w-full"
              />
              <TooltipInput
                tooltipText="Please enter the details of the person who is taking the screener on behalf of learner"
                type="email"
                placeholder="Your email"
                name="otherEmail"
                autoComplete="email"
                value={formData.otherEmail}
                onChange={handleChange}
                className="w-full"
              />
            </>
          )}
        </div>

        <div
          className={
            steps === 1
              ? "flex flex-col gap-4 w-full animate-fade-left"
              : "hidden"
          }
        >
          <input
            type="text"
            placeholder="Enter Test Code"
            className="outline-none border-2 border-gray-500 p-2 rounded-md focus:border-blue-400"
            required
            name="testCode"
            onInput={(e) => {
              e.target.value = e.target.value.toUpperCase();
            }}
            value={formData.testCode}
            onChange={handleChange}
          />
          <div className="w-full flex items-center gap-6">
            <TooltipInput
              tooltipText="Please enter the details of the Learner as this will get printed on all reports"
              type="text"
              placeholder="Learner's 1st name"
              name="firstName"
              autoComplete="first-name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full lg:w-[50%]"
            />
            <TooltipInput
              tooltipText="Please enter the details of the Learner as this will get printed on all reports"
              type="text"
              placeholder="Learner's 2nd name"
              name="lastName"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full lg:w-[50%]"
            />
          </div>
          <div className="w-full flex flex-col lg:flex-row items-center gap-2 lg:gap-6">
            <TooltipInput
              tooltipText="Enter Parent, Professional or Teacher's Email if learner is under 13 years of age"
              type="email"
              placeholder="Your email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full lg:w-[50%]"
            />
            <select
              className="outline-none border-2 border-gray-500 p-2 rounded-md w-full lg:w-[50%] focus:border-blue-400"
              required
              name="gender"
              autoComplete="gender"
              defaultValue={""}
              onChange={handleChange}
            >
              <option value="" disabled>
                Your Gender
              </option>
              {genderOptions.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col lg:flex-row items-center gap-2 lg:gap-6">
            <input
              type="number"
              name="age"
              placeholder="Your age"
              className="outline-none border-2 border-gray-500 p-2 rounded-md w-full lg:w-[50%] focus:border-blue-400"
              required
              min={5}
              autoComplete="age"
              value={formData.age}
              onChange={handleChange}
            />
            <select
              className="outline-none border-2 border-gray-500 p-2 rounded-md w-full lg:w-[50%] focus:border-blue-400"
              required
              name="grade"
              autoComplete="grade"
              onChange={handleChange}
              defaultValue={""}
            >
              <option
                value=""
                disabled
                className="text-gray-500 focus:border-blue-400"
              >
                Your Grade
              </option>
              {gradeOptions.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {steps === 1 ? (
          <button
            type="submit"
            className="uppercase py-3 px-2 bg-gradient-to-r from-gsl-light-green to-gsl-dark-orange w-32 text-white rounded-md mx-auto hover:scale-105 duration-300 ease-in-out font-semibold"
          >
            {loading ? <span className="loader"></span> : "start test"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleStep}
            className="uppercase py-3 px-2 bg-gradient-to-r from-gsl-light-green to-gsl-dark-orange w-32 text-white rounded-md mx-auto hover:scale-105 duration-300 ease-in-out font-semibold"
          >
            {loading ? <span className="loader"></span> : "Continue"}
          </button>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
