import React, { useEffect } from "react";
import { useLogStore } from "../store/useLogStore";
import { ChevronRight, Calendar } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

function Patient() {
  const { id } = useParams();
  const { logView, logs } = useLogStore();

  useEffect(() => {
    logView();
  }, [logView]);

  const log = logs.find((item) => item._id === id);

  if (!log)
    return (
      <div className="p-4 text-center">
        <p className="text-lg font-semibold text-red-500">No log found</p>
      </div>
    );

  return (
    <div className="px-4 py-10 md:px-8 lg:px-16 overflow-x-hidden">
      <div className="mb-20">
        <div className="flex flex-wrap items-center text-2xl md:text-3xl ml-36 font-semibold mb-6">
          <span className="text-green-600">Patient</span>
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 mx-2" />
          <span>{log.name}</span>
        </div>

        <div className="bg-black/10 backdrop-blur-2xl rounded-md shadow-md p-6 max-w-screen-xl mx-auto">
       
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
  <input
    className="h-12 flex-1 bg-white/70 rounded-2xl font-bold p-3 outline-none"
    placeholder="Name"
    value={log.name}
    readOnly
  />

  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1">
    <label className="font-bold">Department</label>
    <input
      value={log.clinicalSpeciality}
      className="outline-none rounded-2xl p-2 w-full sm:w-32 h-12 font-bold bg-white/70"
      readOnly
    />
  </div>

  <div className="flex items-center justify-center gap-4">
    <div className="bg-black w-10 h-10 rounded-lg flex items-center justify-center">
      <Calendar className="text-white" />
    </div>
    <input
      value={log.examinationDate}
      className="outline-none rounded-2xl p-2 w-full sm:w-32 h-12 font-bold bg-white/70"
      readOnly
    />
  </div>

  <input
    className="h-12 w-full sm:w-24 bg-white/70 rounded-2xl font-bold p-3 outline-none "
    value={log.age}
    readOnly
  />
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
  <div className="p-4 rounded-2xl bg-white/70">
    <p className="text-xl font-bold mb-2">CC</p>
    <textarea
      className="w-full resize-none min-h-[100px] p-2 rounded outline-none bg-white overflow-y-auto no-scrollbar"
      value={log.cc}
      readOnly
    />
  </div>

  <div className="p-4 rounded-2xl bg-white/70">
    <p className="text-xl font-bold mb-2">HPI</p>
    <textarea
      className="w-full resize-none min-h-[100px] p-2 rounded outline-none bg-white overflow-y-auto no-scrollbar"
      value={log.hpi}
      readOnly
    />
  </div>
</div>


      
          <p className="ml-3 text-2xl font-bold mb-8 mt-8">* Physical Examination Details</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       
            <div className="bg-white/70 rounded-2xl p-4">
              <p className="text-xl font-bold mb-2">General Appearance</p>
              <textarea
                value={`• ${log?.pe?.[0]?.GA || "N/A"}`}
                className="w-full resize-none min-h-[100px] p-2 rounded outline-none bg-white overflow-y-auto no-scrollbar"
              />
            </div>

  
            <div className="bg-white/70 rounded-2xl p-4">
              <p className="text-xl font-bold mb-2">Vital Signs</p>
              <textarea
                value={`• ${log?.pe?.[0]?.VS || "N/A"}`}
                className="w-full resize-none min-h-[100px] p-2 rounded outline-none bg-white overflow-y-auto no-scrollbar"
              />
            </div>

  
            <div className="bg-white/70 rounded-2xl p-4">
              <p className="text-xl font-bold mb-2">Respiratory</p>
              <textarea
                value={`• ${log?.pe?.[0]?.Respiratory || "N/A"}`}
                className="w-full resize-none min-h-[100px] p-2 rounded outline-none bg-white overflow-y-auto no-scrollbar"
              />
            </div>
          </div>

  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="p-4 rounded-2xl bg-white/70">
              <p className="text-xl font-bold mb-2">Cardiovascular</p>
              <textarea
                className="w-full resize-none min-h-[100px] p-2 rounded outline-none bg-white overflow-y-auto no-scrollbar"
                value={`• ${log?.pe?.[0]?.CVS || "N/A"}`}
              />
            </div>
            <div className="p-4 rounded-2xl bg-white/70">
              <p className="text-xl font-bold mb-2">Gastrointestinal</p>
              <textarea
                className="w-full resize-none min-h-[100px] p-2 rounded outline-none bg-white overflow-y-auto no-scrollbar"
                value={`• ${log?.pe?.[0]?.GI || "N/A"}`}
              />
            </div>
            <div className="p-4 rounded-2xl bg-white/70">
              <p className="text-xl font-bold mb-2">Central Nervous System</p>
              <textarea
                className="w-full resize-none min-h-[100px] p-2 rounded outline-none bg-white overflow-y-auto no-scrollbar"
                value={`• ${log?.pe?.[0]?.CNS || "N/A"}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
            <div className="flex flex-col">
              <p className="ml-3 text-2xl font-bold mb-2">* Provisional Diagnostics</p>
              <textarea
                className="h-40 bg-white/70 rounded-2xl outline-none p-6 overflow-y-auto no-scrollbar"
                value={log.DX}
              />
            </div>
            <div className="flex flex-col ">
              <p className="ml-3 text-2xl font-bold mb-2">* Treatment Plan</p>
              <textarea
                className="h-40 bg-white/70 rounded-2xl outline-none p-6 overflow-y-auto no-scrollbar"
                value={log.treatmentPlan}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patient;
