import { Marker } from "mapbox-gl";
import { Map } from "mapbox-gl";
import { Details, MapState } from "./MapProvider";

type MapAction =
	| { type: "setMap"; payload: Map }
	| { type: "setMarkers"; payload: Marker[] }
	| { type: "setDetails"; payload: Details };

export const mapReducer = (state: MapState, action: MapAction): MapState => {
	switch (action.type) {
		case "setMap":
			return {
				...state,
				isMapReady: true,
				map: action.payload,
			};
		case "setMarkers":
			return {
				...state,
				markers: action.payload,
			};
		case "setDetails":
			return {
				...state,
				details: action.payload,
			};
		default:
			return state;
	}
};
