import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import MapsApp from "./MapsApp";

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = import.meta.env.VITE_ACCESS_TOKEN_MAP;

// console.log(mapboxgl.accessToken, 'access token');



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}

			<CssBaseline />
			<MapsApp />
		</ThemeProvider>
	</React.StrictMode>
);
