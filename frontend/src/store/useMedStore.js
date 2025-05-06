import MedSearchApi from "../lib/MedSearchApi";

export const fetchMedicineData = async (query) => {
    try {
      const response = await MedSearchApi.get(`?search=openfda.brand_name:"${query}"&limit=1`);
      
      if (response.data.results && response.data.results.length > 0) {
        return response.data.results[0]; 
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching medicine data:", error);
      return null;
    }
  };