import { ModalError } from "./components";
import { MapProvider, PlacesProvider } from "./context";
import { HomeScreen } from "./screens";

export const MapsApp = () => {
	if (!navigator.geolocation) {
		return (
			<ModalError label="Your browser does not have a geolocation option." />
		);
	}
	return (
		<PlacesProvider>
			<MapProvider>
				<HomeScreen />
			</MapProvider>
		</PlacesProvider>
	);
};

export default MapsApp;
