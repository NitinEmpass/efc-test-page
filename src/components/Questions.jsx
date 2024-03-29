import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { UserContext } from "../context/UserContext";
// import { questions } from "../assets/data/questions";
// import soundfileTitle from "../assets/sounds/que_1146_title.mp3";
// import soundfileDetail from "../assets/sounds/que_1146_detail.mp3";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SoundButton from "./SoundButton";
import CustomTour from "./CustomTour";
import { NumberList } from "./NumberList";
// import { isMobile } from "react-device-detect";

const Questions = () => {
  const navigate = useNavigate();
  const { player_id, questions, age, testTakerType } = useContext(UserContext);
  // const player_id = "1";
  const [current, setCurrent] = useState(0);
  const [checkboxArray, setCheckboxArray] = useState([]);
  const [checked, setChecked] = useState([]);
  const [option, setOption] = useState("");
  const [animate, setAnimate] = useState(false);
  const [unattempted, setUnattempted] = useState([]);
  const [unattemptedFlag, setUnattemptedFlag] = useState(false);
  // console.log("this is checkbox array", checkboxArray);
  // console.log(questions, player_id);
  // console.log("this is questions array", questions);
  // console.log("this is checked array", checked);
  const [openModal, setOpenModal] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  const [openDesc, setOpenDesc] = useState(false);
  const textOverflow = useRef(null);
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

  const [tour, setTour] = useState(0);
  function disableBackButton() {
    window.history.pushState(null, "/", window.location.href);
    window.history.pushState(null, "", window.location.href);
    window.history.pushState(null, "", window.location.href);
    window.history.replaceState(null, "/", window.location.href);
  }
  useEffect(() => {
    scrollToTop();
    // if (isMobile) {
    //   setTour(10);
    // }
    if (!questions || !player_id) {
      navigate("/");
    }
  }, [navigate, player_id, questions]);

  const [soundTitle, setSoundTitle] = useState(null);
  const [soundDetail, setSoundDetail] = useState(null);

  useEffect(() => {
    const importSoundTitle = async () => {
      try {
        // const soundModule = await import(
        //   `../assets/sounds/que_${questions[current].id}_title.mp3`
        // );
        testTakerType
          ? setSoundTitle(questions[current].que_title_third_person_link)
          : setSoundTitle(questions[current].que_link);
      } catch (error) {
        console.error(
          `Error loading sound for question ${questions[current].id}:`,
          error
        );
      }
    };
    const importSoundDetail = async () => {
      try {
        // const soundModule = await import(
        //   `../assets/sounds/que_${questions[current].id}_title.mp3`
        // );̥
        if (
          questions[current].que_detail_link ||
          questions[current].que_detail_link_2
        ) {
          if (age < 18) {
            setSoundDetail(questions[current].que_detail_link);
          } else {
            setSoundDetail(questions[current].que_detail_link_2);
          }
        }
      } catch (error) {
        console.error(
          `Error loading sound detail for question ${questions[current].id}:`,
          error
        );
      }
    };
    // function overflowCheck() {
    //   // console.log("this is containing element div", overflowDiv);
    //   // console.log("this is text element tag", textOverflow);
    //   if (
    //     textOverflow?.current?.parentElement?.clientHeight <
    //     textOverflow?.current?.clientHeight
    //   ) {
    //     // console.log("overflow");
    //     // textOverflow?.current?.classList.remove("lg:text-4xl");
    //     // textOverflow?.current?.classList.remove("text-2xl");
    //     // textOverflow?.current?.classList.add("!lg:text-2xl");
    //     // textOverflow?.current?.classList.add("!text-base");
    //     textOverflow.current.style.fontSize = "1.5rem";
    //     textOverflow.current.style.lineHeight = "1.5rem";
    //   }
    // }
    // overflowCheck();
    disableBackButton();
    importSoundTitle();
    importSoundDetail();
  }, [age, current, questions]);

  function scrollToTop() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  const [res, setRes] = useState([]);
  function handleAnswerSelect(questionId, selectedAnswer, score) {
    // console.log(questionId, selectedAnswer, score);
    const ans = res;
    let existingAnswer = ans.find((answer) => answer.que_id === questionId);
    if (existingAnswer) {
      existingAnswer.answer = selectedAnswer;
      existingAnswer.score = score;
    } else {
      ans.push({
        que_id: questionId,
        answer: selectedAnswer,
        score: score,
      });
      setChecked([...checked, current + 1]);
    }
    // console.log("this is ans", ans);
    setRes(ans);
    setAnimate(true);
    setOption(selectedAnswer);
    // if (ans.length === questions.length) {
    //   setTimeout(() => {
    //     handleSubmit();
    //   }, 1000); // Delay the execution of handleSubmit() by 1 seconds
    // }
  }
  // console.log("this is res", res);

  const handlePrev = () => {
    if (!unattemptedFlag) {
      if (current === 0) return;
      setCurrent(current - 1);
    } else {
      if (current === unattempted[0]) {
        setUnattemptedFlag(false);
        if (current === 0) return;
        setCurrent(current - 1);
      } else setCurrent(unattempted[unattempted.indexOf(current) - 1]);
    }
  };
  const handleNext = () => {
    setAnimate(false);
    setOpenDesc(false);
    if (!unattemptedFlag) {
      if (current === questions.length - 1) setCurrent(0);
      else setCurrent(current + 1);
    } else {
      if (current === unattempted[unattempted.length - 1]) {
        setUnattemptedFlag(false);
        if (current === questions.length - 1) setCurrent(0);
        else setCurrent(current + 1);
      } else setCurrent(unattempted[unattempted.indexOf(current) + 1]);
    }
  };
  if (!player_id || !questions) {
    return null;
  }
  const handleSubmit = () => {
    if (res.length !== questions.length) {
      setCheckModal(true);
      scrollToTop();
      const unattemptedQuestionIndices = questions
        .filter(
          (question) => !res.some((response) => response.que_id === question.id)
        ) // Filter out the questions that don't have a corresponding response in the res array
        .map((question) => question.index); // Extract the indices of the unattempted questions
      // console.log(unattemptedQuestionIndices);
      // console.log("this is unattempeted array", unattemptedQuestionIndices);
      setUnattempted(unattemptedQuestionIndices);
      setCurrent(unattemptedQuestionIndices[0]);
      setUnattemptedFlag(true);
    } else {
      setOpenModal(true);
      scrollToTop();
    }
  };

  if (tour === 9) {
    setTour(11);
    setRes([]);
    setChecked([]);
    setCheckboxArray([]);
    setCurrent(0);
  }

  // console.log(tour);
  return (
    <div className="min-h-screen w-full relative overflow-auto bg-[url(./assets/images/bg-logo_adobe_express.svg)] bg-cover bg-no-repeat">
      <Navbar />
      <div className="flex flex-col justify-center items-start p-5 mx-auto w-[95%] lg:w-[65%] my-8 lg:my-5 lg:mb-20 bg-blue-50 rounded-md shadow-lg gap-10 lg:gap-5 relative">
        <div className="flex flex-col justify-center items-center w-full">
          <CustomTour
            content="You're all set! Click 'Start Now' to take the screener or 'Tour Again' to replay navigation."
            isTour={tour === 7 ? true : false}
            setTour={setTour}
            tour={7}
            text="Start now"
          />
          <CustomTour
            content="Please take a minute to get familiar with the screener navigation and help options."
            isTour={tour === 0 ? true : false}
            setTour={setTour}
            tour={0}
            text="Start Tour"
          />
          <div
            key={questions[current].id}
            className="flex flex-col justify-center items-start gap-5 w-full"
          >
            <div className="flex flex-col justify-center items-start gap-6 lg:gap-2 w-full">
              <div className="flex justify-between items-center w-full">
                <span className="relative text-lg lg:text-xl">
                  <span className="text-2xl lg:text-3xl bg-gradient-to-r from-gsl-light-green to-gsl-dark-orange inline-block text-transparent bg-clip-text border-b-2 border-gsl-dark-orange">
                    {current < 9 ? `0${current + 1}` : current + 1}
                  </span>{" "}
                  of {questions.length}
                </span>
                {/* <CustomTour
                  content={"Current item out of Total items"}
                  isTour={tour === 1 ? true : false}
                  setTour={setTour}
                  className="top-12 left-24 rounded-tl-none lg:top-15 lg:left-26"
                /> */}
                <div className="relative flex lg:hidden gap-4">
                  <div className="inline-block lg:hidden">
                    <Tooltip title="Listen to audio">
                      <SoundButton src={soundTitle} />
                    </Tooltip>
                    <CustomTour
                      content={"Click to listen to this text"}
                      isTour={tour === 1 ? true : false}
                      setTour={setTour}
                      className="-top-3 right-28"
                      id="speech-bubble-right-top"
                    />
                  </div>
                  {questions[current].que_detail ||
                  questions[current].que_detail_2 ||
                  tour < 8 ? (
                    <div>
                      <Tooltip title="Click to understand the statement better">
                        <button
                          className="relative block lg:hidden border px-4 py-2 rounded-full font-serif font-bold bg-black/70 hover:bg-white text-white hover:text-black duration-300 ease-in-out"
                          onClick={() => setOpenDesc(!openDesc)}
                        >
                          i
                        </button>
                      </Tooltip>
                      <CustomTour
                        content={
                          "Click to listen to a detailed explanation of the item"
                        }
                        isTour={tour === 2 ? true : false}
                        setTour={setTour}
                        className="-right-9 top-16"
                        id="speech-bubble-top-right"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex justify-between items-center w-full gap-2">
                <div className="flex items-center justify-center gap-6 h-20">
                  <h3
                    ref={textOverflow}
                    className="text-base lg:text-2xl"
                    onCopy={(e) => e.preventDefault()} // Prevent copy
                    onCut={(e) => e.preventDefault()} // Prevent cut
                    onContextMenu={(e) => e.preventDefault()} // Prevent right-click
                  >
                    {testTakerType
                      ? questions[current].que_title_third_person
                      : questions[current].que_title}
                  </h3>
                </div>
                <div className="hidden lg:flex relative gap-4">
                  <Tooltip title="Listen to audio">
                    <SoundButton src={soundTitle} />
                  </Tooltip>
                  <CustomTour
                    content={"Click to listen to this text"}
                    isTour={tour === 1 ? true : false}
                    setTour={setTour}
                    className="lg:-top-2 lg:right-28"
                    id="speech-bubble-right-top"
                  />
                  {questions[current].que_detail ||
                  questions[current].que_detail_2 ||
                  tour < 8 ? (
                    <>
                      <Tooltip title="Click to understand the statement better">
                        <button
                          className="hidden lg:block border px-4 py-2 rounded-full font-serif font-bold bg-black/70 hover:bg-white text-white hover:text-black duration-300 ease-in-out"
                          onClick={() => setOpenDesc(!openDesc)}
                        >
                          i
                        </button>
                      </Tooltip>

                      <div className="hidden lg:inline-block relative">
                        <CustomTour
                          content={
                            "Click to listen to a detailed explanation of the item"
                          }
                          isTour={tour === 2 ? true : false}
                          setTour={setTour}
                          className="lg:top-16 lg:-right-5"
                          id="speech-bubble-top-right"
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <div
                className={
                  openDesc === true
                    ? "absolute border p-2 lg:p-5 rounded-md -top-1 right-0 bg-slate-100 w-full lg:w-[90%] overflow-y-auto"
                    : "hidden"
                }
              >
                <button
                  className="absolute border px-4 py-2 rounded-full top-1 right-1 bg-slate-200"
                  onClick={() => setOpenDesc(!openDesc)}
                >
                  x
                </button>
                <div className="mr-10 flex items-center justify-center gap-4">
                  <span>
                    {questions[current].que_detail ||
                    questions[current].que_detail_2 ? (
                      <>
                        {age < 18
                          ? questions[current].que_detail
                          : questions[current].que_detail_2}
                      </>
                    ) : (
                      "No elaboration available"
                    )}
                  </span>
                  {questions[current].que_detail_link ||
                  questions[current].que_detail_link_2 ? (
                    <Tooltip title="Listen to audio">
                      <SoundButton src={soundDetail} />
                    </Tooltip>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-5 lg:gap-3 text-lg lg:text-2xl w-[90%] mx-auto">
              {questions[current].choices.map((choice, index) => {
                return (
                  <li
                    key={index}
                    value={option}
                    onClick={() => {
                      handleAnswerSelect(
                        questions[current].id,
                        questions[current][`choice_${index + 1}`],
                        questions[current][`score_choice_${index + 1}`]
                      );
                    }}
                    className={`flex justify-center items-center gap-4 border border-gray-500 p-1 lg:p-2 rounded-full w-full cursor-pointer ${
                      res.find(
                        (item) =>
                          item.que_id === questions[current].id &&
                          item.answer ===
                            questions[current][`choice_${index + 1}`]
                      ) &&
                      "ring-2 ring-[#00fac5] bg-[#00fac5] text-black border-transparent"
                    }`}
                  >
                    {choice}
                  </li>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className="relative">
            <Tooltip title="Previous">
              <button
                onClick={handlePrev}
                disabled={current === 0}
                className={`flex justify-center items-center p-2 px-6 border hover:ring-2 ring-blue-400 rounded-md text-2xl ${
                  tour > 7 && current === 0
                    ? "bg-gray-400 cursor-not-allowed" // Change background color for disabled state
                    : "bg-gradient-to-r from-gsl-light-green to-gsl-dark-orange text-black hover:text-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            </Tooltip>
            <CustomTour
              content="To go back to the previous item"
              isTour={tour === 3 ? true : false}
              setTour={setTour}
              className="bottom-16"
              id="speech-bubble-bottom-left"
            />
          </div>
          {current === questions.length - 1 ? (
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex justify-center items-center p-2 px-4 border hover:ring-2 ring-blue-400 rounded-md text-xl bg-gradient-to-r from-gsl-light-green to-gsl-dark-orange text-white"
            >
              Submit
            </button>
          ) : (
            <div className="relative">
              <Tooltip title="Next">
                <button
                  onClick={handleNext}
                  className={`${
                    animate && "animate-bounce"
                  } flex justify-center items-center p-2 px-6 border hover:ring-2 ring-blue-400 rounded-md text-2xl bg-gradient-to-r from-gsl-light-green to-gsl-dark-orange text-black hover:text-white bg-white`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </Tooltip>
              <CustomTour
                content="To move to the next item"
                isTour={tour === 4 ? true : false}
                setTour={setTour}
                className="right-0 bottom-16"
                id="speech-bubble-bottom-right"
              />
            </div>
          )}
        </div>
        <NumberList
          disabled={unattemptedFlag}
          setDisabled={setUnattemptedFlag}
          current={current}
          setCurrent={setCurrent}
          questions={questions}
          checked={checked}
          checkboxArray={checkboxArray}
          setCheckboxArray={setCheckboxArray}
          tour={tour}
          setTour={setTour}
        />
      </div>
      <Footer />
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        res={res}
        player_id={player_id}
        heading="Great. You have attempted all items. Would you like to end the screener?"
        firstText={"No"}
        secondText={"Yes"}
      />
      <Modal
        open={checkModal}
        onClose={() => setCheckModal(false)}
        res={res}
        player_id={player_id}
        heading={`You have not selected answers for ${
          questions.length - res.length
        } items, Please review them now.`}
        firstText={"Ok"}
      />
    </div>
  );
};

export default Questions;
