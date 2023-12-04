import { useContext, useLayoutEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import * as turf from '@turf/turf';
import { PlacesContext, MapContext } from "../context";
import { IsLoading } from "./IsLoading";
export const MapView = () => {
	const { isLoading, userLocation } = useContext(PlacesContext);
	const { setMap, markerRadius } = useContext(MapContext);
	const mapDiv = useRef<HTMLDivElement>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const circleLayer = useRef<string | null>(null);
	const [markerPosition, setMarkerPosition] = useState<number[] | null>(null);

	useLayoutEffect(() => {
		if (!isLoading && userLocation && mapDiv.current) {
			if (!map.current) {
				map.current = new mapboxgl.Map({
					container: mapDiv.current,
					style: "mapbox://styles/mapbox/light-v10",
					center: userLocation,
					zoom: calculateZoom(markerRadius),
				});

				map.current.on('load', () => {
					const circle = turf.circle(turf.point(userLocation), markerRadius, { steps: 64, units: 'kilometers' });

					map.current?.addSource('circle-source', {
						type: 'geojson',
						data: circle,
					});

					map.current?.addLayer({
						id: 'circle',
						type: 'fill',
						source: 'circle-source',
						layout: {},
						paint: {
							'fill-color': '#a2adb7',
							'fill-opacity': 0.5,
						},
					});

					circleLayer.current = 'circle';
					if (map.current) {
						setMap(map.current);
					}
				});
				
			} else {
				if (circleLayer.current && markerRadius !== undefined && markerRadius !== null) {
					const circle = turf.circle(turf.point(userLocation), markerRadius, { steps: 64, units: 'kilometers' });
					(map.current?.getSource('circle-source') as mapboxgl.GeoJSONSource)?.setData(circle);
					map.current?.setZoom(calculateZoom(markerRadius));
				}
			}
		}
	}, [isLoading, markerRadius, setMap, userLocation]);

	const calculateZoom = (radius: number | null | undefined) => {
		if (radius && radius > 25) {
			return 3; // Change this value to the desired zoom level when radius is greater than 25
		} else {
			return 8; // Default zoom level when radius is less than or equal to 25
		}
	};

	if (isLoading) {
		return <IsLoading />;
	}

	return (
		<div
			ref={mapDiv}
			className="animate__animated animate__fadeIn animate__slow"
			style={{
				width: "100%",
				height: "100vh",
				top: 0,
				right: 0,
				position: "fixed",
			}}
		/>
	);
};
