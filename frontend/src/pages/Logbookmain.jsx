import { Plus, Folder, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLogStore } from "../store/useLogStore";

function Logbookmain() {
  const { logs, logView,LogDelete } = useLogStore();
  useEffect(() => {
    logView();
  }, []);

  return (
    <div className="h-full w-full overflow-x-hidden px-4 sm:px-10 relative">
      {/* Logs Grid */}
      <div className="flex flex-wrap gap-6 justify-start mt-9">
        {logs.length > 0 ? (
          logs.map((log) => (
            <div
              key={log._id}
              className="relative w-full sm:w-[48%] md:w-[30%] lg:w-[23%] h-64 p-4 bg-black/10 rounded-2xl shadow-lg border border-gray-200 backdrop-blur-2xl hover:scale-[0.97] transition-transform duration-300 ease-in-out"
            >
          
              <Link
                to={`/Patient/${log._id}`}
                className="flex flex-col items-center justify-center h-full"
              >
                <Folder className="w-12 h-12 sm:w-14 sm:h-14 text-black hover:text-green-500 transition-colors duration-200" />
                <p className="text-center mt-3 font-semibold text-base sm:text-lg break-words px-2">
                  {log.name}
                </p>
              </Link>
              <button
                onClick={() => LogDelete(log._id)}
                className="absolute bottom-4 right-4 text-black hover:text-red-500  w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition duration-200 hover:scale-110 ease-in-out shadow-lg bg-white/40 "
                title="Delete"
              >
                <Trash className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-auto min-h-[60vh] px-4 py-8 gap-10 sm:gap-16 md:gap-12">
            <img
              src="/graphics1.png"
              alt="Dashboard Graphic"
              className="w-40 sm:w-52 md:w-64 lg:w-78 h-auto"
            />
            <p className="text-center text-sm sm:text-base md:text-lg font-semibold text-black max-w-md sm:max-w-lg md:max-w-7xl">
              Welcome! This is your clinical log dashboard.{" "}
              <span className="text-red-600">Click the "+" button</span> to add
              patient details, diagnoses, treatments, and notes. Keeping logs
              helps track progress and supports accurate medical discussions.
            </p>
          </div>
        )}
      </div>
      <Link to="/PatientDetails">
        <div className="fixed bottom-6 right-6 w-16 h-16 sm:w-20 sm:h-20 bg-black rounded-full text-white flex items-center justify-center backdrop-blur-lg hover:bg-white hover:text-black transition ">
          <Plus className="w-8 h-8 sm:w-10 sm:h-10 " />
        </div>
      </Link>
    </div>
  );
}

export default Logbookmain;
