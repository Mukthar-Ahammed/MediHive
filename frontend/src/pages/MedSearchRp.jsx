import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchMedicineData } from "../store/useMedStore";
import Loader from "../components/Loader";
import SearchError from "../components/SearchError";

const MedSearchRp = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
    setLoading(true);

    fetchMedicineData(query)
      .then((data) => {
        if (data) {
          setMedicine(data);
        } else {
          setError("No results found.");
        }
      })
      .catch(() => setError("Failed to fetch data."))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8 px-4">
      {loading && (
        <div className="flex justify-center items-center py-8">
          <Loader />
        </div>
      )}

      {error && (
        <div>
          <SearchError/>
        </div>
      )}

      {medicine && (
        <div className="w-full max-w-screen-xl bg-black/6 backdrop:blur-2xl p-7 rounded-2xl shadow-lg transition-transform duration-200 hover:scale-95 ease-in-out">
          <h3 className="text-5xl font-bold text-black mb-10 text-center">
            {medicine.openfda?.brand_name?.[0] || "Unknown Brand"}
          </h3>
          <div className="space-y-15">
            <div>
              <p className="text-4xl font-semibold text-black mb-4">Purpose:</p>
              <p className="text-lg text-gray-800">
                {medicine.purpose?.[0] || "Not Available"}
              </p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-black mb-4">Dosage:</p>
              <p className="text-lg text-gray-800">
                {medicine.dosage_and_administration?.[0] || "Not Available"}
              </p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-black mb-4">
                Side Effects:
              </p>
              <p className="text-lg text-gray-800">
                {medicine.adverse_reactions?.[0] || "Not Available"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedSearchRp;
