import axios from 'axios';

const thisCountry = localStorage.getItem("thisCountry") || "";

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 10,
        languaje: 'es',
        country: thisCountry,
        access_token: import.meta.env.VITE_ACCESS_TOKEN_MAP
    }
});

export default searchApi;

