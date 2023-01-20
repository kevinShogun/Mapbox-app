import axios from 'axios';

const log = localStorage.getItem("longitude")
const lat = localStorage.getItem("latitude")

const thisCountryApi = axios.create({
    baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${log},${lat}.json?`,
    params: {
        types: "country",
        access_token: import.meta.env.VITE_ACCESS_TOKEN_MAP
    }
});

export default thisCountryApi;

