import React from "react";
import { MessageSquare, Stethoscope, NotebookPen } from "lucide-react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="w-full min-h-screen mt-6  bg-white text-black">

      <div className="relative w-full h-80 bg-gradient-to-r from-white/30 via-white/10 to-white/30 backdrop-blur-lg shadow-xl overflow-hidden rounded-2xl mb-16">
        <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-teal-400 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-72 h-72 bg-teal-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>

        <div className="flex flex-col items-center justify-center h-full z-10 relative">
          <h1 className="text-5xl md:text-7xl font-bold text-center leading-tight">
            <span className="text-black">Welcome to </span>
            <span className="text-teal-500">Medihive</span>
          </h1>
          <p className="mt-6 text-black text-lg md:text-md">
          Master Medicine with Confidence.
          </p>
        </div>
      </div>

    
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 px-8 mb-20">
        <Link
          to="/chat"
          className="flex items-center justify-center h-44 bg-black/5 backdrop-blur-md shadow-lg rounded-xl hover:scale-105 transition-all duration-300 hover:bg-white/40"
        >
          <MessageSquare className="w-16 h-16 text-black" />
        </Link>

        <Link
          to="/disease-prediction"
          className="flex items-center justify-center h-44 bg-black/5 backdrop-blur-md shadow-lg rounded-xl hover:scale-105 transition-all duration-300 hover:bg-white/40"
        >
          <Stethoscope className="w-16 h-16 text-black" />
        </Link>

        <Link
          to="/logbook"
          className="flex items-center justify-center h-44 bg-black/5 backdrop-blur-md shadow-lg rounded-xl hover:scale-105 transition-all duration-300 hover:bg-white/40"
        >
          <NotebookPen className="w-16 h-16 text-black" />
        </Link>
      </div>

      <div className="relative w-full bg-black/5 backdrop-blur-lg shadow-xl rounded-2xl p-5 md:p-10 flex flex-col md:flex-row items-center justify-center gap-10 text-center md:text-left mb-20">
        <img
          src="/graphics4.png"
          alt="Illustration"
          className="w-full md:w-1/3 max-w-sm rounded-lg"
        />
        <p className="text-black text-md md:text-lg leading-relaxed max-w-3xl">
          <strong>Medihive</strong> is an all-in-one web app designed for medical students, combining AI-powered disease analysis using GPT-3, medication search via OpenFDA, and a built-in chat system for collaboration. It also features a clinical logbook where students can upload and manage records from their hospital rounds. Medihive helps streamline learning, support case discussions, and organize clinical experience all in one place.
        </p>
      </div>

   

      <div className="w-full px-8 mb-17">
        <h2 className="text-2xl font-bold text-center mb-20">Meet the Developers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
        

          <div className="flex flex-col items-center text-center">
            <img src="/Mukthar.jpeg" alt="Dev 1" className="w-32 h-32 rounded-full mb-4 object-cover hover:scale-89" />
            <p className="font-semibold">Mukthar Ahammed</p>
            <p className="text-sm text-gray-600">Fullstack Developer</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src="/Jasir.jpeg" alt="Dev 2" className="w-32 h-32 rounded-full mb-4 object-cover hover:scale-89" />
            <p className="font-semibold">Jasir Hussain</p>
            <p className="text-sm text-gray-600">Frontend & UX</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img src="/Noufal.jpeg" alt="Dev 3" className="w-32 h-32 rounded-full mb-4 object-cover hover:scale-89" />
            <p className="font-semibold">Muhammed Noufal</p>
            <p className="text-sm text-gray-600">Frontend Developer</p>
          </div>
        </div>
      </div>

 
      <footer className="w-full bg-black text-white py-6 px-4 text-center rounded-t-2xl shadow-inner">
        <p className="text-sm">&copy; {new Date().getFullYear()} Medihive. Built for medical students </p>
      </footer>
    </div>
  );
}

export default HomePage;
