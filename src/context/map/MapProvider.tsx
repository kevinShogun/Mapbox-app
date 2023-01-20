import { useContext, useEffect, useReducer } from "react";
import { Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";
import { PlacesContext } from "../places/PlacesContext";

interface MapProviderProps {
	children: JSX.Element | JSX.Element[];
}

export interface MapState {
	isMapReady: boolean;
	map?: Map;
	markers: Marker[];
}

const INITIAL_STATE: MapState = {
	isMapReady: false,
	map: undefined,
	markers: [],
};

export const MapProvider = ({ children }: MapProviderProps) => {
	const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
	const { places } = useContext(PlacesContext);

	useEffect(() => {
		state.markers.forEach((m) => m.remove());
		const newMarkers: Marker[] = [];

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
				type: 'setMarkers',
				payload: newMarkers
			})
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

	return (
		<MapContext.Provider
			value={{
				...state,
				setMap,
			}}
		>
			{children}
		</MapContext.Provider>
	);
};
