import axios from "axios";
import { Search, BotMessageSquare } from "lucide-react";
import React, { useState } from "react";
import Loader from "./Loader.jsx";


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "";

const DiseasePrediction = () => {
  const [symptoms, setSymptoms] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSymptomChange = (e) => {
    setSymptoms(e.target.value);
  };

  const handleSubmit = async () => {
    if (!symptoms.trim()) {
      setError("Please enter symptoms for analysis.");
      setPrediction("");
      return;
    }

    setLoading(true);
    setError("");
    setPrediction("");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/disease/predict-disease`,
        { symptoms }
      );
      setPrediction(response.data.prediction);
    } catch (err) {
      setError("Failed to fetch disease prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col pt-10 px-4">
      <div className="flex-1 flex flex-col items-center justify-start text-center mt-10">
        {loading && <Loader />}

        {!loading && error && (
          <p className="text-red-500 text-sm sm:text-base mt-4">{error}</p>
        )}

        {!loading && !error && prediction && (
          <div className="flex flex-col items-center gap-5">
            <BotMessageSquare className="text-green-500 w-10 h-10" />
            <p className="text-3xl sm:text-3xl font-bold text-black">
              Analysis Completed
            </p>
            <p className="text-black text-base sm:text-lg max-w-4xl px-1 mt-5">
              "{prediction}"
            </p>
          </div>
        )}

        {!loading && !error && !prediction && (
          <div className="flex flex-col items-center gap-6 mt-10">
            <img
              src="/graphics3.png"
              alt="Dashboard Graphic"
              className="w-40 sm:w-52 md:w-64 lg:w-72 h-auto animate-pulse"
            />
            <p className="text-black text-sm sm:text-base md:text-lg font-medium max-w-lg">
              Please enter the <span className="text-green-500">symptoms</span> below to receive a personalized health prediction based on the provided information.
            </p>
          </div>
        )}
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 mb-30 ml-10">
        <div className="flex items-center gap-4">
          <input
            value={symptoms}
            onChange={handleSymptomChange}
            className="flex-grow h-14 rounded-2xl border-black/10 shadow-lg outline-none text-black px-4 bg-black/10 backdrop-blur-2xl"
            placeholder="Enter symptoms..."
          />
          <button
            className="bg-black text-white shadow-lg w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-150"
            onClick={handleSubmit}
          >
            <Search />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiseasePrediction;
