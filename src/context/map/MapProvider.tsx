import { useContext, useEffect, useReducer } from "react";
import mapboxgl, { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";
import { PlacesContext } from "../places/PlacesContext";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";

interface MapProviderProps {
	children: JSX.Element | JSX.Element[];
}


export interface Details {
    kms: number;
    minutes: number;
	isShow: boolean;
}

export interface MapState {
	isMapReady: boolean;
	map?: Map;
	markers: Marker[];
	details: Details;
	markerRadius: number;
}

const INITIAL_STATE: MapState = {
	isMapReady: false,
	map: undefined,
	markers: [],
	markerRadius: 15,
	details: {
		kms: 0,
		minutes: 0,
		isShow: false,
	}
};

export const MapProvider = ({ children }: MapProviderProps) => {
	const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
	const { places } = useContext(PlacesContext);

	useEffect(() => {
		state.markers.forEach((m) => m.remove());
		const newMarkers: Marker[] = [];

		if(places.length <= 0){
			dispatch({
				type: "setMarkers",
				payload: [],
			});
			if(state.map?.getLayer('RouteString')){
				state.map?.removeLayer('RouteString');
				state.map?.removeSource('RouteString');
			}
			dispatch({
				type: "setDetails",
				payload: {
					kms: 0,
					minutes: 0,
					isShow: false				
				},
			});
		}
		

		for (const p of places) {
			const [lng, lat] = p.center;
			const popup = new Popup().setHTML(`
				<h3> ${p.text}</h3>
				<p>${p.place_name}</p>
			`);

			const newMarker = new Marker()
				.setPopup(popup)
				.setLngLat([lng, lat])
				.addTo(state.map!);

			newMarkers.push(newMarker);

			dispatch({
				type: "setMarkers",
				payload: newMarkers,
			});
		}
	}, [places]);

	const setMap = (map: Map) => {
		const myLocationPopup = new Popup().setHTML(`
			<h4> Aqui estoy</h4>
			<p>mi ubicacion</p>
		`);

		new Marker()
			.setLngLat(map.getCenter())
			.setPopup(myLocationPopup)
			.addTo(map);

		dispatch({
			type: "setMap",
			payload: map,
		});
	};

	const getRouteBetweenPoints = async (
		start: [number, number],
		end: [number, number]
	) => {
		const resp = await directionsApi.get<DirectionsResponse>(
			`/${start.join(",")};${end.join(",")}`
		);

		const { distance, duration, geometry } = resp.data.routes[0];
		const { coordinates: coords } = geometry;
		let kms = distance / 1000;
		kms = Math.round(kms * 100);
		kms /= 100;

		let minutes = Math.floor(duration / 60);
		
		console.table({
			kms,
			minutes
		})
		
		dispatch({
			type: "setDetails",
			payload: {
				kms,
				minutes,
				isShow: true				
			},
		});

		const bounds = new LngLatBounds(start, start);
		for (const c of coords) {
			const newCoord: [number, number] = [c[0], c[1]];
			bounds.extend(newCoord);
		}

		state.map?.fitBounds(bounds, {
			padding: 100
		});

		// Polyline
		const sourceData: AnySourceData = {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: [
					{
						type: 'Feature',
						properties: {},
						geometry: {
							type: 'LineString',
							coordinates: coords
						}
					}
				]
			}
		}

		if(state.map?.getLayer('RouteString')){
			state.map?.removeLayer('RouteString');
			state.map?.removeSource('RouteString');
		}

		state.map?.addSource('RouteString', sourceData)
		state.map?.addLayer({
			id: 'RouteString',
			type: 'line',
			source: 'RouteString',
			layout: {
				'line-cap': 'round',
				'line-join': 'round'
			},
			paint: {
				'line-color': 'rgb(163 , 163 , 163)',
				'line-width': 3,
			}
		})

	};

	const setMarkerRadius = (radius: number) => {
		dispatch({
			type: "setMarkerRadius",
			payload: radius,
		});
	};

	return (
		<MapContext.Provider
			value={{
				...state,
				setMap,
				setMarkerRadius,
				getRouteBetweenPoints,
			}}
		>
			{children}
		</MapContext.Provider>
	);
};
