import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import ResultPageNavBar from "../components/ResultPageNavBar";
import SolidGaugeChart from "../components/SolidGaugeChart";
import axios from "axios";
import DOMPurify from "dompurify";

const Result = () => {
  const { player_id, name, email, age, gender, grade } =
    useContext(UserContext);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => {
    if (!player_id) {
      navigate("/");
    }
  }, [navigate, player_id]);

  // const [openModal, setOpenModal] = useState(false);

  // function scrollToTop() {
  //   document.documentElement.scrollTop = 0;
  //   document.body.scrollTop = 0;
  // }

  const confirmLeavePage = useCallback((e) => {
    e.preventDefault();
    e.returnValue = "";
    const message = "Do you really want to lose your progress?";
    e.returnValue = message;
    return message;
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", confirmLeavePage);
    return () => {
      window.removeEventListener("beforeunload", confirmLeavePage);
    };
  }, [confirmLeavePage]);

  function disableBackButton() {
    window.history.pushState(null, "/", window.location.href);
    window.history.pushState(null, "", window.location.href);
    window.history.pushState(null, "", window.location.href);
    window.history.replaceState(null, "/", window.location.href);
  }

  // console.log(player_id);
  const requestData = {
    crt_id: process.env.REACT_APP_CRT_ID,
    quiz_id: process.env.REACT_APP_QUIZ_ID,
    player_id: player_id,
  };
  // console.log(requestData);
  useEffect(() => {
    disableBackButton();
    async function fetchData() {
      setLoading(true);
      await axios
        .post(
          "/UserProfile",
          { data: requestData },
          {
            headers: {
              task: process.env.REACT_APP_WEBSITE_RESULT,
              token: process.env.REACT_APP_WEBSITE_TOKEN,
            },
          }
        )
        .then((res) => {
          console.log("This is result response: ", res.data);
          setResult(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError("Something went wrong. Please try again later.");
        });
    }

    // setResult(res);
    // console.log("this is res array", result);
    /* function calculateScore() {
      var score = 0;
      for (let i = 0; i < res.length; i++) {
        score = score + parseInt(res[i].score);
      }
      return score;
    }
    const total_score = calculateScore();
    setTotalScore(total_score); */
    fetchData();
    // console.log("this is result: ", result);

    // setShowConfetti(true);
    /* const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 9000); // Set the duration (in milliseconds) for the confetti effect
    return () => clearTimeout(timer); */
  }, []);

  const date = new Date();
  const formattedDate = date
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-");
  // console.log(formattedDate);

  if (loading || result === null)
    return (
      <div className="w-full h-full flex flex-col gap-2 justify-center items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="loader"></div>
        <span className="bg-gradient-to-r from-gsl-light-green to-gsl-dark-orange inline-block text-transparent bg-clip-text text-xl text-center">
          Getting your result...
        </span>
        {error && (
          <span className="text-red-500 inline-block text-transparent bg-clip-text text-xl text-center">
            {error}
          </span>
        )}
      </div>
    );

  const mySafeHTML = DOMPurify.sanitize(result.result_label_summary);

  return (
    <div className="relative">
      <ResultPageNavBar report_id={result.report_id} />
      <div className="h-full w-full overflow-auto flex flex-col justify-center items-center gap-4 lg:py-0 py-2 lg:p-5">
        <div className="relative w-[90%] lg:m-5 lg:p-5 shadow-2xl border-t-4 border-t-gsl-dark-orange bg-white flex flex-col justify-center rounded-md gap-2 mb-10 lg:mb-20 lg:last:items-end">
          <span className="text-xl lg:text-3xl font-bold mx-5 lg:mx-10 self-start">
            {name}
          </span>
          <div className="bg-white flex flex-col lg:flex-row justify-center rounded-md gap-2 lg:gap-20 w-[95%] mx-auto">
            <div className="bg-white flex flex-col rounded-md w-full lg:min-w-[65%] gap-5 justify-start">
              <div className="grid lg:grid-cols-2 gap-2 p-2 w-full lg:justify-center items-center text-lg lg:text-2xl">
                <div className="row-span-6 flex gap-5 items-center">
                  <div className="col-span-3 flex flex-col gap-4">
                    <span>Test Date</span>
                    <span>Age</span>
                    <span>Gender</span>
                  </div>
                  <div className="col-span-3 flex flex-col gap-4">
                    <span className="font-bold">{formattedDate}</span>
                    <span className="font-bold">{age}</span>
                    <span className="font-bold capitalize">{gender}</span>
                  </div>
                </div>
                <div className="row-span-6 flex gap-5 items-center">
                  <div className="col-span-3 flex flex-col gap-4">
                    <span>Email</span>
                    <span>Grade</span>
                    <span>Section</span>
                  </div>
                  <div className="col-span-3 flex flex-col gap-4">
                    <a
                      href={`mailto:${email}`}
                      target="_blank"
                      className="font-bold break-words w-full"
                      title={email}
                      rel="noreferrer"
                    >
                      {email.toString().length > 25
                        ? email.toString().slice(0, 25) + "..."
                        : email}
                    </a>
                    <span className="font-bold">{grade}</span>
                    <span className="font-bold">NA</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 items-center w-[95%] lg:max-w-[35%]">
              <div className="flex flex-col justify-center items-center gap-1">
                <span className="text-lg lg:text-2xl font-semibold text-center">
                  Total Executive Functioning (EF) Score
                </span>
                <div className="w-[120px]">
                  <SolidGaugeChart total_score={result.total_score} />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white flex flex-col lg:flex-row justify-start rounded-md gap-5 lg:gap-20 w-[95%] mx-auto">
            <div
              className="lg:my-2 lg:w-[70%] text-black text-lg lg:text-2xl mx-auto break-words text-left border-2 border-blue-400 p-2 rounded-md shadow-md result-label-summary"
              dangerouslySetInnerHTML={{ __html: mySafeHTML }}
            ></div>
            <div className="flex flex-col gap-2 w-[90%] lg:w-[30%] mx-2 lg:mx-0">
              <span className="font-semibold underline">
                Interpretation of Total EF Score
              </span>
              <div className="flex items-center gap-3">
                <ul className="">
                  <li>Less than 65</li>
                  <li>Between 65 to 85</li>
                  <li>86 and above</li>
                </ul>
                <ul>
                  <li> : Insignificant EF issues *</li>
                  <li> : Significant EF issues</li>
                  <li> : Severe EF issues</li>
                </ul>
              </div>
              <div className="mx-2 bg-white lg:justify-self-end rounded-md">
                * A score below 65 can reflect areas of difficulty in specific
                competency areas. Please review the subtest scores for
                additional details.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Result;
