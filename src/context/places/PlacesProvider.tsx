import { useEffect, useReducer } from "react";
import { searchApi } from "../../apis";
import { ModalError } from "../../components";
import { getUserLocation } from "../../helpers";
import { getUserCountry } from "../../helpers/getUserCountry";
import { Feature, PlacesResponse } from "../../interfaces/places";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./PlacesReducer";

export interface PlacesState {
	isLoading: boolean;
	userLocation?: [number, number];
	isLoadingPlaces: boolean;
	places: Feature[];
}

const INITIAL_STATE: PlacesState = {
	isLoading: true,
	userLocation: undefined,
	isLoadingPlaces: false,
	places: []
};

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

	useEffect(() => {
		getUserLocation().then((coords) =>
			dispatch({
				type: "setUserLocation",
				payload: coords,
			})
		);
		getUserCountry();
	}, []);


	const searchPlacesByQuery = async (query: string): Promise<Feature[]> => {
		if (query.length === 0){
			dispatch({
				type: 'setPlaces',
				payload: []
			})
			return[]
		}; 
		if (!state.userLocation)
			throw <ModalError label="The user has no location" />;

		dispatch({ type: "setLoadingPlaces" });

		const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
			params: {
				proximity: state.userLocation.join(","),
			},
		});

		dispatch({
			type: "setPlaces",
			payload: resp.data.features,
		});
		return resp.data.features;
	};

	return (
		<PlacesContext.Provider
			value={{
				...state,
				// methods
				searchPlacesByQuery
			}}
		>
			{children}
		</PlacesContext.Provider>
	);
};

/***
 * !Documentación de la API de Mapbox
 * @description: The PlacesProvider function is a React component that provides a context for
 *  managing places data. It uses the useReducer hook to manage the state of the 
 * places data and dispatch actions to update the state. It also uses the useEffect
 *  hook to fetch the user's location and country when the component mounts. 
 * The function exposes a searchPlacesByQuery method that can be used to search 
 * for places based on a query string.
 */