import { useContext, useLayoutEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { PlacesContext, MapContext } from "../context";
import { IsLoading } from "./IsLoading";

export const MapView = () => {
	const { isLoading, userLocation } = useContext(PlacesContext);
	const { setMap } = useContext(MapContext);
	const mapDiv = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (!isLoading) {
			const map = new mapboxgl.Map({
				container: mapDiv.current!, // container ID
				style: "mapbox://styles/mapbox/light-v10", // style URL
				center: userLocation, // starting position [lng, lat]
				zoom: 14, // starting zoom
			});

			map && setMap(map);
		}
	}, [isLoading]);

	if (isLoading) {
		return <IsLoading />;
	}

	return (
		<div
			ref={mapDiv}
			style={{
				width: "100%",
				height: "100vh",
				top: 0,
				right: 0,
				position: "fixed",
			}}
		>
		</div>
	);
};
