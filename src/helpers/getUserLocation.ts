export const getUserLocation = (): Promise<[number, number]> => {
	return new Promise<[number, number]>((resolve, reject) => {
	  fetch("/geo") // Reemplaza "/geo" con tu ruta de Netlify Function
		.then((res) => {
		  if (!res.ok) {
			throw new Error(`Failed to fetch data: ${res.status}`);
		  }
		  return res.json();
		})
		.then((locationData) => {
		  const longitude = locationData.longitude;
		  const latitude = locationData.latitude;
  
		  localStorage.setItem("longitude", longitude.toString());
		  localStorage.setItem("latitude", latitude.toString());
		  sessionStorage.setItem("locationData", JSON.stringify(locationData));

		  resolve([longitude, latitude]);
		})
		.catch((error) => {
		  alert("No se pudo obtener la geolocalización");
		  console.error("Error:", error);
		  reject(error);
		});
	});
  };
  
  