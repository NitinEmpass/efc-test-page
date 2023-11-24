import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Rules from "./pages/Rules";
import Questions from "./components/Questions";
import Result from "./pages/Result";
import axios from "axios";
import CheckQuestions from "./components/CheckQuestions";
import "react-tippy/dist/tippy.css";
import EFCS from "./assets/images/efcs-removebg.png";

const MaintenanceMessage = () => {
  return (
    <div className="min-h-screen max-w-full flex flex-col items-center justify-center gap-2">
      <img src={EFCS} alt="EFCS" className="w-56 h-24 object-contain"></img>
      <h1 className="text-3xl font-bold">
        Website is currently under maintenance
      </h1>
      <h1 className="text-xl font-bold text-gsl-dark-orange">We will be back shortly.</h1>
    </div>
  );
};
function App() {
  axios.defaults.baseURL =
    "https://dashboard.empasslearning.com/apicapi/index.php";
  axios.defaults.withCredentials = true;

  const isUnderMaintenance = true;

  return (
    <div className="min-h-screen max-w-full overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
      <Routes>
        {/* Display maintenance message for all routes during maintenance */}
        {isUnderMaintenance && (
          <Route path="/*" element={<MaintenanceMessage />} />
        )}
        {!isUnderMaintenance && (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/ques" element={<Questions />} />
            <Route path="/checkQues" element={<CheckQuestions />} />
            <Route path="/result" element={<Result />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
