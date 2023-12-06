import geolocationFunction from "../../netlify/edge-functions/geo"; // Reemplaza con el nombre de tu archivo de función en el borde


export const getUserLocation = async (): Promise<[number, number]> => {

	const fetchGeolocation = async () => {
		new Promise((resolve, reject) => {
			//get geolocation from netlify edge function
			fetch('/geo')
				.then((response) => {
					console.log(response)
					return response.json();
				})
				.then((data) => {
					localStorage.setItem("longitude", data.geo.longitude.toString());
					localStorage.setItem("latitude", data.geo.latitude.toString());
					resolve([data.geo.longitude, data.geo.latitude]);
				})
				.catch((err) => {
					console.log(err);
					reject();
				});

		});	
		
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
