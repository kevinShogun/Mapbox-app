export const getUserLocation = async (): Promise<[number, number]> => {
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
