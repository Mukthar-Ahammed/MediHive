import axios from "axios";

const MedSearchApi = axios.create({
    baseURL: "https://api.fda.gov/drug/label.json",
    
});

export default MedSearchApi;