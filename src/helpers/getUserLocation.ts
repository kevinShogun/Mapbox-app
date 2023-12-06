import edgeFunction  from "../../netlify/edge-functions/geo";
export const getUserLocation = async (): Promise<[number, number]> => {

	const fetchGeolocation = async () => {
		
		const response = await fetch('http://localhost:8888/geo');
        const data = await response.json();
		console.log(data);

		const res = await fetch("/.netlify/edge-functions/geo");
		const json = await res.json();
		console.log(json);

		const res2 = await edgeFunction();
		const json2 = await res2.json();
		console.log(json2);

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
