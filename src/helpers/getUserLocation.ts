import geoFunction from "../../netlify/edge-functions/geo";

export const getUserLocation = async (): Promise<[number, number]> => {

	const fetchGeolocation = async () => {
		const response = await fetch("/.netlify/functions/geo");
		const data = await response.json(); // Parse the response as JSON
		console.log(data);

	};
	  fetchGeolocation();

	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				resolve([coords.longitude, coords.latitude]);
				localStorage.setItem("longitude", coords.longitude.toString());
				localStorage.setItem("latitude", coords.latitude.toString());
			},
			(err) => {
				alert("No se pudo obtener la geolocalización");
				console.log(err);
				reject();
			}
		);
		
	});
};
