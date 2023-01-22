import axios from 'axios';

const thisCountry = localStorage.getItem("thisCountry") || "";

const directionApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: import.meta.env.VITE_ACCESS_TOKEN_MAP
    }
});

export default directionApi;

