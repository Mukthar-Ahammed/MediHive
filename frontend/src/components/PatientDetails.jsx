import React, { useState } from "react";
import { Calendar, Plus, Trash } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLogStore } from "../store/useLogStore.js";

function PatientDetails() {
  const [selectedValue, setSelectedValue] = useState("");
  const { logUpload } = useLogStore();
  const [data, setFormData] = useState({
    name: "",
    age: "",
    examinationDate: new Date(),
    clinicalSpeciality: "",
    cc: "",
    hpi: "",
    DX: "",
    treatmentPlan: "",
    GA: [],
    VS: [],
    Respiratory: [],
    CVS: "",
    GI: "",
    CNS: "",
  });

  const options = [
    "none",
    "Orthopedics",
    "Ophthalmology",
    "Otolaryngology",
    "Dermatology",
    "Neurology",
    "Anesthesiology",
    "Radiology",
    "Pathology",
    "Urology",
    "Cardiology",
    "Oncology",
  ];

  const handleDropdown = (e) => {
    const Department = e.target.value;
    setSelectedValue(Department);
    setFormData({ ...data, clinicalSpeciality: Department });
  };

  //form submission

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", data);
    logUpload(data);
  };

  return (
    <div className="w-full min-h-screen p-4 sm:p-8 md:p-12 lg:p-24">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="bg-black/10 backdrop-blur-2xl rounded-md shadow-md p-6 max-w-screen-xl mx-auto">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <input
              className="h-12 flex-1 bg-white/70 rounded-2xl font-bold p-3 outline-none"
              placeholder="Name"
              value={data.name}
              onChange={(e) => setFormData({ ...data, name: e.target.value })}
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
              <label className="font-bold text-sm sm:text-base">
                Department
              </label>

              <select
                value={selectedValue}
                onChange={handleDropdown}
                className="bg-white/70 h-12 rounded-3xl p-2 text-black outline-none w-full sm:w-48 lg:w-64"
              >
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Picker and Age */}
            <div className="flex items-center gap-5">
              <div className="bg-black w-10 h-10 rounded-lg flex items-center justify-center">
                <Calendar className="text-white" />
              </div>
              <DatePicker
                selected={data.examinationDate}
                onChange={(date) =>
                  setFormData({ ...data, examinationDate: date })
                }
                className="outline-none rounded-2xl p-2 w-32 h-12 font-bold bg-white/70"
              />
            </div>

            <input
              className="h-12 w-24 bg-white/70 rounded-2xl font-bold p-3 outline-none"
              placeholder="Age"
              value={data.age}
              onChange={(e) => setFormData({ ...data, age: e.target.value })}
            />
          </div>

          {/* Complaint and History */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <input
              type="text"
              className="flex-1 rounded-2xl bg-white/70 font-bold p-4 outline-none"
              placeholder="Chief Complaint"
              value={data.hpi}
              onChange={(e) => setFormData({ ...data, hpi: e.target.value })}
            />
            <textarea
              className="flex-1 rounded-2xl bg-white/70 font-bold p-4 outline-none"
              placeholder="History of Present Illness"
              value={data.cc}
              onChange={(e) => setFormData({ ...data, cc: e.target.value })}
            />
          </div>

          {/* Physical Examination */}
          <p className="ml-3 text-2xl font-bold mb-4">
            * Physical Examination Details
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* GA */}
            <div className="bg-white/70 rounded-2xl p-4">
              <p className="text-xl font-bold mb-2">General Appearance</p>
              <textarea
                value={data.GA.join("\n")}
                onChange={(e) =>
                  setFormData({ ...data, GA: e.target.value.split("\n") })
                }
                placeholder="Describe general appearance..."
                className="w-full resize-y min-h-[100px] p-2 rounded outline-none bg-white"
              />
            </div>

            {/* VS */}
            <div className="bg-white/70 rounded-2xl p-4">
              <p className="text-xl font-bold mb-2">Vital Signs</p>
              <textarea
                value={data.VS.join("\n")}
                onChange={(e) =>
                  setFormData({ ...data, VS: e.target.value.split("\n") })
                }
                placeholder="Enter vital signs..."
                className="w-full resize-y min-h-[100px] p-2 rounded outline-none bg-white"
              />
            </div>

            {/* Respiratory */}
            <div className="bg-white/70 rounded-2xl p-4">
              <p className="text-xl font-bold mb-2">Respiratory</p>
              <textarea
                value={data.Respiratory.join("\n")}
                onChange={(e) =>
                  setFormData({
                    ...data,
                    Respiratory: e.target.value.split("\n"),
                  })
                }
                placeholder="Enter respiratory observations..."
                className="w-full resize-y min-h-[100px] p-2 rounded outline-none bg-white"
              />
            </div>
          </div>

          {/* Other Systems */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="p-4 rounded-2xl bg-white/70">
              <p className="text-xl font-bold mb-2">Cardiovascular</p>
              <textarea
                className="w-full resize-y min-h-[100px] p-2 rounded outline-none bg-white"
                placeholder="Cardiovascular"
                value={data.CVS}
                onChange={(e) => setFormData({ ...data, CVS: e.target.value })}
              />
            </div>
            <div className="p-4 rounded-2xl bg-white/70">
              <p className="text-xl font-bold mb-2">Gastrointestinal</p>
              <textarea
                className="w-full resize-y min-h-[100px] p-2 rounded outline-none bg-white"
                placeholder="Gastrointestinal"
                value={data.GI}
                onChange={(e) => setFormData({ ...data, GI: e.target.value })}
              />
            </div>
            <div className="p-4 rounded-2xl bg-white/70">
              <p className="text-xl font-bold mb-2">Central Nervous System</p>
              <textarea
                className="w-full resize-y min-h-[100px] p-2 rounded outline-none bg-white"
                placeholder="CNS"
                value={data.CNS}
                onChange={(e) => setFormData({ ...data, CNS: e.target.value })}
              />
            </div>
          </div>

          {/* Diagnostics & Treatment Plan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
            <div className="flex flex-col">
              <p className="ml-3 text-2xl font-bold mb-2">
                * Provisional Diagnostics
              </p>
              <textarea
                className="h-20 bg-white/70 rounded-2xl outline-none p-3"
                placeholder="Provisional Diagnostics"
                value={data.DX}
                onChange={(e) => setFormData({ ...data, DX: e.target.value })}
              />
            </div>
            <div className="flex flex-col">
              <p className="ml-3 text-2xl font-bold mb-2">* Treatment Plan</p>
              <textarea
                className="h-20 bg-white/70 rounded-2xl outline-none p-3"
                placeholder="Treatment Plan"
                value={data.treatmentPlan}
                onChange={(e) =>
                  setFormData({ ...data, treatmentPlan: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full sm:w-32 h-12 bg-black text-white font-bold rounded"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}

export default PatientDetails;
