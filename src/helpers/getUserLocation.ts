import edgeFunction  from "../../netlify/edge-functions/geo";
export const getUserLocation = async (): Promise<[number, number]> => {

	const fetchGeolocation = async () => {
		
		const res2 = await fetch("/geo");
		console.log({res2}, 'res2');
		const json2 = await res2.json();
		console.log(json2);

		const response = await fetch('/test');
		console.log({response}, 'response');
        const data = await response.json();
		console.log(data);

		const res = await fetch("/hello");
		console.log({res}, 'res');
		const json = await res.json();
		console.log(json);


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
