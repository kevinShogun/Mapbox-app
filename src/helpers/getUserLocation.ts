
export const getUserLocation = async (): Promise<[number, number]> => {

	const fetchGeolocation = async () => {
		
		const response = await fetch('/.netlify/functions/geo');
        const data = await response.json();
		console.log(data);

		const res = await fetch("/.netlify/functions/test");
		const json = await res.json();
		console.log(json);

		const res2 = await fetch("/.netlify/functions/geofunction");
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
