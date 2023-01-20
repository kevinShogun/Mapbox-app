import { ModalError } from "./components";
import { MapProvider, PlacesProvider } from "./context";
import { HomeScreen } from "./screens";

export const MapsApp = () => {
	if (!navigator.geolocation) {
		return (
			<ModalError label="Tu Navegador no tiene opcion de geolocalización" />
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
