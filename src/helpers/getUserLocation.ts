
/**
 * !Documentation
 * @description This code defines a function named getUserLocation that returns a promise. 
 * The function fetches data from a specified endpoint and extracts the longitude and latitude 
 * values from the response. It then stores these values in the local storage and session storage. 
 * Finally, it resolves the promise with an array containing the longitude and latitude values.
 * 
 * @returns Promise<[number, number]> - The function returns a promise that resolves with an array 
 * containing the longitude and latitude values.
 */
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
  
  